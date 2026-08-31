# tl-playground

pnpm-монорепо из двух приложений:

- `apps/frontend` — Vue 3 + Vite SPA
- `apps/backend` — Sanity Studio (CMS)

## Project Setup

```sh
pnpm install
```

### Development

Запускает dev-сервер фронта (http://localhost:5173) и Sanity Studio (http://localhost:3333) параллельно:

```sh
pnpm dev
```

Запустить только один из проектов:

```sh
pnpm dev:frontend
pnpm dev:backend
```

### Build

```sh
pnpm build
```

или по отдельности: `pnpm build:frontend`, `pnpm build:backend`.

### Lint / Format / Type-check

```sh
pnpm lint
pnpm fmt
pnpm type-check
```

`oxlint`/`oxfmt`/`lefthook` настроены один раз в корне и покрывают оба приложения.
