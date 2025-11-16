'use client'

import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { getListings } from './actions/listings'
import { useState, useEffect } from 'react'

interface Location {
  name: string
  listings: any[]
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    getListings(1, 8).then((allListings) => {

      const grouped = Object.values(
        allListings.reduce(
          (locations: Location[], listing: any) => {
            const loc = listing.location || 'Unknown'

            if (!locations[loc]) locations[loc] = { name: loc, listings: [] }

            locations[loc].listings.push(listing)

            return locations
          },
          []
        )
      ) as Location[]

      setLocations(grouped)
    })
  }, [])


  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              ✕
            </div>
            <span className="text-xl font-bold text-gray-900">airbnb</span>
          </div>
          <nav className="flex items-center gap-8">
            <button className="text-gray-700 hover:text-gray-900 font-medium">Homes</button>
            <button className="text-gray-700 hover:text-gray-900 font-medium">Experiences</button>
            <button className="text-gray-700 hover:text-gray-900 font-medium">Services</button>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-gray-900 text-sm">Become a host</button>
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Not sure where to go?</h1>
          <p className="text-xl text-gray-600">Perfect for your next adventure</p>
        </div>
      </section>

      {locations.map((location) => (
        <section key={location.name} className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{location.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {location.listings.map((listing) => (
              <Link href={`/listing/${listing.id}`} key={listing.id} className="group cursor-pointer">
                <div className="relative mb-3 overflow-hidden rounded-lg">
                  <img
                    src={`http://localhost:1337${listing.photos[0].url}` || "/placeholder.svg"}
                    alt={listing.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:underline">{listing.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{listing.placeType}</p>
                <p className="text-gray-900 font-semibold">
                  ${listing.pricePerNight} <span className="font-normal text-gray-600">/ night</span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
