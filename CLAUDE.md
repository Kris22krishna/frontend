# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run lint      # ESLint check
npm run preview   # Preview production build
```

There is no test runner configured.

## Architecture Overview

This is a React 19 + Vite SPA — an e-learning platform ("skill100") covering K-12 maths and NEET exam prep.

### Entry & Routing

- **`src/main.jsx`** — bootstraps with `AuthProvider`, `HelmetProvider`, `Toaster`
- **`src/App.jsx`** — single flat `<Routes>` with 100+ routes; no nested route layouts except `WebsiteLayout` wrapping marketing pages
- **`src/layouts/WebsiteLayout.jsx`** — shell for non-practice pages

### Auth & Data

- **`src/contexts/AuthContext.jsx`** — provides `user`, `isAuthenticated`, `login()`, `logout()`, `checkAuth()`; reads `userId` from `sessionStorage`
- **`src/firebase.js`** — Firebase Auth + Firestore + Analytics (credentials via `VITE_FIREBASE_*` env vars)
- **`src/lib/supabaseClient.js`** — Supabase client (`VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`); used for session logging and skill progress
- **`src/services/api.js`** — REST calls to backend at `VITE_API_BASE_URL` (default `http://127.0.0.1:8000`)

### Practice Engine

Every practice module shares the same lifecycle via **`src/hooks/useSessionLogger.js`**:

1. `startSession({ nodeId, sessionType })` — generates UUID, records start time
2. `logAnswer({ question_index, answer_json, is_correct })` — writes to `v4_session_temp` (Supabase)
3. `finishSession({ totalQuestions, questionsAnswered, answersPayload })` — upserts `v4_sessions` and `v4_skill_progress`

Node IDs that map skills to curriculum nodes live in **`src/lib/curriculumIds.js`** (`NODE_IDS` export). Each skill component passes a `nodeId` from this map to `startSession`.

### Practice Module Pattern (class-3 flat-file style)

All Class 3 math chapters under `src/components/practice/class-3/<ChapterName>/` follow this structure — **Double-Century** is the canonical reference:

| File | Purpose |
|---|---|
| `index.js` | Re-exports all skill components + Test |
| `use<Ch>Logic.js` | Re-exports `useToyJoyLogic` (shared answer-state machine) |
| `<Ch>PracticeTemplate.jsx` | Timer, progress bar, submit/next flow, results screen |
| `<Ch>SharedComponents.jsx` | SVG visualisations, option buttons, story boxes, shuffle util |
| `<SkillName>.jsx` (×N) | `QUESTION_POOL` (10 Qs) → randomly pick 5; MCQ / TF / Match types |
| `<Ch>Test.jsx` | 10-question chapter assessment drawn from a larger pool |
| `<ch>.css` | Scoped CSS using `.<ch>-*` class prefix |

**Question pool pattern** inside each skill file:
```js
const QUESTION_POOL = [
  {
    id: 'unique_id',
    options: [['value','Display Text'], ...],   // shuffled at init for MCQ
    rightItems: [['val','label'], ...],          // shuffled at init for Match
    matchAnswers: { matchId: { leftId: rightVal, ... } },
    meta: { type: 'mcq'|'tf'|'match', qid, correct, correctLabel, explanation },
    render: (logicProps, ctx) => JSX,  // ctx = question obj with shuffledOpts/shuffledRight
  },
];
```

Component init (inside the skill's React component):
```js
const selRef = useRef(null);
if (!selRef.current) {
  selRef.current = shuffle([...QUESTION_POOL]).slice(0, 5).map(q => ({
    ...q,
    ...(q.options    && { shuffledOpts:  shuffle([...q.options])    }),
    ...(q.rightItems && { shuffledRight: shuffle([...q.rightItems]) }),
  }));
}
```

The logic hook (`useToyJoyLogic`) exposes: `handleMcq`, `handleTf`, `handleMatch`, `getMcqClass`, `getTfClass`, `getMatchClass`, `checkCurrentAnswer`, `isReadyToSubmit`, `resetState`.

### Styling

- **Tailwind CSS 3** with custom theme (HSL variables for mint/teal/purple/navy) — used for page-level layouts
- **Per-module CSS files** (e.g. `double-century.css`, `fun-with-shapes.css`) with a scoped prefix — used inside practice components
- Path alias `@/` → `src/`

### Key Libraries

| Library | Use |
|---|---|
| `framer-motion` | Animations inside practice cards |
| `react-katex` / KaTeX | Math expression rendering (`<LatexText>`) |
| `lucide-react` | Icons |
| `recharts` | Progress/stats charts |
| `react-hot-toast` | Notifications |
| `jspdf` | PDF export |
| Radix UI | Headless UI primitives (tabs, select, etc.) |
