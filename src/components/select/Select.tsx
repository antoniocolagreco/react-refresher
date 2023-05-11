import classes from '@utils/classes'
import { FC, SelectHTMLAttributes } from 'react'
import styles from './SelectOption.module.css'

const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <select className={classes(styles.select, className)} {...otherProps}>
            {children}
        </select>
    )
}

export default Select
