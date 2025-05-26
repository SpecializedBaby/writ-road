"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface UseAuthRedirectOptions {
  requireAuth?: boolean
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

export const useAuthRedirect = ({
  requireAuth = false,
  redirectTo = "/auth/login",
  redirectIfAuthenticated = false,
}: UseAuthRedirectOptions = {}) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
    }

    if (redirectIfAuthenticated && isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, redirectIfAuthenticated, router])

  return { isAuthenticated, isLoading }
}
