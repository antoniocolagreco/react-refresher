import { FC, HTMLAttributes } from 'react'
import classes from '../utils/classes'
import styles from './Page.module.css'

type MeetupsPageProps = {}

const MeetupsPage: FC<HTMLAttributes<HTMLDivElement & MeetupsPageProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.page, className)} {...otherProps}>
            MeetupsPage{children}
        </div>
    )
}

export default MeetupsPage
