"use client"

import { useState } from "react"
import { Check, ChevronDown, Calendar, DollarSign, Globe, Star } from "lucide-react"

export default function DestinationTourFilters() {
  const [durationOpen, setDurationOpen] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [ratingOpen, setRatingOpen] = useState(false)

  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<string[]>([])

  const durations = ["1 day", "2-3 days", "4-7 days", "1+ weeks"]
  const priceRanges = ["Under €200", "€200-€500", "€500-€1000", "€1000+"]
  const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese"]
  const ratings = ["4.5+ stars", "4.0+ stars", "3.5+ stars"]

  const toggleDuration = (duration: string) => {
    setSelectedDurations((prev) => (prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]))
  }

  const togglePriceRange = (priceRange: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(priceRange) ? prev.filter((p) => p !== priceRange) : [...prev, priceRange],
    )
  }

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => (prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]))
  }

  const toggleRating = (rating: string) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-bold text-[#14183E] mb-4">Filter Tours</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Duration Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setDurationOpen(!durationOpen)}
          >
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <span>{selectedDurations.length ? `${selectedDurations.length} selected` : "Duration"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${durationOpen ? "rotate-180" : ""}`} />
          </button>

          {durationOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg">
              <div className="p-2">
                {durations.map((duration) => (
                  <div
                    key={duration}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => toggleDuration(duration)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${
                        selectedDurations.includes(duration) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"
                      }`}
                    >
                      {selectedDurations.includes(duration) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setPriceOpen(!priceOpen)}
          >
            <div className="flex items-center">
              <DollarSign size={18} className="mr-2" />
              <span>{selectedPriceRanges.length ? `${selectedPriceRanges.length} selected` : "Price Range"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${priceOpen ? "rotate-180" : ""}`} />
          </button>

          {priceOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg">
              <div className="p-2">
                {priceRanges.map((priceRange) => (
                  <div
                    key={priceRange}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => togglePriceRange(priceRange)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${
                        selectedPriceRanges.includes(priceRange) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"
                      }`}
                    >
                      {selectedPriceRanges.includes(priceRange) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{priceRange}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Language Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setLanguageOpen(!languageOpen)}
          >
            <div className="flex items-center">
              <Globe size={18} className="mr-2" />
              <span>{selectedLanguages.length ? `${selectedLanguages.length} selected` : "Language"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${languageOpen ? "rotate-180" : ""}`} />
          </button>

          {languageOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2">
                {languages.map((language) => (
                  <div
                    key={language}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => toggleLanguage(language)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${
                        selectedLanguages.includes(language) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"
                      }`}
                    >
                      {selectedLanguages.includes(language) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{language}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 border border-[#c4c4c4] rounded-lg text-[#5E6282]"
            onClick={() => setRatingOpen(!ratingOpen)}
          >
            <div className="flex items-center">
              <Star size={18} className="mr-2" />
              <span>{selectedRatings.length ? `${selectedRatings.length} selected` : "Rating"}</span>
            </div>
            <ChevronDown size={18} className={`transition-transform ${ratingOpen ? "rotate-180" : ""}`} />
          </button>

          {ratingOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#c4c4c4] rounded-lg shadow-lg">
              <div className="p-2">
                {ratings.map((rating) => (
                  <div
                    key={rating}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => toggleRating(rating)}
                  >
                    <div
                      className={`w-5 h-5 border rounded-md mr-2 flex items-center justify-center ${
                        selectedRatings.includes(rating) ? "bg-[#f26336] border-[#f26336]" : "border-[#c4c4c4]"
                      }`}
                    >
                      {selectedRatings.includes(rating) && <Check size={14} className="text-white" />}
                    </div>
                    <span>{rating}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Applied Filters */}
      {(selectedDurations.length > 0 ||
        selectedPriceRanges.length > 0 ||
        selectedLanguages.length > 0 ||
        selectedRatings.length > 0) && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedDurations.map((duration) => (
            <div
              key={duration}
              className="bg-[#f26336]/10 text-[#f26336] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {duration}
              <button className="ml-2" onClick={() => toggleDuration(duration)}>
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
          ))}

          {selectedPriceRanges.map((priceRange) => (
            <div
              key={priceRange}
              className="bg-[#f1a501]/10 text-[#f1a501] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {priceRange}
              <button className="ml-2" onClick={() => togglePriceRange(priceRange)}>
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

          {selectedLanguages.map((language) => (
            <div
              key={language}
              className="bg-[#8A79DF]/10 text-[#8A79DF] px-3 py-1 rounded-full text-sm flex items-center"
            >
              {language}
              <button className="ml-2" onClick={() => toggleLanguage(language)}>
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

          {selectedRatings.map((rating) => (
            <div key={rating} className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm flex items-center">
              {rating}
              <button className="ml-2" onClick={() => toggleRating(rating)}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="rgb(34 197 94)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}

          <button
            className="text-[#5E6282] text-sm underline ml-2"
            onClick={() => {
              setSelectedDurations([])
              setSelectedPriceRanges([])
              setSelectedLanguages([])
              setSelectedRatings([])
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
