# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Dasher is a local support engineer dashboard.

- **Frontend:** React + Vite + Tailwind CSS (`client/`)
- **Backend:** Express (`server/`)
- **Database:** Snowflake, accessed via `snowflake-sdk`

The project is local-only — no deployment/hosting is assumed.

## Conventions

- Snowflake credentials live in `server/.env` and must never be committed or logged.
- Keep Snowflake query logic in the backend only; the frontend talks to the Express API, never to Snowflake directly.
- Vite's dev server proxies API calls to Express — don't hardcode the backend port in frontend fetch calls, use the proxy config.

## Commands

Fill in once package.json scripts exist, e.g.:

```powershell
cd server; npm run dev   # backend
cd client; npm run dev   # frontend
```
