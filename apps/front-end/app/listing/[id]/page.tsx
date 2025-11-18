'use client'

import Link from 'next/link'
import { Heart, MapPin, Wifi, AirVent, Lock, Utensils, Star, Share, Car, Dog, WifiHigh, ForkKnife, ConciergeBell, Fan, Flame, Refrigerator, Drama, BadgeCheck } from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import { Listing } from '@/types/listing'
import { getListing } from '@/app/actions/listings'
import { useParams } from 'next/navigation'
import { StrapiURL } from '@/app/lib/request'

export default function ListingPage() {
  const { id } = useParams<{ id: string }>()
  const [listing, setListing] = useState<Listing | null>(null)

  useEffect(() => {
    if (id) {
      getListing(id)
        .then(listing => {
          setListing(listing)
        })
    }
  }, [id])

  return listing ? <ListingPageComponent listing={listing} /> : <></>
}

function ListingPageComponent({ listing }: { listing: Listing }) {
  const [liked, setLiked] = useState(false)
  const minCheckIn = (new Date()).toISOString().split('T')[0]
  const minCheckOut = (new Date((new Date()).getTime() + 86400000)).toISOString().split('T')[0]
  const [checkIn, setCheckIn] = useState(minCheckIn)
  const [checkOut, setCheckOut] = useState(minCheckOut)
  const [guests, setGuests] = useState('1')

  const yearsOnPlatform = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(listing.host?.createdAt || Date.now()).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
    )
  )

  const featuredServicesIcons = (service: string) => {
    switch (service) {
      case "Self check-in":
        return <ConciergeBell />
      case "Free parking on premises":
        return <Car />
      case "Pet-friendly":
        return <Dog />
      case "Fast Wifi":
        return <WifiHigh />
      case "Fully equipped kitchen":
        return <ForkKnife />
      case "Outdoor entertainment":
        return <Drama />
      case "Designed for staying cool":
        return <AirVent />
      default:
        return <BadgeCheck />
    }
  }

  const amenitiesIcons = (service: string) => {
    switch (service) {
      case "Wifi":
        return <WifiHigh />
      case "Air conditioning":
        return <Fan />
      case "Heating":
        return <Flame />
      case "Kitchen":
        return <Utensils />
      case "Refrigerator":
        return <Refrigerator />
      default:
        return <BadgeCheck />
    }
  }

  function handleCheckInChange(event: ChangeEvent<HTMLInputElement>): void {
    const selectedDate = event.target.value
    setCheckIn(selectedDate)
    if (checkOut && new Date(selectedDate) > new Date(checkOut)) {
      setCheckOut(new Date(new Date(selectedDate).getTime() + 86400000).toISOString().split('T')[0])
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" className="h-8" alt="Airbnb Logo" />
          </Link>
        </div>
      </header>

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
                listing.photos[0] && <img src={`${StrapiURL}${listing.photos[0]?.url}`} alt={listing.name} className="w-full object-cover object-center h-full" />
              }
            </div>
          }
          {listing.photos && listing.photos.length && listing.photos.slice(1).map((listingPhoto, index) => (
            <div key={`room-photo-${index}`}>
              <img
                src={`${StrapiURL}${listingPhoto.url}`}
                alt="Room view"
                className="w-full object-cover  object-center h-full"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-3 gap-12">
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
            <div className="flex items-center gap-4  mb-4">
              <img
                src={`${StrapiURL}${listing.host?.profilePicture.url}`}
                alt={listing.host?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">Hosted by {listing.host?.name}</span>
                <span className='-mt-1'>
                  <span className="text-sm text-gray-600">Superhost</span>
                  &nbsp;·&nbsp;
                  <span className="text-sm text-gray-600">
                    Joined {yearsOnPlatform > 0 ? `${yearsOnPlatform} years ago` : 'this year'}
                  </span>
                </span>
              </div>
            </div>
            <hr className="w-full my-8"></hr>
            <div className="flex flex-col gap-4">
              {
                listing.featuredServices?.map((serv, servIndex) => {
                  return <div className="flex gap-4 text-base font-semibold" key={`featured-service-${servIndex}`}>
                    {featuredServicesIcons(serv.featuredService)}
                    {serv.featuredService}
                  </div>
                })
              }
            </div>
            <hr className="w-full my-8"></hr>
            <p className="text-base">{listing.description}</p>
            <hr className="w-full my-8"></hr>
            <div className="flex flex-col">
              <p className="text-2xl font-semibold w-full">What this place offers</p>
              <div className="grid grid-cols-2 gap-6 mt-4 mb-8">
                {
                  listing.amenities?.map((amen, amenIndex) => {
                    return <div className="flex gap-1 text-base font-semibold" key={`amenity-${amenIndex}`}>
                      {amenitiesIcons(amen.amenity)}
                      {amen.amenity}
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-20 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
            <div className="mb-6">
              <p className="text-2xl font-bold text-gray-900">
                ${listing.pricePerNight}
                <span className="text-lg font-normal text-gray-600"> / night</span>
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="space-y-3">
                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Check-in</p>
                  <input
                    type="date"
                    className="w-full text-gray-900"
                    value={checkIn}
                    onChange={handleCheckInChange}
                    min={minCheckIn}
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Check-out</p>
                  <input
                    type="date"
                    className="w-full text-gray-900"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={minCheckOut}
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Guests</p>
                  <select className="w-full text-gray-900 border-0 focus:ring-0" value={guests} onChange={(e) => setGuests(e.target.value)}>
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors mb-4" onClick={() => {
                const params = new URLSearchParams({
                  checkIn,
                  checkOut,
                  guestCount: guests
                })
                window.location.href = `/checkout/${listing.documentId}?${params.toString()}`
              }}>
                Reserve
              </button>

              <p className="text-center text-sm text-gray-600 mb-6">You won't be charged yet</p>

              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">${listing.pricePerNight} × 5 nights</span>
                  <span className="text-gray-900">${listing.pricePerNight * 5}</span>
                </div>
                <div className="flex justify-between font-bold text-base mt-4">
                  <span>Total</span>
                  <span>${listing.pricePerNight * 5}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Airbnb | <a href="#" className="hover:underline">Privacy</a> | <a href="#" className="hover:underline">Terms</a></p>
          </div>
        </div>
      </footer>
    </main>
  )
}
