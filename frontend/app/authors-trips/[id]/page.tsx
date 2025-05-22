import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Users, Star, ArrowLeft, Share2, Heart } from "lucide-react"
import Button from "@/components/Button"

const getTripById = (id: string) => {
  // Mock data for demonstration
  return {
    id,
    title: "Exploring Ancient Temples",
    description:
      "Embark on a journey through time as we explore the ancient temples of Southeast Asia. This carefully curated trip takes you off the beaten path to discover hidden gems and iconic landmarks alike. You'll experience local culture, cuisine, and traditions while staying in comfortable accommodations that reflect the unique character of each destination.",
    longDescription:
      "This 14-day adventure begins in Bangkok, where we'll explore the city's magnificent temples before heading north to Chiang Mai and the ancient city of Sukhothai. From there, we'll cross into Laos to visit Luang Prabang, a UNESCO World Heritage site known for its well-preserved architectural, religious and cultural heritage. Our journey continues to Cambodia's Angkor Wat, one of the most important archaeological sites in Southeast Asia, before concluding in Vietnam with visits to Hanoi and Halong Bay.\n\nThroughout the trip, you'll be accompanied by expert local guides who will share their knowledge and insights, helping you to understand the historical and cultural significance of each site. You'll also have plenty of free time to explore on your own, shop for souvenirs, or simply relax and soak in the atmosphere.",
    destination: "Southeast Asia",
    countries: ["Thailand", "Laos", "Cambodia", "Vietnam"],
    duration: 14,
    price: 2450,
    rating: 4.8,
    reviewCount: 42,
    groupSize: "6-12",
    difficulty: "Moderate",
    author: {
      id: "john-smith",
      name: "John Smith",
      image: "/placeholder.svg?height=100&width=100",
      profession: "Travel Photographer",
    },
    dates: [
      { from: "2025-06-10", to: "2025-06-24", spotsLeft: 8 },
      { from: "2025-07-15", to: "2025-07-29", spotsLeft: 4 },
      { from: "2025-08-20", to: "2025-09-03", spotsLeft: 12 },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangkok",
        description:
          "Arrive in Bangkok and transfer to your hotel. In the evening, meet your guide and fellow travelers for a welcome dinner.",
        accommodation: "Sukhumvit Hotel, Bangkok",
        meals: ["Dinner"],
      },
      {
        day: 2,
        title: "Bangkok Temples",
        description:
          "Full day exploring Bangkok's most famous temples, including Wat Phra Kaew, Wat Pho, and Wat Arun. Evening at leisure.",
        accommodation: "Sukhumvit Hotel, Bangkok",
        meals: ["Breakfast", "Lunch"],
      },
      {
        day: 3,
        title: "Bangkok to Chiang Mai",
        description:
          "Morning flight to Chiang Mai. Afternoon visit to Doi Suthep temple with panoramic views of the city.",
        accommodation: "Ping Nakara Hotel, Chiang Mai",
        meals: ["Breakfast", "Dinner"],
      },
      // More days would be listed here
    ],
    included: [
      "All accommodations (13 nights)",
      "All domestic transportation",
      "English-speaking guides",
      "Entrance fees to all sites",
      "Meals as specified in the itinerary",
      "Airport transfers",
      "Welcome and farewell dinners",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Personal expenses",
      "Alcoholic beverages",
      "Tips for guides and drivers",
    ],
  }
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

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const trip = getTripById(params.id)

  return (
    <div className="min-h-screen">
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative h-[500px] mb-8">
          <Image src={trip.images[0] || "/placeholder.svg"} alt={trip.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
              <div className="max-w-4xl text-white">
                <div className="flex items-center mb-4">
                  <Link
                    href="/authors-trips"
                    className="flex items-center text-white hover:text-[#f1a501] transition-colors"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    <span>Back to all trips</span>
                  </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{trip.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{trip.destination}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{trip.duration} days</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>Group size: {trip.groupSize}</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-1 fill-[#FFC107] text-[#FFC107]" />
                    <span>
                      {trip.rating} ({trip.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Trip Description */}
              <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
                <h2 className="text-2xl font-bold text-[#14183E] mb-4">About This Trip</h2>
                <p className="text-[#5E6282] mb-6">{trip.description}</p>
                <p className="text-[#5E6282] whitespace-pre-line">{trip.longDescription}</p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#14183E] mb-2">Countries Visited</h3>
                    <div className="flex flex-wrap gap-2">
                      {trip.countries.map((country) => (
                        <span key={country} className="bg-[#f26336]/10 text-[#f26336] px-3 py-1 rounded-full text-sm">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-[#14183E] mb-2">Difficulty Level</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#f1a501] h-2.5 rounded-full"
                          style={{
                            width: trip.difficulty === "Easy" ? "33%" : trip.difficulty === "Moderate" ? "66%" : "100%",
                          }}
                        ></div>
                      </div>
                      <span className="ml-3 text-[#5E6282]">{trip.difficulty}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Photo Gallery */}
              <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
                <h2 className="text-2xl font-bold text-[#14183E] mb-6">Photo Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {trip.images.map((image, index) => (
                    <div
                      key={index}
                      className={`rounded-lg overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : ""}`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${trip.title} - image ${index + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Itinerary */}
              <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
                <h2 className="text-2xl font-bold text-[#14183E] mb-6">Itinerary</h2>
                <div className="space-y-6">
                  {trip.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-8 pb-6 border-l-2 border-[#f1a501]/30 last:border-0">
                      <div className="absolute left-[-10px] top-0 w-5 h-5 rounded-full bg-[#f1a501]"></div>
                      <div className="mb-2">
                        <span className="text-sm font-medium text-[#f1a501]">Day {day.day}</span>
                        <h3 className="text-xl font-bold text-[#14183E]">{day.title}</h3>
                      </div>
                      <p className="text-[#5E6282] mb-4">{day.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="font-medium text-[#14183E]">Accommodation:</span>{" "}
                          <span className="text-[#5E6282]">{day.accommodation}</span>
                        </div>
                        <div>
                          <span className="font-medium text-[#14183E]">Meals:</span>{" "}
                          <span className="text-[#5E6282]">{day.meals.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* What's Included */}
              <section className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold text-[#14183E] mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-[#14183E] mb-4">Included in the Price</h3>
                    <ul className="space-y-3">
                      {trip.included.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span className="text-[#5E6282]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#14183E] mb-4">Not Included</h3>
                    <ul className="space-y-3">
                      {trip.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                          <span className="text-[#5E6282]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md sticky top-32 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-[#14183E]">€{trip.price}</div>
                  <div className="flex space-x-2">
                    <button
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      aria-label="Share this trip"
                    >
                      <Share2 size={18} className="text-[#5E6282]" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      aria-label="Save to favorites"
                    >
                      <Heart size={18} className="text-[#5E6282]" />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-[#14183E] mb-3">Available Dates</h3>
                  <div className="space-y-3">
                    {trip.dates.map((date, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 hover:border-[#f1a501] transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-[#14183E] font-medium">{formatDateRange(date.from, date.to)}</div>
                          <div
                            className={`text-sm px-2 py-1 rounded-full ${date.spotsLeft <= 4 ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"}`}
                          >
                            {date.spotsLeft} spots left
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="primary" className="w-full mb-4">
                  Book Now
                </Button>

                <p className="text-sm text-[#5E6282] text-center mb-6">
                  No booking fees. Free cancellation up to 30 days before departure.
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-bold text-[#14183E] mb-3">Have Questions?</h3>
                  <p className="text-sm text-[#5E6282] mb-4">
                    Contact us for any questions about this trip or to request a custom itinerary.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </div>
              </div>

              {/* Trip Leader */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="font-bold text-[#14183E] mb-4">Trip Leader</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={trip.author.image || "/placeholder.svg"}
                      alt={trip.author.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#14183E]">{trip.author.name}</h4>
                    <p className="text-[#f26336] text-sm">{trip.author.profession}</p>
                  </div>
                </div>
                <Link
                  href={`/authors/${trip.author.id}`}
                  className="block w-full text-center text-[#14183E] border border-[#14183E] rounded-lg py-2 hover:bg-[#14183E] hover:text-white transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
