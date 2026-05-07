# Refactor Structure 2026

## Goal

Make repo easy to scan, easy to extend, hard to misuse.

## Status

2026 structural baseline complete.

Completed baseline means:
- route segments primarily compose
- section-owned data is colocated with sections
- shared layout lives in `app/features/layout`
- shared types live in `types/`
- shared infra imports use stable aliases
- `constants/` is retired from runtime usage
- build stays green after each slice

Target model:
- `app/` = routing, layouts, route composition, API routes
- `app/features/` = reusable product slices and route-adjacent business logic
- `app/components/` = shared UI and providers
- `app/[locale]/sections/` = home page section composition only
- `constants/` = truly shared static content only
- `types/` = shared domain types, not UI-internal types
- `lib/` = infrastructure and cross-cutting helpers, grouped by concern

## Current State

Completed in this refactor pass:

1. Locale home entrypoint cleaned.
	- [app/[locale]/page.tsx](app/[locale]/page.tsx) now consumes clear barrels instead of aliasing through `@/[locale]/...`.

2. Layout ownership moved out of route segment.
	- [app/features/layout/index.ts](app/features/layout/index.ts)
	- [app/features/layout/Header.tsx](app/features/layout/Header.tsx)
	- [app/features/layout/Footer.tsx](app/features/layout/Footer.tsx)
	- [app/features/layout/SideNav.tsx](app/features/layout/SideNav.tsx)
	- [app/features/layout/header.css](app/features/layout/header.css)
	- [app/features/layout/footer.css](app/features/layout/footer.css)
	- [app/features/layout/sidenav.css](app/features/layout/sidenav.css)

3. Duplicate/obsolete route-local layout files removed.
	- `app/[locale]/features/*.tsx|*.jsx|*.css` deleted.

4. Shared type ownership cleaned.
	- [types/icons.ts](types/icons.ts) now owns `IconName`.
	- [app/components/ui/icon/types.ts](app/components/ui/icon/types.ts) re-exports shared type instead of owning it.
	- non-UI data/sections now import from `@shared-types` or `@shared-types/icons`.

5. Path aliases simplified.
	- removed obsolete `@components/*`
	- replaced unsafe `@types/*` with `@shared-types/*`
	- added root alias `@shared-types`

6. Shared type imports normalized.
	- constants, sections, messaging hooks/components/services no longer climb with deep `../../../../types` imports.

7. Messaging lib imports normalized.
	- messaging routes and server service now use `@lib/supabase/*` instead of deep relative imports.

8. Root `lib/` started to split by concern.
	- [lib/hooks/useScrollDirection.ts](lib/hooks/useScrollDirection.ts)
	- [lib/media/hexToBlurDataURL.ts](lib/media/hexToBlurDataURL.ts)
	- obsolete root compatibility files removed after import audit.

## Target Structure

```text
app/
  layout.tsx
  styles/
  components/
  features/
	 layout/
	 messaging/
  [locale]/
	 layout.tsx
	 page.tsx
	 sections/

constants/
  shared-static-data-only

types/
  index.ts
  icons.ts
  feature-and-shared-domain-types

lib/
  hooks/
  media/
  supabase/
  future-utils/
```

## Rules

1. Route segments do routing and assembly.
	No reusable layout/business implementation should live only inside `app/[locale]` if reused or conceptually cross-route.

2. Shared UI does not own domain data.
	Domain content may reference shared types, but shared content should not need to import private UI internals.

3. Shared types import path must stay stable.
	Use `@shared-types` and `@shared-types/*`.

4. Shared infra import path must stay stable.
	Use `@lib/*` for cross-cutting helpers and infra.

5. New feature slices should expose one public barrel.
	Internal files can change. Public entry stays stable.

6. `constants/` stays small.
	If data is section-specific, prefer colocating near section unless reused broadly.

## Optional Future Work

### Phase A
Finish `lib/` grouping.

Targets:
- move future pure helpers into `lib/utils/`
- keep `lib/supabase/` as infra boundary

### Phase B
Reduce `constants/` to shared-only content.

Current status:
- About data already moved to [app/[locale]/sections/about/data.ts](app/[locale]/sections/about/data.ts)
- Projects data already moved to [app/[locale]/sections/projects/data.ts](app/[locale]/sections/projects/data.ts)
- Creation data already moved to [app/[locale]/sections/creation/data.ts](app/[locale]/sections/creation/data.ts)
- Modules data already moved to [app/[locale]/sections/modules/data.ts](app/[locale]/sections/modules/data.ts)
- Profile data already moved to [app/[locale]/sections/profile/data.ts](app/[locale]/sections/profile/data.ts)
- Shared section palettes now live in [app/[locale]/sections/shared/palettes.ts](app/[locale]/sections/shared/palettes.ts)

Result:
- `constants/` no longer participates in runtime imports and is effectively retired.

Plan:
- move section-local data near section folders
- keep global shared datasets only if reused across multiple slices

### Phase C
Revisit section boundaries.

Question:
- keep `app/[locale]/sections/*` as page-only composition
- or promote some sections into reusable feature slices if multiple routes start sharing them

Current recommendation:
- keep sections where they are until reuse becomes real

### Phase D
Keep internals tidy.

Targets:
- optionally flatten icon internal type imports inside `app/components/ui/icon/*`
- extend tests only if new refactor-sensitive surfaces appear

## Validation Commands

After each structural slice:

```bash
npm run build
```

When touching unit-covered UI or helpers:

```bash
npm run test:unit
```

## Risks To Avoid

1. Big-bang folder rename.
	Prefer thin compatibility layer, migrate imports, then delete shim.

2. Moving section content too early.
	If ownership unclear, keep content where runtime behavior already stable.

3. Reintroducing reserved alias names.
	Do not use `@types/*` for local code.

## Done Criteria

Refactor considered structurally healthy when:
- route segments contain composition, not reusable impl
- shared types no longer live in UI internals
- deep relative imports for shared boundaries are gone
- `lib/` folders reflect concern, not convenience
- `constants/` contains only truly shared static data
- build passes after each slice

Current repo meets baseline criteria above.
