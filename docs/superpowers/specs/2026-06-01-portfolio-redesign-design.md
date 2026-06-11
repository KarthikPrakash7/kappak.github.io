# Portfolio Redesign — Design Spec

**Date:** 2026-06-01
**Owner:** Karthik Prakash
**Status:** Approved (pending spec review)

## Goal

Replace the current generic vanilla HTML/CSS/JS portfolio with a distinctive,
interactive single-page site. Design direction: **Terminal × Aurora** — an
"OSINT terminal meets AI lab" aesthetic. Navigation is **horizontal**: the
whole site is a deck of full-screen panels that slide left/right.

## Aesthetic

**Terminal × Aurora fusion:**

- **Base:** dark space gradient `radial-gradient(130% 90% at 15% -10%, #241653 0%, #0a0a16 60%, #06060d 100%)`.
- **Aurora orbs:** blurred radial glows in violet `#7c5cff` and cyan `#19d3da`, positioned per-panel, `filter: blur(60px)`, low opacity. Subtle drift animation.
- **Glass cards:** `rgba(255,255,255,0.05)` fill, `1px rgba(255,255,255,0.12)` border, `backdrop-filter: blur(10px)`, ~10px radius.
- **Terminal cues (monospace, JetBrains Mono):** shell prompts (`karthik@portfolio:~$`), command labels (`> view --work`), section counters (`02 / 08`), project indices (`> project_01`), green status dots `#5dffa0`, blinking cursor `▮`.
- **Type:** Inter for body/headings; JetBrains Mono for all terminal/data cues.
- **Headings:** gradient text `linear-gradient(92deg, #fff 30%, #9fd8ff)`.
- **Accent:** cyan `#6ee7ff` for active states, pills, focus rings.

## Tech Stack

- **React + Vite + TypeScript.**
- **Framer Motion** for panel slide/fade transitions and in-panel reveals.
- No backend. Builds to static assets; deployable on Netlify or GitHub Pages.
- Replaces the existing `index.html` / `styles.css` / `script.js` (those are
  removed once the Vite app is in place).

## Navigation — Horizontal Deck

The entire site is a horizontal deck. One full-screen panel is visible at a
time; navigating moves the deck left/right.

**Inputs (all map to next/prev):**

- `←` / `→` arrow keys.
- Mouse wheel / trackpad (debounced; one notch = one panel).
- Touch swipe (left/right).
- Clickable **dot rail** (jump to any panel).
- On-screen **← / → arrows**.

**Behavior:**

- Framer Motion slide + fade between panels.
- Top **progress bar** reflects position (panel index / total).
- Panel content that overflows the viewport scrolls **vertically inside the
  panel** without triggering a horizontal page change.
- Bounds enforced: no wrap past first/last (arrows disable at ends).
- Deep-linkable via hash (`#projects`) — optional, nice-to-have.
- **Mobile:** same horizontal model; larger touch targets; swipe primary input.

## Panels (8)

Blog section dropped. Order:

| Idx | Panel | Content |
|-----|-------|---------|
| 00 | Hero | Terminal-typing intro, name (gradient), role, short bio, CTAs (`Get in touch`, `$ view --work`). |
| 01 | About | Bio rewritten to AI/NLP/OSINT consultant; animated stat counters (5+ yrs, 30+ projects, 10+ tech). |
| 02 | Experience | KPMG, EXIN, TU Delft (TA), TU Delft (RA) as glass cards with tag pills. |
| 03 | Education | MSc CS TU Delft; BTech CS SRM. |
| 04 | Skills | devicon grid: Frontend / Backend / DevOps & Tools (keep existing icon set). |
| 05 | Projects | Glass cards with `> project_NN` index, tag pills, GitHub/Live links. |
| 06 | Hobbies | OSINT, Gaming, Reading, Astrophysics, Running, Climbing. |
| 07 | Contact | mailto button + LinkedIn/GitHub links + location. No form. |

## Content Rules

- Rewrite content to match Karthik's real profile: AI-enabled solutions, NLP,
  organizational ML, OSINT focus.
- **No invented metrics.** Drop fabricated lines from the current site (e.g.,
  "microservices serving 2M+ users", "mentored 4 junior developers",
  "CI/CD reducing deploy time 60%" at KPMG — these read as generic dev filler).
- Use real, known facts: EXIN RAG pipeline that generated exams (cost/efficiency
  win), TU Delft TA work (ML MOOCs, LLM/RAG teaching, ~200 students), TU Delft
  RA work (scraping, sentiment/topic/opinion mining, custom models).
- Projects: keep real ones (Reddit Scraper, Boulder-gram). Weather Dashboard /
  Portfolio CMS are placeholders — keep but mark links as TODO for Karthik to
  fill. Dead `#` links flagged, not silently shipped.
- Email: `theunreliablecoder@outlook.com`. Socials: LinkedIn + GitHub
  (URLs TODO — Karthik to provide; placeholder `#` flagged).

## Interactivity

- Hero: terminal-style typing animation for the prompt/intro line.
- Glass cards: hover lift + subtle glow; optional magnetic cursor pull.
- In-panel reveal: contents fade/slide up when a panel becomes active.
- Stat counters animate from 0 on the About panel's first view.
- Aurora orbs drift slowly.
- Respect `prefers-reduced-motion`: disable drift, typing, and large transitions.

## Component Structure

```
src/
  App.tsx                # deck controller: input handling, current index, bounds
  hooks/
    useDeck.ts           # { index, total, next, prev, goTo, canPrev, canNext }
    useReducedMotion.ts  # wrapper for prefers-reduced-motion
  components/
    Panel.tsx            # full-screen panel wrapper + enter/exit animation
    nav/
      DotRail.tsx
      Arrows.tsx
      ProgressBar.tsx
    ui/
      GlassCard.tsx
      Aurora.tsx         # the orb background
      TagPill.tsx
      TerminalLine.tsx   # prompt + typing
  panels/
    Hero.tsx
    About.tsx
    Experience.tsx
    Education.tsx
    Skills.tsx
    Projects.tsx
    Hobbies.tsx
    Contact.tsx
  data/
    profile.ts           # name, role, bio, stats, contact, socials
    experience.ts
    education.ts
    skills.ts
    projects.ts
    hobbies.ts
  styles/
    theme.css            # tokens: colors, gradients, glass, fonts
    global.css
  main.tsx
```

**Boundaries:**

- `useDeck` owns navigation state; panels are pure presentational and receive
  no nav logic. Input handlers (keyboard/wheel/swipe) live in `App` and call
  `useDeck` actions.
- All copy/links live in `data/*.ts` — one place to edit content, no text
  buried in JSX.
- `Aurora`, `GlassCard`, `TagPill`, `TerminalLine` are reusable across panels.

## Error / Edge Handling

- Wheel debounced so a single swipe doesn't skip multiple panels.
- Navigation bounded (no wrap); arrows/dots reflect disabled ends.
- `prefers-reduced-motion` honored.
- Keyboard focus management: dot rail and arrows are real buttons (a11y);
  panels reachable by keyboard.
- Inner-scroll vs panel-change: vertical overflow scrolls the panel; horizontal
  intent (arrow/swipe) changes panel.

## Testing

- `useDeck` unit tests: next/prev bounds, goTo clamping, canPrev/canNext.
- Wheel-debounce logic unit tested (one panel per gesture).
- Smoke render of each panel (no crash, key content present).
- Manual: keyboard, wheel, swipe, dot rail, reduced-motion, mobile width.

## Out of Scope

- Blog/CMS.
- Contact form backend (mailto only).
- Real project links for placeholder projects (Karthik fills later).
- Deployment pipeline (build is static; hosting choice deferred).
