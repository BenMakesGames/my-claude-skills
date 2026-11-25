---
name: two-lens-review
description: Review code (a change, files, a folder, or a whole codebase) for the two things that matter when agents write and maintain the code. Does it meet the business requirement, with a test that proves it? And will the next agent's change break something while every test stays green? Two independent sub-agents each take one lens, then you verify every finding against the code and present a short report that a reader who doesn't know the code can follow.
disable-model-invocation: true
---

## Why this review exists

Agents write and change this code; people care that the business requirements are met. So the code is judged by two
questions, not by how it reads to a human reviewer:

- **Requirement** ([`lenses/requirement.md`](lenses/requirement.md)): what does this change do for the business? Is
  that done? Does a test prove it at a boundary that a customer or caller actually uses?
- **Next change** ([`lenses/next-change.md`](lenses/next-change.md)): when an agent changes this area later, where will
  it go wrong while every test stays green?

Agents and people both make mistakes, and the author misses its own, so each lens runs in its own sub-agent. Neither
sees the author's reasoning or the other lens. You then check every finding against the code and keep only those with
a concrete consequence.

**Out of scope, unless it causes one of the problems above:** prose style, naming taste, file length, small
duplication, "public only for tests", and conventions that exist for human readers.

## 1. Pin the target

Review whatever the user asks for; git is optional. Turn the request into something concrete that a sub-agent can read:

- **A change** → a diff command. A ref, branch or "since X" → `git diff <base>...HEAD` (three dots: against the
  merge-base). Find the real base: a feature branch often comes off an integration branch rather than the main branch,
  so pick the remote branch that HEAD has the fewest commits on top of. "Uncommitted changes" → `git diff HEAD`, plus
  untracked files from `git ls-files --others --exclude-standard`.
- **Existing code** (files, a folder, "the entire codebase") → the list of paths.
- **Nothing specified** → ask the user what to review.

Done when the target is concrete and non-empty. Note who wrote it: when the user didn't write the change, the report
must not assume they know it.

## 2. Find where this project records intent

Projects keep intent in different places, and some keep little. Don't assume any one place. Look, and follow what
this project does. When the project's own instructions say where requirements live, go there first, and don't hunt
in places that the project doesn't use.

Check these, and use each one that has content:

- **Stated goal**: anything the user said when invoking.
- **Commit messages**: `git log <range> --format='%h%n%B'`. On some projects these are the main record, with long
  bodies.
- **Instruction and doc files near the code**: `CLAUDE.md`, `AGENTS.md` and `README` files at any depth along the
  changed paths (the nearest one is scoped to its directory), and a `docs/` folder.
- **Docs elsewhere that those files point to**: for example a sibling docs repository, or extra directories listed in
  the agent's settings.
- **A ticket**: a key in the branch name or commits (such as `ABC-123`) → fetch it through a connected tracker tool,
  if one is connected, with any spec it links. Keep its text verbatim.
- **Recent prompts**: for uncommitted work, `node <this skill's directory>/../commit/recent-prompts.js`, if that file
  exists.
- **The tests**: on a lightly documented project, test names and assertions are often the most exact record of the
  intended behaviour.

Pass the sources to the lenses, each labelled. Also list the places you looked that had nothing. Tickets often
prescribe implementation details: label those as prescribed design, because the requirement lens separates them from
the business requirement.

When the sources say little, the requirement lens infers the requirement from the code and its tests, and says that it
did. A thin requirement is itself worth one line in the report, because the next agent will have the same problem.

## 3. Spawn both lenses in parallel

Issue both sub-agent calls together, in the foreground. Each prompt contains:

- the target from step 1;
- the absolute path of its lens file, with "Read this file and follow it as your review instructions.";
- the labelled sources from step 2 (both lenses: the next-change lens needs them to guess the likely next change);
- facts you already checked, so the lens doesn't redo them;
- "Perform this review yourself, directly. Do not invoke skills or spawn further agents."

Don't pass your own opinion of the code. A lens that is handed a hypothesis tends to confirm it.

## 4. Verify

Read both lens files. Then, for every finding from both reports:

1. **Open the cited code.** Correct a wrong location. Drop a finding that the code doesn't support, and list it under
   *Dropped*.
2. **Name the consequence.** Finish this sentence concretely: "If this isn't fixed, ___ happens to ___." The subject is
   a customer (now) or the next agent (later). If you can't finish the sentence, drop the finding.
3. **Test the claim when you can.** Both lenses run on the same model as you, so their blind spots overlap with yours.
   Evidence from running code doesn't share them. When a finding claims that no test would catch a break, or that a
   test protects a requirement, check it by experiment:
   - Make the small break that the finding describes, run the tests that should catch it, and see whether they fail.
   - Work in a throwaway copy: a `git worktree`, or a copy of the project in the scratchpad. Never touch the user's
     working tree.
   - Find the test command where the project documents it: its instruction files, `package.json` scripts,
     `composer.json`, a `.sln` or `.csproj`, a `Makefile`. If the project already has a mutation-testing tool, you may
     use it on the changed lines.
   - Keep to the few findings that matter most. When the tests can't run here, skip the experiment and mark the finding
     as unproven.
4. **Check the fix.** A fix must not create a new trap: a new copy of a rule, or a test that pins internals. A fix that
   restructures code outside the change's scope becomes a **follow-up ticket**, not a fix in this change.
5. **Merge.** When both lenses flag the same code, make it one finding. That is the strongest signal in the review.

## 5. Present

Write for a reader who doesn't know the code and may not have written it. Use plain words and full sentences. Explain
every class or term the first time it appears, in a few words.

1. **What this change does**: two to four sentences in business terms. Who was affected by the problem, and what
   happens now. Then one line naming the sources that the requirement came from, or saying that it was inferred.
2. **Is the requirement met?** Yes, partly or no, and the test that proves each part. Say which parts of the ticket
   were design instructions rather than requirements, and whether the change departs from them. A departure is only a
   finding when it loses the requirement.
3. **Findings**, in three groups. Each finding starts with its consequence, then where (`path:line`), then the fix,
   with its lens tag (`[requirement]`, `[next change]`, or both). Mark a finding **proven** when an experiment in step 4
   confirmed it, and say what you broke and what didn't fail:
   - **Fix now**: the requirement is missed, or a customer is affected now.
   - **Fix before merge**: a silent-regression trap, where a likely next change breaks something and no test fails.
   - **Follow-up ticket**: real friction or a trap whose fix is out of this change's scope.
4. **Dropped**: one line each, with the reason.
5. **Verdict**: one line saying whether it's ready, and what blocks it.

Prefer three findings that matter over ten that don't. If nothing has a concrete consequence, say so and stop.
