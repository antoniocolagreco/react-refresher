import classes from '@utils/classes'
import { FC, HTMLAttributes, useContext, useState } from 'react'
import { MeetupsContext } from '../context/MeetupsContext'
import { ModalContext } from '../context/ModalContext'
import IconClose from '../icons/IconClose'
import IconEdit from '../icons/IconEdit'
import IconFavorite from '../icons/IconFavorite'
import IconNotFavorite from '../icons/IconNotFavorite'
import { Meetup } from '../types/types'
import formatDate from '../utils/formatDate'
import Box, { HTMLBoxElement } from './Box'
import IconButton from './IconButton'
import IconToggle from './IconToggle'
import Image from './Image'
import styles from './MeetupCard.module.css'
import DeleteMeetupForm from './forms/DeleteMeetupForm'
import EditMeetupForm from './forms/EditMeetupForm'

type MeetupCardProps = {
    meetup: Meetup
}

const MeetupCard: FC<HTMLAttributes<HTMLBoxElement> & MeetupCardProps> = (props) => {
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
                    deleteMeetup(meetup)
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
                onSubmit={(m) => {
                    updateMeetup(m)
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
        <Box
            className={classes(styles.meetupCard, visible ? styles.visible : styles.hidden, className)}
            {...otherProps}
        >
            <header className={styles.header}>
                <Image src={meetup.image} onLoad={() => setVisible(true)} onError={() => setVisible(true)} />
                <h3 className={styles.title}>{meetup.title}</h3>
            </header>
            <main>
                <p className={styles.date}>{formatDate(meetup.date)}</p>
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
    )
}

export default MeetupCard
