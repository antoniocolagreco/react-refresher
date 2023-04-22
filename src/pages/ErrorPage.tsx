import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './Page.module.css'

type ErrorPageProps = {}

const ErrorPage: FC<HTMLAttributes<HTMLDivElement & ErrorPageProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.page, className)} {...otherProps}>
            404 Page not found
        </div>
    )
}

export default ErrorPage
