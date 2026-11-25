This repo contains:

1. `CLAUDE.md` and `.gitattributes`, which I copy-paste into all new project roots.
2. Two skills:
   1. An auto-invoked `commit` skill that reminds the agent to record the *intent* of the changes in the commit's message in case, like me, you're in the habit of just asking Claude to "commit & push" with no additional context. (And in case, like me, you run `/clear` a lot, it also reads your recent conversation transcripts to get this context.)
   2. A `/two-lens-review` skill that reviews code for the two things that matter when *agents* write and maintain it: does it meet the business requirement, with a test that proves it? And will the next agent's change break something while every test stays green? A separate subagent takes each question, then every finding is verified against the code (by experiment, where possible) before being reported.
3. A custom "Open in Claude Code" right-click action for Windows Explorer; `.reg` file available in this repo: [add-open-in-claude-code.reg](./add-open-in-claude-code.reg).

Also worth checking out:

1. [WRITING-STYLES.md](./WRITING-STYLES.md) for some vocab that may help you tailor your agent's writing style to match you preferences.
2. My "IDE", [MiniIDE](https://github.com/BenMakesGames/MiniIDE), but not to use - you should make your own! Mine is optimized for _my_ workflows; _your_ workflows may be different.
3. [TortoiseGit](https://tortoisegit.org/) if, like me, you just love right-clicking on things in Windows Explorer.
