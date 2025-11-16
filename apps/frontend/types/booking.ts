import { Guest } from "./guest"
import { StrapiContentTypeBase } from "./strapi"

export type Booking = StrapiContentTypeBase & {
  startDate: string
  endDate: string
  guestCount: string
  guest?: Guest
}

export type BookingPayload = Omit<Booking, 'id' | 'documentId' | 'createdAt'>