import NavBarButton from '@components/bar/NavBarButton'
import EditMeetupForm from '@components/form/EditMeetupForm'
import { MeetupsContext } from '@context/MeetupsContext'
import { ModalContext } from '@context/ModalContext'
import classes from '@utils/classes'
import { FC, HTMLAttributes, useContext } from 'react'
import { Meetup } from '../../types/types'
import styles from './NavBar.module.css'

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
        <div className={classes(styles.subNavBar, className)} {...otherProps}>
            <ul className={styles.subNavBarList}>
                <li className={styles.subNavBarListItem}>
                    <NavBarButton onClick={addNewMeetupHandler}>New Meetup</NavBarButton>
                </li>
                <li className={styles.subNavBarListItem}>
                    <NavBarButton onClick={resetMeetups}>Reset</NavBarButton>
                </li>
            </ul>
        </div>
    )
}

export default ActionsBar
