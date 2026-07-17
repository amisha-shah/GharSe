import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('gharse_user')
    return s ? JSON.parse(s) : null
  })
  const login = useCallback((u) => {
    setUser(u); localStorage.setItem('gharse_user', JSON.stringify(u))
  }, [])
  const logout = useCallback(() => {
    setUser(null); localStorage.removeItem('gharse_user')
  }, [])
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
