import { FC, HTMLAttributes, useContext } from 'react'
import MeetupCard from '../components/MeetupCard'
import { MeetupsContext } from '../context/MeetupsContext'
import classes from '../utils/classes'
import styles from './MeetupsPage.module.css'

type MeetupsPageProps = {}

const MeetupsPage: FC<HTMLAttributes<HTMLDivElement & MeetupsPageProps>> = (props) => {
    const { children, className, ...otherProps } = props
    const { meetups, deleteMeetup, updateMeetup } = useContext(MeetupsContext)

    return (
        <div className={classes(styles.cardsContainer, className)} {...otherProps}>
            {meetups.map((meetup) => (
                <MeetupCard
                    meetup={meetup}
                    key={meetup.id}
                    onDelete={() => deleteMeetup(meetup.id)}
                    onFavorite={() => updateMeetup({ ...meetup, favorite: !meetup.favorite })}
                />
            ))}
        </div>
    )
}

export default MeetupsPage
