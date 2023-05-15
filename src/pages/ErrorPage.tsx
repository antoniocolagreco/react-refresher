import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './ErrorPage.module.css'

const ErrorPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.errorPage, className)} {...otherProps}>
            <Helmet>
                <title>404 - Page not found</title>
            </Helmet>
            <h2>404 - Page not found</h2>
        </div>
    )
}

export default ErrorPage
