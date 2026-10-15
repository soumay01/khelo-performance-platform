# Khelo Performance: Smart Sports Performance & Athlete Development Platform

A student innovation prototype for young athletes. It helps students record basic fitness tests, see their progress on charts, follow beginner-friendly training ideas, and browse sample sports opportunities.

> **Disclaimer.** This is an independent student project inspired by the goals of the Khelo India initiative. It is **not** an official Khelo India or government platform. All athlete data, events, and results shown are **demonstration data**.

---

## Features

| Page | What it does |
| --- | --- |
| Home | Landing page with hero, features, problem and solution, and impact sections |
| Dashboard | Latest results, sprint and push-up trends, weekly training chart, consistency, saved events |
| Fitness Tracker | Validated entry form for sprint time, run distance, push-ups, squats, and session length; progress chart; history with delete |
| Training Guidance | Weekly beginner plans by goal, warm-up, cool-down, rest days, and safety reminders |
| Opportunities | Searchable sample events with filters for sport, age group, date, and location; save events; links to official sites |
| Athlete Profile | Display name, age group, sport, experience, goals, and optional school; privacy notes |
| About | Problem, solution, low-cost approach, benefits, science notes, limitations, and future work |

Global features: loading and empty states, toast confirmations, form validation with error messages, responsive navigation, keyboard and screen-reader labels, and a **Reset demo data** button in the banner.

---

## Getting started

Requirements: Node.js 18 or newer and npm.

```bash
cd khelo-performance-platform
npm install
npm run dev        # open the URL shown (usually http://localhost:5173)
```

Other commands:

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm test           # run unit tests for validation and analytics
```

---

## How data is stored

This prototype runs entirely in the browser. Records are saved to `localStorage` under keys starting with `khelo-demo:`. Clearing site data or pressing **Reset demo data** restores the sample records.

### What needs a backend for production

The brief allows a frontend-only prototype when a backend is not available. The following features **require** a backend before real use:

- Real accounts with secure login, password hashing, and sessions
- Storing athlete records safely across devices, using MongoDB and Mongoose behind an Express API
- Coach or admin access controls that check permissions on the server
- Verified event data from official sources, fetched by the server
- Parental consent records for users under 18
- Server-side validation (the browser checks are a convenience, not a security control)

A suggested production layout: `server/` (Express routes, Mongoose models, auth middleware, `.env` for secrets such as `MONGODB_URI` and `JWT_SECRET`) alongside this `src/` frontend, which would call the API with `fetch`. Secrets must never appear in frontend code.

---

## Project structure

```
src/
  components/   Layout, Toast, DemoBanner, StatCard, SectionHeader, EmptyState
  pages/        Home, Dashboard, FitnessTracker, TrainingGuidance,
                Opportunities, AthleteProfile, About
  lib/          AppContext (state + persistence), storage, validation,
                analytics, trainingPlans, analytics.test.js
  data/         demoData.js (all sample data, clearly labelled)
```

---

## Testing checklist

1. Visit every page from the navigation (desktop and the mobile menu).
2. On the Fitness Tracker, submit an empty form and confirm all errors appear; submit a valid entry and confirm the chart, table, and dashboard update.
3. Delete a test and confirm the record is removed.
4. On Training Guidance, change the goal and confirm the weekly plan changes.
5. On Opportunities, filter by sport, age, date, and location; save and unsave an event; confirm it appears on the Dashboard.
6. On Athlete Profile, clear the name and confirm validation; save valid changes and confirm the dashboard greeting updates.
7. Press **Reset demo data** and confirm the original sample records return.
8. Resize the browser to a phone width and check that navigation and tables remain usable.
9. Run `npm test`.

---

## Innovation and impact

**Problem.** Many young athletes in schools and communities cannot easily track their fitness, follow a safe beginner routine, or learn about local trials and events.

**Solution.** A low-cost web tool that turns simple, repeatable measurements into clear charts and pairs them with beginner-safe guidance and an opportunity directory.

**Low-cost use.** A stopwatch, a measured track, a tape measure, and manual counts are enough. No special sensors are needed.

**Who benefits.** Students, school sports teachers, beginners, and community clubs.

**Limitations.** Frontend-only prototype, sample events only, basic measurements, no real accounts or coach access controls.

**Future work.** Secure backend and accounts, coach dashboard with permissions, verified event feeds, printable reports, and optional phone-based timing tested for accuracy.

---

## Safety note

Training guidance here is general and beginner-level. It does not replace advice from a doctor or a qualified coach. Students should stop exercising and tell an adult if they feel unwell, dizzy, or have chest pain or unusual breathlessness.
