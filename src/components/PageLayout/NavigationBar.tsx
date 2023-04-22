import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import RoutePaths from '../../constants/RoutePaths'
import NavBarLink from './NavBarLink'
import styles from './NavigationBar.module.css'

type NavigationBarProps = {}

const NavigationBar: FC<HTMLAttributes<HTMLElement & NavigationBarProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <nav className={classes(styles.navigationBar, className)} {...otherProps}>
            <ul>
                <li>
                    <NavBarLink to={RoutePaths.MEETUPS}>Meetups</NavBarLink>
                </li>
                <li>
                    <NavBarLink to={RoutePaths.FAVORITES}>Favorites</NavBarLink>
                </li>
                <li>
                    <NavBarLink to={RoutePaths.NEW_MEETUP}>New Meetup</NavBarLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar