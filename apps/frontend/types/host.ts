import { Listing } from "./listing"
import { StrapiContentTypeBase, StrapiPhoto } from "./strapi"

export type Language = {
  id: number
  language: string
}

export type Host = StrapiContentTypeBase & {
  name: string
  profession: string
  homeUniqueProposition: string
  guestProposition: string
  school: string
  location: string
  listings?: Listing[]
  languages: Language[]
  profilePicture: StrapiPhoto
}
