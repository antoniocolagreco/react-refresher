import classes from '@utils/classes'
import { FC, HTMLAttributes, ReactNode } from 'react'
import styles from './IconButton.module.css'

type IconButtonProps = {
    icon: ReactNode
}

const IconButton: FC<HTMLAttributes<HTMLButtonElement> & IconButtonProps> = (props) => {
    const { icon, children, className, ...otherProps } = props
    return (
        <button className={classes(styles.iconButton, className)} {...otherProps}>
            {icon}
        </button>
    )
}

export default IconButton
