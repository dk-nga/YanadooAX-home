# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server (Next.js)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint

# Testing (Playwright E2E)
npm run test:e2e     # Headless E2E tests
npm run test:e2e:ui  # Playwright UI mode
```

## Architecture

**Next.js 16 App Router** with locale-based routing via `next-intl`.

### Routing

All public pages live under `src/app/[locale]/` with locales `ko` (default) and `ja`. Static params are generated at build time. Admin pages are under `src/app/[locale]/admin/`.

### i18n

- Routing config: `src/i18n/routing.ts`
- Request config: `src/i18n/request.ts`
- Translation files: `messages/ko.json`, `messages/ja.json`
- Navigation helpers (Link, useRouter, redirect): `src/i18n/navigation.ts` — use these instead of Next.js defaults to preserve locale

### Middleware

`src/proxy.ts` (exported as `middleware`) chains next-intl locale detection and Supabase session refresh. It merges Supabase cookies into the i18n response before returning.

### Backend / Data

- **Supabase** (`src/lib/supabase/`): `client.ts` for browser, `server.ts` for Server Components/Route Handlers, `middleware.ts` for session refresh, `types.ts` for DB types.
- **Ghost CMS** (`src/lib/ghost.ts`): Blog posts fetched via a Supabase Edge Function (`/functions/v1/ghost-blog`). ISR revalidation is 5 minutes.
- Auth hook: `src/hooks/use-auth.ts` — handles sign-in/out and `isAdmin` check (via `user_roles` table).

### Components

- `src/components/ui/` — shadcn/Radix primitives (generated; avoid manual edits)
- `src/components/site/` — full-page layout templates (public-shell, admin-shell, etc.)
- `src/components/admin/` — admin panel components with auth guard
- Large home-page sections live directly in `src/components/` (e.g., `AXSystemSection.tsx`, `InteractiveDemoSection.tsx`, `HeroSection.tsx`)

### State Management

- **Zustand** available but minimal use
- **React Context** for cross-tree state: `ContactWidgetContext` (modal open/type), `ScrollContainerContext`, `LanguageContext`
- `AnimatedSection.tsx` wraps sections in scroll-triggered Framer Motion animations

### Styling

Tailwind CSS 4 (config inline, no `tailwind.config.js`). Theme colors are CSS custom properties defined in `src/app/[locale]/globals.css`. Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional classes.

### Site Config

`src/lib/site-config.ts` centralizes nav items, branding, accent colors, and footer text — edit here when changing site-wide values.

### Path Alias

`@/*` maps to `src/*`.
