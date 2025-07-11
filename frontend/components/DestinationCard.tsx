import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"

interface DestinationCardProps {
  id: string
  name: string
  country: string
  continent: string
  image: string
  imageWidth: number
  imageHeight: number
  tourCount: number
  category: string
  description: string
}

export default function DestinationCard({
  id,
  name,
  country,
  continent,
  image,
  imageWidth,
  imageHeight,
  tourCount,
  category,
  description,
}: DestinationCardProps) {
  const getCategoryColor = () => {
    switch (category) {
      case "Historical":
        return "bg-amber-100 text-amber-600"
      case "Cultural":
        return "bg-purple-100 text-purple-600"
      case "Adventure":
        return "bg-green-100 text-green-600"
      case "Beach":
        return "bg-blue-100 text-blue-600"
      case "Urban":
        return "bg-gray-100 text-gray-600"
      case "Luxury":
        return "bg-pink-100 text-pink-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <Link href={`/destinations/${id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="relative h-48">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${name}, ${country}`}
            width={imageWidth}
            height={imageHeight}
            className="object-cover w-full h-full"
          />

          <div className="absolute top-4 left-4">
            <span className={`${getCategoryColor()} px-3 py-1 rounded-full text-xs font-medium`}>{category}</span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <div className="flex items-center text-sm opacity-90">
              <MapPin size={14} className="mr-1" />
              <span>
                {country}, {continent}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-[#5E6282] text-sm mb-3 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#5E6282] text-sm">
              <Calendar size={14} className="mr-1" />
              <span>
                {tourCount} {tourCount === 1 ? "tour" : "tours"}
              </span>
            </div>
            <span className="text-[#f26336] font-medium text-sm">Explore →</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
