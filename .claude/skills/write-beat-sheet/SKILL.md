---
name: write-beat-sheet
description: Lead a collaborative beat sheet session for one Relationship Level (or Last Date) of a datable character
argument-hint: <character name> <level number or "last-date">
---

# Beat Sheet Session: $ARGUMENTS

You are leading a collaborative beat sheet session for a single Relationship Level (or Last Date tier) of a datable character. The goal is to produce a complete beat sheet — the narrative blueprint from which VN dialogue JSON will later be written — through structured conversation with the user. At each phase, present your thinking and get confirmation before moving on.

## Before You Start

1. **Parse the arguments.** The format is `<character name> <level>`, where `<level>` is a Relationship Level number (e.g., `0`, `3`) or `last-date` for a Last Date tier. If ambiguous, ask.
2. Read `docs/game-design.md` for mechanics context (especially dating/relationship mechanics and endgame structure).
3. Read `docs/glossary.md` for authoritative terminology.
4. Read `docs/vn-dialogue-schema.md` for the JSON structure these beat sheets will eventually become.
5. Read `docs/vn-writing-guide.md` for narrative craft guidelines that apply to all VN content.
6. Read the character's design doc at `docs/characters/<name>/design.md`.
7. Read any existing beat sheet files for this character at `docs/characters/<name>/beat-sheet-*.md` to understand what's already been written for other levels.
8. Read any existing story JSON in `data/story/<character_id>/` to see what's already been scripted.
9. If this is not Level 0, check that the previous level's beat sheet exists — writing levels out of order is fine, but flag it so the user is aware of continuity considerations.

## Understanding the Structure

Each Relationship Level's beat sheet has **four parts**:

1. **Pre-game** — VN dialogue leading into the card game. This is the scene setup: where are the characters, what's happening, what's the emotional context. Ends with the card game trigger.
2. **Not-advanced** — the "not yet" branch. The player didn't accumulate enough Hearts to advance the Relationship Level. This should be warm but lightweight — a pleasant wrap-up, not a punishment. The player may see this zero or many times.
3. **Retry** — an abbreviated lead-in for subsequent visits at the same Relationship Level. Picks up naturally without repeating what the player already saw. Ends with the card game trigger. May be very short. The player may see this zero or many times. Follows naturally from "not advanced" — together they form the loop the player sits in until they advance.
4. **Advanced** — the "threshold reached" branch. The Relationship Level advances. This is where the emotional beat for this level lands — the real narrative payoff. Drafted last so the full non-advancing experience is established before writing the payoff.

**The pre-game and advanced sections can each be substantial or brief.** The card game is a beat *within* the scene, not necessarily the climax. Sometimes the story moment comes first and the card game is a wind-down; sometimes the card game builds up to the payoff. Let the story dictate where the weight falls.

**Not every level follows this structure.** Some levels may be VN-only (no card game) — for example, a farewell scene that triggers character departure. If the character's design doc indicates this, adapt accordingly: the beat sheet for a VN-only level is a single continuous sequence with no fork.

**Last Dates** are always VN-only — no card game, no branching. A Last Date beat sheet is a single sequence. Last Dates are tiered by qualifying Relationship Levels (see the character's design doc); the user specifies which tier they want to write.

## Phase 1: Context & Intent

Before writing beats, establish the emotional and narrative context for this level. Discuss with the user:

- **What's the setup?** Where does this scene take place? What brings the characters together? (For Level 0, this is the first meeting. For later levels, what's changed since last time?)
- **What should the player feel about this space?** If the setting is new or narratively significant, what's the mood or atmosphere? What matters about it for this scene? The beat sheet captures the intent (e.g., "this space is quiet and green, a contrast to everywhere else — it reflects why they like it here"); the dialogue skill handles how that's communicated through lines and staging.
- **What's the emotional beat?** The character design doc has a summary per level — unpack it. What specifically happens emotionally? What does the player learn or experience?
- **Where does the weight fall?** Is most of the narrative content before or after the card game? What role does the card game play in the scene's rhythm — is it a breather, a build-up, a turning point?
- **What's the "not yet" vibe?** If the player doesn't advance, how does the scene wind down? This should feel natural, not like failure.
- **What's the retry entry?** When the player comes back at the same level, what's the brief re-entry? A line or two that acknowledges continuity without repeating.

Draw on the character's voice, personality, and relationship arc from their design doc. If the user has ideas about specific moments or lines, capture them.

## Phase 2: Beat-by-Beat Drafting

Work through each of the four parts in order. For each part, draft a sequence of beats — not full dialogue, but the narrative and emotional content of each moment, plus stage directions.

Each beat in the sheet should include:

- **What happens narratively** — the action, revelation, or emotional shift. One or two sentences.
- **Who's on stage** — which characters are present, and any appear/exit transitions.
- **Expression and animation cues** — what expression each character has, and any animation triggers (bounce, shake, etc.). Note changes within the beat.
- **Speaker and gist** — who talks and the essence of what they say. Not final dialogue, but specific enough that a writer could draft from it. Example: "Alex deflects with humor — jokes about their job to avoid the compliment" rather than "Alex says something funny."
- **Setting establishment** — when a scene takes place in a new or narratively significant location, early beats should note what the player needs to experience about the space and why it matters. This is intent, not description — e.g., "the space feels unexpectedly alive compared to everywhere else the player has been" rather than prose about the lighting. The dialogue skill translates this into lines and staging.

Present each part's beats as a numbered list. Discuss and iterate with the user before moving to the next part.

### Part ordering

Draft in this order:

1. **Pre-game** — the shared opening, leading into the card game.
2. **Not-advanced** — the "not yet" wind-down. Draft this right after the pre-game so you establish the player's default loop first.
3. **Retry** — the abbreviated re-entry. Follows naturally from "not advanced" — together these two form the repeating experience.
4. **Advanced** — the payoff. Draft last so the full non-advancing experience is established; the advancement then feels like a meaningful departure from what the player has been living in.

For VN-only levels or Last Dates, draft a single continuous sequence.

## Phase 3: Review & Refine

Once all parts are drafted, review the full beat sheet as a whole:

- **Does the default loop feel right?** Read pre-game → not-advanced → retry as the experience a player sits in before advancing. Does it hold up on repeat?
- **Does the emotional arc land?** Read pre-game → advanced as the "golden path." Does the payoff feel earned after living in the loop?
- **Are the stage directions complete?** Every character on stage should have an expression. Transitions (appear/exit) should be explicit.
- **Voice check** — do the speaker gists match the character's voice as described in their design doc?
- **Continuity** — if previous levels have beat sheets, does this level flow from where the last one left off?

Iterate with the user on any issues.

## Phase 4: Write the Doc

Once the beat sheet is finalized, write it to `docs/characters/<name>/beat-sheet-<N>.md` where `<N>` is the level number (e.g., `beat-sheet-0.md`, `beat-sheet-1.md`). For Last Dates, use a descriptive suffix (e.g., `beat-sheet-last-date-casual.md`). Each level gets its own file — do not combine multiple levels into one file.

### File format

```markdown
# Beat Sheet — <Character Name>

**Character ID:** `<character_id>`
**Design doc:** `docs/characters/<name>/design.md`

---

## Level <N>: <Emotional Beat Name>

**Setting:** <Where this scene takes place>
**Weight:** <before-game / after-game / balanced>

### Pre-Game

1. <beat>
2. <beat>
...

### Not Advanced

1. <beat>
2. <beat>
...

### Retry

1. <beat>
2. <beat>
...

### Advanced (Relationship Level <N> → <N+1>)

1. <beat>
2. <beat>
...

---
```

For VN-only levels, use a single `### Scene` section instead of the four-part structure.

For Last Dates, use a separate section:

```markdown
## Last Date — <Tier Name> (Qualifying Levels: <levels>)

**Setting:** <Where this scene takes place>

### Scene

1. <beat>
2. <beat>
...
```

## General Guidelines

- **This is a conversation, not a form.** Propose ideas, react to the user's input, push back gently when something doesn't fit the character. Don't just march through a checklist.
- **Use glossary terms.** If the user introduces a term not in the glossary, ask: did they mean an existing term, or is this a new concept to add?
- **Respect the character's voice.** The beat sheet isn't dialogue, but the gists should be close enough that a writer could draft in-character from them. Reference the voice section of the character's design doc.
- **Respect the game's design pillars.** Refer to the game design doc for the project's core design pillars.
- **Capture system-level decisions.** If the session surfaces a mechanic or rule that applies to all characters (not just this one), offer to add it to the game design doc and/or glossary.
- **Stage directions matter.** Expression and animation cues are part of the beat sheet, not an afterthought. A character's expression changing mid-beat is a narrative beat in itself.
- **Keep "not advanced" and "retry" proportional.** These are supporting structures, not full scenes. A few beats each is usually right. Don't over-invest in paths the player may never see — but don't phone them in either.
- **One session, one level.** Stay focused on the level (or Last Date tier) being written. Reference other levels for continuity, but don't draft them.
