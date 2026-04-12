---
name: design-character
description: Lead a collaborative character design session for a datable character
argument-hint: <character name>
---

# Character Design Session: $ARGUMENTS

You are leading a collaborative character design session for a datable character. The goal is to produce a complete character design doc in `docs/characters/` through structured conversation with the user — not to fill it in unilaterally. At each phase, present your thinking and get confirmation before moving on.

## Before You Start

1. Read `docs/game-design.md` for the current state of the game design (setting, mechanics, pillars)
2. Read `docs/glossary.md` for authoritative terminology
3. Read all existing character design docs in `docs/characters/*/design.md` to understand the current roster, what niches are filled, and how other characters are designed
4. Read the character's data file in `data/characters/` if one exists (it may have placeholder values)
5. Check whether a design doc already exists for this character at `docs/characters/<name>/design.md`

## Phase 1: High Concept

Establish the character's core identity in one or two sentences. Work through these questions with the user:

- **Who is this character to the player?** What's the fantasy of dating them? (e.g., "the relationship with a known expiration date")
- **What thematic question does their arc explore?** (e.g., "What is a relationship worth if you know how it ends?")
- **How do they align with the game's design pillars?** (See game design doc — what does the player experience through this character's way of living?)

If the user has prior context about this character (from another game, earlier brainstorming, etc.), draw that out first and build from it.

## Phase 2: Role & Logistics

Nail down the practical details:

- **Role in the game world** — what's their job, position, or social role? Consider what fits their personality and what creates natural reasons for the player to encounter them.
- **Availability** — when does the player first meet them? Are they always available, or do they come and go? Check the game design doc for how character availability works in this project.

If the character holds a specialized role (military, academic, trade, etc.), research real-world equivalents to ensure plausibility.

## Phase 3: Personality

Build out the character's personality in layers:

- **Public self** — what the player sees in early Relationship Levels. First impressions, social behavior, how they come across.
- **Private self** — what emerges at deeper Relationship Levels. Hidden costs, vulnerabilities, the things they don't show readily.
- **Conflict style** — how they handle disagreement and stress. This informs VN dialogue significantly.

Present a draft and iterate with the user. These descriptions should be specific enough to write dialogue from — not just trait lists.

## Phase 4: Voice

Define how the character talks. This is critical — VN dialogue is how the player primarily experiences each character. Cover:

- **Register** — formal, casual, somewhere between?
- **Verbal habits** — recurring phrases, hedging patterns, how they structure sentences
- **Humor style** — what makes them laugh, how they joke
- **When serious** — how their speech changes when something matters
- **Under stress** — what comes out when they're not managing their presentation

Aim for descriptions concrete enough that someone writing VN dialogue could stay in-character from these notes alone.

## Phase 5: Relationship Arc

Map the emotional progression across Relationship Levels. Work through this with the user:

1. **Sketch the emotional shape first** — what's the journey from first meeting to final scene? Don't number levels yet; just get the beats right.
2. **Decide how many Relationship Levels** this character needs. Consider:
   - How long they're available (always present vs. late arrival vs. limited window)
   - The character's **per-level cooldown pools** — busier characters with longer cooldowns have fewer total dates available. Do the pacing math with this character's specific pools, not a global average.
   - The game's total timeline or play length (see game design doc)
   - Pacing relative to other characters in the roster
3. **Fill in each Relationship Level** with an emotional beat, a **cooldown pool**, and a short summary of what happens narratively. The cooldown pool should reflect the narrative moment — a date ending with excitement might use `[1, 1, 2]`, while one ending with "back to work" might use `[4, 5]`. The final Relationship Level has no cooldown pool (there's no next date to wait for).

Heart thresholds are 10 per level (flat, all characters). This is a decided design point — no need to discuss unless the user raises it. The value is stored per level in each character's data file, so per-character overrides are possible in code, but 10 is the standard.

## Phase 6: Gameplay Hook

Each character has a **gameplay hook** — a mechanic or twist that makes dating them feel distinct from other characters. This could be a modifier to the core gameplay, a unique mini-game element, or any mechanical change that reflects who they are.

Discuss with the user:
- What should dating this character **feel like** mechanically?
- How does the hook reflect their personality or thematic role?
- How does it contrast with other characters' hooks?

## Phase 7: Last Dates

Each character has **Last Date** tiers — farewell VN scenes that play at the end of the game, tiered by Relationship Level reached (see game design doc for details).

Work through with the user:
- **Which Relationship Levels get a farewell?** Not all need one. A character the player barely interacted with may have no farewell at all.
- **What does each tier feel like?** Low-investment farewells should be brief and proportional. High-investment farewells are the emotional payoff for the full arc.
- **Are any farewells gated beyond Relationship Level?** (e.g., requiring all dates completed, or tied to a specific narrative choice)

Last Dates are VN-only — no card game. They are narrative closure, not gameplay. Define qualifying Relationship Levels as an array per tier (e.g., `[1, 2]` for a casual goodbye, `[5]` for the full farewell).

## Phase 8: Write the Doc

Once all phases are complete, write the character design doc to `docs/characters/<name>/design.md` (creating the directory if needed). Follow the structure established by existing character design docs. Include:

- High Concept (with thematic question and design pillar alignment)
- Role in the Game World
- Personality (Public Self, Private Self, Conflict Style)
- Voice
- Availability (when the player meets them, and any departure/absence logic)
- Relationship Arc (table of levels with emotional beats and per-level cooldown pools)
- Last Dates (tiered farewell scenes with qualifying Relationship Levels)
- Gameplay Hook (what makes dating this character mechanically distinct)
- Portraits (placeholder table if no assets exist yet)
- Backstory / Prior Context (if applicable — not all characters will have this)
- Open Questions (anything deferred or unresolved)

Also update the character's data file in `data/characters/` if one exists, or note that one needs to be created.

## General Guidelines

- **This is a conversation, not a form.** Ask questions, propose ideas, react to the user's input. Don't just march through a checklist.
- **Use glossary terms.** If the user introduces a term not in the glossary, ask: did they mean an existing term, or is this a new concept to add?
- **Capture system-level decisions.** If the session surfaces a mechanic or rule that applies to all characters (not just this one), offer to add it to the game design doc and/or glossary. Do this as it comes up, not at the end.
- **Respect the game's design pillars.** Refer to the game design doc for the project's core design pillars. Push back gently if a character concept drifts away from what the game is trying to be.
- **One session can span multiple conversations.** If the session is interrupted, the doc-in-progress in `docs/characters/` preserves state.
