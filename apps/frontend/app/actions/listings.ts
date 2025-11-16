'use server'

import { makeStrapiGETRequest, makeStrapiGETRequestWithPages, makeStrapiRequest } from "@/app/lib/request"
import { ListingPayload } from "@/types/listing"

export async function createListing(details: ListingPayload) {
    return makeStrapiRequest('/api/listings', 'POST', true, details)
}

export async function getListing(id: string) {
    return makeStrapiGETRequest(
        `/api/listings/${id}`,
        {
            populate: {
                photos: true,
                host: {
                    populate: {
                        profilePicture: true
                    }
                },
                bookings: true,
                amenities: true,
                featuredServices: true
            }
        }
    )
}

export async function getListings(page = 1, pageSize = 4) {
    return makeStrapiGETRequestWithPages(
        `/api/listings`,
        page,
        pageSize,
        {
            populate: {
                photos: true,
                host: true,
                bookings: true,
                amenities: true,
                featuredServices: true
            }
        }
    )
}