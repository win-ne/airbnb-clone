import { Guest } from "./guest"
import { StrapiContentTypeBase } from "./strapi"

export type Booking = StrapiContentTypeBase & {
  startDate: Date
  endDate: Date
  guestCount: number
  guest?: Guest
}
