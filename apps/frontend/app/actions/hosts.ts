'use server'

import { makeStrapiGETRequest, makeStrapiGETRequestWithPages, makeStrapiRequest } from "@/app/lib/request"
import { Host } from "@/types/host"

export async function createHost(details: Host) {
    return makeStrapiRequest('/api/hosts', 'POST', true, details)
}

export async function getHost(id: string) {
    return makeStrapiGETRequest(`/api/hosts/${id}`)
}

export async function getHosts(page = 1, pageSize = 4) {
    return makeStrapiGETRequestWithPages(
        `/api/hosts`, page, pageSize
    )
}