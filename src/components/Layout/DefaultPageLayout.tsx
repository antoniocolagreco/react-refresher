import { FC, HTMLAttributes } from 'react'
import { Outlet } from 'react-router-dom'
import PageLayout from './PageLayout'
import styles from './PageLayout.module.css'

type DefaultPageLayoutProps = {}

const DefaultPageLayout: FC<HTMLAttributes<HTMLElement & DefaultPageLayoutProps>> = (props) => {
    return (
        <PageLayout {...props}>
            <main className={styles.layoutMain}>
                <Outlet />
            </main>
        </PageLayout>
    )
}

export default DefaultPageLayout
