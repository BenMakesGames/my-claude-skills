---
name: debug
description: >
  Entry-point router for bug investigations. Classifies the symptom and hands off to the right
  specialized debugging skill. Use when user reports any bug ("X is broken", "Y doesn't work",
  "this is wrong", "look into", "investigate", "figure out why", "debug"). Asks at most one
  disambiguating question if the symptom class is unclear, then invokes the matching child skill.
  Cross-project; no codebase-specific assumptions.
---

# debug

Triage skill. Read the user's symptom, classify it, hand off to the specialized child skill that owns that bug class. Do not perform the investigation here — the child skill carries the methodology, anti-patterns, and report shape.

## Classification

| Symptom shape | Class | Child skill |
|---|---|---|
| Operation blocked / button does nothing / throws / returns error / "can't do X" / "X doesn't work" | rejection | **find-the-gate** |
| Operation completes but result is wrong / "shows Y, should be Z" / off by N / wrong sort / stale data / wrong record | wrong-value | **find-the-producer** |
| Anything else (slow, memory leak, race, integration mismatch, intermittent, missing-feature) | unmatched | (no specialized skill — hand back to normal investigation) |

## Disambiguation

When the symptom is unambiguous, invoke the child skill silently (no question). Examples:
- "throws NullReferenceException" → find-the-gate
- "total shows 47, expected 48" → find-the-producer

When the symptom is ambiguous (common with terse reports like "X is broken" or "Y is wrong"), ask exactly one question:

> Quick triage: is the operation **blocked** (button does nothing, throws, returns an error), or does it **complete with the wrong result** (value shown is incorrect, sort order is off, stale data)?

Then invoke the matching child. Do not ask multiple questions; the child skill has its own probing section for deeper questions once it owns the investigation.

## Unmatched symptoms

If neither class fits (performance, race, leak, integration mismatch, anything else), say so plainly:

> No specialized skill for this bug class yet. Proceeding with general investigation.

Then debug normally without invoking a child skill. Do not invent methodology here; do not pad with generic advice.

## Anti-patterns

- **Performing the investigation in the router.** Router classifies and hands off. Methodology lives in children.
- **Asking more than one question to disambiguate.** Triage is one question, not a questionnaire. The child handles deeper probing.
- **Forcing a fit when none exists.** A perf bug is not a wrong-value bug. Hand back honestly.
- **Skipping the handoff when the class is clear.** If symptom is unambiguous, invoke the child immediately — do not ask "shall I use find-the-gate?". Just use it.
