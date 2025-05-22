import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowLeft, Star, Filter } from "lucide-react"
import Button from "@/components/Button"

const getAuthorByUsername = (username: string) => {
  // Convert hyphenated username to a readable name (e.g., "john-smith" to "John Smith")
  const displayName = username
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Mock data for demonstration
  return {
    id: username,
    name: displayName,
    image: "/placeholder.svg?height=200&width=200",
    profession: "Travel Photographer",
    description:
      "Award-winning photographer specializing in landscape and cultural photography. Has traveled to over 50 countries documenting diverse cultures and natural wonders.",
    rating: 4.9,
    tripCount: 12,
    experience: 8,
    languages: ["English", "Spanish", "French"],
    specialties: ["Photography", "Cultural Immersion", "Adventure"],
  }
}

const getTripsByAuthor = (username: string) => {
  // Mock data for demonstration
  return [
    {
      id: "trip1",
      title: "Exploring Ancient Temples",
      image: "/placeholder.svg?height=300&width=400",
      destination: "Southeast Asia",
      countries: ["Thailand", "Cambodia", "Vietnam"],
      duration: 14,
      price: 2450,
      dates: [
        { from: "2025-06-10", to: "2025-06-24", spotsLeft: 8 },
        { from: "2025-07-15", to: "2025-07-29", spotsLeft: 4 },
      ],
      featured: true,
    },
    {
      id: "trip2",
      title: "Northern Lights Adventure",
      image: "/placeholder.svg?height=300&width=400",
      destination: "Scandinavia",
      countries: ["Norway", "Finland", "Sweden"],
      duration: 10,
      price: 1800,
      dates: [{ from: "2025-09-05", to: "2025-09-15", spotsLeft: 6 }],
    },
    {
      id: "trip3",
      title: "Mediterranean Cruise",
      image: "/placeholder.svg?height=300&width=400",
      destination: "Southern Europe",
      countries: ["Italy", "Greece", "Croatia"],
      duration: 12,
      price: 2200,
      dates: [
        { from: "2025-06-15", to: "2025-06-27", spotsLeft: 10 },
        { from: "2025-08-10", to: "2025-08-22", spotsLeft: 12 },
      ],
    },
    {
      id: "trip4",
      title: "Safari Adventure",
      image: "/placeholder.svg?height=300&width=400",
      destination: "East Africa",
      countries: ["Kenya", "Tanzania"],
      duration: 9,
      price: 3100,
      dates: [{ from: "2025-07-05", to: "2025-07-14", spotsLeft: 4 }],
    },
    {
      id: "trip5",
      title: "Inca Trail Expedition",
      image: "/placeholder.svg?height=300&width=400",
      destination: "South America",
      countries: ["Peru", "Bolivia"],
      duration: 11,
      price: 1950,
      dates: [{ from: "2025-05-10", to: "2025-05-21", spotsLeft: 8 }],
    },
  ]
}

// Format date to display as "10 Jun - 24 Jun 2025"
const formatDateRange = (from: string, to: string) => {
  const fromDate = new Date(from)
  const toDate = new Date(to)

  const fromDay = fromDate.getDate()
  const fromMonth = fromDate.toLocaleString("default", { month: "short" })
  const fromYear = fromDate.getFullYear()

  const toDay = toDate.getDate()
  const toMonth = toDate.toLocaleString("default", { month: "short" })
  const toYear = toDate.getFullYear()

  if (fromYear === toYear && fromMonth === toMonth) {
    return `${fromDay} - ${toDay} ${fromMonth} ${fromYear}`
  } else if (fromYear === toYear) {
    return `${fromDay} ${fromMonth} - ${toDay} ${toMonth} ${fromYear}`
  } else {
    return `${fromDay} ${fromMonth} ${fromYear} - ${toDay} ${toMonth} ${toYear}`
  }
}

export default function AuthorTripsPage({ params }: { params: { username: string } }) {
  const username = params.username
  const author = getAuthorByUsername(username)
  const trips = getTripsByAuthor(username)

  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20">
        {/* Author Profile Section */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex items-center mb-6">
            <Link href="/authors" className="flex items-center text-[#5E6282] hover:text-[#f26336] transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to all authors</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={author.image || "/placeholder.svg"}
                  alt={author.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#14183E] mb-1">{author.name}</h1>
                    <p className="text-[#f26336] text-lg mb-2">{author.profession}</p>
                  </div>

                  <div className="flex items-center justify-center md:justify-start mt-2 md:mt-0">
                    <div className="flex items-center">
                      <Star className="fill-[#FFC107] text-[#FFC107] mr-1" size={20} />
                      <span className="font-bold text-[#14183E] mr-1">{author.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[#5E6282]">rating</span>
                  </div>
                </div>

                <p className="text-[#5E6282] mb-6">{author.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#14183E] mb-1">Experience</h3>
                    <p className="text-[#5E6282]">{author.experience} years</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#14183E] mb-1">Languages</h3>
                    <p className="text-[#5E6282]">{author.languages.join(", ")}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#14183E] mb-1">Specialties</h3>
                    <p className="text-[#5E6282]">{author.specialties.join(", ")}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <Button variant="primary">Contact {author.name.split(" ")[0]}</Button>
                  <Button variant="outline">Read Author's Blog</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trips Section */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#14183E] mb-2">Trips by {author.name}</h2>
              <p className="text-[#5E6282]">
                Discover {trips.length} unique travel experiences curated by {author.name}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center">
                <Filter size={16} className="mr-2" />
                Filter Trips
              </Button>
            </div>
          </div>

          {/* Featured Trip */}
          {trips.some((trip) => trip.featured) && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-[#14183E] mb-4">Featured Trip</h3>
              {trips
                .filter((trip) => trip.featured)
                .map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-64 md:h-auto">
                        <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-[#14183E] mb-3">{trip.title}</h3>
                        <div className="flex items-center text-[#5E6282] mb-4">
                          <MapPin size={16} className="mr-1" />
                          <span>{trip.destination}</span>
                        </div>
                        <div className="flex items-center text-[#5E6282] mb-4">
                          <Calendar size={16} className="mr-1" />
                          <span>{trip.duration} days</span>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-[#5E6282] mb-2">Countries:</h4>
                          <div className="flex flex-wrap gap-2">
                            {trip.countries.map((country) => (
                              <span
                                key={country}
                                className="bg-[#f26336]/10 text-[#f26336] px-3 py-1 rounded-full text-sm"
                              >
                                {country}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-medium text-[#5E6282] mb-2">Next available dates:</h4>
                          <div className="space-y-2">
                            {trip.dates.slice(0, 2).map((date, index) => (
                              <div key={index} className="bg-gray-50 p-2 rounded-md text-sm flex justify-between">
                                <span>{formatDateRange(date.from, date.to)}</span>
                                <span
                                  className={`${date.spotsLeft <= 4 ? "text-amber-600" : "text-green-600"} font-medium`}
                                >
                                  {date.spotsLeft} spots left
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-[#14183E]">€{trip.price}</div>
                          <Link
                            href={`/authors-trips/${trip.id}`}
                            className="bg-[#f1a501] text-white px-4 py-2 rounded-lg hover:bg-[#f1a501]/90 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* All Trips */}
          <div>
            <h3 className="text-xl font-bold text-[#14183E] mb-4">All Trips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips
                .filter((trip) => !trip.featured)
                .map((trip) => (
                  <div
                    key={trip.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image src={trip.image || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#14183E] mb-2">{trip.title}</h3>

                      <div className="flex items-center text-[#5E6282] mb-3">
                        <MapPin size={16} className="mr-1" />
                        <span>{trip.destination}</span>
                      </div>

                      <div className="flex items-center text-[#5E6282] mb-3">
                        <Calendar size={16} className="mr-1" />
                        <span>{trip.duration} days</span>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {trip.countries.slice(0, 3).map((country) => (
                            <span
                              key={country}
                              className="bg-[#f26336]/10 text-[#f26336] px-2 py-0.5 rounded-full text-xs"
                            >
                              {country}
                            </span>
                          ))}
                          {trip.countries.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                              +{trip.countries.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-[#5E6282] mb-1">Next available date:</div>
                        <div className="bg-gray-50 p-2 rounded-md text-sm flex justify-between">
                          <span>{formatDateRange(trip.dates[0].from, trip.dates[0].to)}</span>
                          <span
                            className={`${trip.dates[0].spotsLeft <= 4 ? "text-amber-600" : "text-green-600"} font-medium`}
                          >
                            {trip.dates[0].spotsLeft} spots
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-[#14183E]">€{trip.price}</div>
                        <Link
                          href={`/authors-trips/${trip.id}`}
                          className="bg-[#f1a501] text-white px-4 py-2 rounded-lg hover:bg-[#f1a501]/90 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
