"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import Button from "@/components/Button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)

    // Clear error when user starts typing
    if (errors.email) {
      setErrors({})
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // This would be replaced with your actual API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to send reset email');
      // }

      setResetEmailSent(true)
    } catch (error) {
      console.error("Forgot password error:", error)
      setErrors({
        form: error instanceof Error ? error.message : "Failed to send reset email. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (resetEmailSent) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Mail size={64} className="text-[#f26336]" />
              </div>
              <h1 className="text-2xl font-bold text-[#14183E] mb-4">Check Your Email</h1>
              <p className="text-[#5E6282] mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
                instructions to reset your password.
              </p>
              <p className="text-[#5E6282] mb-6">
                If you don't see the email, check your spam folder or request another reset link.
              </p>
              <div className="space-y-4">
                <Button variant="primary" className="w-full" onClick={() => setResetEmailSent(false)}>
                  Resend Email
                </Button>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Link href="/auth/login" className="flex items-center text-[#5E6282] hover:text-[#f26336] mb-6">
                <ArrowLeft size={20} className="mr-2" />
                <span>Back to Login</span>
              </Link>

              <h1 className="text-3xl font-bold text-[#14183E] mb-2">Forgot Password</h1>
              <p className="text-[#5E6282] mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {errors.form && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{errors.form}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-[#14183E] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <Button variant="primary" className="w-full mb-4" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
