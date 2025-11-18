import { Booking } from "./booking"
import { StrapiContentTypeBase } from "./strapi"

export type Guest = StrapiContentTypeBase & {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  bookings?: Booking[]
}

export type GuestPayload = Omit<Guest, 'id' | 'documentId' | 'createdAt' | 'bookings'>