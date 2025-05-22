"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import Button from "./Button"

interface LogoutButtonProps {
  variant?: "text" | "button" | "icon"
  className?: string
}

export default function LogoutButton({ variant = "text", className = "" }: LogoutButtonProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      // This would be replaced with your actual API call
      // await fetch('/api/auth/logout', { method: 'POST' });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (variant === "button") {
    return (
      <Button variant="outline" className={className} onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? "Logging out..." : "Logout"}
      </Button>
    )
  }

  if (variant === "icon") {
    return (
      <button
        className={`p-2 rounded-full hover:bg-gray-100 ${className}`}
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-label="Logout"
      >
        <LogOut size={20} className="text-[#5E6282]" />
      </button>
    )
  }

  return (
    <button
      className={`flex items-center text-[#5E6282] hover:text-[#f26336] ${className}`}
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <LogOut size={18} className="mr-2" />
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </button>
  )
}
