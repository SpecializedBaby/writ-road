"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  profile_image?: string | null
  phone?: string
  address?: string
  city?: string
  country?: string
  bio?: string
  upcomingTrips?: number
  completedTrips?: number
  date_joined: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => Promise<void>
  refreshUser: () => Promise<void>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface LoginResponse {
  access: string
  user: User
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Token management utilities
const TOKEN_KEY = "access"

const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

const setStoredToken = (token: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem(TOKEN_KEY, token)
}

const removeStoredToken = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem(TOKEN_KEY)
}

// API utilities
const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const token = getStoredToken()

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Fetch user data from /api/account/me
  const fetchUserData = async (): Promise<User | null> => {
    try {
      const userData = await apiCall("/account/me/")
      return userData
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      // If token is invalid, remove it
      removeStoredToken()
      return null
    }
  }

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getStoredToken()

      if (token) {
        try {
          const userData = await fetchUserData()
          setUser(userData)
        } catch (error) {
          console.error("Failed to initialize auth:", error)
          removeStoredToken()
        }
      }

      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string, rememberMe = false): Promise<void> => {
    try {
      setIsLoading(true)

      // Mock API call - replace with actual endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/account/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      const data: LoginResponse = await response.json()

      // Store token
      setStoredToken(data.access)

      // Fetch fresh user data
      const userData = await fetchUserData()
      setUser(userData)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true)

      // Mock API call - replace with actual endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/account/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }



      const data: LoginResponse = await response.json()

      // Store token
      setStoredToken(data.access)

      // Fetch fresh user data
      const userDataResponse = await fetchUserData()
      setUser(userDataResponse)
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true)

      // Call logout endpoint to invalidate token on server
      await apiCall("/account/logout/", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
      // Continue with logout even if API call fails
    } finally {
      // Clear local state and token
      setUser(null)
      removeStoredToken()
      setIsLoading(false)
    }
  }

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      setIsLoading(true)

      const updatedUser = await apiCall("/account/me/", {
        method: "PATCH",
        body: JSON.stringify(userData),
      })

      setUser(updatedUser)
    } catch (error) {
      console.error("Update user error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = async (): Promise<void> => {
    try {
      const userData = await fetchUserData()
      setUser(userData)
    } catch (error) {
      console.error("Refresh user error:", error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
