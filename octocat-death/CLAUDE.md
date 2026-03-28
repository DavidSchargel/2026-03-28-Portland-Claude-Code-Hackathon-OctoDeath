# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server on port 3000 (falls back to 3001 if occupied)
npm run build      # production build
npm run preview    # preview production build
npm run test       # run all tests with Vitest
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.ts
```

## Architecture

This is a **TanStack Start** (React SSR meta-framework) app that shows live GitHub status via Lottie animations.

**Routing:** File-based via TanStack Router. Drop a file in `src/routes/` and the route is registered automatically. `src/routeTree.gen.ts` is auto-generated on dev server start — never edit it manually. The root layout (`src/routes/__root.tsx`) uses `shellComponent` rather than `component` — that's the SSR shell pattern.

**Server functions:** Server-side logic lives in components via `createServerFn` from `@tanstack/react-start`, not in separate API route files. The GitHub status proxy in `src/components/GitHubStatus.tsx` uses this pattern to avoid CORS.

**Lottie:** `lottie-react` is loaded via `React.lazy()` with a `<Suspense>` boundary because it requires the DOM and breaks SSR if imported at the top level.

**Styling:** Mix of Tailwind utility classes (inline, from the base template) and plain CSS classes in `src/styles.css`. New feature styles (e.g. `.github-status`, `.toggle-btn`) are plain CSS at the bottom of that file. The site is light-mode only — dark mode variables and media queries have been removed from `src/styles.css`.

**Assets:** Lottie JSON files live in both `assets/` (original) and `src/assets/` (imported by the component). Only `src/assets/` is used at runtime.
