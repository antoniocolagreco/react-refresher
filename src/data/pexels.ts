import { PexelsPhoto, PexelsSearchParameters, PexelsSearchResponse } from '../types/pexels'

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const PEXELS_SEARCH_URL = 'https://api.pexels.com/v1/search?query='
const PEXELS_GET_PHOTO_URL = 'https://api.pexels.com/v1/photos/'

const generateSearchUrl = (parameters: PexelsSearchParameters): string => {
    let url = `${PEXELS_SEARCH_URL}${parameters.query}`
    if (parameters.orientation) url += `&orientation=${parameters.orientation}`
    if (parameters.size) url += `&size=${parameters.size}`
    if (parameters.color) url += `&color=${parameters.color}`
    if (parameters.locale) url += `&locale=${parameters.locale}`
    if (parameters.page) url += `&page=${parameters.page}`
    if (parameters.per_page) url += `&per_page=${parameters.per_page}`
    return url
}

export const searchPexelsPhotos = async (parameters: PexelsSearchParameters): Promise<PexelsSearchResponse> => {
    console.log('searchPexelsPhotos')
    const headers = new Headers({ Authorization: PEXELS_API_KEY })
    const generatedURL = generateSearchUrl(parameters)
    const response = await fetch(generatedURL, {
        headers: headers,
        method: 'GET',
    })
    return response.json()
}

export const morePexelsPhotos = async (next: string): Promise<PexelsSearchResponse> => {
    console.log('morePexelsPhotos')
    const headers = new Headers({ Authorization: PEXELS_API_KEY })
    const response = await fetch(next, {
        headers: headers,
        method: 'GET',
    })
    return response.json()
}

export const getPexelsPhoto = async (id: number): Promise<PexelsPhoto | null> => {
    const headers = new Headers({ Authorization: PEXELS_API_KEY })
    const response = await fetch(PEXELS_GET_PHOTO_URL + id, {
        headers: headers,
        method: 'GET',
    })
    return response.json()
}
