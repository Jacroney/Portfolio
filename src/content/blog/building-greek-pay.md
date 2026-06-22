---
title: Building GreekPay
date: 2026-05-20
excerpt: What started as a weekend spreadsheet-killer is now a production SaaS handling payments, banking, and an AI advisor for real fraternity chapters.
tags: [react, typescript, supabase, stripe, plaid, claude]
---

When I took over as treasurer for Kappa Sigma at Cal Poly, I inherited a tangle of
spreadsheets, Venmo screenshots, and a shoebox of receipts. **GreekPay** started
as a weekend project to make that mess disappear. It's since grown into a
production, multi-tenant SaaS platform that real chapters actually run their
finances on.

## The problem

A chapter treasurer juggles a lot at once:

1. **Collecting dues** from ~80 members on different payment plans.
2. **Tracking a budget** across committees that all think they're underfunded.
3. **Reimbursing** members who front money for events.
4. **Reporting** to nationals and the e-board every month.

Doing this by hand is slow and error-prone, and the handoff to next year's
treasurer is brutal.

## What it does now

The first version tracked dues and budgets. The current one is closer to a
financial operating system for a chapter:

- **Payments** — Stripe Connect so each chapter receives funds directly, with
  saved cards/ACH, installment plans, and daily autopay.
- **Banking** — Plaid syncs bank transactions with cursor-based pagination,
  auto-categorization, and dedup so the ledger stays current on its own.
- **Reimbursements** — members submit receipt photos; Claude vision extracts the
  vendor, date, and amount and flags mismatches before a treasurer approves.
- **An AI advisor** — a Claude agent with tool use that can answer questions
  *and* take actions (assign dues, apply late fees, send reminders), each one a
  confirmable proposal with an audit trail.
- **Automations** — cron-driven overdue detection, payment reminders, recurring
  charges, and queued email/SMS with retries.

## The stack

I kept it deliberately boring where it mattered so it would survive after I
graduate:

- **React + TypeScript** on the front end
- **Supabase (Postgres)** for data and auth, with Row-Level Security for
  multi-tenant isolation
- **Deno edge functions** for the API, webhooks, and cron jobs
- **Stripe Connect** and **Plaid** for money movement
- **Claude (Haiku 4.5)** for the advisor and receipt verification
- **Cloudflare Workers / AI Gateway** for serving and routing AI traffic

```ts
// Multi-tenant isolation isn't app logic — it's enforced in the database.
// Every chapter-scoped table has an RLS policy like this:
create policy "members read own chapter"
  on members for select
  using (chapter_id = auth.chapter_id());
```

## What I learned

The hardest part was never the code — it was modeling the *real* rules a chapter
runs on (payment plans, partial payments, multi-stage event dues, fee waivers)
without making the UI overwhelming. Two things kept the product honest:

1. **Push correctness down to the database.** RLS and idempotent webhooks mean a
   bug in the UI can't leak another chapter's data or double-charge a member.
2. **Make the AI propose, not act.** Letting Claude *execute* financial
   operations is only safe because every write is a confirmable proposal with a
   5-minute TTL and an audit log.

And the original constraint still holds: every time I add a feature, I ask whether
next year's treasurer could figure it out without me. That question has shaped the
product more than any framework decision.
