# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TFFATW (台灣速食餐飲協會) official website — a Next.js 16 app deployed as a Cloudflare Worker via `@opennextjs/cloudflare`.

## Commands

```bash
npm run dev          # Start local dev server (http://localhost:3000)
npm run build        # Next.js build only
npm run build:worker # Build for Cloudflare Workers (opennextjs-cloudflare build)
npm run preview      # Build + local Cloudflare Worker preview
npm run deploy       # Build + deploy to Cloudflare Workers
```

There are no tests configured. There is no linter configured.

## Architecture

### Route Groups

The app uses two Next.js route groups with distinct layouts:

- **`app/(main)/`** — Public pages with `TheHeader` + `TheFooter` (home, about, leadership, brands, events, contact)
- **`app/(standalone)/`** — Pages without header/footer (redOrange brand showcase, redOrange-backend demo admin)

### Data Layer

Event data lives in `lib/events.json` (static JSON). All event queries go through `lib/eventService.js`, which exposes `getAllEvents()`, `getEventById()`, `getFeaturedEvents()`, `getUpcomingEvents()`, `getRelatedEvents()`, and `getEventsByStatus()`. There is no database or API — this is purely static data at build time.

### Path Alias

`@/` resolves to the project root (configured in `jsconfig.json`). Use it for all imports from `components/`, `lib/`, etc.

### Deployment

- Pushes to `main` auto-deploy via GitHub Actions (`.github/workflows/deploy.yml`)
- Build target is Cloudflare Workers using `@opennextjs/cloudflare` (not Vercel, not static export)
- `wrangler.jsonc` configures the worker name (`tffatw-web`), assets directory (`.open-next/assets`), and service bindings for self-referencing cache
- `next.config.js` sets `images: { unoptimized: true }` — required for Cloudflare Workers deployment

### Static Assets

- `public/images/` — brand logos and portrait photos
- `public/activity/<YYYYMMDD>/` — per-event activity photos, referenced by date-keyed paths

### Environment Variables

The `.env.example` shows `VITE_MEMBER_ACCOUNTS` (JSON array of member credentials for the demo redOrange-backend page). Secrets for CI are `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## OpenSpec

This project uses the OpenSpec workflow for structured feature development. Specs live in `openspec/specs/`, in-progress changes in `openspec/changes/`, and completed work in `openspec/changes/archive/`. Use the `/openspec-*` skills when working within this workflow.
