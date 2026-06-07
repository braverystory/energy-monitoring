# Setup Instructions for Real Database

## Quick Setup

Run these commands in order:

```bash
# 1. Install dependencies (including Prisma)
npm install

# 2. Generate Prisma Client
npm run db:generate

# 3. Push database schema (creates tables)
npm run db:push

# 4. Seed database with sample data
npm run db:seed

# 5. Start the development server
npm run dev
```

## What This Does

- **Prisma Client**: Generated code to interact with the database
- **Database Schema**: Creates all tables (zones, devices, readings, alerts, etc.)
- **Seed Data**: Populates database with:
  - 6 hospital zones
  - 24 devices across all zones
  - 7 days of historical energy readings
  - Sample alerts and reports
  - 3 user accounts (admin, operator, viewer)

## Database Management Commands

```bash
# View database in browser
npm run db:studio

# Reset database and reseed (⚠️ deletes all data)
npm run db:reset

# Just push schema changes
npm run db:push

# Just seed data
npm run db:seed
```

## Database Location

The SQLite database file is created at:
`prisma/dev.db`

This file is ignored by git (.gitignore already configured).

## Switching to PostgreSQL (Production)

To use PostgreSQL instead of SQLite:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `.env.local`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/energy_monitoring"
   ```

3. Run:
   ```bash
   npm run db:push
   npm run db:seed
   ```

## Features

✅ **Real Data Storage**: All data persists in SQLite database
✅ **Historical Data**: 7 days of energy readings included
✅ **Automatic Calculations**: Stats computed from actual readings
✅ **Real-time Updates**: New readings can be added via API
✅ **Relationship Management**: Zones, devices, and readings are linked
✅ **User Management**: Ready for authentication implementation
✅ **Report Generation**: Store and retrieve generated reports

## Next Steps

After setup, the application will:
- Load real data from the database
- Display actual historical readings
- Calculate statistics from stored data
- Persist user interactions (alert acknowledgments, etc.)
- Support adding new readings via API

Enjoy your real data! 🎉
