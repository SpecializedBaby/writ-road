import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import DestinationCard from "@/components/DestinationCard"
import DestinationFilters from "@/components/DestinationFilters"

export default function DestinationsPage() {
  // Sample destinations data - would come from an API in a real application
  const destinations = [
    {
      id: "rome-italy",
      name: "Rome",
      country: "Italy",
      continent: "Europe",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 24,
      category: "Historical",
      description: "Explore the eternal city with its ancient ruins, magnificent architecture, and rich history.",
      bestTimeToVisit: "April-June, September-October",
      averageTemp: "15-25°C",
      popular: true,
    },
    {
      id: "tokyo-japan",
      name: "Tokyo",
      country: "Japan",
      continent: "Asia",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 18,
      category: "Cultural",
      description: "Experience the perfect blend of traditional culture and modern innovation in Japan's capital.",
      bestTimeToVisit: "March-May, September-November",
      averageTemp: "10-20°C",
      popular: true,
    },
    {
      id: "paris-france",
      name: "Paris",
      country: "France",
      continent: "Europe",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 32,
      category: "Cultural",
      description: "The city of light offers romance, art, cuisine, and iconic landmarks.",
      bestTimeToVisit: "April-June, September-October",
      averageTemp: "12-22°C",
      popular: true,
    },
    {
      id: "bangkok-thailand",
      name: "Bangkok",
      country: "Thailand",
      continent: "Asia",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 15,
      category: "Adventure",
      description: "Vibrant street life, ornate shrines, and bustling markets in Thailand's capital.",
      bestTimeToVisit: "November-March",
      averageTemp: "25-35°C",
      popular: false,
    },
    {
      id: "barcelona-spain",
      name: "Barcelona",
      country: "Spain",
      continent: "Europe",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 27,
      category: "Cultural",
      description: "Gaudí's architectural masterpieces, beautiful beaches, and vibrant nightlife.",
      bestTimeToVisit: "May-June, September-October",
      averageTemp: "15-25°C",
      popular: true,
    },
    {
      id: "santorini-greece",
      name: "Santorini",
      country: "Greece",
      continent: "Europe",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 21,
      category: "Beach",
      description: "Stunning sunsets, white-washed buildings, and crystal-clear waters.",
      bestTimeToVisit: "April-June, September-October",
      averageTemp: "18-28°C",
      popular: true,
    },
    {
      id: "sydney-australia",
      name: "Sydney",
      country: "Australia",
      continent: "Oceania",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 12,
      category: "Adventure",
      description: "Iconic harbor, beautiful beaches, and vibrant cultural scene.",
      bestTimeToVisit: "September-November, March-May",
      averageTemp: "15-25°C",
      popular: false,
    },
    {
      id: "rio-de-janeiro-brazil",
      name: "Rio de Janeiro",
      country: "Brazil",
      continent: "South America",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 9,
      category: "Beach",
      description: "Famous beaches, carnival culture, and stunning mountain landscapes.",
      bestTimeToVisit: "December-March",
      averageTemp: "20-30°C",
      popular: false,
    },
    {
      id: "cairo-egypt",
      name: "Cairo",
      country: "Egypt",
      continent: "Africa",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 14,
      category: "Historical",
      description: "Ancient pyramids, sphinx, and rich Egyptian history and culture.",
      bestTimeToVisit: "October-April",
      averageTemp: "15-25°C",
      popular: false,
    },
    {
      id: "marrakech-morocco",
      name: "Marrakech",
      country: "Morocco",
      continent: "Africa",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 16,
      category: "Cultural",
      description: "Bustling souks, beautiful palaces, and authentic Moroccan culture.",
      bestTimeToVisit: "March-May, September-November",
      averageTemp: "18-28°C",
      popular: true,
    },
    {
      id: "new-york-usa",
      name: "New York",
      country: "USA",
      continent: "North America",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 22,
      category: "Urban",
      description: "The city that never sleeps with iconic landmarks and diverse culture.",
      bestTimeToVisit: "April-June, September-November",
      averageTemp: "10-20°C",
      popular: true,
    },
    {
      id: "dubai-uae",
      name: "Dubai",
      country: "UAE",
      continent: "Asia",
      image: "/placeholder.svg?height=400&width=600",
      imageWidth: 600,
      imageHeight: 400,
      tourCount: 19,
      category: "Luxury",
      description: "Modern architecture, luxury shopping, and desert adventures.",
      bestTimeToVisit: "November-March",
      averageTemp: "20-30°C",
      popular: true,
    },
  ]

  // Separate popular and other destinations
  const popularDestinations = destinations.filter((dest) => dest.popular)
  const otherDestinations = destinations.filter((dest) => !dest.popular)

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#14183E] mb-4">Explore Destinations</h1>
            <p className="text-[#5E6282] max-w-2xl mx-auto">
              Discover amazing destinations around the world and find the perfect tours for your next adventure.
            </p>
          </div>

          <DestinationFilters />

          {/* Popular Destinations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#14183E] mb-8">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  id={destination.id}
                  name={destination.name}
                  country={destination.country}
                  continent={destination.continent}
                  image={destination.image}
                  imageWidth={destination.imageWidth}
                  imageHeight={destination.imageHeight}
                  tourCount={destination.tourCount}
                  category={destination.category}
                  description={destination.description}
                />
              ))}
            </div>
          </section>

          {/* All Destinations */}
          <section>
            <h2 className="text-3xl font-bold text-[#14183E] mb-8">More Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {otherDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  id={destination.id}
                  name={destination.name}
                  country={destination.country}
                  continent={destination.continent}
                  image={destination.image}
                  imageWidth={destination.imageWidth}
                  imageHeight={destination.imageHeight}
                  tourCount={destination.tourCount}
                  category={destination.category}
                  description={destination.description}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
