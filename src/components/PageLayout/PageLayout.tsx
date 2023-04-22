import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import styles from './PageLayout.module.css'

type PageLayoutProps = {}

const PageLayout: FC<HTMLAttributes<HTMLElement & PageLayoutProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.layout, className)} {...otherProps}>
            <Helmet>
                <title>React Refresher</title>
                <link rel="icon" type="image/svg+xml" href="/react.svg" />
            </Helmet>
            <header>
                <NavigationBar></NavigationBar>
            </header>
            <Outlet />
            <footer></footer>
        </div>
    )
}

export default PageLayout