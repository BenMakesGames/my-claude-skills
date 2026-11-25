---
name: commit
description: Commit (and push, when asked) with intent-first messages that a reviewer can check the diff against. Use whenever the user asks to commit, including "commit & push".
---

A commit message is the durable record of **intent**: what the change was meant to do, and why. Once this session ends, a reader (someone running `git log`, or a reviewer checking the diff against its stated intent) has only the diff and the message. Write the message so that reader, with zero context, can judge whether the diff does what it claims.

## Steps

1. **Survey.** Run `git status`, `git diff`, `git diff --cached`, `git log -10 --oneline` (for the repo's subject style), and `node <this skill's directory>/recent-prompts.js`, which prints the user's prompts from every session since the last commit, including sessions before a `/clear`. Done when you can say why every changed file changed.
2. **Stage.** If the user already staged a subset, commit exactly that subset. Otherwise stage everything by path (`git add <paths>`), holding back files that look like secrets (`.env`, credentials, `settings.local.json`); tell the user what you held back.
3. **Split by intent.** One commit per intent. When the changes hold clearly separate intents (a bug fix plus an unrelated docs tweak), commit each group of files separately; files that mix intents stay in one commit.
4. **Write the message** (format below). Done when every behaviour change in the diff is covered by a line of the message, and every line of the message is backed by the diff.
5. **Commit**, passing the message via a heredoc so its formatting survives. Keep any trailer the harness or user instructions require.
6. **Push**, only when asked: `git push`, or `git push -u origin <branch>` when there's no upstream. On a rejected push, stop and report; force-pushing is the user's call.

## Message format

```
<subject: imperative, ≤72 chars, states the intent>

Why: <the problem or goal, in the user's terms>

- <one bullet per observable behaviour change>

Also: <deliberate changes beyond the goal, each with its reason>
Not done: <known gaps, follow-ups, behaviour intentionally left alone>
Verified: <what was actually run this session, or "untested">
```

- **Intent comes from the user's prompts**: what they asked for and decided, paraphrased, from `recent-prompts.js` plus the current conversation. It's the one thing the diff can't tell a reader. Later prompts supersede earlier ones ("undo that"), terse replies ("A primarily") take their meaning from the diff, and prompts that match nothing in the diff (another session working in the same repo) are ignored.
- **When the prompts don't explain the diff** (the script prints nothing useful, or changes were made outside Claude), ask the user for a one-line why before committing.
- **Behaviour over narration.** "Expired sessions now redirect to login" beats "update session handler". The diff already lists files; name one only when its location is the point.
- **Claims match the diff.** Describe what the code now does, never what was attempted or planned. `Verified:` names only commands that ran this session.
- **`Also:` turns scope creep into scope.** A refactor or rename made along the way, explained, reads as a decision rather than drift.
- **Omit empty sections.** A typo fix is a subject line alone.
- **Repo style wins for the subject.** If `git log` shows a convention (Conventional Commits, ticket prefixes), follow it; the body format still applies.

## Example

```
Let players cancel a queued craft

Why: players who queued the wrong recipe had to wait it out; asked for a cancel button that refunds materials.

- Queued crafts show a Cancel button; cancelling refunds all materials
- In-progress crafts can't be cancelled (button hidden)

Also: extracted RefundMaterials() from the existing failed-craft path so both refunds share one code path.
Not done: partial refunds for in-progress crafts.
Verified: `dotnet test` (all pass); cancelled a queued craft in the running app.
```
