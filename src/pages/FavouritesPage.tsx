import MeetupCard from '@components/card/MeetupCard'
import { MeetupsContext } from '@context/MeetupsContext'
import classes from '@utils/classes'
import { FC, HTMLAttributes, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './MeetupsPage.module.css'

const FavouritesPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    const { meetups } = useContext(MeetupsContext)

    return (
        <div className={classes(styles.cardsContainer, className)} {...otherProps}>
            <Helmet>
                <title>Favourites</title>
            </Helmet>
            {meetups
                .filter((meetup) => meetup.favorite)
                .map((meetup) => (
                    <MeetupCard meetup={meetup} key={meetup.id} />
                ))}
        </div>
    )
}

export default FavouritesPage
