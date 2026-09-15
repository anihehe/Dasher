import express from 'express'
import { query } from './snowflake.js'
import { mockCases, mockEngineerData, mockWeeklyTrends, mockPartnerHealth } from './mockData.js'

const app = express()
const useMockData = process.env.USE_MOCK_DATA === 'true'

app.get('/api/cases', async (req, res) => {
  if (useMockData) {
    return res.json(mockCases.filter((c) => c.ASSIGNED_TO === process.env.ENGINEER_ID))
  }
  try {
    const rows = await query('SELECT * FROM cases WHERE assigned_to = ?', [
      process.env.ENGINEER_ID,
    ])
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/engineer-data', async (req, res) => {
  if (useMockData) {
    return res.json(mockEngineerData.filter((d) => d.ENGINEER_ID === process.env.ENGINEER_ID))
  }
  try {
    const rows = await query('SELECT * FROM engineer_data WHERE engineer_id = ?', [
      process.env.ENGINEER_ID,
    ])
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// No real Snowflake table backs these yet — mock-only until weekly/partner reporting is designed.
app.get('/api/weekly-trends', (req, res) => res.json(mockWeeklyTrends))
app.get('/api/partner-health', (req, res) => res.json(mockPartnerHealth))

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server listening on port ${port}`))
