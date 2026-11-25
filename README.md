This repo contains:

1. `CLAUDE.md` and `.gitattributes`, which I copy-paste into all new project roots.
2. Two skills:
   1. An auto-invoked `commit` skill that reminds the agent to record the *intent* of the changes in the commit's message in case, like me, you're in the habit of just asking Claude to "commit & push" with no additional context. (And in case, like me, you run `/clear` a lot, it also reads your recent conversation transcripts to get this context.)
   2. A `/two-lens-review` skill that combines Cursor's opinionated, "simple is better" Thermo-nuclear Code Quality Review skill ([original skill, from their repo](https://github.com/cursor/plugins/blob/main/cursor-team-kit/skills/thermo-nuclear-code-quality-review/SKILL.md)) with Matt Pocock's less-opinionated, intent & convention-driven review skill ([original skill, from his repo](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md)) by running a modified version of each with separate subagents, then comparing their findings to one another and the codebase to produce a final list of findings and recommendation.
3. A custom "Open in Claude Code" right-click action for Windows Explorer; `.reg` file available in this repo: [add-open-in-claude-code.reg](./add-open-in-claude-code.reg).

Also worth checking out:

1. [WRITING-STYLES.md](./WRITING-STYLES.md) for some vocab that may help you tailor your agent's writing style to match you preferences.
2. My "IDE", [MiniIDE](https://github.com/BenMakesGames/MiniIDE), but not to use - you should make your own! Mine is optimized for _my_ workflows; _your_ workflows may be different.
3. [TortoiseGit](https://tortoisegit.org/) if, like me, you just love right-clicking on things in Windows Explorer.
