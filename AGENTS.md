# AGENTS.md

## Setup

- **Package manager:** pnpm (v11). Do not use npm/yarn.
- **Node:** 24.15.0 (see `.nvmrc`).
- **Install:** `pnpm install` (esbuild allowed via `pnpm-workspace.yaml`).

## Commands

| Command              | What it does                                                     |
| -------------------- | ---------------------------------------------------------------- |
| `pnpm dev`           | Start Vite dev server                                            |
| `pnpm build`         | `tsc -b && vite build` (typecheck via project refs, then bundle) |
| `pnpm preview`       | Preview production build                                         |
| `pnpm test`          | Vitest (watch mode)                                              |
| `pnpm test:coverage` | Vitest run with v8 coverage                                      |
| `pnpm test:ui`       | Vitest UI mode                                                   |
| `pnpm check`         | `format:check` → `lint:js:check` → `test:coverage` (CI gate)     |
| `pnpm format:fix`    | Prettier write                                                   |
| `pnpm lint:js:fix`   | ESLint fix                                                       |

## Project structure

- `src/main.tsx` — entrypoint (excluded from coverage).
- `src/__tests__/` — colocated test files.
- No CI workflows configured.

## TypeScript

- **Project references** — `tsconfig.json` references `tsconfig.app.json` (app code under `src/`) and `tsconfig.node.json` (config files). `tsc -b` builds both.
- **`verbatimModuleSyntax: true`** — use `import type` for type-only imports or you get a TS error.
- **`noUnusedLocals` / `noUnusedParameters`** — prefix unused identifiers with `_`.

## ESLint

- Flat config (`eslint.config.js`).
- **`@typescript-eslint/no-explicit-any` is an error** — annotate types instead.
- Unused vars error, except when prefixed with `_`.

## Prettier

- 4-space tabs, single quotes, trailing commas, 120 print width.
- **Import sorting** (`@trivago/prettier-plugin-sort-imports`): css/scss → `react/*` → `@/*` → relative imports, separated by blank lines.

## Testing

- Vitest with **jsdom** environment, globals enabled (no import needed for `describe`, `test`, `expect`).
- After each test: `@testing-library/react` `cleanup()` runs automatically.
- Mocks are reset between tests (`clearMocks`, `mockReset`, `restoreMocks` all true).
- Coverage excludes: `dist/`, `coverage/`, `node_modules/`, `**/index.ts`, `**/main.tsx`, `**/__mocks__/**`.
- Path alias `@app` → `src/app` configured in `vitest.config.ts` **but not in `tsconfig.app.json`** — TS will complain at dev time; use only in test files or add to tsconfig.

## Important quirks

- `build` runs `tsc -b` **before** `vite build` — a type error blocks the bundle.
- `check` is the full CI gate: lint → format → test coverage. Run before push.
- No pre-commit hooks or husky.

<!-- CODEGRAPH_START -->

## CodeGraph

In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), reach for it BEFORE grep/find or reading files when you need to understand or locate code:

- **MCP tool** (when available): `codegraph_explore` answers most code questions in one call — the relevant symbols' verbatim source plus the call paths between them, including dynamic-dispatch hops grep can't follow. Name a file or symbol in the query to read its current line-numbered source. If it's listed but deferred, load it by name via tool search.
- **Shell** (always works): `codegraph explore "<symbol names or question>"` prints the same output.

If there is no `.codegraph/` directory, skip CodeGraph entirely — indexing is the user's decision.

<!-- CODEGRAPH_END -->
