---
name: two-lens-review
description: Review code (a change, files, a folder, or a whole codebase) through two lenses in parallel sub-agents (Simplicity, Conventions), then cross-examine each lens's findings against the code through the other lens, and present one ranked list of findings and proposals.
disable-model-invocation: true
---

Two reviewers that disagree on purpose:

- **Simplicity** ([`lenses/simplicity.md`](lenses/simplicity.md), from Cursor's thermo-nuclear review): could this be dramatically simpler? Ignores project rules and goals; believes simpler is better.
- **Conventions** ([`lenses/conventions.md`](lenses/conventions.md), from Matt Pocock's code-review): does it follow this project's documented standards, and does it do what was intended?

Each runs in its own sub-agent so neither colours the other. Then you **cross-examine**: re-read the cited code and test every finding through the opposite lens, so a Simplicity proposal that breaks a project rule, or a Conventions fix that adds complexity, is caught before it reaches the user.

## 1. Pin the target

Review whatever the user asks for; git is optional. Turn the request into something concrete a sub-agent can read:

- **A change** → a diff command. A ref, branch, or "since X" → `git diff <ref>...HEAD` (three-dot: against the merge-base). "Uncommitted changes" → `git diff HEAD`, plus untracked files from `git ls-files --others --exclude-standard` (the diff omits them). "The previous commit", "today's commits", etc. → the matching ref range.
- **Existing code** (files, a folder, "the entire codebase", in a git repo or not) → the list of paths.
- **Nothing specified** → ask the user what to review.

Done when the target is concrete and non-empty: the ref resolves and the diff has content, or the paths exist. A bad target fails here, not inside two sub-agents.

## 2. Gather the intent sources

Collect every source that applies, each labelled:

- **Stated goal**: anything the user said when invoking (e.g. "goal: make X do Y", or a path to a file).
- **Commit messages**: when the target is a range of commits, `git log <range> --format='%h%n%B'`.
- **Recent prompts**: when the target includes uncommitted or never-committed work, `node <this skill's directory>/../commit/recent-prompts.js`, if that file exists. It prints the user's prompts since the last commit (or ever, outside a git repo), across `/clear`s.

With no sources at all (e.g. a whole-codebase review with no stated goal), the Intent axis has nothing to check against: tell the Conventions sub-agent to skip it and report "no intent available".

## 3. Spawn both lenses in parallel

Issue both sub-agent calls together, in the foreground. Each prompt contains:

- The target from step 1: the diff command (plus any untracked files), or the paths to review.
- The absolute path of its lens file, with: "Read this file and follow it as your review instructions."
- Conventions only: the labelled intent sources from step 2.
- "Perform this review yourself, directly. Do not invoke skills or spawn further agents."

## 4. Cross-examine

Read both lens files, then work through every finding from both reports:

1. **Verify.** Open the cited code. Correct a wrong location; drop a finding the code doesn't support, and note it under _Dropped_.
2. **Through the other lens.**
   - Simplicity finding → does its proposal break a documented standard, an existing convention, or the intent (e.g. a "code judo" rewrite that's out of scope)? Adjust it to fit, or keep it and mark it a **tradeoff**, naming the rule it bends.
   - Conventions finding → does its fix add indirection or concepts? Is there one restructuring that resolves it along with other findings? If so, fold them into one proposal.
3. **Merge.** Findings both lenses raised about the same code become one finding tagged with both lenses: the strongest signal in the review.

Done when every finding is verified against the code and has been read through the opposite lens.

## 5. Present

Lead with **Proposals**: restructurings that resolve several findings at once, each listing the findings it resolves. Then **Findings**, ranked:

1. **Blocker**: intent missing or wrong; a Simplicity presumptive blocker; a hard documented-standard violation.
2. **Should fix**: other Simplicity findings; Intent scope creep.
3. **Consider**: baseline smells and other judgement calls.

Each finding is one line plus its proposal: `path:line`, lens tag(s) (`[simplicity]`, `[standards: <file> › <rule>]`, `[intent: "<quoted line>"]`), the problem, the fix, and a **tradeoff** note where cross-examination found one. Lens tags stay visible on every finding, so a ranking never hides which lens raised what.

Close with _Dropped_ (one line each, with why) and a one-line verdict: blocker count and whether the code is ready.

Be direct, serious, and demanding about quality, without being rude. Prefer a smaller number of high-conviction findings over a long list of cosmetic notes.
