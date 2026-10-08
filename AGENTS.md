# tl-playground

Personal playground for experimenting with frontend development. A Vue 3 SPA that hosts independent mini-apps/sections (kanban board, articles, canvas, etc.), each living in its own feature. The set of sections grows over time. Backend is Supabase. UI texts are in Russian.

## Hard rules

- **Never run `git commit` / `git push` / create branches or PRs** unless the user explicitly asks in the current message. The user does all git operations; leave changes in the working tree.
- **Do not write tests.** The project has no test setup and none is wanted. Do not add test files, test dependencies or `__tests__` folders.
- **Every component uses Composition API with `<script setup lang="ts">`.** No Options API, no `defineComponent`, no mixins.
- Ask before adding dependencies or restructuring folders.

## Tech Stack

- **Framework:** Vue 3 (Composition API), Vue Router
- **Language:** TypeScript (strict)
- **Build:** Vite; vue-tsc for type-checking
- **Styles:** SCSS in `<style scoped lang="scss">`, design tokens as CSS variables
- **Package manager:** pnpm
- **Linting / formatting:** oxlint, oxfmt
- **Key libraries** (use these instead of adding alternatives):
    - Server state: TanStack Vue Query; data access: Supabase client
    - Global state: Pinia (setup stores)
    - Forms: vee-validate + zod
    - Rich text: Tiptap; drag & drop: @dnd-kit/vue
    - Icons: @tabler/icons-vue; dates: date-fns
    - Error monitoring: Sentry

## Commands

- `pnpm dev` — dev server
- `pnpm type-check` — `vue-tsc --build`
- `pnpm lint` / `pnpm lint:fix` — oxlint
- `pnpm fmt` / `pnpm fmt:check` — oxfmt (4 spaces, semicolons)
- `pnpm build` — type-check + build

The pre-commit hook (lefthook) runs lint, fmt:check and type-check. After changing code, run these three yourself so the user's commit does not fail, and report any failures.

## Folder structure

Feature-oriented layout. Dependencies go one way: `views` → `features` → `shared`. `shared` must never import from `features`.

```
src/
├── main.ts, App.vue, style.css   entry point, root component, global styles
├── assets/        static assets imported from code (fonts)
├── configs/       app-wide library setup (sentry-config, query-config)
├── layouts/       page shells; DefaultLayout.vue
│   └── components/  parts used only by layouts (header, sidebar)
├── router/        routes.ts (route list + RouteMeta typing), index.ts (router instance)
├── views/         one thin page component per route (HomeView, KanbanView).
│                  Only composes feature components; no business logic
├── features/      one folder per section/domain (e.g. kanban, articles, canvas)
├── shared/        reusable code with no domain knowledge
│   ├── api/       API clients (supabase.ts)
│   ├── styles/    reset.css, tokens.css (design tokens), fonts.css
│   └── ui/        generic UI kit, one folder per component
├── stores/        global Pinia stores not tied to a feature (modal-store, toast-store)
└── utils/         small pure helpers (format-date, copy-to-clipboard, ...)
```

### Inside a feature (`src/features/<feature>/`)

| Folder        | What goes there                                                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api/`        | Supabase calls (`<feature>-api.ts`) and Vue Query keys (`<feature>-query-keys.ts`: query keys and mutation keys)                                                                       |
| `hooks/`      | Composables, one per file, named `useXxx.ts`. Query/mutation wrappers (`useXxxList`, `useXxxCreate`) and UI-logic composables                                                          |
| `components/` | Feature components, **one folder per component** in kebab-case: `<feature>-card/<Feature>Card.vue`. Component-only helpers live next to it (e.g. `<name>-action.ts` with menu actions) |
| `types/`      | TypeScript types/interfaces (`<feature>.types.ts`)                                                                                                                                     |
| `schemas/`    | zod schemas for forms (`<feature>-<entity>-schema.ts`)                                                                                                                                 |
| `config/`     | Static constants and dictionaries                                                                                                                                                      |

### Where to put new things

- **New page** → `views/XxxView.vue` (lazy-loaded) + entry in `router/routes.ts` with `meta.title` and `meta.breadcrumb`.
- **New section (articles, canvas, ...)** → new `features/<name>/` with the subfolders above (create only the ones you need) + a view + a route. Sections are independent: a feature must not import from another feature; extract shared code into `shared/` instead.
- **Feature component** → `features/<f>/components/<kebab-name>/<PascalName>.vue`.
- **Generic reusable UI** (no domain knowledge) → `shared/ui/<kebab-name>/<PascalName>.vue`; its types in `<name>.types.ts` beside it.
- **Server data** → function in `api/`, key in `api/*-query-keys.ts`, hook in `hooks/`. Components never call the API directly; they use hooks.
- **Global state** (used across features) → `stores/` as a Pinia setup store. Feature-local state → a composable in the feature's `hooks/`.
- **Pure helper with no Vue/domain dependencies** → `utils/`. Domain-specific helper → inside the feature.
- **Design tokens / global CSS** → `shared/styles/`.
- **Library setup** (new plugin/client config) → `configs/`.

## Conventions

- Import with the `@/` alias and **include the file extension**: `@/shared/ui/button/Button.vue`.
- Component files: `PascalCase.vue`. Other files: `kebab-case.ts`; composables: `useXxx.ts`.
- Interfaces are prefixed with `I` (`IToast`, `IActionsMenuItem`).
- Props via `defineProps<{...}>()` with type-only declaration; `withDefaults` for defaults.
- `noUncheckedIndexedAccess` is on: handle `undefined` when indexing arrays/objects.
- Styles: use tokens from `shared/styles/tokens.css` (`var(--color-...)`) instead of hardcoded colors.
- Env config goes through `import.meta.env.VITE_*`; list new variables in `.env.example`. Never commit `.env`.
- Errors from API are reported with `utils/sentry-capture-api-error.ts`; user feedback goes through `useToastStore`.
- Use existing `shared/ui` components (Button, BaseInput, Modal, ...) before creating new ones.
- Keep user-facing strings in Russian, code identifiers and comments in English.

## Code Quality Standards

These are not enforced by the linter; follow them manually.

- **Semantic HTML5** — use `<button>`, `<nav>`, `<dialog>`, `<form>`, `<label>`, `<ul>` etc. instead of clickable `<div>`s.
- **Accessibility (a11y)** — interactive elements must be keyboard-reachable and have accessible names; use ARIA attributes (`aria-label`, `aria-expanded`, `role`, ...) where native semantics are not enough. Icon-only buttons always need `aria-label`.
- **TypeScript** — no `any`; type refs explicitly when the type is not obvious (`ref<HTMLElement | null>(null)`, `ref<IFoo[]>([])`).
- **Type-based emits** — `defineEmits<{ (e: "update", value: string): void }>()`, never the array/runtime form.
- **DOM access** — client-only SPA (no SSR), so `window`/`document` are available. Put DOM-dependent code in `onMounted` (or use template refs) and clean up listeners/observers/timers in `onBeforeUnmount`.
- **No `console.log`** in committed code. Use Sentry for errors and toasts for user feedback (see Conventions).
- **Function declarations over expressions** — `function handleClick() {}` instead of `const handleClick = () => {}` for named functions. Arrow functions are fine for inline callbacks.
