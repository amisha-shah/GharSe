import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'

export default function Header() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="logo">G</span><span>GharSe</span>
        </Link>
        <nav className="nav">
          <Link to="/search">Find Providers</Link>
          {user ? (
            <>
              {user.role === 'PROVIDER' && <Link to="/dashboard">Dashboard</Link>}
              <span className="muted">{user.email}</span>
              <button onClick={() => { logout(); nav('/') }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" style={{ background:'#059669', color:'#fff' }}>Get Started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
