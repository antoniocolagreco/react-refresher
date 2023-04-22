import { FC, HTMLAttributes } from 'react'
import classes from '../utils/classes'
import styles from './Button.module.css'

type ButtonProps = {}

const Button: FC<HTMLAttributes<HTMLButtonElement & ButtonProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <button className={classes(styles.button, className)} {...otherProps}>
            {props.children}
        </button>
    )
}

export default Button
