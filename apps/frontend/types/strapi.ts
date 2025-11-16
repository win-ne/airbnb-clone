export type StrapiErrorResponse = {
    data?: any
    error?: {
        status?: number
        name?: string
        message?: string
        details?: object
    }
}

export type StrapiContentTypeBase = {
    id: number
    documentId: string
    createdAt: string
    updatedAt?: string
    publishedAt?: string
}

export type StrapiPhoto = StrapiContentTypeBase & {
    name: string
    alternativeText: string | null
    caption: string | null
    width: number | null
    height: number | null
    formats: {
        thumbnail?: StrapiMediaFormat
        small?: StrapiMediaFormat
        medium?: StrapiMediaFormat
        large?: StrapiMediaFormat;
        [key: string]: StrapiMediaFormat | undefined
    } | null
    hash: string
    ext: string | null
    mime: string
    size: number // in KB
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any | null
}

export type StrapiMediaFormat = {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    path: string | null
    url: string
}