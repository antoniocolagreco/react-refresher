import classes from '@utils/classes'
import { AnchorHTMLAttributes, FC, Ref, forwardRef, useState } from 'react'
import { PexelsPhoto } from '../../types/pexels'
import styles from './GalleryItem.module.css'

type GalleryItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    ref?: Ref<HTMLAnchorElement>
    photo: PexelsPhoto
    figureClass?: string
    imgClass?: string
}

const GalleryItem: FC<GalleryItemProps> = forwardRef<HTMLAnchorElement, GalleryItemProps>((props, ref) => {
    const { children, style, photo, className, figureClass, imgClass, ...otherProps } = props
    const [visible, setVisible] = useState(false)

    const proportions = photo.width / photo.height

    let src = `${photo.src.original}?auto=compress&cs=tinysrgb&dpr=1&w=500`
    let gridClass = ''
    if (proportions > 1.49) {
        gridClass = styles.span1x2
    } else if (proportions < 0.7) {
        gridClass = styles.span2x1
    } else if (proportions > 0.94 && proportions < 1.06) {
        gridClass = styles.span2x2
    }

    return (
        <a
            className={classes(styles.galleryItem, gridClass)}
            target="_blank"
            href={photo.url}
            style={{ backgroundColor: photo.avg_color, ...style }}
            ref={ref}
            {...otherProps}
        >
            <figure className={classes(styles.figure, figureClass, visible ? styles.visible : styles.hidden)}>
                <img
                    src={src}
                    alt={photo.alt}
                    className={classes(styles.image, imgClass)}
                    onLoad={() => setVisible(true)}
                    onError={() => setVisible(true)}
                />
                <figcaption className={styles.figcaption}>{`${photo.alt} by ${photo.photographer}`}</figcaption>
            </figure>
        </a>
    )
})

export default GalleryItem
