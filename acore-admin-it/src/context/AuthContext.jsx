import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('hr') // hr, boss

  const login = (email, password, userRole) => {
    // Mock login - in real app, this would be an API call
    setUser({ email, name: 'Admin User' })
    setRole(userRole)
  }

  const logout = () => {
    setUser(null)
    setRole(null)
  }

  const value = {
    user,
    role,
    login,
    logout,
    isAuthenticated: !!user,
    isHR: role === 'hr',
    isBoss: role === 'boss'
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}