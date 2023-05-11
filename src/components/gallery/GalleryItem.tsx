import classes from '@utils/classes'
import { AnchorHTMLAttributes, FC, useState } from 'react'
import { PexelsPhoto } from '../../types/pexels'
import styles from './GalleryItem.module.css'

type GalleryItemProps = {
    photo: PexelsPhoto
    figureClass?: string
    imgClass?: string
}

const GalleryItem: FC<AnchorHTMLAttributes<HTMLAnchorElement> & GalleryItemProps> = (props) => {
    const { children, style, photo, className, figureClass, imgClass, ...otherProps } = props
    const [visible, setVisible] = useState(false)

    const show = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        console.log(visible)
        setVisible(true)
    }

    const proportions = photo.width / photo.height

    let src = `${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=500`
    let gridClass = ''
    if (proportions > 1.49) {
        gridClass = styles.spanTwoCol
    }
    if (proportions < 0.7) {
        gridClass = styles.spanTwoRow
    }

    return (
        <a
            className={classes(styles.galleryItem, gridClass)}
            target="_blank"
            href={photo.url}
            {...otherProps}
            style={{ backgroundColor: photo.avg_color, ...style }}
        >
            <figure className={classes(styles.figure, figureClass, visible ? styles.visible : styles.hidden)}>
                <img
                    src={src}
                    alt={photo.alt}
                    className={classes(styles.image, imgClass)}
                    onLoad={show}
                    onError={show}
                />
                <figcaption className={styles.figcaption}>{`${photo.alt} by ${photo.photographer}`}</figcaption>
            </figure>
        </a>
    )
}

export default GalleryItem
