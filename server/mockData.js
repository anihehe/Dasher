// Dummy data shaped like real Snowflake rows (uppercase cols) — swap out once Snowflake is wired up.
const now = Date.now()
const hoursAgo = (h) => new Date(now - h * 60 * 60 * 1000).toISOString()

export const mockCases = [
  { ID: 'CASE-1001', SUBJECT: 'API returning 500 on bulk export', PRIORITY: 'P1', STATUS: 'Open', PARTNER_NAME: 'Acme Corp', PRODUCT: 'B2Bi', CREATED_AT: hoursAgo(60), LAST_UPDATED_AT: hoursAgo(52), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'partner', REOPENS: 1 },
  { ID: 'CASE-1002', SUBJECT: 'SSO login loop after SAML update', PRIORITY: 'P1', STATUS: 'Open', PARTNER_NAME: 'Globex', PRODUCT: 'SFG', CREATED_AT: hoursAgo(30), LAST_UPDATED_AT: hoursAgo(3), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'you', REOPENS: 0 },
  { ID: 'CASE-1003', SUBJECT: 'Slow report generation for large datasets', PRIORITY: 'P2', STATUS: 'Open', PARTNER_NAME: 'Initech', PRODUCT: 'B2Bi', CREATED_AT: hoursAgo(120), LAST_UPDATED_AT: hoursAgo(70), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'partner', REOPENS: 0 },
  { ID: 'CASE-1004', SUBJECT: 'Feature request: custom field mapping', PRIORITY: 'P3', STATUS: 'Open', PARTNER_NAME: 'Umbrella LLC', PRODUCT: 'AS2', CREATED_AT: hoursAgo(200), LAST_UPDATED_AT: hoursAgo(10), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'you', REOPENS: 0 },
  { ID: 'CASE-1005', SUBJECT: 'Webhook retries not respecting backoff', PRIORITY: 'P2', STATUS: 'Waiting on Partner', PARTNER_NAME: 'Hooli', PRODUCT: 'Connect:Direct', CREATED_AT: hoursAgo(80), LAST_UPDATED_AT: hoursAgo(1), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'you', REOPENS: 2 },
  { ID: 'CASE-1006', SUBJECT: 'Dashboard widgets not loading in Safari', PRIORITY: 'P3', STATUS: 'Open', PARTNER_NAME: 'Stark Industries', PRODUCT: 'SFTP', CREATED_AT: hoursAgo(15), LAST_UPDATED_AT: hoursAgo(15), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'partner', REOPENS: 0 },
  { ID: 'CASE-1007', SUBJECT: 'Data sync gap between regions', PRIORITY: 'P1', STATUS: 'Open', PARTNER_NAME: 'Wayne Enterprises', PRODUCT: 'AS2', CREATED_AT: hoursAgo(100), LAST_UPDATED_AT: hoursAgo(90), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'partner', REOPENS: 1 },
  { ID: 'CASE-1008', SUBJECT: 'Onboarding checklist stuck at step 3', PRIORITY: 'P2', STATUS: 'Closed', PARTNER_NAME: 'Soylent Corp', PRODUCT: 'B2Bi', CREATED_AT: hoursAgo(300), LAST_UPDATED_AT: hoursAgo(200), ASSIGNED_TO: 'eng_001', LAST_RESPONDED_BY: 'you', REOPENS: 0 },
]

export const mockEngineerData = [
  { CASE_ID: 'CASE-1001', ENGINEER_ID: 'eng_001', NOTES: 'Repro found — timeout on exports > 10k rows.', TAGS: ['blocked'], SNOOZED_UNTIL: null, PINNED: true },
  { CASE_ID: 'CASE-1002', ENGINEER_ID: 'eng_001', NOTES: 'Escalated to identity team.', TAGS: ['needs-call'], SNOOZED_UNTIL: null, PINNED: true },
  { CASE_ID: 'CASE-1005', ENGINEER_ID: 'eng_001', NOTES: '', TAGS: ['monitoring'], SNOOZED_UNTIL: hoursAgo(-48), PINNED: false },
]

// No Snowflake table backs these yet — team-wide aggregates, not per-engineer rows.
// Swap for a real aggregate query once weekly/partner reporting is designed.
export const mockWeeklyTrends = {
  OPENED_THIS_WEEK: 8,
  OPENED_LAST_WEEK: 6,
  CLOSED_THIS_WEEK: 6,
  AVG_RESOLUTION_DAYS: 3.4,
  SLA_BREACH_RATE: 0.12,
  WEEKLY_SERIES: [
    { WEEK: 'W-4', OPENED: 5, CLOSED: 4 },
    { WEEK: 'W-3', OPENED: 7, CLOSED: 5 },
    { WEEK: 'W-2', OPENED: 6, CLOSED: 7 },
    { WEEK: 'W-1', OPENED: 6, CLOSED: 6 },
    { WEEK: 'This wk', OPENED: 8, CLOSED: 6 },
  ],
}

export const mockPartnerHealth = [
  { PARTNER_NAME: 'Acme Corp', OPEN_CASES: 3, AVG_RESOLUTION_DAYS: 4.1, REPEAT_RATE: 0.4 },
  { PARTNER_NAME: 'Globex', OPEN_CASES: 4, AVG_RESOLUTION_DAYS: 6.2, REPEAT_RATE: 0.5 },
  { PARTNER_NAME: 'Initech', OPEN_CASES: 1, AVG_RESOLUTION_DAYS: 1.9, REPEAT_RATE: 0 },
  { PARTNER_NAME: 'Hooli', OPEN_CASES: 2, AVG_RESOLUTION_DAYS: 2.8, REPEAT_RATE: 0.2 },
]
