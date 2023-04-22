import { FC, HTMLAttributes } from 'react'
import classes from '../utils/classes'
import styles from './Page.module.css'

type FavouritesPageProps = {}

const FavouritesPage: FC<HTMLAttributes<HTMLDivElement & FavouritesPageProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.page, className)} {...otherProps}>
            FavouritesPage{children}
        </div>
    )
}

export default FavouritesPage
