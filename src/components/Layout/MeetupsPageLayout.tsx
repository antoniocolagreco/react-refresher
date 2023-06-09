import ActionsBar from '@components/bar/ActionsBar'
import { FC, HTMLAttributes } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import PageLayout from './PageLayout'
import styles from './PageLayout.module.css'

type MeetupsPageLayoutProps = {}

const MeetupsPageLayout: FC<HTMLAttributes<HTMLElement & MeetupsPageLayoutProps>> = (props) => {
    return (
        <PageLayout {...props}>
            <Helmet>
                <title>React Meetups</title>
                <link rel="icon" type="image/svg+xml" href="/react.svg" />
            </Helmet>
            <div className={styles.layoutSubHeader}>
                <ActionsBar />
            </div>
            <main className={styles.layoutMain}>
                <Outlet />
            </main>
        </PageLayout>
    )
}

export default MeetupsPageLayout
