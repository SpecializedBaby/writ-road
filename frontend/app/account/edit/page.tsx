"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, CheckCircle } from "lucide-react"
import Button from "@/components/Button"

// This would normally come from your auth context or API
const getUserProfile = () => {
  // Mock data for demonstration
  return {
    id: "user123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "New York",
    country: "United States",
    profileImage: "/placeholder.svg?height=200&width=200",
    bio: "Passionate traveler with a love for adventure and exploring new cultures.",
  }
}

export default function EditProfilePage() {
  const router = useRouter()
  const userProfile = getUserProfile()

  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone || "",
    address: userProfile.address || "",
    city: userProfile.city || "",
    country: userProfile.country || "",
    bio: userProfile.bio || "",
  })

  const [profileImage, setProfileImage] = useState<string | null>(userProfile.profileImage)
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewProfileImage(file)
      setProfileImage(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setNewProfileImage(null)
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
      // const formDataToSend = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   formDataToSend.append(key, value);
      // });
      //
      // if (newProfileImage) {
      //   formDataToSend.append('profileImage', newProfileImage);
      // }
      //
      // const response = await fetch('/api/account/profile', {
      //   method: 'PUT',
      //   body: formDataToSend
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to update profile');
      // }

      setUpdateSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Profile update error:", error)
      setErrors({
        form: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <Link href="/account" className="flex items-center text-[#5E6282] hover:text-[#f26336] transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                <span>Back to Account</span>
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h1 className="text-2xl font-bold text-[#14183E] mb-6">Edit Profile</h1>

              {updateSuccess && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex items-center">
                  <CheckCircle size={20} className="mr-2" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              {errors.form && <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">{errors.form}</div>}

              <form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="mb-8">
                  <label className="block text-[#14183E] font-medium mb-2">Profile Picture</label>
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                        {profileImage ? (
                          <Image
                            src={profileImage || "/placeholder.svg"}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>
                      {profileImage && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div className="ml-6">
                      <label
                        htmlFor="profile-image-upload"
                        className="flex items-center px-4 py-2 bg-gray-100 text-[#14183E] rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <Upload size={18} className="mr-2" />
                        <span>Upload New Photo</span>
                        <input
                          id="profile-image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="text-xs text-[#5E6282] mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-[#14183E] mb-4">Personal Information</h2>

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
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-[#14183E] font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-[#14183E] mb-4">Address Information</h2>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-[#14183E] font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-[#14183E] font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]"
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-[#14183E] font-medium mb-2">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]"
                      >
                        <option value="">Select a country</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Spain">Spain</option>
                        <option value="Italy">Italy</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <label htmlFor="bio" className="block text-[#14183E] font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f26336]"
                    placeholder="Tell us a bit about yourself..."
                  ></textarea>
                  <p className="text-xs text-[#5E6282] mt-1">
                    This information will be displayed on your public profile.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <Link href="/account">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Cancel
                    </Button>
                  </Link>

                  <Button variant="primary" className="w-full sm:w-auto" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
