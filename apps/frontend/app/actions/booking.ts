'use server'

import { makeStrapiGETRequest, makeStrapiGETRequestWithPages, makeStrapiRequest } from "@/app/lib/request"
import { BookingPayload } from "@/types/booking"

export async function createBooking(details: BookingPayload) {
    return makeStrapiRequest('/api/bookings', 'POST', true, details)
}

export async function getBooking(id: string) {
    return makeStrapiGETRequest(`/api/bookings/${id}`)
}

export async function getBookings(page = 1, pageSize = 4) {
    return makeStrapiGETRequestWithPages(
        `/api/bookings`, page, pageSize
    )
}