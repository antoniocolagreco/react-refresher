import classes from '@utils/classes'
import { FC, InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <input className={classes(styles.input, className)} {...otherProps}>
            {children}
        </input>
    )
}

export default Input
