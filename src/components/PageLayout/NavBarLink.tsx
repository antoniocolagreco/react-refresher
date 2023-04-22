import { FC, HTMLAttributes } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import classes from '../../utils/classes'
import styles from './NavBarLink.module.css'

type NavBarLinkProps = {}

const NavBarLink: FC<HTMLAttributes<HTMLAnchorElement> & NavLinkProps & NavBarLinkProps> = (props) => {
    const { children, className, to, ...otherProps } = props
    return (
        <NavLink
            to={to}
            className={({ isActive, isPending }) =>
                isPending
                    ? classes(styles.navBarLink, styles.pending)
                    : isActive
                    ? classes(styles.navBarLink, styles.active)
                    : styles.navBarLink
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    )
}

export default NavBarLink
