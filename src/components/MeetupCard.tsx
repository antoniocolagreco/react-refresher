import classes from '@utils/classes'
import { FC, HTMLAttributes, useContext } from 'react'
import { MeetupsContext } from '../context/MeetupsContext'
import { ModalContext } from '../context/ModalContext'
import IconClose from '../icons/IconClose'
import IconDelete from '../icons/IconDelete'
import IconEdit from '../icons/IconEdit'
import IconFavorite from '../icons/IconFavorite'
import IconNotFavorite from '../icons/IconNotFavorite'
import { Meetup } from '../types/types'
import Box from './Box'
import Button from './Button'
import IconButton from './IconButton'
import IconToggle from './IconToggle'
import styles from './MeetupCard.module.css'

type MeetupCardProps = {
    meetup: Meetup
}

const MeetupCard: FC<HTMLAttributes<HTMLDivElement> & MeetupCardProps> = (props) => {
    const { className, meetup, ...otherProps } = props
    const { showModal, hideModal } = useContext(ModalContext)
    const { deleteMeetup } = useContext(MeetupsContext)

    const deleteHandler = () => {
        showModal(
            <>
                <p>
                    Do you want to delete <b className={styles.questionBold}>{`${meetup.title}`}</b>?
                </p>
                <div className={styles.modalButtonsContainer}>
                    <Button onClick={() => hideModal()}>
                        <IconClose style={{ fill: 'var(--color-grape-0)' }} />
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            deleteMeetup(meetup.id)
                            hideModal()
                        }}
                    >
                        <IconDelete style={{ fill: 'var(--color-grape-0)' }} />
                        Delete
                    </Button>
                </div>
            </>,
            `Delete Meetup`,
            hideModal
        )
    }

    return (
        <div className={classes(styles.meetupCard, className)} {...otherProps}>
            <Box className={styles.meetupCard} {...otherProps}>
                <header className={styles.header}>
                    <img className={styles.image} src={meetup.image}></img>
                    <h3 className={styles.title}>{meetup.title}</h3>
                </header>
                <main>
                    <p className={styles.date}>{meetup.date}</p>
                    <p className={styles.address}>{meetup.address}</p>
                    <p className={styles.description}>{meetup.description}</p>
                </main>
                <footer className={styles.footer}>
                    <IconButton icon={<IconClose />} onClick={deleteHandler} />
                    <IconButton icon={<IconEdit />} />
                    <IconToggle onIcon={<IconFavorite />} offIcon={<IconNotFavorite />} state={meetup.favorite} />
                </footer>
            </Box>
        </div>
    )
}

export default MeetupCard
