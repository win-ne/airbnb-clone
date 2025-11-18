import { Guest } from "./guest"
import { Listing } from "./listing"
import { StrapiContentTypeBase, StrapiSingleRelationConnection } from "./strapi"

export type Booking = StrapiContentTypeBase & {
  startDate: string
  endDate: string
  guestCount: string
  guest?: Guest | StrapiSingleRelationConnection
  listing?: Listing | StrapiSingleRelationConnection
}

export type BookingPayload = Omit<Booking, 'id' | 'documentId' | 'createdAt'>