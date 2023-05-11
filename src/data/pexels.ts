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

export const pexelsSearchPhotos = async (parameters: PexelsSearchParameters): Promise<PexelsSearchResponse> => {
    // try {
    const headers = new Headers({ Authorization: PEXELS_API_KEY })
    const generatedURL = generateSearchUrl(parameters)
    console.log(generatedURL) 
    const response = await fetch(generatedURL, {
        headers: headers,
        method: 'GET',
    })
    return response.json()
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok')
    //     }
    //     const data = await (response.json() as Promise<PexelsSearchResponse>)
    //     return data
    // } catch (error) {
    //     console.error((error as Error).message)
    //     return { total_results: 0, page: 0, per_page: 0, photos: [] }
    // }
}

export const pexelsGetPhoto = async (id: number): Promise<PexelsPhoto | null> => {
    // try {
    const headers = new Headers({ Authorization: PEXELS_API_KEY })
    const response = await fetch(PEXELS_GET_PHOTO_URL + id, {
        headers: headers,
        method: 'GET',
    })
    return response.json()
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok')
    //     }
    //     const data = await (response.json() as Promise<PexelsPhoto>)
    //     return data
    // } catch (error) {
    //     console.error((error as Error).message)
    //     return null
    // }
}
