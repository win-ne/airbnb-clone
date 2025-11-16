'use client'

import Link from 'next/link'
import { ChevronLeft, Lock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Listing } from '@/types/listing'
import { getListing } from '@/app/actions/listings'
import { createGuest } from '@/app/actions/guests'
import { createBooking } from '@/app/actions/booking'

interface CheckoutFormProps {
  id: string
  checkIn: string
  checkOut: string
  guestCount: string
}

export default function CheckoutForm({ id, checkIn, checkOut, guestCount: guests }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })

  const [listing, setListing] = useState<Listing | null>(null)
  const [nights, setNights] = useState(0)
  const [total, setTotal] = useState(0)
  const [err, setErr] = useState('')

  const formatDate = (theDate: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(theDate))
  }

  useEffect(() => {
    if (id) {
      getListing(id).then(listing => {
        setListing(listing)

        const checkInDate = (new Date(checkIn) || Date.now()).getTime()
        const checkOutDate = (new Date(checkOut) || Date.now()).getTime()

        if (checkOutDate > checkInDate) {
          const tempNights = (checkOutDate - checkInDate) / 86400000
          setNights(tempNights)
          setTotal(tempNights * listing.pricePerNight)
        }
      })
    }
  }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const completeBooking = async () => {
    try {
      if (formData.firstName && formData.lastName && formData.email && formData.phoneNumber) {
        const guest = await createGuest(formData)
        if (guest.documentId && listing) {
          const booking = await createBooking(
            {
              startDate: checkIn,
              endDate: checkOut,
              guest: { connect: { documentId: guest.documentId } },
              listing: { connect: { documentId: listing.documentId } },
              guestCount: guests
            })

          if (booking.id) {
            window.location.href = '/checkout/complete'
          } else {
            window.location.href = '/checkout/incomplete'
          }
        } else {
          window.location.href = '/checkout/incomplete'
        }
      } else {
        setErr('Some values are incomplete or incorrect. Please adjust them')
      }
    } catch (err) {
      window.location.href = '/checkout/incomplete'
    }
  }

  return listing && (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" className="h-8" alt="Airbnb Logo" />
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 text-red-500 font-semibold mb-8 hover:text-red-600">
            <ChevronLeft className="w-5 h-5" />
            Back to listing
          </Link>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your trip</h2>
            <div className="space-y-4 bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold text-gray-900">{formatDate(checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold text-gray-900">{formatDate(checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights</span>
                <span className="font-semibold text-gray-900">{`${nights} night${nights > 1 ? 's' : ''}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests</span>
                <span className="font-semibold text-gray-900">{`${guests} guest${guests !== '1' ? 's' : ''}`}</span>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Who's checking in?</h2>
            {err && <p className="text-red-600 font-bold text-sm">{err}</p>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-20 border border-gray-300 rounded-xl overflow-hidden shadow-lg">
            <div className="border-b border-gray-200">
              {listing.photos?.length && <img src={`http://localhost:1337${listing.photos[0].url}`} alt={listing.name} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{listing.placeType}</p>
                <h3 className="font-semibold text-gray-900 line-clamp-2">{listing.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{listing.location}, {listing.location.split(',')[1]}</p>
                <p className="text-xs text-gray-500 mt-1">Hosted by {listing.host?.name}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="font-bold text-gray-900 mb-4">Price details</h3>

              <div className="space-y-3 text-sm border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">${listing.pricePerNight} × {nights} nights</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Check-in: {formatDate(checkIn)}</p>
                  <p>After 10:00 AM</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Check-out: {formatDate(checkOut)}</p>
                  <p>Before 12:00 PM</p>
                </div>
              </div>

              <button
                onClick={completeBooking}
                className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors mt-6"
              >
                Complete Booking
              </button>

              <p className="text-xs text-gray-500 text-center">
                By clicking the button, you agree to the terms and booking conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

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
