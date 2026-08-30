---
name: find-the-gate
description: >
  Methodology for rejection bugs — the operation is blocked: button does nothing, throws, returns an
  error, "can't do X", "X doesn't work". Locate the predicate that rejected the operation, then work
  outward from it. Normally invoked by the `debug` router; invoke directly only when the symptom is
  already known to be a rejection. Default output is findings + ranked approaches with tradeoffs — no
  code changes unless asked. Cross-project; no codebase-specific assumptions.
---

# find-the-gate

The fastest way to find a bug is to find the gate that said no, then ask why it said no. Caller code, orchestration, and clever tracing rarely beat reading the predicate that rejected the operation. This skill is the catalog of moves that work, and the anti-patterns that waste time.

## Core moves

1. **Predicate-first.** Failure lives in the gate that returned `false` / `null` / `error`. Trace from the action (the verb the user couldn't do) to the predicate (the `if` / `return` / `throw` that stopped it) before reading any caller code. The bug is rarely in the orchestration.

2. **Suspect asymmetric branches.** Carve-outs (`if X return; else continue;` with one branch doing the opposite of the other; flags / guards added later in a method's life) flag author hesitation. Bugs cluster there. Read the comment above; read the commit that introduced it.

3. **Tests as oracles.** Named tests in the failing area often state the bug verbatim. `PieceCannotRotateThroughCeiling`, `RejectsExpiredToken`, `IgnoresMalformedHeader` — the test name *is* the spec. Grep test names before hand-simulating behavior.

4. **Read the artifact that introduced the code.** Completed tickets, PR descriptions, commit messages, design docs. They explain *why* the weird shape exists. Free context, no inference. Especially valuable when a feature added a constraint the bug now exposes.

5. **Baseline-as-reference.** If X works in mode A and fails in mode B, mode B *added* something. Find the addition. Ask whether removal is the fix — often cleaner than another addition. Reframe-as-deletion catches over-restrictions that were drawn too wide.

6. **Hand-simulate to falsify, not confirm.** Work the math / state on 2–3 representative cases trying to break your current hypothesis. Confirmation bias eats investigations. If you can't construct a counter-example, you're more likely to be missing one than to have proven the hypothesis.

7. **Reframe addition ↔ removal.** Same diff, different mental model. Pick the framing that's truer ("remove the over-restriction" vs. "add permissiveness"). The truer framing makes review, docs, and commit messages sharper — and sometimes reveals that the change is smaller than it first appeared.

## Probing user reports

User reports are observations, not diagnoses. Trust the symptom (what they saw). Probe the cause (what they think caused it). The user pattern-matches on visible variables; the real correlate may be invisible to them.

When the report's *variable* doesn't match what the code says should matter — or when you've spent more than ~5 minutes investigating without traction — pause and probe:

- **Scope the report**: "Have you seen this with [counter-example category]? Other inputs / fresh state / different mode?" Checks whether the user's named variable is the actual variable.
- **Pin the state**: "What mode / config / context was active?" Surfaces hidden correlates.
- **Walk a repro from cold**: "From a fresh launch, what's the shortest path to reproduce?" Strips false attribution rooted in earlier session noise.
- **Don't ask "are you sure?"** Adversarial, returns nothing. Ask for additional data points instead.

When NOT to probe: cheap investigations (one grep solves it), tight scope where the search space is already small, or when the user has already volunteered the relevant counter-example. Probe when the cost of going down the wrong path is high.

## Anti-patterns

- **Proposing code before the gate is found.** "I think it might be…" investigations spiral. Find the actual constraint first.
- **Hand-simulating before searching tests.** Existing test names often name the bug verbatim. Minutes saved.
- **Generating a new mental model when an existing artifact already names the thing.** The ticket / commit / comment is usually clearer than your inference.
- **Ignoring conflict between user testimony and your reading.** Conflict is a signal, not noise. Resolve it (probe, re-read, falsify) before continuing.
- **Spending >5 minutes without probing on a noticed conflict.** Cost of a question is low; cost of wrong-path investigation compounds.
- **Polite throat-clearing ("let me carefully analyze…", "this is a great question…").** Strip. State results and decisions directly.

## Report shape

Default investigation output (when user says "no code changes" or "just look into it"):

1. **Findings** — what the gate is, where it lives, why it rejects in this case. Cite the file + symbol (not line number — line numbers rot).
2. **Hypothesis check** — the variable the user named vs. the variable the code actually keys on. Note any conflict explicitly.
3. **Approaches** — 2–3 ranked options with tradeoffs (one-line each: what changes, what it costs). Recommend one and say why.
4. **Caveats** — what the recommended approach changes about adjacent behavior (rendering, persistence, balance) that the user might want to weigh.

No code unless asked. The investigation is the deliverable.
