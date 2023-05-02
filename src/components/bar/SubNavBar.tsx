import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import RoutePaths from '../../constants/RoutePaths'
import styles from './NavBar.module.css'
import NavBarLink from './NavBarLink'

type SubNavBarProps = {}

const SubNavBar: FC<HTMLAttributes<HTMLElement> & SubNavBarProps> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <nav className={classes(styles.subNavBar, className)} {...otherProps}>
            <ul className={classes(styles.subNavBarList, styles.inverted)}>
                <li className={styles.subNavBarListItem}>
                    <NavBarLink to={RoutePaths.USE_MEMO}>useMemo</NavBarLink>
                </li>
            </ul>
        </nav>
    )
}

export default SubNavBar
