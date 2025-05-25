"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { NAV_LINKS } from "@/constants"
import Button from "./Button"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  let closeTimeout: NodeJS.Timeout | null = null

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Language dropdown handlers
  const handleLangDropdownToggle = () => {
    setLangDropdownOpen(prev => !prev)
    if (closeTimeout) clearTimeout(closeTimeout)
  }

  const handleLangDropdownEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout)
    setLangDropdownOpen(true)
  }

  const handleLangDropdownLeave = () => {
    closeTimeout = setTimeout(() => setLangDropdownOpen(false), 300)
  }

  // Auth state
  // const isAuthenticated = false // Replace 'false' with actual auth check like: user?.isAuthenticated
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 py-6">
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/fierytrips.svg"
            alt="FieryTrips Logo"
            width={50}
            height={50}
            className="text-[#f26336]"
          />
          <span className="text-2xl font-bold text-[#212832]">FieryTrips</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="text-[#212832] hover:text-[#f26336] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 pl-3 pr-10 py-2 border border-[#c4c4c4] rounded-md text-[#212832] focus:outline-none focus:ring-2 focus:ring-[#f26336] focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#212832]" size={18} />
          </div>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={ user?.profile_image || "/placeholder.svg" }
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="hidden md:block text-[#212832] font-medium">{ user?.firstName || "User" }</span>
                <ChevronDown size={16} className="text-[#212832]" />
              </button>
              {/* dropdown */}
              <button onClick={logout}>Sign Out</button>
            </div>
          ) : (
            <>
              <Link href="/auth/login/" className="text-[#212832] hover:text-[#f26336] transition-colors">
                Sign In
              </Link>
              <Button href="/auth/register/" variant="outline">
                Sign up
              </Button>
            </>
          )}

          {/* Language Selector */}
          <LanguageDropdown
            ref={langDropdownRef}
            isOpen={langDropdownOpen}
            onToggle={handleLangDropdownToggle}
            onEnter={handleLangDropdownEnter}
            onLeave={handleLangDropdownLeave}
          />
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-4">
          <LanguageDropdown
            ref={langDropdownRef}
            isOpen={langDropdownOpen}
            onToggle={handleLangDropdownToggle}
            onEnter={handleLangDropdownEnter}
            onLeave={handleLangDropdownLeave}
            mobile
          />

          <button
            className="text-[#212832] hover:text-[#f26336] p-2 transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search size={24} />
          </button>

          <button
            className="text-[#212832] hover:text-[#f26336] p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 lg:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-3 pr-10 py-2 border border-[#212832] rounded-md text-[#212832] focus:outline-none focus:ring-2 focus:ring-[#f26336] focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#212832]" size={20} />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() => setMobileMenuOpen(false)}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </header>
  )
}

// Extracted Language Dropdown Component
const LanguageDropdown = React.forwardRef<HTMLDivElement, {
  isOpen: boolean
  onToggle: () => void
  onEnter: () => void
  onLeave: () => void
  mobile?: boolean
}>(({ isOpen, onToggle, onEnter, onLeave, mobile = false }, ref) => (
  <div
    ref={ref}
    className="relative"
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
  >
    <button
      className={`flex items-center gap-1 text-[#212832] hover:text-[#f26336] ${mobile ? 'p-2' : ''}`}
      onClick={onToggle}
      aria-label="Language selector"
    >
      <span className="font-medium">EN</span>
      <ChevronDown size={mobile ? 20 : 16} />
    </button>

    {isOpen && (
      <div className={`absolute ${mobile ? 'right-0' : 'right-0'} mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50`}>
        <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
          English
        </Link>
        <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
          Español
        </Link>
        <Link href="#" className="block px-4 py-2 text-sm text-[#212832] hover:bg-gray-100">
          Français
        </Link>
      </div>
    )}
  </div>
))

// Extracted Mobile Menu Component
const MobileMenu = ({ onClose, isAuthenticated }: { onClose: () => void, isAuthenticated: boolean }) => (
  <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 lg:hidden z-10">
    <nav className="flex flex-col gap-4 mb-6">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="text-[#212832] hover:text-[#f26336] py-2 border-b border-gray-100 transition-colors"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </nav>

    {!isAuthenticated && (
      <div className="flex flex-col gap-3">
        <Link
          href="/auth/login/"
          className="text-[#212832] hover:text-[#f26336] font-medium transition-colors"
          onClick={onClose}
        >
          Sign In
        </Link>
        <Button
          href="/auth/register/"
          variant="outline"
          className="w-full"
          onClick={onClose}
        >
          Sign up
        </Button>
      </div>
    )}
  </div>
)