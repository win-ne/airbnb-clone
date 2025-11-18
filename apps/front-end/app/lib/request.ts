import { Booking, BookingPayload } from "@/types/booking"
import { Guest, GuestPayload } from "@/types/guest"
import { Host, HostPayload } from "@/types/host"
import { Listing, ListingPayload } from "@/types/listing"
import { StrapiErrorResponse } from "@/types/strapi"
import qs from "qs"

export const StrapiURL = process.env.NEXT_PUBLIC_STRAPI_URL

export function generatePaginationQuery(page = 1, pageSize = 25, queryOptions?: object) {
    const query = qs.stringify(
        {
            pagination: {
                page,
                pageSize
            },
            ...(queryOptions || {})
        },
        { encodeValuesOnly: true }
    )

    return `?${query}`
}

export function generateQuery(queryOptions: object) {
    const query = qs.stringify(
        queryOptions,
        { encodeValuesOnly: true }
    )

    return `?${query}`
}

export async function makeStrapiRequest(
    path: string,
    method: string,
    encloseInData = false,
    details?: Booking | Guest | Listing | Host | BookingPayload | GuestPayload | ListingPayload | HostPayload
) {
    const requestProps: RequestInit = { method }

    const headers = new Headers()

    if (details) headers.append('Content-Type', 'application/json')

    let reqBody = {} as { [key: string]: string }
    const hasBody = method == 'POST' || method == 'PUT'

    if (hasBody) {
        reqBody = details as { [key: string]: any }
    }

    if (hasBody) {
        requestProps.body = JSON.stringify(encloseInData ? { data: reqBody } : reqBody)
    }

    requestProps.headers = headers

    const res = await fetch(`${StrapiURL}${path}`, requestProps)

    if (!res.ok) {
        const err = await res.text()

        try {
            const errResp = (JSON.parse(err)) as StrapiErrorResponse
            return errResp
        } catch {
            return { error: { message: err } }
        }
    }

    if (method == 'GET' || method == 'PUT' || method == 'POST') {
        const body = await res.json()

        if (body?.error) return body

        return body?.data ? body.data : body
    }

    return null
}

export async function makeStrapiGETRequest(
    path: string,
    queryOptions?: object
) {
    return makeStrapiRequest(`${path}${queryOptions && generateQuery(queryOptions)}`, 'GET', false)
}

export async function makeStrapiGETRequestWithPages(
    path: string,
    page: number,
    pageSize: number,
    queryOptions?: object
) {
    return makeStrapiRequest(`${path}${generatePaginationQuery(page, pageSize, queryOptions)}`, 'GET', false)
}
