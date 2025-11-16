'use client'

import Link from 'next/link'
import { Heart, MapPin, Wifi, AirVent, Lock, Utensils, Star, Share } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Listing } from '@/types/listing'
import { getListing } from '@/app/actions/listings'
import { useParams } from 'next/navigation'

export default function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<Listing | null>(null)

  useEffect(() => {
    if (id) {
      getListing(id)
        .then(listing => {
          console.log('Listing: ', listing)
          setListing(listing)
        })
    }
  }, [id])

  return listing ? <ListingPageComponent listing={listing} /> : <></>
}

function ListingPageComponent({ listing }: { listing: Listing }) {
  const [liked, setLiked] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
              ✕
            </div>
            <span className="text-xl font-bold text-gray-900">airbnb</span>
          </Link>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">{listing.name}</h1>
          <div className="flex items-center gap-6">
            <button className="text-gray-700 hover:text-gray-900 flex text-base gap-2 items-center">
              <Share className={`w-5 h-5`} />
              Share
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="text-gray-700 hover:text-gray-900 flex text-base gap-2 items-center"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              Save
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-lg overflow-hidden h-120">
          {
            listing.photos && <div className="col-span-2 row-span-2">
              {
                listing.photos[0] && <img src={`http://localhost:1337${listing.photos[0]?.url}`} alt={listing.name} className="w-full object-cover object-center h-full" />
              }
            </div>
          }
          {listing.photos && listing.photos.length && listing.photos.slice(1).map((listingPhoto, index) => (
            <div>
              <img
                key={`room-photo-${index}`}
                src={`http://localhost:1337${listingPhoto.url}`}
                alt="Room view"
                className="w-full object-cover  object-center h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <div className="col-span-2">
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-2xl font-semibold">
                    {listing.placeType} in {listing.location}
                  </span>
                  <span className="flex text-lg">
                    {listing.guestCount} guests · {listing.roomType == 'Studio' ? listing.roomType : `${listing.bedroomCount} bedrooms`} · {listing.bedCount} beds · {listing.bathroomCount} bath
                  </span>
                </div>
              </div>
            </div>
            <div className='flex'>

            </div>
            <p className="text-gray-600 text-lg">{listing.description}</p>
          </div>

          {/* Property Details */}
          <div className="border-t border-b border-gray-200 py-8 mb-8">
            <div className="grid grid-cols-4 gap-8">
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.guestCount}</p>
                <p className="text-gray-600">Guests</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.bedroomCount}</p>
                <p className="text-gray-600">Bedrooms</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.bedCount}</p>
                <p className="text-gray-600">Beds</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.bathroomCount}</p>
                <p className="text-gray-600">Bathrooms</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* {listing.amenities.map((amenity: string, idx: number) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {amenity === 'WiFi' && <Wifi className="w-4 h-4 text-gray-900" />}
                    {amenity === 'Air Conditioning' && <AirVent className="w-4 h-4 text-gray-900" />}
                    {amenity === 'Smart Lock' && <Lock className="w-4 h-4 text-gray-900" />}
                    {amenity === 'Full Kitchen' && <Utensils className="w-4 h-4 text-gray-900" />}
                    {amenity === 'Washer/Dryer' && <span className="text-xs font-bold">WD</span>}
                    {amenity === 'Heating' && <span className="text-xs font-bold">HT</span>}
                    {amenity === 'Gym Access' && <span className="text-xs font-bold">GYM</span>}
                    {amenity === 'Concierge' && <span className="text-xs font-bold">CC</span>}
                    {amenity === 'Hot Tub' && <span className="text-xs font-bold">TUB</span>}
                    {amenity === 'Terrace' && <span className="text-xs font-bold">TR</span>}
                    {amenity === 'Beach Access' && <span className="text-xs font-bold">BA</span>}
                  </div>
                  <span className="text-gray-900">{amenity}</span>
                </div>
              ))} */}
            </div>
          </div>

          {/* Host Info */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hosted by {listing.host?.name}</h2>
            <div className="flex gap-6">
              {/* <img src={listing.host?.photo || "/placeholder.svg"} alt={listing.host?.name} className="w-16 h-16 rounded-full object-cover" /> */}
              <div>
                <p className="font-semibold text-gray-900 flex items-center gap-2">
                  {listing.host?.name}
                </p>
                <p className="text-sm text-gray-600">Joined in {listing.host?.createdAt}</p>

                <p className="text-sm text-gray-600 mt-3">
                  Super host. Dedicated to providing excellent hospitality and ensuring guests have an amazing experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div>
          <div className="sticky top-20 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
            <div className="mb-6">
              <p className="text-2xl font-bold text-gray-900">
                ${listing.pricePerNight}
                <span className="text-lg font-normal text-gray-600"> / night</span>
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="border border-gray-300 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Check-in</p>
                <p className="text-gray-900">Dec 15, 2024</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Check-out</p>
                <p className="text-gray-900">Dec 20, 2024</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Guests</p>
                <p className="text-gray-900">2 guests</p>
              </div>
            </div>

            <Link href={`/checkout/${listing.id}`}>
              <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors mb-4">
                Reserve
              </button>
            </Link>

            <p className="text-center text-sm text-gray-600 mb-6">You won't be charged yet</p>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">${listing.pricePerNight} × 5 nights</span>
                <span className="text-gray-900">${listing.pricePerNight * 5}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span className="text-gray-900">${Math.round(listing.pricePerNight * 5 * 0.15)}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-4">
                <span>Total</span>
                <span>${listing.pricePerNight * 5 + Math.round(listing.pricePerNight * 5 * 0.15)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Airbnb Clone | <a href="#" className="hover:underline">Privacy</a> | <a href="#" className="hover:underline">Terms</a></p>
          </div>
        </div>
      </footer>
    </main>
  )
}
