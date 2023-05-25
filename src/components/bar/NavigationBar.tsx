import NavBarLink from '@components/bar/NavBarLink'
import RoutePaths from '@constants/RoutePaths'
import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './NavBar.module.css'

type NavigationBarProps = {}

const NavigationBar: FC<HTMLAttributes<HTMLElement & NavigationBarProps>> = (props) => {
    const { children, className, ...otherProps } = props

    return (
        <nav className={classes(styles.navigationBar, className)} {...otherProps}>
            <h1 className={styles.title}>React Meetups</h1>
            <ul className={styles.navBarList}>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={`/${RoutePaths.MEETUPS}`}>Meetups</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={`/${RoutePaths.FAVORITES}`}>Favorites</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={`/${RoutePaths.CARD_MODAL_TEST}`}>Test Card \ Modal</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={`/${RoutePaths.USE_TRANSITION}`}>Words Generator</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={`/${RoutePaths.USE_REDUCER}`}>Pexels Gallery</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={`/${RoutePaths.CANVAS_TEST}`}>Canvas Test</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={`/${RoutePaths.COLORS_SCHEME}`}>Colors Scheme</NavBarLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar
