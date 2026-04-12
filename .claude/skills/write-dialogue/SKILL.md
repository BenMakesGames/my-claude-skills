---
name: write-dialogue
description: Lead a collaborative dialogue-writing session for one Relationship Level (or Last Date) of a datable character, producing actual lines and stage directions from an existing beat sheet
argument-hint: <character name> <level number or "last-date">
---

# Dialogue Writing Session: $ARGUMENTS

You are leading a collaborative dialogue-writing session for a single Relationship Level (or Last Date tier) of a datable character. The goal is to produce polished, in-character dialogue and stage directions — the creative step between a beat sheet and JSON encoding — through a draft-and-review process with the user.

## Before You Start

1. **Parse the arguments.** The format is `<character name> <level>`, where `<level>` is a Relationship Level number (e.g., `0`, `3`) or `last-date` for a Last Date tier. If ambiguous, ask.
2. Read `docs/game-design.md` for mechanics context (especially dating/relationship mechanics, and any silent-protagonist rule).
3. Read `docs/glossary.md` for authoritative terminology.
4. Read `docs/vn-writing-guide.md` for narrative craft guidelines.
5. Read `docs/vn-dialogue-schema.md` for the JSON structure this dialogue will eventually become — understand the capabilities and constraints (expressions, animations, instructions, branching) so the dialogue you write is producible.
6. Read the character's design doc at `docs/characters/<name>/design.md` — especially the **Voice** and **Personality** sections.
7. Read the character's beat sheet at `docs/characters/<name>/beat-sheet-<N>.md` (where `<N>` is the target level number, or a descriptive suffix for Last Dates). Confirm the file exists. If it doesn't, stop and tell the user — dialogue can't be written without a beat sheet.
8. Read any existing dialogue files for this character in `docs/characters/<name>/` (files named `dialogue-*.md`) to understand tone and continuity from previously written levels.
9. If this is not Level 0, check that the previous level's dialogue exists. Writing levels out of order is fine, but flag it so the user is aware of continuity considerations.

## Understanding the Output

The dialogue file is **readable markdown** — not JSON. It will later be encoded into VN JSON by a separate process. The format uses interleaved spoken lines, player actions, and stage directions:

```markdown
[Alex appears -- neutral]
**Alex:** "Oh hey -- you must be new around here, right? I'm Alex."
*[Introduce yourself]*
**Alex:** "Wait, I've heard that name before -- small world. Anyway, welcome."
[Alex -- smile, bounce]
```

### Conventions

- **Stage directions** are in square brackets: `[Character appears -- expression]`, `[Character -- expression]`, `[Character -- animation]`, `[Character exits]`
- **Scene directions** use the same bracket convention for non-character staging: `[Background: rooftop garden]`, `[SFX: door chime]`, `[Music: ambient/calm]`, `[Transition: fade to black]`. Backgrounds and music are sticky (persist until changed). SFX are one-shot.
- **Character lines** are bold speaker name, colon, quoted text: `**Alex:** "Line here."`
- **Player actions** are italic square brackets: `*[Thank her]*`, `*[Agree to help]*`, `*[Ask about the transfer]*`
- **Section headers** use `###` for the four parts: `### Pre-Game`, `### Advanced`, `### Not Advanced`, `### Retry`
- Stage directions map to VN schema instructions: `appear`, `exit`, `expression`, `animate`. Use only capabilities the schema supports.

### The silent protagonist

The player character is a **silent protagonist**. Player-side beats are action descriptions — button labels the player clicks to continue — not spoken dialogue. The game never puts words in the player's mouth. The datable character carries the conversation; the player responds through chosen actions.

- Write player actions as brief, natural descriptions: `*[Thank her]*`, `*[Shrug]*`, `*[Ask what she means]*`
- The character should react to the implied action, not echo it back ("Thanks for saying that" is fine; "You said you'd help, so..." is too specific about what the player "said")

## Phase 1: Review the Beat Sheet

Read through the beat sheet for this level and confirm your understanding with the user. Call out:

- **The emotional arc** — what's the journey within this level?
- **Where the weight falls** — before or after the card game, or balanced?
- **Obvious asset needs** — the beat sheet establishes setting and mood. Identify backgrounds, SFX, music, or new expressions that will clearly be needed. Check `assets/` for what already exists. Flag new assets early so the user can start thinking about sourcing, but don't finalize the list yet — more will surface during drafting.
- **Anything you'd adjust** — sometimes a beat sheet gist suggests a line that doesn't quite land in the character's voice, or a transition feels abrupt. Flag it now rather than writing around it.

This phase should be brief. The beat sheet has already been collaboratively designed — you're confirming, not redesigning.

## Phase 2: Draft the Dialogue

Draft all four parts (or the single sequence for VN-only levels / Last Dates) in this order:

1. **Pre-Game** — the opening sequence. Ends naturally; the card game launches automatically when the sequence completes.
2. **Advanced** — the payoff after the card game. This is the most important section; spend the most care here.
3. **Not Advanced** — the lighter wrap-up. Should feel warm and natural, not like a consolation prize.
4. **Retry** — the abbreviated re-entry for repeat visits. Like Pre-Game, ends naturally.

Present the full draft to the user for review. The draft should be complete and polished — not placeholder gists, but actual lines you'd be happy to ship.

### Writing guidelines

- **Stay in voice.** The character's Voice section in their design doc is your primary guide. Reread it before drafting. Every line should sound like *this specific person*.
- **Respect the beat sheet.** Each beat in the sheet should be represented in the dialogue. You may split a beat across multiple lines or combine tightly related beats, but don't skip beats or invent major new ones without flagging it.
- **Show, don't tell.** Use expression changes and animations as emotional punctuation. A shift from `neutral` to `smile` *is* a narrative beat — don't also have the character say "that makes me happy."
- **Keep player actions sparse.** The character drives the scene. Player actions appear at natural response points — not after every line.
- **Follow the VN writing guide.** Don't justify the player's presence. Avoid stale time references. Apply all craft guidelines from `docs/vn-writing-guide.md`.
- **Not Advanced and Retry are proportional.** A few exchanges each. Don't over-invest in paths the player may see only once (Not Advanced) or many times (Retry — it must hold up on repetition without becoming annoying).
- **Only use documented expressions.** Check the character's Portraits section in their design doc. If you need an expression that doesn't exist, flag it as a new portrait requirement rather than using it silently.
- **Propose new expressions when they'd sell the scene.** During the beat sheet review (Phase 1), consider whether any moments in the scene would land significantly better with an expression not in the portrait table. If so, describe the expression and the moment it serves. Don't hold the draft hostage to the answer — write the draft with existing expressions either way, but note where the new expression would slot in if approved.
- **Use scene directions freely.** Write the scene you want — backgrounds, SFX, music, transitions. Don't self-censor because an asset doesn't exist yet. Prefer existing assets where they fit, but if the scene needs something new, use it and it'll be triaged after the draft.
- **Note new assets when you introduce them.** The first time you use an asset that doesn't exist in `assets/`, add a comment: `[Background: rooftop garden] <!-- NEW -->`. This makes the post-draft triage easy.

## Phase 2b: Asset Triage

After presenting the draft, list all assets the scene uses that don't currently exist in `assets/`. Group by type (backgrounds, SFX, music, portraits). For each, briefly describe what's needed and why. Example:

- **Background: rooftop garden** — warm, green, plants visible. Used in all sections of this level.
- **SFX: door chime** — gentle door notification sound. Used once in Pre-Game.

The user triages each: "yes," "that'll be hard — can we write around it?", etc. If an asset is cut, revise the draft to work without it before moving to Phase 3. Once the list is settled, the confirmed new assets carry forward to Phase 4.

## Phase 3: Iterate

The user will review the draft and request changes — specific line rewrites, tone adjustments, pacing tweaks, added or removed beats. Work through these collaboratively.

Common things to watch for:
- Lines that are too long (VN lines should be punchy — the renderer auto-paginates, but shorter is better)
- Character voice drift (especially in the Advanced section where emotions run high)
- Player actions that are too specific (putting words in the player's mouth) or too vague (meaningless button)
- Missing or misplaced stage directions
- Not Advanced feeling punishing or dismissive
- Retry feeling stale on imagined repeat viewings

## Phase 4: Write the Doc

Once the dialogue is finalized:

1. Write it to `docs/characters/<name>/dialogue-<N>.md` where `<N>` is the level number (e.g., `dialogue-0.md`, `dialogue-1.md`). For Last Dates, use a descriptive suffix (e.g., `dialogue-last-date-casual.md`, `dialogue-last-date-full.md`). Each level gets its own file — do not append multiple levels into one file.

2. Append confirmed new asset requests to `docs/asset-requests.md`. If the file doesn't exist, create it. Each entry is one line: what the asset is, and which scene needs it. Remove the `<!-- NEW -->` markers from the dialogue file — they've served their purpose.

### asset-requests.md format

```markdown
# Asset Requests

- **Background: rooftop garden** — warm, green, plants visible. For: Alex Level 1.
- **SFX: door chime** — gentle door notification. For: Alex Level 1.
```

Entries are removed from this file when the asset lands in the repo. Keep it simple — one line per asset.

### File format

```markdown
# Dialogue -- <Character Name>

**Character ID:** `<character_id>`
**Design doc:** `docs/characters/<name>/design.md`
**Beat sheet:** `docs/characters/<name>/beat-sheet-<N>.md`

---

## Level <N>: <Emotional Beat Name>

**Setting:** <Where this scene takes place>

### Pre-Game

<dialogue and stage directions>

### Advanced (Relationship Level <N> -> <N+1>)

<dialogue and stage directions>

### Not Advanced

<dialogue and stage directions>

### Retry

<dialogue and stage directions>

---
```

For VN-only levels, use a single `### Scene` section instead of the four-part structure.

For Last Dates:

```markdown
## Last Date -- <Tier Name> (Qualifying Levels: <levels>)

**Setting:** <Where this scene takes place>

### Scene

<dialogue and stage directions>
```

## General Guidelines

- **This is a draft-and-review process, not a design session.** The creative decisions are in the beat sheet. Your job is to bring them to life as dialogue. If something in the beat sheet doesn't work, flag it — don't silently rewrite the intent.
- **Use glossary terms.** If the user introduces a term not in the glossary, ask: did they mean an existing term, or is this a new concept to add?
- **Respect the character's voice.** This is the single most important quality of the output. A technically correct scene that sounds wrong is worse than a rough draft that nails the voice.
- **Respect the game's design pillars.** Refer to the game design doc for the project's core design pillars.
- **Capture system-level decisions.** If the session surfaces a mechanic or rule that applies to all characters (not just this one), offer to add it to the game design doc and/or glossary.
- **Flag new asset requirements.** Portraits, backgrounds, SFX, music — if the dialogue uses something that doesn't exist in `assets/`, it gets triaged in Phase 2b and tracked in `docs/asset-requests.md` if confirmed. Proactively propose new assets during Phase 1 if they'd meaningfully improve the scene.
- **One session, one level.** Stay focused on the level (or Last Date tier) being written. Reference other levels for continuity, but don't draft them.
