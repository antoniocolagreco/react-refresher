import classes from '@utils/classes'
import { FC, HTMLAttributes, useContext } from 'react'
import RoutePaths from '../../constants/RoutePaths'
import { MeetupsContext } from '../../context/MeetupsContext'
import NavBarButton from './NavBarButton'
import NavBarLink from './NavBarLink'
import styles from './NavigationBar.module.css'

type NavigationBarProps = {}

const NavigationBar: FC<HTMLAttributes<HTMLElement & NavigationBarProps>> = (props) => {
    const { children, className, ...otherProps } = props
    const { resetMeetups } = useContext(MeetupsContext)

    return (
        <nav className={classes(styles.navigationBar, className)} {...otherProps}>
            <h1 className={styles.title}>React Meetups</h1>
            <ul className={styles.navBarList}>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={RoutePaths.MEETUPS}>Meetups</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={RoutePaths.FAVORITES}>Favorites</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={RoutePaths.NEW_MEETUP}>New Meetup</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarLink to={RoutePaths.CARD_MODAL_TEST}>Test Card \ Modal</NavBarLink>
                </li>
                <li className={styles.navBarListItem}>
                    <NavBarButton onClick={resetMeetups}>Reset</NavBarButton>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar
