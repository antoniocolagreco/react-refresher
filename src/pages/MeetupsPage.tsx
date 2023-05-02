import MeetupCard from '@components/card/MeetupCard'
import { MeetupsContext } from '@context/MeetupsContext'
import classes from '@utils/classes'
import { FC, HTMLAttributes, useContext } from 'react'
import styles from './MeetupsPage.module.css'

type MeetupsPageProps = {}

const MeetupsPage: FC<HTMLAttributes<HTMLDivElement> & MeetupsPageProps> = (props) => {
    const { children, className, ...otherProps } = props
    const { meetups } = useContext(MeetupsContext)

    return (
        <div className={classes(styles.cardsContainer, className)} {...otherProps}>
            {meetups.map((meetup) => (
                <MeetupCard meetup={meetup} key={meetup.id} />
            ))}
        </div>
    )
}

export default MeetupsPage
