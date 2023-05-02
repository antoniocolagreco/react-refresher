import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './Box.module.css'

export interface HTMLBoxElement extends HTMLDivElement {}

const Box: FC<HTMLAttributes<HTMLBoxElement>> = (props) => {
    const { title, className, ...otherProps } = props

    return (
        <div className={classes(styles.box, className)} {...otherProps}>
            {props.children}
        </div>
    )
}

export default Box
