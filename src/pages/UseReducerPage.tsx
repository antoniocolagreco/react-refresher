import classes from '@utils/classes'
import { ChangeEvent, FC, FormEvent, HTMLAttributes, useReducer } from 'react'
import Button from '../components/button/Button'
import Gallery from '../components/gallery/Gallery'
import GalleryItem from '../components/gallery/GalleryItem'
import Input from '../components/input/Input'
import Option from '../components/select/Option'
import Select from '../components/select/Select'
import { pexelsSearchPhotos } from '../data/pexels'
import IconCalendar from '../icons/IconCalendar'
import {
    ERROR,
    INITIAL_STATE,
    SEARCH,
    SET_PARAMETERS,
    SUCCESS,
    pexelsPhotosReducer,
} from '../reducers/pexelsPhotosReducer'
import { PexelsColor, PexelsLocale, PexelsOrientation, PexelsPerPage, PexelsSize } from '../types/pexels'
import numbers from '../utils/numbers'
import styles from './UseReducerPage.module.css'

const UseReducerPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    const [state, dispatch] = useReducer(pexelsPhotosReducer, INITIAL_STATE)

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: SEARCH })
        pexelsSearchPhotos(state)
            .then((response) => {
                dispatch({ type: SUCCESS, payload: response })
            })
            .catch((error) => {
                dispatch({ type: ERROR })
            })
    }

    const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: SET_PARAMETERS, payload: { query: e.target.value } })
    }

    const onOrientationChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsOrientation
        if (Object.values(PexelsOrientation).includes(selectedValue)) {
            dispatch({
                type: SET_PARAMETERS,
                payload: { orientation: selectedValue },
            })
        }
    }

    const onSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsSize
        if (Object.values(PexelsSize).includes(selectedValue)) {
            dispatch({ type: SET_PARAMETERS, payload: { size: selectedValue } })
        }
    }

    const onColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsColor
        if (Object.values(PexelsColor).includes(selectedValue)) {
            dispatch({ type: SET_PARAMETERS, payload: { color: selectedValue } })
        }
    }

    const onLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsLocale
        if (Object.values(PexelsLocale).includes(selectedValue)) {
            dispatch({
                type: SET_PARAMETERS,
                payload: { locale: selectedValue },
            })
        }
    }

    const onPhotosPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number.parseInt(e.target.value) as PexelsPerPage
        dispatch({
            type: SET_PARAMETERS,
            payload: { per_page: selectedValue },
        })
    }

    return (
        <div className={classes(styles.useReducerPage, className)} {...otherProps}>
            <form className={styles.form} onSubmit={formSubmitHandler}>
                <span className={styles.inputContainer}>
                    <a href="https://www.pexels.com" target="_blank" className={styles.logo}>
                        <img src="https://images.pexels.com/lib/api/pexels.png" />
                    </a>
                    <Input name="query" onChange={onQueryChange} value={state.query} />
                    <Button type="submit" disabled={state.loading}>
                        <IconCalendar className={styles.icon} />
                        Search
                    </Button>
                </span>
                <div className={styles.optionsContainer}>
                    <span className={styles.optionContainer}>
                        <label htmlFor="orientation">Orientation</label>
                        <Select name="orientation" onChange={onOrientationChange} value={state.orientation}>
                            {Object.entries(PexelsOrientation).map(([key, value]) => (
                                <Option key={value} value={value}>
                                    {key}
                                </Option>
                            ))}
                        </Select>
                    </span>
                    <span className={styles.optionContainer}>
                        <label htmlFor="size">Size</label>
                        <Select name="size" onChange={onSizeChange} value={state.size}>
                            {Object.entries(PexelsSize).map(([key, value]) => (
                                <Option key={value} value={value}>
                                    {key}
                                </Option>
                            ))}
                        </Select>
                    </span>
                    <span className={styles.optionContainer}>
                        <label htmlFor="size">Color</label>
                        <Select name="size" onChange={onColorChange} value={state.color}>
                            {Object.entries(PexelsColor).map(([key, value]) => (
                                <Option key={value} value={value}>
                                    {key}
                                </Option>
                            ))}
                        </Select>
                    </span>
                    <span className={styles.optionContainer}>
                        <label htmlFor="locale">Language</label>
                        <Select name="locale" onChange={onLocaleChange} value={state.locale}>
                            {Object.entries(PexelsLocale).map(([key, value]) => (
                                <Option key={value} value={value}>
                                    {key}
                                </Option>
                            ))}
                        </Select>
                    </span>
                    <span className={styles.optionContainer}>
                        <label htmlFor="locale">Per page photos</label>
                        <Select name="locale" onChange={onPhotosPerPageChange} value={state.per_page}>
                            {numbers(15, 80).map((number) => (
                                <Option key={number} value={number}>
                                    {number}
                                </Option>
                            ))}
                        </Select>
                    </span>
                </div>
            </form>
            <Gallery>
                {state.photos.map((photo) => (
                    <GalleryItem key={photo.id} photo={photo} />
                ))}
            </Gallery>
        </div>
    )
}

export default UseReducerPage
