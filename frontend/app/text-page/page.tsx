"use client"

import { useAuth } from "@/contexts/AuthContext"

export default function TestPage() {
  const { user, isAuthenticated } = useAuth()
  return (
    <div>
      <h1>Auth Test</h1>
      <p>Is authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
