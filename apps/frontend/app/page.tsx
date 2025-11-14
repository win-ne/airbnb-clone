import Link from 'next/link';
import { Heart, Star } from 'lucide-react';

export default function Home() {
  const locations = [
    {
      name: 'San Francisco',
      listings: [
        { id: 1, title: 'Cozy Victorian Apartment', price: 189, image: '/victorian-apartment-san-francisco.jpg' },
        { id: 2, title: 'Modern Loft Downtown', price: 245, image: '/modern-loft-downtown-sf.jpg' },
        { id: 3, title: 'Beach House View', price: 320, image: '/beach-house-ocean-view.jpg' },
        { id: 4, title: 'Garden Studio', price: 155, image: '/garden-studio-apartment.jpg' },
      ],
    },
    {
      name: 'New York',
      listings: [
        { id: 5, title: 'Brooklyn Brownstone', price: 275, image: '/brooklyn-brownstone-apartment.jpg' },
        { id: 6, title: 'Manhattan Penthouse', price: 450, image: '/manhattan-penthouse-luxury.jpg' },
        { id: 7, title: 'Upper West Side Flat', price: 210, image: '/upper-west-side-apartment.jpg' },
        { id: 8, title: 'SoHo Loft Studio', price: 320, image: '/soho-loft-studio.jpg' },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Not sure where to go?</h1>
          <p className="text-xl text-gray-600">Perfect for your next adventure</p>
        </div>
      </section>

      {/* Locations and Listings */}
      {locations.map((location) => (
        <section key={location.name} className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{location.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {location.listings.map((listing) => (
              <Link href={`/listing/${listing.id}`} key={listing.id} className="group cursor-pointer">
                <div className="relative mb-3 overflow-hidden rounded-lg">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <Heart className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:underline">{listing.title}</h3>
                <p className="text-gray-600 text-sm mb-2">Entire apartment</p>
                <p className="text-gray-900 font-semibold">
                  ${listing.price} <span className="font-normal text-gray-600">/ night</span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Safety information</a></li>
                <li><a href="#" className="hover:underline">Cancellation options</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Hosting</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">Airbnb your home</a></li>
                <li><a href="#" className="hover:underline">Host resources</a></li>
                <li><a href="#" className="hover:underline">Community forum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Airbnb</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">Newsroom</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Investors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Global</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:underline">English (US)</a></li>
                <li><a href="#" className="hover:underline">$ USD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex items-center justify-between text-sm text-gray-600">
            <p>© 2025 Airbnb Clone, Inc. All rights reserved</p>
            <div className="flex gap-6">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
