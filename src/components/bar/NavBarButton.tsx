import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './NavBarButton.module.css'

type NavBarButtonProps = {}

const NavBarButton: FC<HTMLAttributes<HTMLButtonElement> & NavBarButtonProps> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <button className={classes(styles.navBarButton, className)} {...otherProps}>
            {children}
        </button>
    )
}

export default NavBarButton
