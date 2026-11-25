#!/usr/bin/env node
// Prints the user's prompts from every Claude Code session in this project since the last commit,
// so commit intent survives `/clear` (which starts a new transcript file but leaves the old one on disk).
//
// Usage: node recent-prompts.js   (run from the repo root, or wherever Claude Code was launched)
//
// Reads ~/.claude/projects/<cwd with non-alphanumerics replaced by "-">/*.jsonl. That transcript
// format is undocumented: if it changes, this prints nothing useful and the skill falls back to asking.

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const MAX_PROMPT_CHARS = 1500;

function git(...args) {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

// No commits yet → every prompt counts.
const lastCommit = git("log", "-1", "--format=%cI");
const since = lastCommit ? new Date(lastCommit) : new Date(0);

const projectsRoot = path.join(process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude"), "projects");
const candidates = [process.cwd(), git("rev-parse", "--show-toplevel")].filter(Boolean);
const projectDir = candidates
  .map((dir) => path.join(projectsRoot, dir.replace(/[^A-Za-z0-9]/g, "-")))
  .find((dir) => fs.existsSync(dir));

if (!projectDir) {
  console.log(`(no Claude Code transcripts found for ${candidates.join(" or ")})`);
  process.exit(0);
}

/** The user's own words from one transcript entry, or null for tool output, system noise, etc. */
function promptText(entry) {
  if (entry.type !== "user" || entry.isSidechain || entry.isMeta) return null;
  const content = entry.message?.content;

  if (Array.isArray(content)) {
    // Tool results are arrays too; only all-text arrays are typed by the user (e.g. "[Request interrupted by user]").
    if (!content.every((part) => part.type === "text")) return null;
    return content.map((part) => part.text).join("\n").trim() || null;
  }
  if (typeof content !== "string") return null;

  const text = content.trim();
  // Slash commands carry intent in their args (e.g. `/goal finish the refactor`); `/clear` marks a context reset.
  const command = text.match(/<command-name>(.*?)<\/command-name>/s);
  if (command) {
    const args = text.match(/<command-args>(.*?)<\/command-args>/s)?.[1].trim();
    if (args) return `${command[1]} ${args}`;
    return command[1] === "/clear" ? "/clear" : null;
  }
  // Remaining wrapped content is harness output (command stdout, task notifications, reminders); pasted content is the user's.
  if (text.startsWith("<") && !text.startsWith("<pasted_content")) return null;
  return text || null;
}

const prompts = [];
for (const file of fs.readdirSync(projectDir).filter((f) => f.endsWith(".jsonl"))) {
  const fullPath = path.join(projectDir, file);
  if (fs.statSync(fullPath).mtime <= since) continue;

  for (const line of fs.readFileSync(fullPath, "utf8").split("\n")) {
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    const at = new Date(entry.timestamp);
    if (!(at > since)) continue;

    const text = promptText(entry);
    if (text) prompts.push({ at, session: file.slice(0, 8), text });
  }
}

if (prompts.length === 0) {
  console.log(`(no prompts since last commit at ${since.toISOString()})`);
  process.exit(0);
}

prompts.sort((a, b) => a.at - b.at);
console.log(`Prompts since last commit (${since.toISOString()}), oldest first:`);
let currentSession = null;
for (const { at, session, text } of prompts) {
  if (session !== currentSession) {
    console.log(`\n## session ${session}`);
    currentSession = session;
  }
  const clipped = text.length > MAX_PROMPT_CHARS ? `${text.slice(0, MAX_PROMPT_CHARS)} […clipped]` : text;
  console.log(`- [${at.toISOString().slice(0, 16)}] ${clipped.replace(/\n/g, "\n  ")}`);
}
