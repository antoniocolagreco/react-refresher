import classes from '@utils/classes'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import { PexelsPhoto } from '../../types/pexels'
import { cLog } from '../../utils/logger'
import styles from './Gallery.module.css'
import GalleryItem from './GalleryItem'

type GalleryProps = {
    photos: PexelsPhoto[]
    onEnd?: () => {} | void
}

const THRESHOLD = 80

const DEBUG_MODE = false

const Gallery: FC<HTMLAttributes<HTMLDivElement> & GalleryProps> = (props) => {
    const { photos, onEnd, children, className, ...otherProps } = props
    const endRef = useRef<HTMLAnchorElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        const observerCallback: IntersectionObserverCallback = (entries, observer) => {
            if (!entries[0].isIntersecting) {
                cLog(DEBUG_MODE, 'Observer:not intersecting')
                return
            }
            if (onEnd) onEnd()
        }

        cLog(DEBUG_MODE, 'Observer: new instance')
        observerRef.current = new IntersectionObserver(observerCallback)

        if (endRef.current) {
            observerRef.current.observe(endRef.current)
        }

        return () => {
            cLog(DEBUG_MODE, 'Observer: disconnecting')
            observerRef.current?.disconnect()
        }
    }, [onEnd])

    return (
        <div className={classes(styles.gallery, className)} {...otherProps}>
            {photos.map((photo, index, array) => {
                const length = array.length

                if (length < THRESHOLD || (length >= THRESHOLD && index === length - THRESHOLD)) {
                    return <GalleryItem key={index} photo={photo} ref={endRef} />
                } else {
                    return <GalleryItem key={index} photo={photo} />
                }
            })}
        </div>
    )
}

export default Gallery
