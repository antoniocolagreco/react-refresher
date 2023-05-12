import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import { PexelsPhoto } from '../../types/pexels'
import styles from './Gallery.module.css'
import GalleryItem from './GalleryItem'

type GalleryProps = {
    photos: PexelsPhoto[]
}

const Gallery: FC<HTMLAttributes<HTMLDivElement> & GalleryProps> = (props) => {
    const { photos, children, className, ...otherProps } = props

    return (
        <div className={classes(styles.gallery, className)} {...otherProps}>
            {photos.map((photo) => (
                <GalleryItem key={photo.id} photo={photo} />
            ))}
        </div>
    )
}

export default Gallery
