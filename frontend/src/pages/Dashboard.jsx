import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({ name:'', phone:'', whatsapp:'', latitude:'', longitude:'' })
  const [msg, setMsg] = useState(''); const [err, setErr] = useState('')

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'PROVIDER') return <Navigate to="/search" replace />

  async function save(e) {
    e.preventDefault(); setMsg(''); setErr('')
    try {
      await api.saveProfile(user.id, {
        ...profile,
        latitude: Number(profile.latitude),
        longitude: Number(profile.longitude),
      })
      setMsg('Profile saved!')
    } catch (e) { setErr(e.message) }
  }

  function useMyLocation() {
    navigator.geolocation.getCurrentPosition(
      p => setProfile(s => ({ ...s, latitude: p.coords.latitude, longitude: p.coords.longitude }))
    )
  }

  return (
    <div className="container page" style={{maxWidth: 600}}>
      <h1>Provider dashboard</h1>
      <p className="muted">Update your profile so customers can find you.</p>
      <form onSubmit={save} className="card form">
        {['name','phone','whatsapp','latitude','longitude'].map(f => (
          <div className="field" key={f}>
            <label style={{textTransform:'capitalize'}}>{f}</label>
            <input required value={profile[f]}
              onChange={e => setProfile({ ...profile, [f]: e.target.value })} />
          </div>
        ))}
        <button type="button" onClick={useMyLocation} className="link-btn">
          📍 Use my current location
        </button>
        {msg && <p className="success">{msg}</p>}
        {err && <p className="error">{err}</p>}
        <button className="btn btn-primary btn-block">Save profile</button>
      </form>
    </div>
  )
}
