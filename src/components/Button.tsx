import { FC, HTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonProps = {}

const Button: FC<HTMLAttributes<HTMLButtonElement & ButtonProps>> = (props) => {
    return (
        <button className={styles.button} {...props}>
            {props.children}
        </button>
    )
}

export default Button
