"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { User, Settings, LogOut, CreditCard, MapPin, Calendar, Clock, ChevronRight } from "lucide-react"
import Button from "@/components/Button"

// This would normally come from your auth context or API
const getUserProfile = () => {
  // Mock data for demonstration
  return {
    id: "user123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profileImage: "/placeholder.svg?height=200&width=200",
    joinedDate: "January 2023",
    upcomingTrips: 2,
    completedTrips: 5,
  }
}

// This would normally come from your API
const getUserBookings = () => {
  // Mock data for demonstration
  return [
    {
      id: "booking1",
      tripName: "Exploring Ancient Temples",
      destination: "Southeast Asia",
      startDate: "2025-06-10",
      endDate: "2025-06-24",
      status: "upcoming",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "booking2",
      tripName: "Northern Lights Adventure",
      destination: "Scandinavia",
      startDate: "2025-09-05",
      endDate: "2025-09-15",
      status: "upcoming",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "booking3",
      tripName: "Mediterranean Cruise",
      destination: "Southern Europe",
      startDate: "2024-07-15",
      endDate: "2024-07-27",
      status: "completed",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "booking4",
      tripName: "Safari Adventure",
      destination: "East Africa",
      startDate: "2024-03-10",
      endDate: "2024-03-19",
      status: "completed",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "booking5",
      tripName: "Inca Trail Expedition",
      destination: "South America",
      startDate: "2023-11-05",
      endDate: "2023-11-16",
      status: "completed",
      image: "/placeholder.svg?height=100&width=150",
    },
  ]
}

// Format date to display as "10 Jun 2025"
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function AccountPage() {
  const router = useRouter()
  const user = getUserProfile()
  const bookings = getUserBookings()
  const upcomingBookings = bookings.filter((booking) => booking.status === "upcoming")
  const completedBookings = bookings.filter((booking) => booking.status === "completed")

  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming")

  const handleLogout = async () => {
    // This would be replaced with your actual logout logic
    // await fetch('/api/auth/logout', { method: 'POST' });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left sidebar - User profile */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <Image
                        src={user.profileImage || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-xl font-bold text-[#14183E]">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-[#5E6282] text-sm">Member since {user.joinedDate}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-[#f26336]">{user.upcomingTrips}</p>
                      <p className="text-[#5E6282] text-sm">Upcoming Trips</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-[#f26336]">{user.completedTrips}</p>
                      <p className="text-[#5E6282] text-sm">Completed Trips</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      href="/account/edit"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <User size={20} className="text-[#5E6282] mr-3" />
                        <span className="text-[#14183E]">Edit Profile</span>
                      </div>
                      <ChevronRight size={18} className="text-[#5E6282]" />
                    </Link>

                    <Link
                      href="/account/payment-methods"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <CreditCard size={20} className="text-[#5E6282] mr-3" />
                        <span className="text-[#14183E]">Payment Methods</span>
                      </div>
                      <ChevronRight size={18} className="text-[#5E6282]" />
                    </Link>

                    <Link
                      href="/account/settings"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <Settings size={20} className="text-[#5E6282] mr-3" />
                        <span className="text-[#14183E]">Account Settings</span>
                      </div>
                      <ChevronRight size={18} className="text-[#5E6282]" />
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center">
                        <LogOut size={20} className="text-red-500 mr-3" />
                        <span className="text-red-500">Logout</span>
                      </div>
                      <ChevronRight size={18} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right content - Bookings */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-[#14183E] mb-6">My Trips</h2>

                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`pb-3 px-4 font-medium ${
                        activeTab === "upcoming"
                          ? "text-[#f26336] border-b-2 border-[#f26336]"
                          : "text-[#5E6282] hover:text-[#14183E]"
                      }`}
                      onClick={() => setActiveTab("upcoming")}
                    >
                      Upcoming Trips ({upcomingBookings.length})
                    </button>
                    <button
                      className={`pb-3 px-4 font-medium ${
                        activeTab === "completed"
                          ? "text-[#f26336] border-b-2 border-[#f26336]"
                          : "text-[#5E6282] hover:text-[#14183E]"
                      }`}
                      onClick={() => setActiveTab("completed")}
                    >
                      Trip History ({completedBookings.length})
                    </button>
                  </div>

                  {/* Bookings list */}
                  <div className="space-y-4">
                    {activeTab === "upcoming" ? (
                      upcomingBookings.length > 0 ? (
                        upcomingBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div className="w-full sm:w-auto sm:mr-4 mb-4 sm:mb-0">
                              <div className="relative w-full sm:w-24 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src={booking.image || "/placeholder.svg"}
                                  alt={booking.tripName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>

                            <div className="flex-grow">
                              <h3 className="text-lg font-bold text-[#14183E] mb-1">{booking.tripName}</h3>
                              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-[#5E6282] mb-2">
                                <div className="flex items-center mr-4">
                                  <MapPin size={14} className="mr-1" />
                                  <span>{booking.destination}</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar size={14} className="mr-1" />
                                  <span>
                                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Clock size={14} className="text-[#f1a501] mr-1" />
                                <span className="text-sm text-[#f1a501] font-medium">
                                  {new Date(booking.startDate) > new Date()
                                    ? `${Math.ceil(
                                        (new Date(booking.startDate).getTime() - new Date().getTime()) /
                                          (1000 * 60 * 60 * 24),
                                      )} days until departure`
                                    : "Departing soon"}
                                </span>
                              </div>
                            </div>

                            <div className="w-full sm:w-auto mt-4 sm:mt-0">
                              <Link href={`/account/bookings/${booking.id}`}>
                                <Button variant="outline" className="w-full sm:w-auto">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-[#5E6282] mb-4">You don't have any upcoming trips.</p>
                          <Link href="/">
                            <Button variant="primary">Explore Trips</Button>
                          </Link>
                        </div>
                      )
                    ) : completedBookings.length > 0 ? (
                      completedBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="w-full sm:w-auto sm:mr-4 mb-4 sm:mb-0">
                            <div className="relative w-full sm:w-24 h-16 rounded-lg overflow-hidden">
                              <Image
                                src={booking.image || "/placeholder.svg"}
                                alt={booking.tripName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div className="flex-grow">
                            <h3 className="text-lg font-bold text-[#14183E] mb-1">{booking.tripName}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-[#5E6282] mb-2">
                              <div className="flex items-center mr-4">
                                <MapPin size={14} className="mr-1" />
                                <span>{booking.destination}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar size={14} className="mr-1" />
                                <span>
                                  {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="w-full sm:w-auto mt-4 sm:mt-0 flex space-x-2">
                            <Link href={`/account/bookings/${booking.id}`}>
                              <Button variant="outline" className="w-full sm:w-auto">
                                View Details
                              </Button>
                            </Link>
                            <Link href={`/account/reviews/add?trip=${booking.id}`}>
                              <Button variant="primary" className="w-full sm:w-auto">
                                Write Review
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-[#5E6282] mb-4">You haven't completed any trips yet.</p>
                        <Link href="/">
                          <Button variant="primary">Explore Trips</Button>
                        </Link>
                      </div>
                    )}
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
