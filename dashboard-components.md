# Dashboard Component Outline — Reference Mockup

Extracted from the "Sterling B2B Integrator — Support Engineer Dashboard" screenshot.
This is a UI inventory, not an implementation spec — use it to decide what Dasher should
adopt now vs. defer (some items need fields beyond the current `cases`/`engineer_data` schema).

## 1. Top navigation bar
- Product logo + name ("Sterling B2B Integrator")
- Page subtitle ("Support Engineer Dashboard")
- Global search input (placeholder: "Search cases (ID, customer, keyword...)")
- Notification bell icon with unread-count badge
- User menu: avatar initials, name, role, dropdown chevron

## 2. Left sidebar navigation
- Nav items: Home (active state), My Cases, All Cases, Settings
- Footer status block: environment indicator (colored dot + label, e.g. "PROD"),
  last-updated timestamp, manual refresh icon

## 3. Page header
- Greeting ("Good Morning, {name}!") + one-line subtext
- Current date/time, right-aligned

## 4. KPI summary cards (row of 7)
Each card: icon, label, large count, "View details →" link.
- My Open Cases
- New / Unassigned
- Due Today
- P1 / Critical
- Awaiting Customer
- Awaiting Dev
- Resolved This Week

## 5. "My Cases" table panel
- Panel header: icon, title, "View all →"
- Filter tabs with counts: My Cases, All Cases, Unassigned, In Progress,
  Waiting Customer, Waiting Dev, Escalated
- Table columns: Case #, Customer, Product, Severity (badge), Status (badge),
  Last Update (relative time), Owner, row-level chevron/detail link
- Severity badges color-coded: P1 red, P2 orange, P3 yellow, P4 green
- Status badges color-coded per state (Investigating, Waiting Customer, New,
  In Progress, Escalated to L3, Waiting Dev)

## 6. "Cases Needing Attention" table panel
- Same table shape as #5, filtered/re-tabbed by urgency: Critical, Attention, Normal
  (each tab shows a count)

## 7. "Case Distribution" widget
- Donut/pie chart, center label = total case count
- Legend rows: priority tier, count, percentage (P1–P4)

## 8. "Case Aging" widget
- Horizontal bar chart, one bar per age bucket (0-1 day, 1-3 days, 3-7 days,
  7-14 days, 14+ days), each bar labeled with its count

## 9. "Recent Activity" feed
- Chronological list, each row: colored status dot, case # + short description,
  relative timestamp

## Notes for Dasher
- Several fields have no home in the current Snowflake schema (CLAUDE.md):
  per-status counts (Investigating/Escalated/etc.), "Due Today" (needs an SLA/due
  date field), Recent Activity feed (needs an audit/event log), Case Aging buckets
  (derivable client-side from `created_at`, same as `daysOpen()` in `attention.js`).
- Case Distribution (by priority) and aging buckets are cheap to build now — same
  shape as the existing `WorkloadSummary` / attention-scoring code.
- Table tabs-with-counts pattern (My Cases / Cases Needing Attention) is a good fit
  for Milestone 4's "Filters — by priority, partner, tag, status".
