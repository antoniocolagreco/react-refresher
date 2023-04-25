import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import IconClose from '../icons/IconClose'
import IconEdit from '../icons/IconEdit'
import IconFavorite from '../icons/IconFavorite'
import IconNotFavorite from '../icons/IconNotFavorite'
import { Meetup } from '../types/types'
import Box from './Box'
import IconButton from './IconButton'
import IconToggle from './IconToggle'
import styles from './MeetupCard.module.css'

type MeetupCardProps = {
    meetup: Meetup
    onDelete: () => void
    onFavorite: () => void
}

const MeetupCard: FC<HTMLAttributes<HTMLDivElement> & MeetupCardProps> = (props) => {
    const { className, meetup, onFavorite, onDelete, ...otherProps } = props

    return (
        <div className={classes(styles.meetupCard, className)} {...otherProps}>
            <Box className={styles.meetupCard} {...otherProps}>
                <header className={styles.header}>
                    <img className={styles.image} src={meetup.image}></img>
                    <h3 className={styles.title}>{meetup.title}</h3>
                </header>
                <main className={styles.main}>
                    <p className={styles.date}>{meetup.date}</p>
                    <p className={styles.address}>{meetup.address}</p>
                    <p className={styles.description}>{meetup.description}</p>
                </main>
                <footer className={styles.footer}>
                    <IconButton icon={<IconClose />} onClick={onDelete} />
                    <IconButton icon={<IconEdit />} />
                    <IconToggle
                        onIcon={<IconFavorite />}
                        offIcon={<IconNotFavorite />}
                        state={meetup.favorite}
                        onClick={onFavorite}
                    />
                </footer>
            </Box>
        </div>
    )
}

export default MeetupCard
