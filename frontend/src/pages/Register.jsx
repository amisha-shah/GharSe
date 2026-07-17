import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'

export default function Register() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'CUSTOMER' })
  const [err, setErr] = useState(''); const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault(); setErr(''); setLoading(true)
    try {
      const user = await api.register(form); login(user)
      nav(user.role === 'PROVIDER' ? '/dashboard' : '/search')
    } catch (e) { setErr(e.message) } finally { setLoading(false) }
  }

  return (
    <div className="container page center-narrow">
      <h1>Create your account</h1>
      <form onSubmit={onSubmit} className="card form">
        <div className="field"><label>Email</label>
          <input type="email" required value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div className="field"><label>Password</label>
          <input type="password" required value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} /></div>
        <div>
          <label style={{fontSize:13, fontWeight:600}}>I am a</label>
          <div className="role-toggle" style={{marginTop:6}}>
            {['CUSTOMER','PROVIDER'].map(r => (
              <button type="button" key={r}
                className={form.role === r ? 'active' : ''}
                onClick={() => setForm({ ...form, role: r })}>
                {r === 'CUSTOMER' ? 'Customer' : 'Service Provider'}
              </button>
            ))}
          </div>
        </div>
        {err && <p className="error">{err}</p>}
        <button disabled={loading} className="btn btn-primary btn-block">
          {loading ? 'Creating…' : 'Create account'}
        </button>
        <p className="muted" style={{textAlign:'center'}}>
          Already have one? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
