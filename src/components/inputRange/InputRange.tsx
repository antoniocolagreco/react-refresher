import classes from '@utils/classes'
import { FC, InputHTMLAttributes } from 'react'
import styles from './InputRange.module.css'

type InputRangeProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {}

const InputRange: FC<InputRangeProps> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <input type="range" className={classes(styles.inputRange, className)} {...otherProps}>
            {children}
        </input>
    )
}

export default InputRange
