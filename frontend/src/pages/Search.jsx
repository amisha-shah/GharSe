import { useState } from 'react'
import { api } from '../lib/api.js'

export default function Search() {
  const [c, setC] = useState({ lat: '', lng: '', radius: 5 })
  const [results, setResults] = useState([])
  const [err, setErr] = useState(''); const [loading, setLoading] = useState(false)

  function useMyLocation() {
    setErr('')
    if (!navigator.geolocation) return setErr('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(
      p => setC(s => ({ ...s, lat: p.coords.latitude, lng: p.coords.longitude })),
      e => setErr(e.message)
    )
  }

  async function onSearch(e) {
    e.preventDefault(); setLoading(true); setErr('')
    try {
      const data = await api.searchNearby(Number(c.lat), Number(c.lng), Number(c.radius))
      setResults(data || [])
    } catch (e) { setErr(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="container page">
      <h1>Find providers near you</h1>
      <form onSubmit={onSearch} className="card search-form">
        <input placeholder="Latitude" value={c.lat} onChange={e => setC({ ...c, lat: e.target.value })} />
        <input placeholder="Longitude" value={c.lng} onChange={e => setC({ ...c, lng: e.target.value })} />
        <input type="number" min="1" placeholder="Radius (km)" value={c.radius}
          onChange={e => setC({ ...c, radius: e.target.value })} />
        <button className="btn btn-primary">Search</button>
        <button type="button" onClick={useMyLocation} className="link-btn"
          style={{ gridColumn: '1 / -1', textAlign: 'left' }}>
          📍 Use my current location
        </button>
      </form>

      {err && <p className="error" style={{marginTop:16}}>{err}</p>}
      {loading && <p className="muted" style={{marginTop:16}}>Searching…</p>}

      <div className="results">
        {results.map(p => (
          <div key={p.id} className="result-card">
            <h3>{p.name}</h3>
            <p>📞 {p.phone}</p>
            <p>💬 {p.whatsapp}</p>
            <p className="muted">{Number(p.latitude).toFixed(4)}, {Number(p.longitude).toFixed(4)}</p>
          </div>
        ))}
        {!loading && results.length === 0 && <p className="muted">No results yet.</p>}
      </div>
    </div>
  )
}
