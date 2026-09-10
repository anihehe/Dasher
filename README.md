# Dasher

A local support engineer dashboard for querying and visualizing data from Snowflake.

## Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Express
- **Database:** Snowflake (via [`snowflake-sdk`](https://www.npmjs.com/package/snowflake-sdk))

## Project structure

```
Dasher/
├── client/          # React + Vite + Tailwind frontend
└── server/          # Express backend, Snowflake queries
```

*(Adjust the above once the actual folders exist.)*

## Prerequisites

- Node.js (LTS)
- Access to a Snowflake account (account identifier, user, and either a password or key-pair auth configured)

## Setup

```powershell
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

## Environment variables

The backend needs Snowflake connection details. Create a `.env` file in `server/` (and keep it out of git):

```
SNOWFLAKE_ACCOUNT=
SNOWFLAKE_USERNAME=
SNOWFLAKE_PASSWORD=
SNOWFLAKE_WAREHOUSE=
SNOWFLAKE_DATABASE=
SNOWFLAKE_SCHEMA=
SNOWFLAKE_ROLE=
```

## Running locally

```powershell
# Backend (from server/)
npm run dev

# Frontend (from client/)
npm run dev
```

The Vite dev server proxies API requests to the Express backend (configure `vite.config.js` accordingly).

## Notes

- Credentials go in `.env`, never committed. Add `.env` to `.gitignore`.
- This is a local-only tool — no deployment/hosting setup is assumed yet.
