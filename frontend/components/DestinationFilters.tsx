"use client"

import { useState } from "react"
import { Check, ChevronDown, MapPin, Tag, Globe } from "lucide-react"

export default function DestinationFilters() {
  const [continentOpen, setContinentOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [selectedContinents, setSelectedContinents] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const continents = ["Europe", "Asia", "North America", "South America", "Africa", "Oceania"]  // from API dynamic fild list
  const categories = ["Historical", "Cultural", "Adventure", "Beach", "Urban", "Luxury"]  // from API dynamic fild list

  const toggleContinent = (continent: string) => {
    setSelectedContinents((prev) =>
      prev.includes(continent) ? prev.filter((c) => c !== continent) : [...prev, continent],
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
      <h2 className="text-xl font-bold text-[#14183E] mb-6">Find Your Perfect Destination</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282] focus:outline-none focus:ring-2 focus:ring-[#f26336] focus:border-transparent"
          />
          <MapPin size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5E6282]" />
        </div>

        {/* Continent Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setContinentOpen(!continentOpen)}
          >
            <div className="flex items-center">
              <Globe size={18} className="mr-2" />
              <span>{selectedContinents.length ? `${selectedContinents.length} selected` : "Continent"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${continentOpen ? "rotate-180" : ""}`} />
          </button>

          {continentOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                {continents.map((continent) => (
                  <div
                    key={continent}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => toggleContinent(continent)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${
                        selectedContinents.includes(continent) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"
                      }`}
                    >
                      {selectedContinents.includes(continent) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{continent}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <div className="flex items-center">
              <Tag size={18} className="mr-2" />
              <span>{selectedCategories.length ? `${selectedCategories.length} selected` : "Category"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
          </button>

          {categoryOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => toggleCategory(category)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${
                        selectedCategories.includes(category) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"
                      }`}
                    >
                      {selectedCategories.includes(category) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        <div className="flex items-center">
          <button
            className="w-full bg-[#f1a501] text-white p-3 rounded-lg hover:bg-[#f1a501]/90 transition-colors"
            onClick={() => {
              setSelectedContinents([])
              setSelectedCategories([])
              setSearchQuery("")
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Applied Filters */}
      {(selectedContinents.length > 0 || selectedCategories.length > 0 || searchQuery) && (
        <div className="mt-6 flex flex-wrap gap-2">
          {searchQuery && (
            <div className="bg-[#f26336]/10 text-[#f26336] px-3 py-1 rounded-full text-sm flex items-center">
              Search: "{searchQuery}"
              <button className="ml-2" onClick={() => setSearchQuery("")}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="#f26336"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}

          {selectedContinents.map((continent) => (
            <div
              key={continent}
              className="bg-[#f1a501]/10 text-[#f1a501] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {continent}
              <button className="ml-2" onClick={() => toggleContinent(continent)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="#f1a501"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          {selectedCategories.map((category) => (
            <div
              key={category}
              className="bg-[#8A79DF]/10 text-[#8A79DF] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {category}
              <button className="ml-2" onClick={() => toggleCategory(category)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="#8A79DF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
