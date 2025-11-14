'use client';

import Link from 'next/link';
import { ChevronLeft, Lock } from 'lucide-react';
import { useState } from 'react';

// Expanded mock listings with complete details for all 8 properties
const mockListings: { [key: string]: any } = {
  '1': {
    id: 1,
    title: 'Cozy Victorian Apartment',
    location: 'San Francisco, California',
    price: 189,
    image: '/victorian-apartment-san-francisco.jpg',
    host: 'Sarah M.',
    bedrooms: 2,
    beds: 3,
    bathrooms: 1.5,
    type: 'Entire apartment',
    neighborhood: 'Mission District',
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM',
  },
  '2': {
    id: 2,
    title: 'Modern Loft Downtown',
    location: 'San Francisco, California',
    price: 245,
    image: '/modern-loft-downtown-sf.jpg',
    host: 'James K.',
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    type: 'Entire loft',
    neighborhood: 'Downtown',
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
  },
  '3': {
    id: 3,
    title: 'Beach House View',
    location: 'San Francisco, California',
    price: 320,
    image: '/beach-house-ocean-view.jpg',
    host: 'Emma L.',
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    type: 'Entire villa',
    neighborhood: 'Ocean Beach',
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM',
  },
  '4': {
    id: 4,
    title: 'Garden Studio Apartment',
    location: 'San Francisco, California',
    price: 145,
    image: '/garden-studio-apartment.jpg',
    host: 'Marcus T.',
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    type: 'Entire studio',
    neighborhood: 'Noe Valley',
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM',
  },
  '5': {
    id: 5,
    title: 'Brooklyn Brownstone Apartment',
    location: 'New York, New York',
    price: 275,
    image: '/brooklyn-brownstone-apartment.jpg',
    host: 'Rachel G.',
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    type: 'Entire apartment',
    neighborhood: 'Williamsburg',
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
  },
  '6': {
    id: 6,
    title: 'Manhattan Penthouse Luxury',
    location: 'New York, New York',
    price: 450,
    image: '/manhattan-penthouse-luxury.jpg',
    host: 'David L.',
    bedrooms: 3,
    beds: 3,
    bathrooms: 2.5,
    type: 'Entire penthouse',
    neighborhood: 'Midtown Manhattan',
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM',
  },
  '7': {
    id: 7,
    title: 'Upper West Side Apartment',
    location: 'New York, New York',
    price: 215,
    image: '/upper-west-side-apartment.jpg',
    host: 'Lisa H.',
    bedrooms: 2,
    beds: 2,
    bathrooms: 1.5,
    type: 'Entire apartment',
    neighborhood: 'Upper West Side',
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM',
  },
  '8': {
    id: 8,
    title: 'SoHo Loft with Terrace',
    location: 'New York, New York',
    price: 380,
    image: '/soho-loft-with-terrace.jpg',
    host: 'Alexander P.',
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    type: 'Entire loft',
    neighborhood: 'SoHo',
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
  },
};

export default function CheckoutForm({ id }: { id: string }) {
  const [guests, setGuests] = useState(2);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const listing = mockListings[id] || mockListings['1'];
  const nights = 5;
  const subtotal = listing.price * nights;
  const serviceFee = Math.round(subtotal * 0.15);
  const total = subtotal + serviceFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-3 gap-12">
        {/* Left Column - Form */}
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 text-red-500 font-semibold mb-8 hover:text-red-600">
            <ChevronLeft className="w-5 h-5" />
            Back to listing
          </Link>

          {/* Trip Details */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your trip</h2>
            <div className="space-y-4 bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold text-gray-900">Dec 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold text-gray-900">Dec 20, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests</span>
                <span className="font-semibold text-gray-900">{guests}</span>
              </div>
            </div>
          </div>

          {/* Guest Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Who's checking in?</h2>
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Ground Rules */}
          <div className="mb-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ground rules</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <label className="flex items-start gap-3">
                <input type="checkbox" defaultChecked className="mt-1" />
                <span>I agree to treat the property with respect and care</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" defaultChecked className="mt-1" />
                <span>I agree not to host parties or make excessive noise</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" defaultChecked className="mt-1" />
                <span>I agree to the house rules and policies</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" defaultChecked className="mt-1" />
                <span>I agree to Airbnb's rebooking and refund policy</span>
              </label>
            </div>
          </div>

          {/* Security Message */}
          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg mb-8">
            <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-900">
              Your payment information is encrypted and secure. We never store your credit card details.
            </p>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div>
          <div className="sticky top-20 border border-gray-300 rounded-xl overflow-hidden shadow-lg">
            {/* Listing Preview */}
            <div className="border-b border-gray-200">
              <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{listing.type}</p>
                <h3 className="font-semibold text-gray-900 line-clamp-2">{listing.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{listing.neighborhood}, {listing.location.split(',')[1]}</p>
                <p className="text-xs text-gray-500 mt-1">Hosted by {listing.host}</p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6 space-y-4">
              <h3 className="font-bold text-gray-900 mb-4">Price details</h3>

              <div className="space-y-3 text-sm border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">${listing.price} × {nights} nights</span>
                  <span className="text-gray-900">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-gray-900">${serviceFee}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2 text-xs text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Check-in: Dec 15, 2024</p>
                  <p>After {listing.checkInTime}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Check-out: Dec 20, 2024</p>
                  <p>Before {listing.checkOutTime}</p>
                </div>
              </div>

              <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors mt-6">
                Complete Booking
              </button>

              <p className="text-xs text-gray-500 text-center">
                By clicking the button, you agree to the terms and booking conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Airbnb Clone | <a href="#" className="hover:underline">Privacy</a> | <a href="#" className="hover:underline">Terms</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
