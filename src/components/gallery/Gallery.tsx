import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './Gallery.module.css'

type GalleryProps = {}

const Gallery: FC<HTMLAttributes<HTMLDivElement> & GalleryProps> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.gallery, className)} {...otherProps}>
            {children}
        </div>
    )
}

export default Gallery
