import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProfile, login as loginApi, setAuthToken, clearAuthToken } from '../utils/api/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
      getProfile().then((u) => setUser(u)).catch(() => {
        clearAuthToken()
        localStorage.removeItem('token')
      }).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const { token } = await loginApi(username, password)
    localStorage.setItem('token', token)
    setAuthToken(token)
    const u = await getProfile()
    setUser(u)
    return u
  }

  const logout = () => {
    clearAuthToken()
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
