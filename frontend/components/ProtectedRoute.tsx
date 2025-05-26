"use client"

import type { ReactNode } from "react"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
  requireAuth?: boolean
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  fallback = <div>Loading...</div>,
  requireAuth = true,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { isLoading } = useAuthRedirect({ requireAuth, redirectTo })

  if (isLoading) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
