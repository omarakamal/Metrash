import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="container-max flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white font-bold">GB</span>
          <span className="font-semibold">GreenBasket</span>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/admin" className={`btn-ghost ${pathname === '/admin' ? 'bg-gray-100' : ''}`}>Dashboard</Link>
              <button onClick={logout} className="btn-ghost">Logout</button>
            </>
          ) : (
            <Link to="/admin/login" className="btn-primary">Admin Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
