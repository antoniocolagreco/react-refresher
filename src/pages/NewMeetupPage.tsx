import { FC, HTMLAttributes } from 'react'
import classes from '../utils/classes'
import styles from './Page.module.css'

type NewMeetupPageProps = {}

const NewMeetupPage: FC<HTMLAttributes<HTMLDivElement & NewMeetupPageProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.page, className)} {...otherProps}>
            NewMeetupPage{children}
        </div>
    )
}

export default NewMeetupPage
