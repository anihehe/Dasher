import { useEffect, useState } from 'react'

function App() {
  const [cases, setCases] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/cases')
      .then((res) => res.json())
      .then(setCases)
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {cases.map((c) => (
        <li key={c.ID}>
          [{c.PRIORITY}] {c.SUBJECT} — {c.PARTNER_NAME} ({c.STATUS})
        </li>
      ))}
    </ul>
  )
}

export default App
