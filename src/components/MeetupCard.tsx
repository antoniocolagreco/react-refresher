import classes from '@utils/classes'
import { FC, HTMLAttributes, useContext, useState } from 'react'
import { MeetupsContext } from '../context/MeetupsContext'
import { ModalContext } from '../context/ModalContext'
import IconClose from '../icons/IconClose'
import IconEdit from '../icons/IconEdit'
import IconFavorite from '../icons/IconFavorite'
import IconNotFavorite from '../icons/IconNotFavorite'
import { Meetup } from '../types/types'
import Box from './Box'
import IconButton from './IconButton'
import IconToggle from './IconToggle'
import styles from './MeetupCard.module.css'
import DeleteMeetupForm from './forms/DeleteMeetupForm'
import EditMeetupForm from './forms/EditMeetupForm'

type MeetupCardProps = {
    meetup: Meetup
}

const MeetupCard: FC<HTMLAttributes<HTMLDivElement> & MeetupCardProps> = (props) => {
    const { className, meetup, ...otherProps } = props
    const [visible, setVisible] = useState(false)
    const { showModal, hideModal } = useContext(ModalContext)
    const { deleteMeetup, updateMeetup } = useContext(MeetupsContext)

    const deleteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        showModal(
            <DeleteMeetupForm
                key={meetup.id}
                meetup={meetup}
                onSubmit={() => {
                    deleteMeetup(meetup.id)
                    hideModal()
                }}
                onCancel={hideModal}
            />,
            `Delete Meetup`,
            hideModal
        )
    }

    const editHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        showModal(
            <EditMeetupForm
                key={meetup.id}
                meetup={meetup}
                onSubmit={(meetup: Meetup) => {
                    updateMeetup(meetup)
                    hideModal()
                }}
                onCancel={hideModal}
            />,
            `Edit Meetup`,
            hideModal
        )
    }

    const favoriteHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const favoriteMeetup = { ...meetup, favorite: !meetup.favorite }
        updateMeetup(favoriteMeetup)
    }

    return (
        <div
            className={classes(styles.meetupCard, visible ? styles.visible : styles.hidden, className)}
            {...otherProps}
        >
            <Box className={styles.meetupCard} {...otherProps}>
                <header className={styles.header}>
                    <img
                        className={styles.image}
                        src={meetup.image}
                        onLoad={() => setVisible(true)}
                        onError={() => setVisible(true)}
                    ></img>
                    <h3 className={styles.title}>{meetup.title}</h3>
                </header>
                <main>
                    <p className={styles.date}>{meetup.date}</p>
                    <p className={styles.address}>{meetup.address}</p>
                    <p className={styles.description}>{meetup.description}</p>
                </main>
                <footer className={styles.footer}>
                    <IconButton icon={<IconClose />} onClick={(e) => deleteHandler(e)} />
                    <IconButton icon={<IconEdit />} onClick={(e) => editHandler(e)} />
                    <IconToggle
                        onIcon={<IconFavorite />}
                        offIcon={<IconNotFavorite />}
                        state={meetup.favorite}
                        onClick={favoriteHandler}
                    />
                </footer>
            </Box>
        </div>
    )
}

export default MeetupCard
