'use client';

import Link from 'next/link';
import { Heart, MapPin, Wifi, AirVent, Lock, Utensils, Star } from 'lucide-react';
import { useState } from 'react';

// Mock listing data
const mockListings: { [key: string]: any } = {
  '1': {
    id: 1,
    title: 'Cozy Victorian Apartment',
    location: 'San Francisco, California',
    price: 189,
    rating: 4.9,
    reviews: 238,
    image: '/victorian-apartment-san-francisco.jpg',
    description: 'Charming Victorian apartment in the heart of San Francisco. Beautiful hardwood floors, high ceilings, and plenty of natural light. Located in the trendy Mission District with easy access to restaurants, cafes, and shops.',
    amenities: ['WiFi', 'Air Conditioning', 'Smart Lock', 'Full Kitchen', 'Washer/Dryer', 'Heating'],
    host: {
      name: 'Sarah M.',
      joinedYear: 2019,
      responseTime: 'within an hour',
      responseRate: '98%',
      superhost: true,
      hostReviews: 287,
      photo: '/host-profile.jpg',
    },
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1.5,
    neighborhood: 'Mission District',
    type: 'Entire apartment',
  },
  '2': {
    id: 2,
    title: 'Modern Loft Downtown',
    location: 'San Francisco, California',
    price: 245,
    rating: 4.8,
    reviews: 156,
    image: '/modern-loft-downtown-sf.jpg',
    description: 'Sleek modern loft with exposed brick walls, floor-to-ceiling windows, and a rooftop patio with city views. Perfect for couples or small groups wanting an urban retreat.',
    amenities: ['WiFi', 'Air Conditioning', 'Smart Lock', 'Full Kitchen', 'Gym Access', 'Concierge'],
    host: {
      name: 'James K.',
      joinedYear: 2018,
      responseTime: 'within 2 hours',
      responseRate: '96%',
      superhost: true,
      hostReviews: 412,
      photo: '/host-profile.jpg',
    },
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    neighborhood: 'Downtown',
    type: 'Entire loft',
  },
  '3': {
    id: 3,
    title: 'Beach House View',
    location: 'San Francisco, California',
    price: 320,
    rating: 5.0,
    reviews: 89,
    image: '/beach-house-ocean-view.jpg',
    description: 'Stunning beachfront villa with ocean views, private beach access, and a modern minimalist design. Enjoy sunsets from the deck and fall asleep to ocean sounds.',
    amenities: ['WiFi', 'Air Conditioning', 'Hot Tub', 'Full Kitchen', 'Terrace', 'Beach Access'],
    host: {
      name: 'Emma L.',
      joinedYear: 2020,
      responseTime: 'within 3 hours',
      responseRate: '99%',
      superhost: true,
      hostReviews: 156,
      photo: '/host-profile.jpg',
    },
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    neighborhood: 'Ocean Beach',
    type: 'Entire villa',
  },
  '4': {
    id: 4,
    title: 'Garden Studio Apartment',
    location: 'San Francisco, California',
    price: 145,
    rating: 4.7,
    reviews: 201,
    image: '/garden-studio-apartment.jpg',
    description: 'Lovely studio apartment with a private garden patio. Newly renovated with modern amenities and vintage charm. Ideal for solo travelers or couples.',
    amenities: ['WiFi', 'Air Conditioning', 'Smart Lock', 'Full Kitchen', 'Garden Access', 'Heating'],
    host: {
      name: 'Marcus T.',
      joinedYear: 2021,
      responseTime: 'within 30 minutes',
      responseRate: '100%',
      superhost: false,
      hostReviews: 98,
      photo: '/host-profile.jpg',
    },
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    neighborhood: 'Noe Valley',
    type: 'Entire studio',
  },
  '5': {
    id: 5,
    title: 'Brooklyn Brownstone Apartment',
    location: 'New York, New York',
    price: 275,
    rating: 4.9,
    reviews: 324,
    image: '/brooklyn-brownstone-apartment.jpg',
    description: 'Historic brownstone apartment with original hardwood floors, exposed brick, and charming period details. Located in the heart of vibrant Brooklyn.',
    amenities: ['WiFi', 'Air Conditioning', 'Smart Lock', 'Full Kitchen', 'Washer/Dryer', 'Fireplace'],
    host: {
      name: 'Rachel G.',
      joinedYear: 2017,
      responseTime: 'within 1 hour',
      responseRate: '97%',
      superhost: true,
      hostReviews: 523,
      photo: '/host-profile.jpg',
    },
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    neighborhood: 'Williamsburg',
    type: 'Entire apartment',
  },
  '6': {
    id: 6,
    title: 'Manhattan Penthouse Luxury',
    location: 'New York, New York',
    price: 450,
    rating: 5.0,
    reviews: 167,
    image: '/manhattan-penthouse-luxury.jpg',
    description: 'Breathtaking penthouse with 360-degree city views, floor-to-ceiling windows, and luxury furnishings. Experience NYC from the top.',
    amenities: ['WiFi', 'Air Conditioning', 'Doorman', 'Full Kitchen', 'Gym', 'Concierge'],
    host: {
      name: 'David L.',
      joinedYear: 2016,
      responseTime: 'within 2 hours',
      responseRate: '95%',
      superhost: true,
      hostReviews: 678,
      photo: '/host-profile.jpg',
    },
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2.5,
    neighborhood: 'Midtown Manhattan',
    type: 'Entire penthouse',
  },
  '7': {
    id: 7,
    title: 'Upper West Side Apartment',
    location: 'New York, New York',
    price: 215,
    rating: 4.8,
    reviews: 289,
    image: '/upper-west-side-apartment.jpg',
    description: 'Charming pre-war apartment with classic NYC appeal. Close to Central Park, museums, and fine dining. Perfect for exploring Manhattan.',
    amenities: ['WiFi', 'Air Conditioning', 'Doorman', 'Full Kitchen', 'Laundry', 'Heating'],
    host: {
      name: 'Lisa H.',
      joinedYear: 2019,
      responseTime: 'within 4 hours',
      responseRate: '92%',
      superhost: true,
      hostReviews: 356,
      photo: '/host-profile.jpg',
    },
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1.5,
    neighborhood: 'Upper West Side',
    type: 'Entire apartment',
  },
  '8': {
    id: 8,
    title: 'SoHo Loft with Terrace',
    location: 'New York, New York',
    price: 380,
    rating: 4.9,
    reviews: 198,
    image: '/soho-loft-with-terrace.jpg',
    description: 'Spacious loft in trendy SoHo with high ceilings, large terrace, and industrial-chic aesthetic. Heart of NYC creativity and culture.',
    amenities: ['WiFi', 'Air Conditioning', 'Smart Lock', 'Full Kitchen', 'Terrace', 'Heating'],
    host: {
      name: 'Alexander P.',
      joinedYear: 2018,
      responseTime: 'within 1 hour',
      responseRate: '98%',
      superhost: true,
      hostReviews: 445,
      photo: '/host-profile.jpg',
    },
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    neighborhood: 'SoHo',
    type: 'Entire loft',
  },
};

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = mockListings[id] || mockListings['1'];
  
  return (
    <ListingPageClient listing={listing} />
  );
}

function ListingPageClient({ listing }: { listing: any }) {
  const [liked, setLiked] = useState(false);

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
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-gray-900 text-sm">Share</button>
            <button
              onClick={() => setLiked(!liked)}
              className="text-gray-700 hover:text-gray-900"
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-2 rounded-lg overflow-hidden h-96">
          <div className="col-span-2 row-span-2">
            <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-full object-cover" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`/apartment-interior-room-.jpg?key=ikhoa&height=300&width=300&query=apartment interior room ${i}`}
              alt="Room view"
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-3 gap-12">
        {/* Left Column - Details */}
        <div className="col-span-2">
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                    <span className="font-semibold text-gray-900">{listing.rating}</span>
                    <span className="text-gray-600">({listing.reviews} reviews)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {listing.location}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg">{listing.description}</p>
          </div>

          {/* Property Details */}
          <div className="border-t border-b border-gray-200 py-8 mb-8">
            <div className="grid grid-cols-4 gap-8">
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.guests}</p>
                <p className="text-gray-600">Guests</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.bedrooms}</p>
                <p className="text-gray-600">Bedrooms</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.beds}</p>
                <p className="text-gray-600">Beds</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{listing.bathrooms}</p>
                <p className="text-gray-600">Bathrooms</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {listing.amenities.map((amenity: string, idx: number) => (
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
              ))}
            </div>
          </div>

          {/* Host Info */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hosted by {listing.host.name}</h2>
            <div className="flex gap-6">
              <img src={listing.host.photo || "/placeholder.svg"} alt={listing.host.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-900 flex items-center gap-2">
                  {listing.host.name}
                  {listing.host.superhost && (
                    <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">Superhost</span>
                  )}
                </p>
                <p className="text-sm text-gray-600">Joined in {listing.host.joinedYear}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>{listing.host.hostReviews}+ Reviews</span>
                  <span>{listing.host.responseRate} Response rate</span>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Super host with {listing.host.hostReviews}+ reviews. Responds {listing.host.responseTime}. Dedicated to providing excellent hospitality and ensuring guests have an amazing experience.
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
                ${listing.price}
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
                <span className="text-gray-600">${listing.price} × 5 nights</span>
                <span className="text-gray-900">${listing.price * 5}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span className="text-gray-900">${Math.round(listing.price * 5 * 0.15)}</span>
              </div>
              <div className="flex justify-between font-bold text-base mt-4">
                <span>Total</span>
                <span>${listing.price * 5 + Math.round(listing.price * 5 * 0.15)}</span>
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
  );
}
