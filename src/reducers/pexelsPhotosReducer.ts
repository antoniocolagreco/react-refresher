import { Reducer } from 'react'
import {
    PexelsColor,
    PexelsLocale,
    PexelsOrientation,
    PexelsSearchParameters,
    PexelsSearchResponse,
    PexelsSize,
} from '../types/pexels'

export const PARAMETERS = 'PARAMETERS'
export const LOADING = 'LOADING'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export const MORE = 'MORE'

export type PhotosState = {
    loading: boolean
    error: boolean
} & PexelsSearchParameters &
    PexelsSearchResponse

// export type PhotosSetParametersPayload = Omit<PexelsSearchParameters, 'query'> & { query?: string }
export type ParametersPayload = PexelsSearchParameters
export type SuccessPayload = PexelsSearchResponse
export type MorePayload = PexelsSearchResponse

export type ParamatersAction = { type: typeof PARAMETERS; payload: ParametersPayload }
export type LoadingAction = { type: typeof LOADING }
export type SuccessAction = { type: typeof SUCCESS; payload: SuccessPayload }
export type ErrorAction = { type: typeof ERROR }
export type MoreAction = { type: typeof MORE; payload: MorePayload }

export type PhotosAction = ParamatersAction | LoadingAction | SuccessAction | ErrorAction | MoreAction

export type PhotosReducer = Reducer<PhotosState, PhotosAction>

export const INITIAL_STATE: PhotosState = {
    loading: false,
    error: false,
    query: '',
    page: 0,
    per_page: 80,
    photos: [],
    total_results: 0,
    color: PexelsColor.all,
    locale: PexelsLocale.all,
    orientation: PexelsOrientation.all,
    size: PexelsSize.all,
}

export const pexelsPhotosReducer: PhotosReducer = (prevState, action) => {
    // console.log('/// REDUCER')

    let newState: PhotosState

    switch (action.type) {
        case PARAMETERS:
            newState = { ...prevState, ...action.payload }
            return newState
        case LOADING:
            newState = { ...prevState, loading: true }
            return newState
        case SUCCESS:
            newState = { ...prevState, ...action.payload, error: false, loading: false }
            return newState
        case ERROR:
            newState = { ...prevState, error: true, loading: false }
            return newState
        case MORE:
            const allPhotos = [...prevState.photos, ...action.payload.photos]
            newState = {
                query: prevState.query,
                orientation: prevState.orientation,
                size: prevState.size,
                color: prevState.color,
                locale: prevState.locale,
                total_results: prevState.total_results,
                per_page: prevState.per_page,
                page: action.payload.page,
                next_page: action.payload.next_page,
                prev_page: action.payload.prev_page,
                photos: allPhotos,
                error: false,
                loading: false,
            }
            console.log('useReducer MORE')
            return newState
        default:
            return prevState
    }
}
