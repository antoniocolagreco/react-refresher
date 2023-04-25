import { FC, HTMLAttributes, useContext } from 'react'
import { MeetupsContext } from '../../context/MeetupsContext'
import classes from '../../utils/classes'
import styles from './ActionsBar.module.css'
import NavBarButton from './NavBarButton'

type ActionsBarProps = {}

const ActionsBar: FC<HTMLAttributes<HTMLDivElement> & ActionsBarProps> = (props) => {
    const { children, className, ...otherProps } = props
    const { resetMeetups } = useContext(MeetupsContext)

    return (
        <div className={classes(styles.actionsBar, className)} {...otherProps}>
            <ul className={styles.actionsBarList}>
                <li className={styles.actionsBarListItem}>
                    <NavBarButton>New Meetup</NavBarButton>
                </li>
                <li className={styles.actionsBarListItem}>
                    <NavBarButton onClick={resetMeetups}>Reset</NavBarButton>
                </li>
            </ul>
        </div>
    )
}

export default ActionsBar
