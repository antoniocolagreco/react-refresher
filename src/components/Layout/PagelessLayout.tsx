import { FC, HTMLAttributes } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import PageLayout from './PageLayout'
import styles from './PageLayout.module.css'

type DefaultPageLayoutProps = {}

const DefaultPageLayout: FC<HTMLAttributes<HTMLElement & DefaultPageLayoutProps>> = (props) => {
    return (
        <PageLayout {...props}>
            <Helmet>
                <title>React Refresher</title>
                <link rel="icon" type="image/svg+xml" href="/react.svg" />
            </Helmet>
            <main className={styles.layoutMainPageless}>
                <Outlet />
            </main>
        </PageLayout>
    )
}

export default DefaultPageLayout
