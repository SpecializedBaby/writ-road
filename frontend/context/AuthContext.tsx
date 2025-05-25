"use client"
import React, { createContext, useContext, useEffect, useState } from "react"

type User = {
  firstName?: string,
  lastName?: string,
  full_name?: string
  email: string
  profile_image?: string
  joinedDate?: string
  upcomingTrips?: number
  completedTrips?: number
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const userStr = localStorage.getItem("user")

    if (token && userStr) {
      try {
        const parsed = JSON.parse(userStr)
        setUser(parsed)
      } catch {
        // malformed user
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
