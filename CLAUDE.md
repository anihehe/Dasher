# Dasher

## What this is
A personal support case dashboard for B2B support engineers.
Each engineer runs their own local instance on their machine.
Pulls live case data from Snowflake (synced from Salesforce).
Engineers can add private notes, snooze cases, pin priorities,
and see their daily workload at a glance.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: Snowflake (via snowflake-sdk)
- State: Zustand
- Data fetching: TanStack React Query

## Project structure
dasher/
├── client/              # React frontend
│   └── src/
│       ├── components/  # UI components
│       ├── hooks/       # React Query hooks
│       └── store/       # Zustand state
├── server/              # Express backend
│   ├── index.js         # API routes
│   └── snowflake.js     # Snowflake connection
├── .env                 # credentials (never commit)
└── CLAUDE.md

## Snowflake tables
### cases (read only — synced from Salesforce)
- id
- subject
- priority          (P1 / P2 / P3)
- status
- partner_name
- created_at
- last_updated_at
- assigned_to       (engineer ID)

### engineer_data (read/write — personal layer)
- case_id
- engineer_id
- notes
- tags
- snoozed_until
- pinned            (boolean)

## Key rules
- Credentials in .env only, never hardcoded
- Tailwind for all styling, no custom CSS files
- React Query for all API calls, no raw fetch in components
- Engineer ID comes from .env (MVP — no login needed)
- Cases are filtered by assigned_to = engineer ID on the backend

## Attention scoring logic
Cases are ranked by urgency using these signals:
1. Priority (P1 > P2 > P3)
2. Staleness (last_updated_at — flag if > 48hrs)
3. SLA countdown (time left before breach)
4. Waiting on engineer (last reply was from partner)

## Current milestone
Milestone 1 — Foundation

Milestone plan:

Milestone 1 — Foundation
Goal: real data flowing end to end

□ Project scaffolded (React + Vite + Tailwind + Express)
□ Snowflake connection working (snowflake-sdk + .env)
□ GET /api/cases returns cases for the engineer
□ GET /api/engineer-data returns personal notes/tags/snooze
□ Basic case list renders in the browser (unstyled is fine)

Done when: you open the browser and see your real cases.

Milestone 2 — Core case feed
Goal: the dashboard is actually useful to open

□ Cases ranked by attention score (priority + staleness + SLA)
□ Staleness flag — red if no update in 48hrs
□ SLA countdown badge — green / amber / red
□ Workload snapshot sidebar (open count, P1/P2/P3 breakdown, stale count)
□ Auto-refresh every 5 minutes

Done when: you can open it in the morning and immediately know what needs attention.

Milestone 3 — Personal layer
Goal: the dashboard remembers your context

□ Notes per case — type and save, persists to Snowflake
□ Tags per case — e.g. blocked, needs-call, monitoring
□ Pin cases — pinned cases always show at top
□ Snooze — hide a case until a date, then it reappears
□ POST /api/engineer-data saves notes/tags/snooze/pin to Snowflake

Done when: you close and reopen the dashboard and all your notes are still there.

Milestone 4 — Daily workflow features
Goal: replaces your sticky notes and mental tracking

□ Daily focus list — top 5 cases needing action today
□ Suggested next action per case (e.g. "Chase partner — no reply in 3 days")
□ Shift log — running log of what you've done today
□ End of day summary — one click generates a handover note
□ Filters — by priority, partner, tag, status

Done when: you use it for your EOD handover without writing anything manually.

Milestone 5 — Polish
Goal: feels like a real tool, not a prototype

□ Loading skeletons and error states
□ Toast notifications for saves
□ Keyboard shortcuts (e.g. N for notes, S for snooze)
□ Dark mode
□ Export daily summary as text/markdown
