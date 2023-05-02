import classes from '@utils/classes'
import { CSSProperties, FC, ImgHTMLAttributes } from 'react'
import styles from './Image.module.css'

type ImageProps = {
    aspectRatio?: number
    containerClass?: string
    containerStyle?: CSSProperties
}

const Image: FC<ImgHTMLAttributes<HTMLImageElement> & ImageProps> = (props) => {
    const { children, src, aspectRatio = 16 / 9, containerClass, containerStyle, className, ...otherProps } = props

    return (
        <div
            className={classes(styles.container, containerClass)}
            style={{ ...containerStyle, paddingTop: `${100 / aspectRatio}%` }}
        >
            {src && <img src={src} className={classes(styles.image, className)} {...otherProps} />}
            {children}
        </div>
    )
}

export default Image
