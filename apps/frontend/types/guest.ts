import { Booking } from "./booking"
import { StrapiContentTypeBase } from "./strapi"

export type Guest = StrapiContentTypeBase & {
  firstName: string
  lastName: string
  email: string
  phone: string
  bookings?: Booking[]
}
