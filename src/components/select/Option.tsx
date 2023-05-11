import classes from '@utils/classes'
import { FC, OptionHTMLAttributes } from 'react'
import styles from './SelectOption.module.css'

const Option: FC<OptionHTMLAttributes<HTMLOptionElement>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <option className={classes(styles.option, className)} {...otherProps}>
            {children}
        </option>
    )
}

export default Option
