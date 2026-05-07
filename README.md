# Portfolio App Next.js

Portfolio application built with Next.js 16, React 19, `next-intl`, Motion, GSAP, and optional Supabase-backed messaging.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- `next-intl` for `en` / `fr`
- Motion + GSAP + Lenis
- Supabase for optional messaging backend
- Vitest + Testing Library

## Main Features

- localized portfolio routes under `/{locale}`
- section-based home page composition
- shared UI system under `app/components/ui`
- optional visitor/admin messaging flow
- strict env validation with `zod` + `@t3-oss/env-nextjs`

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create `.env.local`.

Important:
- use `.env.local`, not `env.local`
- if `NEXT_PUBLIC_ENABLE_MESSAGING=true`, `SUPABASE_SERVICE_ROLE_KEY` becomes required

Required client env vars:

```bash
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ENABLE_MESSAGING=false
NEXT_PUBLIC_ENABLE_NEW_UI=false
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Required server env vars:

```bash
SUPABASE_SERVICE_ROLE_KEY=   # only when NEXT_PUBLIC_ENABLE_MESSAGING=true
```

3. Start dev server.

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run quality
npm run quality:full
npm run test
npm run test:content
npm run test:unit
```

Quality notes:
- `npm run quality` runs repo non-interactive fast quality checks
- `npm run quality:full` runs repo full quality checks
- upstream `npx cqc` still opens interactive menu; use repo scripts instead

## Structure

```text
app/
	components/        shared UI, providers, utilities
	features/          reusable product slices
	[locale]/
		page.tsx         localized page composition
		sections/        page-local sections and colocated data
	api/               messaging route handlers

types/               shared domain types
lib/                 infra and cross-cutting helpers
messages/            translation files
tests/               unit and content tests
```

## Messaging

Messaging feature lives under `app/features/messaging` and related API routes under `app/api/messaging`.

Admin UI route:

```text
/{locale}/messages/admin
```

If messaging is disabled with `NEXT_PUBLIC_ENABLE_MESSAGING=false`, server validation no longer requires Supabase service-role key.

## Refactor Status

Structural refactor baseline is complete.

Reference doc:
- [refactor-structure.md](refactor-structure.md)

Current baseline:
- section-owned content colocated with sections
- shared layout moved to `app/features/layout`
- shared types stabilized under `types/`
- shared infra imports normalized through aliases
- `constants/` retired from runtime usage

## Validation

Recommended final checks:

```bash
npm run quality
npm run test
npm run build
```
