# OUTRIGHT LOGISTICS — Internal Platform + Public Site

Production-minded, low-overhead Next.js application for OUTRIGHT LOGISTICS LLC:

- Public website (Home / About / Services / Contact)
- Internal portal (admin + employee access)
- Local SQLite database via Prisma
- Local, lightweight analytics (page views)

Tone and UX are intentionally operational: clear, direct, and easy to maintain.

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite (file-based)

## What’s implemented

- **Public pages**: `/`, `/about`, `/services`, `/contact`
- **Contact form storage**: submissions saved to `ContactSubmission`
- **Auth (credentials)**:
  - Roles: `ADMIN`, `EMPLOYEE`
  - Sessions stored in DB (`Session`)
  - Passwords hashed with bcrypt
  - Forced password change on first login (`mustChangePassword`)
- **Internal portal**: `/admin`
  - Dashboard
  - Clients
  - Documents (metadata + simple versioning by `documentKey`)
  - Analytics (admin-only)
  - Employees (admin-only)

## Project structure (high level)

- `src/app/` — Next.js routes (public, admin, API)
- `src/components/` — UI components
- `src/lib/` — DB client and auth/session helpers
- `prisma/schema.prisma` — DB schema
- `prisma/seed.ts` — seed logic for initial admin

## Setup (local)

1. Install dependencies:

```bash
npm install
```

2. Create `.env`:

```bash
cp .env.example .env
```

3. Set admin seed credentials in `.env`:

- `ADMIN_EMAIL`
- `ADMIN_TEMP_PASSWORD`

4. Initialize the database and generate Prisma client:

```bash
npm run db:push
npm run prisma:generate
```

5. Seed the initial admin user (only creates if not present):

```bash
npm run db:seed
```

6. Start the dev server:

```bash
npm run dev
```

Then visit:

- Public site: `http://localhost:3000`
- Internal login: `http://localhost:3000/login`
- Admin portal: `http://localhost:3000/admin`

## Notes on deployment (Vercel)

SQLite is file-based and **not** a good long-term fit for serverless deployments (the filesystem is ephemeral). For a real Vercel deployment, plan to move `DATABASE_URL` to a hosted Postgres/MySQL provider later.

This repo keeps SQLite because it’s the lowest-cost, simplest starting point for a solo founder while validating workflow.

