# PocketSmart AI — Implementation Plan

## Product scope

PocketSmart AI is a complete responsive smart-budget web application that guides users through home interior, party, and jewelry planning, then presents personalized cross-platform recommendations in a trustworthy modern fintech/productivity experience. It works end to end with validated forms, polished interaction states, and deterministic demo recommendations while remaining modular for later Gemini multimodal and third-party product API integrations.

## Implementation approach

- **Frontend:** React + TypeScript + Tailwind-compatible CSS in the existing web-db-user starter.
- **Navigation:** wouter routes for `/`, `/planner/:type`, `/dashboard`, `/login`, `/register`, `/history`; deep links remain available through the SPA fallback.
- **Authentication:** preserve the starter’s Manus OAuth session flow. Login/register surfaces use the real `startLogin()` action; public planners remain usable before login, while dashboard/history clearly reflect logged-out state rather than inventing a user.
- **Recommendation engine:** deterministic client-side service module with typed input/output models for `home`, `party`, and `jewelry`. It provides realistic marketplace/vendor-inspired demo recommendations, budget allocations, rationales, budget-fit labels, and future integration seams for Gemini and external APIs.
- **Persistence-ready architecture:** keep the existing server, tRPC, database and auth wiring intact; add typed client-side saved-query/history state with a clean boundary so a database-backed router can replace the local fallback later without changing the UI contract.
- **Backend:** retain the starter health endpoint and OAuth/tRPC transport. The UI is intentionally usable without third-party keys; no secret provider key is embedded in client code.
- **Route manifest:** add `public/manus-routes.json` with all page routes.

## Visual/design system

- **Design movement:** editorial fintech — the calm precision of a premium financial dashboard softened by warm, human planning moments.
- **Core principles:** (1) budget clarity before decoration, (2) one focused decision per surface, (3) warm trust instead of sterile finance UI, (4) dense insight with generous breathing room.
- **Color philosophy:** a deep ink/navy canvas communicates focus and reliability; orchid-violet is the ownable intelligence signal; mint and saffron are used sparingly for savings and planning accents; off-white surfaces keep long forms comfortable.
- **Layout paradigm:** a split-canvas composition: a narrative rail and compact planner navigation sit beside modular surfaces. The home page uses a left editorial column and right “budget pulse” panel rather than a centered card grid.
- **Signature elements:** the orchid “spark” mark, thin route-line dividers, and pill-shaped budget-fit indicators with micro-progress bars.
- **Interaction philosophy:** every action responds with visible status — budget totals recalculate, planner steps change context, results arrive with a quiet reveal, and save/favorite actions remain reversible.
- **Animation:** short 180–320ms ease-out transitions; gentle staggered entry for result cards; no looping motion except a small ambient pulse around the logo spark; respect reduced-motion preferences.
- **Typography:** use `Inter` for UI/data and `DM Serif Display` for editorial headlines via Google Fonts import. Strong scale contrast: 12px meta, 14px labels, 18–22px card heads, 52–72px hero display.
- **Brand essence:** “A calmer way to make smart, beautiful choices with your budget.” Personality: considered, encouraging, quietly clever.
- **Brand voice:** headlines are direct and optimistic; CTAs are active and specific. Example lines: “Give every rupee a job.” / “Build a plan that feels like you.”
- **Wordmark & logo:** compact spark-bracket mark made from two offset rounded strokes around a dot, paired with a lowercase `pocketsmart` wordmark.
- **Signature brand color:** Orchid Violet `#8B5CF6`.

## Project structure

- `client/src/App.tsx` — route shell, navigation, planner screens, dashboard, auth surfaces.
- `client/src/index.css` — design tokens, responsive layout, cards, form controls, motion.
- `client/src/lib/recommendations.ts` — typed deterministic recommendation engine and planner fixtures.
- `client/src/lib/trpc.ts`, `client/src/_core/hooks/useAuth.ts` — existing auth transport and session hook.
- `server/` — existing health, OAuth, tRPC and database infrastructure preserved for future persistence/API integration.
- `public/manus-routes.json` — complete page route manifest.
- `TODO.md` — acceptance outcomes from the project brief.

## Material constraints

- No external AI or marketplace API keys are assumed, so demo mode must feel complete without them.
- Optional jewelry image upload is handled as a local preview for the current planning session.
- The interface must work at mobile widths and expose validation, loading, success, empty and logged-out states.
