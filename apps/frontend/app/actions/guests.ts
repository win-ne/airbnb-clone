'use server'

import { makeStrapiGETRequest, makeStrapiGETRequestWithPages, makeStrapiRequest } from "@/app/lib/request"
import { Guest } from "@/types/guest"

export async function createGuest(details: Guest) {
    return makeStrapiRequest('/api/guests', 'POST', true, details)
}

export async function getGuest(id: string) {
    return makeStrapiGETRequest(`/api/guests/${id}`)
}

export async function getGuests(page = 1, pageSize = 4) {
    return makeStrapiGETRequestWithPages(
        `/api/guests`, page, pageSize
    )
}