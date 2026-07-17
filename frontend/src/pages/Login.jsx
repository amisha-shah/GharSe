import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState(''); const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault(); setErr(''); setLoading(true)
    try {
      const user = await api.login(form); login(user)
      nav(user.role === 'PROVIDER' ? '/dashboard' : '/search')
    } catch (e) { setErr(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="container page center-narrow">
      <h1>Welcome back</h1>
      <form onSubmit={onSubmit} className="card form">
        <div className="field"><label>Email</label>
          <input type="email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div className="field"><label>Password</label>
          <input type="password" required value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} /></div>
        {err && <p className="error">{err}</p>}
        <button disabled={loading} className="btn btn-primary btn-block">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="muted" style={{textAlign:'center'}}>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}
