import classes from '@utils/classes'
import { ChangeEvent, FC, FormEvent, HTMLAttributes, useEffect, useReducer, useRef } from 'react'
import Button from '../components/button/Button'
import Gallery from '../components/gallery/Gallery'
import Input from '../components/input/Input'
import Option from '../components/select/Option'
import Select from '../components/select/Select'
import { morePexelsPhotos, searchPexelsPhotos } from '../data/pexels'

import IconSearch from '../icons/IconSearch'
import {
    ERROR,
    INITIAL_STATE,
    LOADING,
    MORE,
    PARAMETERS,
    SUCCESS,
    pexelsPhotosReducer,
} from '../reducers/pexelsPhotosReducer'
import { PexelsColor, PexelsLocale, PexelsOrientation, PexelsSize } from '../types/pexels'
import styles from './UseReducerPage.module.css'

const UseReducerPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    const [state, dispatch] = useReducer(pexelsPhotosReducer, INITIAL_STATE)
    const endRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        const observerCallback: IntersectionObserverCallback = () => {
            loadMore()
        }

        console.log('Observer: instanziamento')
        observerRef.current = new IntersectionObserver(observerCallback)

        if (endRef.current) {
            observerRef.current.observe(endRef.current)
        }

        return () => {
            console.log('Observer: disconnecting')
            observerRef.current?.disconnect()
        }
    }, [])

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: LOADING })
        searchPexelsPhotos(state)
            .then((response) => {
                console.log(response)
                dispatch({ type: SUCCESS, payload: response })
            })
            .catch((error) => {
                dispatch({ type: ERROR })
            })
    }

    const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: PARAMETERS, payload: { query: e.target.value } })
    }

    const onOrientationChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsOrientation
        if (Object.values(PexelsOrientation).includes(selectedValue)) {
            dispatch({
                type: PARAMETERS,
                payload: { orientation: selectedValue },
            })
        }
    }

    const onSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsSize
        if (Object.values(PexelsSize).includes(selectedValue)) {
            dispatch({ type: PARAMETERS, payload: { size: selectedValue } })
        }
    }

    const onColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsColor
        if (Object.values(PexelsColor).includes(selectedValue)) {
            dispatch({ type: PARAMETERS, payload: { color: selectedValue } })
        }
    }

    const onLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as PexelsLocale
        if (Object.values(PexelsLocale).includes(selectedValue)) {
            dispatch({
                type: PARAMETERS,
                payload: { locale: selectedValue },
            })
        }
        console.log(state)
    }

    const loadMore = () => {
        console.log('loadmore')
        console.log(state)
        if (state.total_results === 0 || !state.next_page) return
        dispatch({ type: LOADING })
        morePexelsPhotos(state.next_page)
            .then((response) => {
                const allPhotos = [...state.photos, ...response.photos]
                dispatch({
                    type: MORE,
                    payload: {
                        ...response,
                        photos: allPhotos,
                    },
                })
            })
            .catch((error) => {
                dispatch({ type: ERROR })
            })
    }

    return (
        <div className={classes(styles.useReducerPage, className)} {...otherProps}>
            <form className={styles.form} onSubmit={formSubmitHandler}>
                <span className={styles.inputContainer}>
                    <a href="https://www.pexels.com" target="_blank" className={styles.logo}>
                        <img src="https://images.pexels.com/lib/api/pexels.png" alt="Pexels logo" />
                    </a>
                    <Input name="query" onChange={onQueryChange} value={state.query} />
                    <Button type="submit" disabled={state.loading}>
                        <IconSearch className={styles.icon} />
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
                        <label htmlFor="color">Color</label>
                        <Select name="color" onChange={onColorChange} value={state.color}>
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
                </div>
                <div>
                    <span>
                        <span>Total results:</span>
                        <span>{state.total_results}</span>
                    </span>
                    <span>
                        <span>Current page:</span>
                        <span>{state.page}</span>
                    </span>
                </div>
            </form>
            <Gallery photos={state.photos} />
            <div ref={endRef} />
        </div>
    )
}

export default UseReducerPage
