# Ledger — Household Finance Tracker

A modern, responsive finance tracker for monitoring monthly household budgets and expenses. Built with React, Tailwind CSS, Firebase (Auth + Firestore), and Recharts.

## Features

- **Google sign-in** via Firebase Authentication — each user only ever sees their own data.
- **Monthly budget** that can be set and updated anytime.
- **Expense tracking**: add, edit, delete expenses with title, amount, category, date, and optional notes.
- **Real-time dashboard**: total budget, total spent, remaining balance, top category, a 6-month spending trend bar chart, a category-wise pie chart with a ledger-style breakdown, and recent transactions — all synced live from Firestore.
- **Expenses page**: search by title/notes, filter by category and date range, full edit/delete.
- **Budget progress** shown as a perforated "ticket" with a color-coded progress bar (green → amber → coral as you approach/exceed budget).
- Fully responsive: sidebar nav on desktop, bottom nav on mobile.

## Tech stack

- React 18 + Vite
- Tailwind CSS (custom "ledger" design system — see `tailwind.config.js`)
- Firebase Authentication (Google provider) + Cloud Firestore (real-time sync)
- Recharts for the pie/bar charts
- lucide-react for icons

## 1. Set up Firebase

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.
2. **Authentication** → Sign-in method → enable **Google**.
3. **Firestore Database** → create a database (start in production mode).
4. In **Project settings → General → Your apps**, add a Web app and copy the config values.
5. Deploy the included security rules so each user can only read/write their own data:
   ```bash
   firebase deploy --only firestore:rules
   ```
   (or paste the contents of `firestore.rules` into the Firestore "Rules" tab in the console).

## 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env` with the values from your Firebase web app config:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 3. Install and run

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. If sign-in fails with an "unauthorized domain" error, add `localhost` (and later your deployed domain) under **Authentication → Settings → Authorized domains** in the Firebase console.

## 4. Build for production

```bash
npm run build
npm run preview   # to preview the production build locally
```

Deploy the `dist/` folder to any static host (Firebase Hosting, Vercel, Netlify, etc.).

## Data model

```
users/{uid}/expenses/{expenseId}
  title: string
  amount: number
  category: 'Food' | 'Grocery' | 'Electricity' | 'Rent' | 'Transport' | 'Entertainment' | 'Medical' | 'Others'
  date: 'YYYY-MM-DD'
  notes: string
  createdAt / updatedAt: server timestamp

users/{uid}/budgets/{monthKey}      // monthKey e.g. "2026-06"
  amount: number
  updatedAt: server timestamp
```

## Project structure

```
src/
  components/
    auth/          Login screen
    layout/         App shell (sidebar + mobile nav)
    dashboard/      Dashboard, stat cards, budget ticket, breakdown, recent activity
    expenses/       Expenses page, list, filters, add/edit form
    budget/         Budget set/update modal
    charts/         Recharts pie + bar chart wrappers
    common/         Button, Modal, ConfirmDialog, Toast, EmptyState, Spinner
  contexts/         AuthContext (Firebase auth state)
  hooks/            useExpenses, useBudget (Firestore real-time CRUD)
  firebase/         Firebase app/config initialization
  utils/            categories, formatters
```
