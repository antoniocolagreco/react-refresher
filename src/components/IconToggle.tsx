import classes from '@utils/classes'
import { FC, HTMLAttributes, ReactNode } from 'react'
import styles from './IconToggle.module.css'

type IconToggleProps = {
    state: boolean
    onIcon: ReactNode
    offIcon: ReactNode
}

const IconToggle: FC<HTMLAttributes<HTMLButtonElement> & IconToggleProps> = (props) => {
    const { children, onIcon, offIcon, state, className, ...otherProps } = props
    return (
        <button className={classes(styles.iconToggle, className)} {...otherProps}>
            {state ? onIcon : offIcon}
        </button>
    )
}

export default IconToggle
