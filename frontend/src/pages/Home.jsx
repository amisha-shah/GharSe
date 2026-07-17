import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <section className="container hero">
      <div>
        <h1>Trusted home services, <span className="accent">at your doorstep</span></h1>
        <p>Find verified plumbers, electricians, cleaners and more — near you.</p>
        <div className="hero-cta">
          <Link to="/search" className="btn btn-primary">Find a provider</Link>
          <Link to="/register" className="btn btn-outline">Become a provider</Link>
        </div>
      </div>
      <div className="hero-art">🏠</div>
    </section>
  )
}
