import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, ArrowLeft, Filter } from "lucide-react"
import Button from "@/components/Button"

const getCountryByName = (name: string) => {
  // Mock data for demonstration
  return {
    id: name.toLowerCase(),
    name: name,
    description:
      "Discover the beauty and culture of this amazing destination. From bustling cities to serene landscapes, this country offers a diverse range of experiences for every traveler.",
    image: "/placeholder.svg?height=500&width=1200",
    tripCount: 15,
    capital: "Capital City",
    language: "Official Language",
    currency: "Local Currency",
    bestTimeToVisit: "April to October",
    popularDestinations: ["City One", "City Two", "City Three", "City Four"],
  }
}

const getToursByCountry = (countryName: string) => {
  // Mock data for demonstration
  return [
    {
      id: "tour1",
      title: "Cultural Heritage Tour",
      image: "/placeholder.svg?height=300&width=400",
      destination: countryName,
      duration: 10,
      price: 1450,
      dates: [
        { from: "2025-06-10", to: "2025-06-20" },
        { from: "2025-07-15", to: "2025-07-25" },
      ],
      author: "John Smith",
      featured: true,
    },
    {
      id: "tour2",
      title: "Culinary Adventure",
      image: "/placeholder.svg?height=300&width=400",
      destination: countryName,
      duration: 7,
      price: 1200,
      dates: [{ from: "2025-08-05", to: "2025-08-12" }],
      author: "Emma Johnson",
    },
    {
      id: "tour3",
      title: "Historical Landmarks",
      image: "/placeholder.svg?height=300&width=400",
      destination: countryName,
      duration: 12,
      price: 1800,
      dates: [{ from: "2025-09-10", to: "2025-09-22" }],
      author: "David Chen",
    },
    {
      id: "tour4",
      title: "Nature and Wildlife",
      image: "/placeholder.svg?height=300&width=400",
      destination: countryName,
      duration: 8,
      price: 1350,
      dates: [
        { from: "2025-05-15", to: "2025-05-23" },
        { from: "2025-06-20", to: "2025-06-28" },
      ],
      author: "Sarah Williams",
    },
    {
      id: "tour5",
      title: "Adventure Trek",
      image: "/placeholder.svg?height=300&width=400",
      destination: countryName,
      duration: 14,
      price: 2100,
      dates: [{ from: "2025-07-01", to: "2025-07-15" }],
      author: "Michael Patel",
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

export default function CountryDetailPage({ params }: { params: { name: string } }) {
  // Decode the URL parameter and capitalize the first letter of each word
  const countryName = decodeURIComponent(params.name)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const country = getCountryByName(countryName)
  const tours = getToursByCountry(countryName)

  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative h-[400px] mb-12">
          <Image
            src={country.image || "/placeholder.svg"}
            alt={`${country.name} landscape`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
              <div className="max-w-4xl text-white">
                <div className="flex items-center mb-4">
                  <Link
                    href="countries/"
                    className="flex items-center text-white hover:text-[#f1a501] transition-colors"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    <span>Back to all countries</span>
                  </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{country.name}</h1>
                <p className="text-lg md:text-xl max-w-3xl">{country.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Country Info */}
          <section className="bg-white rounded-2xl p-8 shadow-md mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-[#14183E] mb-6">Country Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-[#5E6282]">Capital</h3>
                      <p className="text-[#14183E]">{country.capital}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#5E6282]">Language</h3>
                      <p className="text-[#14183E]">{country.language}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#5E6282]">Currency</h3>
                      <p className="text-[#14183E]">{country.currency}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#5E6282]">Best Time to Visit</h3>
                      <p className="text-[#14183E]">{country.bestTimeToVisit}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#14183E] mb-6">Popular Destinations</h2>
                <div className="grid grid-cols-2 gap-4">
                  {country.popularDestinations.map((destination, index) => (
                    <div key={index} className="flex items-center">
                      <MapPin size={16} className="text-[#f26336] mr-2" />
                      <span className="text-[#14183E]">{destination}</span>
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
                <h2 className="text-3xl font-bold text-[#14183E] mb-2">Tours in {country.name}</h2>
                <p className="text-[#5E6282]">
                  Discover our selection of {tours.length} tours that include visits to {country.name}
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Button variant="outline" className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filter Tours
                </Button>
              </div>
            </div>

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
                        <div className="relative h-64 md:h-auto">
                          <Image
                            src={tour.image || "/placeholder.svg"}
                            alt={tour.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-[#14183E] mb-3">{tour.title}</h3>
                          <div className="flex items-center text-[#5E6282] mb-4">
                            <MapPin size={16} className="mr-1" />
                            <span>{tour.destination}</span>
                          </div>
                          <div className="flex items-center text-[#5E6282] mb-6">
                            <Calendar size={16} className="mr-1" />
                            <span>{tour.duration} days</span>
                          </div>

                          <div className="mb-6">
                            <h4 className="font-medium text-[#5E6282] mb-2">Available Dates:</h4>
                            <div className="space-y-2">
                              {tour.dates.map((date, index) => (
                                <div key={index} className="bg-gray-50 p-2 rounded-md text-sm">
                                  {formatDateRange(date.from, date.to)}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm text-[#5E6282]">By {tour.author}</div>
                              <div className="text-xl font-bold text-[#14183E]">€{tour.price}</div>
                            </div>

                            <Link
                              href={`/authors-trips/${tour.id}`}
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
                        <Image src={tour.image || "/placeholder.svg"} alt={tour.title} fill className="object-cover" />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#14183E] mb-2">{tour.title}</h3>

                        <div className="flex items-center text-[#5E6282] mb-4">
                          <MapPin size={16} className="mr-1" />
                          <span>{tour.destination}</span>
                        </div>

                        <div className="flex items-center text-[#5E6282] mb-4">
                          <Calendar size={16} className="mr-1" />
                          <span>{tour.duration} days</span>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm text-[#5E6282] mb-1">Next available date:</div>
                          <div className="bg-gray-50 p-2 rounded-md text-sm">
                            {formatDateRange(tour.dates[0].from, tour.dates[0].to)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-[#5E6282]">By {tour.author}</div>
                            <div className="text-xl font-bold text-[#14183E]">€{tour.price}</div>
                          </div>

                          <Link
                            href={`/authors-trips/${tour.id}`}
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
          </section>
        </div>
      </main>
    </div>
  )
}
