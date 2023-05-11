import { Reducer } from 'react'
import { PexelsSearchParameters, PexelsSearchResponse } from '../types/pexels'

export const SET_PARAMETERS = 'SET_PARAMETERS'
export const SEARCH = 'SEARCH'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'

export type PhotosState = {
    loading: boolean
    error: boolean
} & PexelsSearchParameters &
    PexelsSearchResponse

// export type PhotosSetParametersPayload = Omit<PexelsSearchParameters, 'query'> & { query?: string }
export type PhotosSetParametersPayload = PexelsSearchParameters
export type PhotosSuccessPayload = PexelsSearchResponse

export type PhotosSetParamatersAction = { type: typeof SET_PARAMETERS; payload: PhotosSetParametersPayload }
export type PhotosSearchAction = { type: typeof SEARCH }
export type PhotosSetSuccessAction = { type: typeof SUCCESS; payload: PhotosSuccessPayload }
export type PhotosSetErrorAction = { type: typeof ERROR }

export type PhotosAction =
    | PhotosSetParamatersAction
    | PhotosSearchAction
    | PhotosSetSuccessAction
    | PhotosSetErrorAction

export type PhotosReducer = Reducer<PhotosState, PhotosAction>

export const INITIAL_STATE: PhotosState = {
    loading: false,
    error: false,
    query: '',
    page: 0,
    per_page: 80,
    photos: [],
    total_results: 0,
}

export const pexelsPhotosReducer: PhotosReducer = (state, action) => {
    switch (action.type) {
        case SET_PARAMETERS:
            console.log(action)
            const result = { ...state, ...action.payload }
            return result
        case SEARCH:
            console.log(state)
            return { ...state, loading: true }
        case SUCCESS:
            return { ...state, ...action.payload, error: false, loading: false }
        case ERROR:
            return { ...state, error: true, loading: false }
        default:
            return state
    }
}
