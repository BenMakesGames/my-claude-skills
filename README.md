#### /architecture-retro

Claude will look over code & recently-completed tickets and build up a prioritized-list of pain-points & other tech debt.

After running this, it will often provide a numbered list of items; consider `/create-ticket item #5`, for example, to create tickets to address issues it found. If you agree with every issue, you could ask Claude to `use a subagent to create a ticket for every item you found; each subagent MUST use /create-ticket to create the ticket`

#### /create-ticket \<description of the ticket you'd like to create\>

Claude will look over code & ask clarifying questions about your request until it's confident in its understanding of the requirements, at which point it will create a ticket in your repository's `docs/tickets/` directory. It may recommend splitting the ticket, in which case it might produce multiple tickets.

If you've been chatting with Claude about a feature for a while, you could simply `/create-ticket to do what we just discussed` or even `/create-ticket ^`.

#### /design-character \<description of the character\>

Claude will lead a collaborative character design session for a datable character, working through eight phases: high concept, role & logistics, personality, voice, relationship arc, gameplay hook, last dates, and finally writing the doc.

Each phase is conversational — Claude will ask questions, riff on your ideas, and push back where needed rather than just filling in a template. The final output lands in `docs/characters/<name>/design.md`.

This is the first step in the character pipeline; once the design doc exists, you can move on to `/write-beat-sheet` and `/write-dialogue` for each relationship level.

#### /implement-ticket \<ticket description\>

Claude will look over the ticket & related code, ask any clarifying questions, then begin implementation.

Upon ticket completion, the ticket will be moved to a `docs/tickets/complete/`, and appended with learnings, problems encountered, and potential refactor opportunities it observed (to be later reviewed by the `/architecture-retro` and `/process-retro` skills).

#### /process-retro

Claude will perform a holistic review of documentation, skills, and process health across the project. It checks five areas: whether docs still match reality, cross-ticket synthesis of completed work for patterns and contradictions, over-specification (rules that constrain more than they guide), structural health of documentation organization, and gaps where tricky areas lack documentation.

The output is conversational with specific references - Claude explains why each finding matters and suggests actions, but you decide what to change.

Pairs well with `/architecture-retro`, which focuses on code; this one focuses on the process layer.

#### /write-beat-sheet \<name of character\> \<beat sheet number\>

Claude will lead a collaborative beat sheet session for a single Relationship Level (or Last Date) of a character. The beat sheet is the narrative blueprint that dialogue is later written from.

The session works through four phases: establishing the emotional intent of the level, drafting beats for each part (pre-game, not-advanced, retry, and advanced), reviewing the full loop for arc and continuity, then writing the doc to `docs/characters/<name>/beat-sheet-<N>.md`.

Each beat captures who's on stage, expression/animation cues, dialogue gist, and setting - enough structure for `/write-dialogue` to produce polished lines from. VN-only levels and Last Dates use a single continuous sequence rather than the four-part structure.

#### /write-dialogue \<name of character\> \<beat sheet number\>

Claude will lead a collaborative dialogue-writing session for a single Relationship Level (or Last Date), producing polished in-character lines and stage directions from an existing beat sheet. This is the creative step between beat sheet and final encoding.

The session works through four phases: reviewing the beat sheet for understanding, drafting complete dialogue for all parts (pre-game, advanced, not-advanced, retry), iterating on feedback (tone, pacing, voice, stage directions), then writing the doc to `docs/characters/<name>/dialogue-<N>.md`. New asset needs discovered during writing are triaged and appended to `docs/asset-requests.md`.

Key constraint: the player is a silent protagonist - player-side beats are action descriptions (button labels), not spoken dialogue.