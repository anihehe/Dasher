import express from 'express'
import { query } from './snowflake.js'

const app = express()

app.get('/api/cases', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM cases WHERE assigned_to = ?', [
      process.env.ENGINEER_ID,
    ])
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server listening on port ${port}`))
