# Portfolio — Ronan Chenu

Personal portfolio. Bilingual (FR/EN), dark mode, animated.

**Live:** [ronan-chenu.fr](https://ronan-chenu.fr)

## Stack

- Next.js 16 App Router + React 19 + TypeScript
- `next-intl` — FR / EN
- Motion + GSAP + Lenis
- Supabase — optional contact messaging

## Features

- Bilingual portfolio routes under `/{locale}`
- Section-based home page (hero, about, projects, creations…)
- Shared UI component system (`app/components/ui`)
- Optional contact messaging flow (visitor + admin views)
- Dark mode toggle with system preference detection

## Environment

Client vars live in `env.ts` and must use `NEXT_PUBLIC_`.
Server-only secrets live in `env.server.ts`.

Contact reveal uses these Vercel/local vars:

```bash
CONTACT_CRYPTO_KEY=
CONTACT_EMAIL_ENCRYPTED=
CONTACT_PHONE_ENCRYPTED=
```

Generate encrypted values locally:

```bash
node scripts/encrypt-contact.mjs "<CONTACT_CRYPTO_KEY>" "mail@example.com"
node scripts/encrypt-contact.mjs "<CONTACT_CRYPTO_KEY>" "+33600000000"
```

Store outputs in `CONTACT_EMAIL_ENCRYPTED` and `CONTACT_PHONE_ENCRYPTED`.
Keep `CONTACT_CRYPTO_KEY` identical locally and in Vercel.


## Copyright

Monority - Ronan Chenu
