---
name: find-the-producer
description: >
  Methodology for wrong-value bugs — the operation completes but the result is wrong: shows Y instead
  of Z, off by N, wrong sort order, stale data, wrong record. Locate the code that produced the wrong
  value, then trace its inputs backward. Normally invoked by the `debug` router; invoke directly only
  when the symptom is already known to be a wrong value. Default output is findings + ranked
  approaches with tradeoffs — no code changes unless asked. Cross-project; no codebase-specific
  assumptions. Companion to find-the-gate (which covers rejection bugs).
---

# find-the-producer

The fastest way to find a wrong-value bug is to locate the producer — the assignment, return, or render call that emitted the wrong value — then trace its inputs backward. Theorizing about transformations before reading the producer wastes time. This skill is the catalog of moves that work for wrong-value bugs, and the anti-patterns that waste time.

Wrong-value bugs are the complement of rejection bugs (see find-the-gate). Nothing said no, the operation completed, but the result is wrong: math off, sort unstable, stale cache, off-by-one, wrong locale format, wrong record returned, wrong sprite drawn. Use this skill when the symptom is "value should be X, is Y" — not "operation was blocked".

## Core moves

1. **Producer-first.** Start at the observation point (UI element, log line, returned value, persisted record) and read backward to the assignment that wrote the wrong value. Walk the data flow; do not theorize before locating the producer. The bug is rarely far from where the value is set.

2. **Diff the shape of the error.** Get the exact wrong value and the exact expected value. The shape names the bug class: off-by-one (loop bound, inclusive/exclusive boundary), sign flipped (operand order), factor-of-N (unit / base mismatch — bytes vs KB, percent vs basis-point), comma where decimal expected (locale / culture-aware format), null/zero/empty (uninitialized, missing branch, default-instead-of-real), stable-but-stale (cache, memoization, snapshot). Knowing the class focuses the search.

3. **Tests as oracles.** Tests asserting on computed values name the correct value. A failing test's expected vs. actual is the diff for free. Grep tests in the producing module before hand-simulating math.

4. **Suspect transformations at boundaries.** Bugs cluster where values cross a representation boundary: string ↔ number, int ↔ float, locale-aware ↔ invariant format, time-zone, encoding, unit conversion, currency, serialization, ORM hydration. Each transform is a candidate corruption site. Read the boundary code, not the interior.

5. **Baseline-as-reference.** If the value is right for input A and wrong for input B, what differs about B? Find the branch (cast, special case, formatter override, type-specific handler) that handles B's path differently. Inverted form of find-the-gate's baseline move — applied to value-mutating branches instead of rejecting branches.

6. **Hand-simulate forward to falsify.** Once a producer is suspected, run 2–3 inputs through it on paper. If your simulation gives the right answer but the code gives the wrong one, your model of the code is wrong — re-read. Do not assume the code is doing what you think it does.

7. **Reframe wrong-value ↔ stale-value.** If the producer logic looks correct, suspect its *inputs* are stale rather than its math is wrong. Cache miss-treated-as-hit, memoization key collision, snapshot read after write, event handler firing on old captured state, derived value not invalidated when source changed. The producer is innocent; the source is rotten. Same diff in code may have very different fixes depending on which framing is true.

## Probing user reports

User reports are observations, not diagnoses. Trust the symptom (the value they saw). Probe the variable they think causes it.

When the report's named cause doesn't match what the code suggests should matter — or when you've spent more than ~5 minutes investigating without traction — pause and probe:

- **Get the exact values**: "What did it show? What should it have shown?" The diff names the bug class. Without exact values, you're searching blind.
- **Scope the wrongness**: "Always wrong, or only for [counter-example category]? Specific inputs / certain modes / fresh state / after a particular action?" Tightens the search to the offending branch.
- **Computed or stored?**: "Is this value calculated each time, or read from somewhere?" Splits investigation between math/transform bugs and persistence/cache/sync bugs — very different first moves.
- **When did it last show the right value?**: Surfaces a regression window for `git bisect` if the producer is hard to find by reading.
- **Don't ask "are you sure?"** Adversarial, returns nothing. Ask for additional data points instead.

When NOT to probe: cheap investigations (one grep solves it), tight scope where the search space is already small, or when the user already volunteered the relevant counter-example.

## Anti-patterns

- **Theorizing before reading the producer.** "I think it's a rounding issue…" investigations spiral. Find the actual write site first, then look at what its inputs were.
- **Searching forward from inputs.** Easy to chase data through five layers of transformation and miss the one that mutates it. Start at the observation, walk back. The path narrows as you approach the producer; the forward path fans out.
- **Ignoring the error shape.** "Wrong number" is not a class. "Off by 100" is — points at percent/basis-point confusion. "Negative when should be positive" is — points at operand order. Skipping this step throws away free signal.
- **Hand-simulating before searching tests.** Existing tests often assert the correct value verbatim. Minutes saved.
- **Confusing wrong-value with stale-value.** Spending hours re-deriving correct math when the producer is fine and a cache key is wrong. If producer logic checks out under hand-simulation, look at inputs / invalidation, not at the producer again.
- **Trusting the displayed value as the produced value.** The render layer can format, truncate, round, or localize. Confirm what was *produced* (log it, inspect it) is what was *displayed* before assuming the producer is wrong.
- **Polite throat-clearing ("let me carefully analyze…", "this is a great question…").** Strip. State results and decisions directly.

## Report shape

Default investigation output (when user says "no code changes" or "just look into it"):

1. **Findings** — what the producer is, where it lives, why it emits the wrong value in this case. Cite the file + symbol (not line number — line numbers rot). Include the error shape (off-by-one / wrong unit / stale source / etc.) — naming the class often makes the fix obvious.
2. **Hypothesis check** — the cause the user named vs. the cause the code points at. Note any conflict explicitly.
3. **Approaches** — 2–3 ranked options with tradeoffs (one-line each: what changes, what it costs). Recommend one and say why.
4. **Caveats** — what the recommended approach changes about adjacent values (other call sites of the same producer, cached snapshots that need invalidation, downstream computations, persisted data already written with the wrong value) that the user might want to weigh.

No code unless asked. The investigation is the deliverable.
