"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, CheckCircle } from "lucide-react"
import Button from "@/components/Button"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
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
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     firstName: formData.firstName,
      //     lastName: formData.lastName,
      //     email: formData.email,
      //     password: formData.password
      //   })
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Registration failed');
      // }

      setRegistrationSuccess(true)

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({
        form: error instanceof Error ? error.message : "Registration failed. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-[#14183E] mb-4">Registration Successful!</h1>
              <p className="text-[#5E6282] mb-6">
                Your account has been created successfully. You will be redirected to the login page shortly.
              </p>
              <Link href="/auth/login/">
                <Button variant="primary" className="w-full">
                  Go to Login
                </Button>
              </Link>
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
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left side - Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-[#14183E] mb-2">Create an Account</h1>
                <p className="text-[#5E6282] mb-8">Join FieryTrips and start planning your next adventure</p>

                {errors.form && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{errors.form}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-[#14183E] font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[#14183E] font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-[#14183E] font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-[#14183E] font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-[#14183E] font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full p-3 border ${
                          errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <Button variant="primary" className="w-full mb-4" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>

                  <p className="text-center text-[#5E6282]">
                    Already have an account?{" "}
                    <Link href="/auth/login/" className="text-[#f26336] font-medium hover:underline">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>

              {/* Right side - Image and benefits */}
              <div className="hidden md:block">
                <div className="relative h-80 mb-6">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="Join FieryTrips"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-[#14183E] mb-4">Why Join FieryTrips?</h2>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-[#f26336]/10 p-2 rounded-full mr-4">
                        <CheckCircle className="text-[#f26336]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#14183E]">Exclusive Deals</h3>
                        <p className="text-[#5E6282] text-sm">
                          Get access to member-only discounts and early bird offers
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-[#f26336]/10 p-2 rounded-full mr-4">
                        <CheckCircle className="text-[#f26336]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#14183E]">Save Your Favorites</h3>
                        <p className="text-[#5E6282] text-sm">Bookmark trips and destinations for future planning</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-[#f26336]/10 p-2 rounded-full mr-4">
                        <CheckCircle className="text-[#f26336]" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#14183E]">Faster Booking</h3>
                        <p className="text-[#5E6282] text-sm">Save your details for quicker checkout on future trips</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
