import NavigationBar from '@components/bar/NavigationBar'
import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './PageLayout.module.css'

type PageLayoutProps = {}

const PageLayout: FC<HTMLAttributes<HTMLElement & PageLayoutProps>> = (props) => {
    const { children, className, ...otherProps } = props

    return (
        <div className={classes(styles.layoutContainer, className)} {...otherProps}>
            <Helmet>
                <title>React Meetups</title>
                <link rel="icon" type="image/svg+xml" href="/react.svg" />
            </Helmet>
            <header className={styles.layoutHeader}>
                <NavigationBar />
            </header>
            {children}
            <footer className={styles.layoutFooter}></footer>
        </div>
    )
}

export default PageLayout
