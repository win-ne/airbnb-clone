import { Booking } from "./booking"
import { Host } from "./host"
import { StrapiContentTypeBase, StrapiPhoto } from "./strapi"

export type Amenity = {
  id: number
  amenity: string
}

export type FeaturedService = {
  id: number
  featuredService: string
}

export type Listing = StrapiContentTypeBase & {
  name: string
  location: string
  description: number
  placeType: string
  guestCount: number
  bedCount: number
  bedroomCount: number
  bathroomCount: number
  propertyType: string
  roomType: string
  pricePerNight: number
  host?: Host
  bookings?: Booking[]
  photos?: StrapiPhoto[]
  amenities: Amenity[]
  featuredServices: FeaturedService[]
}
