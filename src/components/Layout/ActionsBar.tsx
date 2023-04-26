import { FC, HTMLAttributes, useContext } from 'react'
import { MeetupsContext } from '../../context/MeetupsContext'
import { ModalContext } from '../../context/ModalContext'
import { Meetup } from '../../types/types'
import classes from '../../utils/classes'
import EditMeetupForm from '../forms/EditMeetupForm'
import styles from './ActionsBar.module.css'
import NavBarButton from './NavBarButton'

type ActionsBarProps = {}

const ActionsBar: FC<HTMLAttributes<HTMLDivElement> & ActionsBarProps> = (props) => {
    const { children, className, ...otherProps } = props
    const { showModal, hideModal } = useContext(ModalContext)
    const { resetMeetups, addMeetup, getNewMeetup } = useContext(MeetupsContext)

    const addNewMeetupHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        showModal(
            <EditMeetupForm
                meetup={getNewMeetup()}
                onSubmit={(meetup: Meetup) => {
                    addMeetup(meetup)
                    hideModal()
                }}
                onCancel={hideModal}
            />,
            `Edit Meetup`,
            hideModal
        )
    }

    return (
        <div className={classes(styles.actionsBar, className)} {...otherProps}>
            <ul className={styles.actionsBarList}>
                <li className={styles.actionsBarListItem}>
                    <NavBarButton onClick={addNewMeetupHandler}>New Meetup</NavBarButton>
                </li>
                <li className={styles.actionsBarListItem}>
                    <NavBarButton onClick={resetMeetups}>Reset</NavBarButton>
                </li>
            </ul>
        </div>
    )
}

export default ActionsBar
