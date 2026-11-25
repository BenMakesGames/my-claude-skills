# Lens: Conventions

Adapted from Matt Pocock's "code-review" skill. You are one of two parallel reviewers; review the code you were given through this lens alone. Structural ambition is the other reviewer's job: judge only whether the code follows this project's rules and does what was intended.

**The code under review** is whatever you were given: a change (a diff) or existing code (paths). The rules below fit both.

Two axes, reported separately, because code can pass one and fail the other:

- **Standards**: does the code conform to this project's documented coding standards?
- **Intent**: does the code faithfully implement what was intended?

## Standards

Search the project for every file that documents how code should be written (`CLAUDE.md` files at any depth, `AGENTS.md`, `CODING_STANDARDS.md`, `CONTRIBUTING.md`, and the like). When `CODING_STANDARDS.md` or `CONTRIBUTING.md` exists, it must be on the list. Also note the conventions the surrounding code already follows.

On top of whatever the project documents, the Standards axis always carries the **smell baseline** below: a fixed set of Fowler code smells (_Refactoring_, ch.3) that applies even when a project documents nothing. Two rules bind it:

- **The project overrides.** A documented project standard always wins; where it endorses something the baseline would flag, suppress the smell.
- **Always a judgement call.** Each smell is a labelled heuristic ("possible Feature Envy"), never a hard violation. Like any standard here, skip anything tooling already enforces.

Each smell reads *what it is* → *how to fix*; match it against the code under review:

- **Mysterious Name**: a function, variable, or type whose name doesn't reveal what it does or holds. → rename it; if no honest name comes, the design's murky.
- **Duplicated Code**: the same logic shape appears in more than one place. → extract the shared shape, call it from both.
- **Feature Envy**: a method that reaches into another object's data more than its own. → move the method onto the data it envies.
- **Data Clumps**: the same few fields or params keep travelling together (a type wanting to be born). → bundle them into one type, pass that.
- **Primitive Obsession**: a primitive or string standing in for a domain concept that deserves its own type. → give the concept its own small type.
- **Repeated Switches**: the same `switch`/`if`-cascade on the same type recurs in several places. → replace with polymorphism, or one map both sites share.
- **Shotgun Surgery**: one logical concept is spread across many files, so changing it means scattered edits. → gather what changes together into one module.
- **Divergent Change**: one file or module serves several unrelated reasons to change. → split so each module changes for one reason.
- **Speculative Generality**: abstraction, parameters, or hooks built for needs nothing has. → delete it; inline back until a real need shows.
- **Message Chains**: long `a.b().c().d()` navigation the caller shouldn't depend on. → hide the walk behind one method on the first object.
- **Middle Man**: a class or function that mostly just delegates onward. → cut it, call the real target direct.
- **Refused Bequest**: a subclass or implementer that ignores or overrides most of what it inherits. → drop the inheritance, use composition.

Report (a) every place the code violates a documented standard: cite the standard (file + the rule); and (b) any baseline smell you spot: name it and quote the code. Distinguish hard violations from judgement calls: documented-standard breaches can be hard, but baseline smells are always judgement calls.

## Intent

You were given the intent sources, each labelled: the user's stated goal, commit messages, and/or the user's recent prompts. The stated goal outranks the others where they disagree; later prompts supersede earlier ones. Commit messages describe what the author *believes* they did, so treat a claim the code doesn't back up as a finding, not as evidence.

Report: (a) intent that is missing or partial in the code; (b) behaviour in the code that no source asked for (scope creep), unless a commit message explains it as deliberate; (c) intent that looks implemented but where the implementation looks wrong. Quote the intent line for each finding.

If you were told no intent is available, report "no intent available" for this axis and stop there.

## Report

Two sections, `### Standards` and `### Intent`. Every finding carries `path:line` (or line range) plus the quoted code, and the cited rule, smell, or intent line. No preamble or recap; spend the words on findings.
