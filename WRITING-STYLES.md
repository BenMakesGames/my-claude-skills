> The majority of your interaction with a coding agent is likely by text, so writing style matters!
>
> While many of the terms below may only be relevant when writing books, blogs, and scripts, others are more broadly applicable. Read them, find the ones you do and don't want your agent using, and discuss it with them.
>
> I did not include any such section in this repo's `CLAUDE.md`, because:
>
> 1. your style preferences may be different from mine;
> 2. you may wish to store some or all of these preferences in different places (machine-wide memory, repo `CLAUDE.md`, `CLAUDE.local.md`, etc.)

# Terms for describing a writing style to an AI

Describe the style along a few named dials, then add a short sample passage that shows it. Adjectives like "gritty" or "lyrical" leave too much open. Named techniques work much better.

## 1. Sentences (called *syntax* and *prose density*)

| Term | What it means |
|---|---|
| **Lexical vs. informational density** | "Dense" is ambiguous, so say which kind you mean. Lexical density is the share of content words vs. filler words. Informational density is how much happens or gets conveyed per sentence. |
| **Sentence rhythm / cadence** | Variation in sentence length. To get it, give numbers: "mostly 8–15 words, an occasional fragment, one long sentence per paragraph at most." |
| **Cumulative vs. periodic** | The main point comes first and detail trails after it ("She left, coat half on, keys in her teeth") vs. the main point held back until the end. |
| **Parataxis vs. hypotaxis** | Clauses chained with "and" (Hemingway) vs. nested subordinate clauses (Henry James). |
| **Minimalist vs. maximalist** | Spare, with things left unsaid (Carver, McCarthy) vs. dense and digressive (Pynchon, Wallace). |
| **Window vs. stained-glass prose** | Brandon Sanderson's metaphor: prose you look *through* to the story vs. prose you look *at*. |
| **Purple prose** | The failure mode of overwrought writing. Name it when you're telling the agent what to avoid. |
| **Scene vs. summary** | Moments shown in real time vs. compressed telling. This sets the pacing. |

## 2. Vocabulary (called *diction*)

| Term | What it means |
|---|---|
| **Register** | How formal the language is: formal, neutral, colloquial or slangy. |
| **Latinate vs. Anglo-Saxon** | "Commence, illuminate" vs. "start, light up." Anglo-Saxon words read plainer and punchier. |
| **Concrete vs. abstract** | "Cracked mug" vs. "a sense of decay." |
| **Figurative density** | How often metaphors and similes appear, and which world they're drawn from (a sailor's metaphors differ from an accountant's). |

## 3. Dialogue

| Term | What it means |
|---|---|
| **Naturalistic vs. stylized** | Messy and realistic (interruptions, false starts, people talking past each other) vs. polished and quippy (Sorkin, Whedon). |
| **Subtext** | People don't say what they mean. |
| **On-the-nose dialogue** | The failure mode where characters say their feelings outright ("I'm angry because you left me"). AI tends to do this by default. |
| **Oblique dialogue** | Characters dodge questions and talk past each other. |
| **Disfluency** | False starts, interruptions, trailing off. Use it sparingly: real transcribed speech reads badly, and what you want is the *illusion* of speech. |
| **Phatic speech** | Talk that does social work rather than carrying information ("Hey." "Hey. You eat?"). |
| **"As you know, Bob"** | Characters explaining things to each other that they both already know, so the reader gets the exposition. |
| **Idiolect** | Each character's personal speech habits. |
| **Tags and beats** | Plain "said" vs. fancier verbs like "she quipped" (called *said-bookisms*), small actions placed between lines of dialogue, or no tags at all. |

## 4. Narrative voice

| Term | What it means |
|---|---|
| **POV** | First person, second person, third limited (inside one head), third omniscient (knows everything), or third objective (camera only, no thoughts). |
| **Psychic distance** | How close the narration sits to a character's mind, from "It was winter of 1853" to "Snow. God, he hated it." This is John Gardner's term. |
| **Free indirect discourse** | Third-person narration that takes on the character's own words and attitude: "He'd have to call her. Brilliant. Just brilliant." |
| **Narrator reliability** | Whether the narrator is trustworthy, or biased, lying or mistaken. |
| **Intrusive vs. invisible narrator** | A narrator who comments on the story ("Had she known, she might have stayed") vs. one who stays out of the way. |
| **Retrospective vs. immediate** | Telling events with hindsight vs. experiencing them as they happen. |
| **Tone vs. voice** | Tone is the attitude toward the material (wry, solemn). Voice is the personality doing the telling. |

## One moment, two styles

Plain diction, parataxis, close third, oblique dialogue:

> Dale held up the coffee can. Screws, mostly. He shook it and set it on the bench. "You want these?" "What would I do with those." "I don't know. Screws." She kept taping the box.

Elevated diction, hypotaxis, intrusive narrator, stylized dialogue:

> It was the coffee can that undid the afternoon's careful economy, for although Dale could not have said what he expected to find in it, he raised it to the window with the air of a man presenting evidence, and his sister, who had spent forty years declining to be impressed by him, did not look up. "Keep them," she said. "One of us ought to inherit something he actually loved."

## What works best with AI

1. **Name the dials** using the terms above.
2. **Include a 150–300 word sample passage** in the style you want. Examples beat descriptions.
3. **List things to avoid.** AI has habits you have to rule out by name: on-the-nose dialogue, tidy wrap-up sentences at the end of paragraphs, groups of three adjectives, characters explaining their feelings, constant em-dashes.
