'use client';

import Link from 'next/link';
import { ChevronLeft, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import CheckoutForm from '@/components/checkout-form';

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

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <CheckoutForm id={id} />
  );
}

// Workaround for params
function useParams(params: Promise<any>) {
  if (params instanceof Promise) {
    throw params.then((p) => p);
  }
  return params;
}
