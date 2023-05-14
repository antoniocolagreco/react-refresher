import classes from '@utils/classes'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import { PexelsPhoto } from '../../types/pexels'
import styles from './Gallery.module.css'
import GalleryItem from './GalleryItem'

type GalleryProps = {
    photos: PexelsPhoto[]
    onEnd?: () => {} | void
}

const THRESHOLD = 80

const Gallery: FC<HTMLAttributes<HTMLDivElement> & GalleryProps> = (props) => {
    const { photos, onEnd, children, className, ...otherProps } = props
    const endRef = useRef<HTMLAnchorElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        const observerCallback: IntersectionObserverCallback = (entries, observer) => {
            if (!entries[0].isIntersecting) {
                console.log('Observer:not intersecting')
                return
            }
            console.log('onEnd')
            if (onEnd) onEnd()
        }

        console.log('Observer: new instance')
        observerRef.current = new IntersectionObserver(observerCallback)

        if (endRef.current) {
            observerRef.current.observe(endRef.current)
        }

        return () => {
            console.log('Observer: disconnecting')
            observerRef.current?.disconnect()
        }
    }, [onEnd])

    return (
        <div className={classes(styles.gallery, className)} {...otherProps}>
            {photos.map((photo, index, array) => {
                const length = array.length

                if (length < THRESHOLD || (length >= THRESHOLD && index === length - THRESHOLD)) {
                    console.log(`elemento ${index} con endRef`)
                    return <GalleryItem key={index} photo={photo} ref={endRef} />
                } else {
                    console.log(`elemento ${index}`)
                    return <GalleryItem key={index} photo={photo} />
                }
            })}
        </div>
    )
}

export default Gallery
