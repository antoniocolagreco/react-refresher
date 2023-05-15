import classes from '@utils/classes'
import { FC, HtmlHTMLAttributes, Ref, forwardRef } from 'react'
import styles from './GalleryItem.module.css'

type GalleryFillerProps = HtmlHTMLAttributes<HTMLSpanElement> & {
    ref?: Ref<HTMLSpanElement>
}

const GalleryFiller: FC<GalleryFillerProps> = forwardRef<HTMLSpanElement, GalleryFillerProps>((props, ref) => {
    const { children, style, className, ...otherProps } = props

    return (
        <span
            ref={ref}
            className={classes(styles.galleryItem, className)}
            {...otherProps}
            style={{ backgroundColor: 'var(--gray-3)', ...style }}
        />
    )
})

export default GalleryFiller
