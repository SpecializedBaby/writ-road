import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowLeft, Star, Users, Globe } from "lucide-react"
import DestinationTourFilters from "@/components/DestinationTourFilters"

// This will come from API
const getDestinationById = (id: string) => {
  // Mock data for demonstration
  return {
    id: id,
    name: "Rome",
    country: "Italy",
    continent: "Europe",
    description:
      "Rome, the Eternal City, is a living museum where ancient history meets vibrant modern life. From the iconic Colosseum to the Vatican's artistic treasures, every corner tells a story spanning over 2,500 years.",
    image: "/placeholder.svg?height=500&width=1200",
    imageWidth: 1200,
    imageHeight: 500,
    category: "Historical",
    bestTimeToVisit: "April-June, September-October",
    averageTemp: "15-25°C",
    timeZone: "CET (UTC+1)",
    language: "Italian",
    currency: "Euro (EUR)",
    highlights: [
      "Colosseum and Roman Forum",
      "Vatican City and Sistine Chapel",
      "Trevi Fountain",
      "Pantheon",
      "Spanish Steps",
      "Trastevere District",
    ],
    weatherInfo: {
      spring: "Mild and pleasant, perfect for walking",
      summer: "Hot and crowded, early morning tours recommended",
      autumn: "Comfortable temperatures, fewer crowds",
      winter: "Cool but mild, indoor attractions ideal",
    },
  }
}

// This will come from API
const getToursByDestination = (destinationId: string) => {
  // Mock data for demonstration
  return [
    {
      id: "tour1",
      title: "Ancient Rome Walking Tour",
      image: "/placeholder.svg?height=300&width=400",
      imageWidth: 400,
      imageHeight: 300,
      destination: "Rome, Italy",
      duration: 3,
      price: 450,
      rating: 4.9,
      reviewCount: 127,
      groupSize: "8-12",
      dates: [
        { from: "2025-06-10", to: "2025-06-13" },
        { from: "2025-07-15", to: "2025-07-18" },
      ],
      author: {
        name: "Marco Rossi",
        image: "/placeholder.svg?height=50&width=50",
        languages: ["English", "Italian", "Spanish"],
        experience: 8,
        specialty: "Historical Tours",
      },
      featured: true,
    },
    {
      id: "tour2",
      title: "Vatican and Art Masterpieces",
      image: "/placeholder.svg?height=300&width=400",
      imageWidth: 400,
      imageHeight: 300,
      destination: "Rome, Italy",
      duration: 2,
      price: 380,
      rating: 4.8,
      reviewCount: 89,
      groupSize: "6-10",
      dates: [{ from: "2025-08-05", to: "2025-08-07" }],
      author: {
        name: "Sofia Benedetti",
        image: "/placeholder.svg?height=50&width=50",
        languages: ["English", "Italian", "French"],
        experience: 6,
        specialty: "Art History",
      },
    },
    {
      id: "tour3",
      title: "Roman Culinary Experience",
      image: "/placeholder.svg?height=300&width=400",
      imageWidth: 400,
      imageHeight: 300,
      destination: "Rome, Italy",
      duration: 4,
      price: 520,
      rating: 4.7,
      reviewCount: 156,
      groupSize: "8-14",
      dates: [{ from: "2025-09-10", to: "2025-09-14" }],
      author: {
        name: "Giuseppe Romano",
        image: "/placeholder.svg?height=50&width=50",
        languages: ["English", "Italian"],
        experience: 12,
        specialty: "Culinary Tours",
      },
    },
    {
      id: "tour4",
      title: "Underground Rome Discovery",
      image: "/placeholder.svg?height=300&width=400",
      imageWidth: 400,
      imageHeight: 300,
      destination: "Rome, Italy",
      duration: 1,
      price: 180,
      rating: 4.6,
      reviewCount: 73,
      groupSize: "10-15",
      dates: [
        { from: "2025-05-15", to: "2025-05-16" },
        { from: "2025-06-20", to: "2025-06-21" },
      ],
      author: {
        name: "Alessandro Conti",
        image: "/placeholder.svg?height=50&width=50",
        languages: ["English", "Italian", "German"],
        experience: 5,
        specialty: "Archaeological Tours",
      },
    },
    {
      id: "tour5",
      title: "Rome Photography Workshop",
      image: "/placeholder.svg?height=300&width=400",
      imageWidth: 400,
      imageHeight: 300,
      destination: "Rome, Italy",
      duration: 3,
      price: 420,
      rating: 4.8,
      reviewCount: 94,
      groupSize: "6-8",
      dates: [{ from: "2025-07-01", to: "2025-07-04" }],
      author: {
        name: "Elena Marchetti",
        image: "/placeholder.svg?height=50&width=50",
        languages: ["English", "Italian", "Portuguese"],
        experience: 7,
        specialty: "Photography Tours",
      },
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

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  const destination = getDestinationById(params.id)
  const tours = getToursByDestination(params.id)

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative h-[500px] mb-12">
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={`${destination.name}, ${destination.country}`}
            width={destination.imageWidth}
            height={destination.imageHeight}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
              <div className="max-w-4xl text-white">
                <div className="flex items-center mb-4">
                  <Link
                    href="/destinations"
                    className="flex items-center text-white hover:text-[#f1a501] transition-colors"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    <span>Back to destinations</span>
                  </Link>
                </div>
                <div className="flex items-center mb-4">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm mr-4">
                    {destination.category}
                  </span>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>
                      {destination.country}, {destination.continent}
                    </span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
                <p className="text-lg md:text-xl max-w-3xl">{destination.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Destination Info */}
          <section className="bg-white rounded-2xl p-8 shadow-md mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-[#14183E] mb-6">Travel Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-[#5E6282] mb-1">Best Time to Visit</h3>
                    <p className="text-[#14183E] text-sm">{destination.bestTimeToVisit}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E6282] mb-1">Average Temperature</h3>
                    <p className="text-[#14183E] text-sm">{destination.averageTemp}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E6282] mb-1">Time Zone</h3>
                    <p className="text-[#14183E] text-sm">{destination.timeZone}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5E6282] mb-1">Currency</h3>
                    <p className="text-[#14183E] text-sm">{destination.currency}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#14183E] mb-6">Must-See Highlights</h2>
                <div className="grid grid-cols-1 gap-2">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-[#f26336] rounded-full mr-3"></div>
                      <span className="text-[#14183E]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tours Section */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#14183E] mb-2">Tours in {destination.name}</h2>
                <p className="text-[#5E6282]">
                  Discover our selection of {tours.length} expert-led tours in {destination.name}
                </p>
              </div>
            </div>

            <DestinationTourFilters />

            {/* Featured Tour */}
            {tours.some((tour) => tour.featured) && (
              <div className="mb-12">
                <h3 className="text-xl font-bold text-[#14183E] mb-4">Featured Tour</h3>
                {tours
                  .filter((tour) => tour.featured)
                  .map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative h-64 md:h-80">
                          <Image
                            src={tour.image || "/placeholder.svg"}
                            alt={tour.title}
                            width={tour.imageWidth}
                            height={tour.imageHeight}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-[#14183E] mb-3">{tour.title}</h3>

                          <div className="flex items-center mb-4">
                            <div className="flex items-center mr-4">
                              <Star className="fill-[#FFC107] text-[#FFC107] mr-1" size={16} />
                              <span className="font-bold text-[#14183E] mr-1">{tour.rating}</span>
                              <span className="text-[#5E6282] text-sm">({tour.reviewCount} reviews)</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center text-[#5E6282]">
                              <Calendar size={16} className="mr-1" />
                              <span>
                                {tour.duration} {tour.duration === 1 ? "day" : "days"}
                              </span>
                            </div>
                            <div className="flex items-center text-[#5E6282]">
                              <Users size={16} className="mr-1" />
                              <span>{tour.groupSize} people</span>
                            </div>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                              <Image
                                src={tour.author.image || "/placeholder.svg"}
                                alt={tour.author.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-bold text-[#14183E] text-sm">{tour.author.name}</h4>
                              <p className="text-[#5E6282] text-xs">{tour.author.specialty}</p>
                              <div className="flex items-center mt-1">
                                <Globe size={12} className="mr-1 text-[#5E6282]" />
                                <span className="text-xs text-[#5E6282]">{tour.author.languages.join(", ")}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-[#5E6282]">{tour.author.experience} years exp.</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-[#14183E]">€{tour.price}</div>
                            <Link
                              href={`/authors-trips/${tour.id}`}
                              className="bg-[#f1a501] text-white px-6 py-2 rounded-lg hover:bg-[#f1a501]/90 transition-colors"
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

            {/* All Tours */}
            <div>
              <h3 className="text-xl font-bold text-[#14183E] mb-4">All Tours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours
                  .filter((tour) => !tour.featured)
                  .map((tour) => (
                    <div
                      key={tour.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48">
                        <Image
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.title}
                          width={tour.imageWidth}
                          height={tour.imageHeight}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#14183E] mb-2">{tour.title}</h3>

                        <div className="flex items-center mb-3">
                          <Star className="fill-[#FFC107] text-[#FFC107] mr-1" size={14} />
                          <span className="font-bold text-[#14183E] mr-1 text-sm">{tour.rating}</span>
                          <span className="text-[#5E6282] text-xs">({tour.reviewCount})</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                          <div className="flex items-center text-[#5E6282]">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              {tour.duration} {tour.duration === 1 ? "day" : "days"}
                            </span>
                          </div>
                          <div className="flex items-center text-[#5E6282]">
                            <Users size={14} className="mr-1" />
                            <span>{tour.groupSize}</span>
                          </div>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center mb-4 p-2 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                            <Image
                              src={tour.author.image || "/placeholder.svg"}
                              alt={tour.author.name}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-bold text-[#14183E] text-xs">{tour.author.name}</h4>
                            <div className="flex items-center">
                              <Globe size={10} className="mr-1 text-[#5E6282]" />
                              <span className="text-xs text-[#5E6282]">
                                {tour.author.languages.slice(0, 2).join(", ")}
                                {tour.author.languages.length > 2 && ` +${tour.author.languages.length - 2}`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-[#14183E]">€{tour.price}</div>
                          <Link
                            href={`/authors-trips/${tour.id}`}
                            className="bg-[#f1a501] text-white px-4 py-2 rounded-lg hover:bg-[#f1a501]/90 transition-colors text-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
