import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="container page" style={{textAlign:'center'}}>
      <h1 style={{fontSize:72, margin:0}}>404</h1>
      <p className="muted">Page not found</p>
      <Link to="/" className="btn btn-primary" style={{marginTop:16}}>Go home</Link>
    </div>
  )
}
