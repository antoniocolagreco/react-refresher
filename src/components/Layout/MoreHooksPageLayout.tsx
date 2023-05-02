import { FC, HTMLAttributes } from 'react'
import { Outlet } from 'react-router-dom'
import SubNavBar from '../bar/SubNavBar'
import PageLayout from './PageLayout'
import styles from './PageLayout.module.css'

type MMoreHooksPageLayoutProps = {}

const MoreHooksPageLayout: FC<HTMLAttributes<HTMLElement & MMoreHooksPageLayoutProps>> = (props) => {
    return (
        <PageLayout {...props}>
            <div className={styles.layoutSubHeader}>
                <SubNavBar />
            </div>
            <main className={styles.layoutMain}>
                <Outlet />
            </main>
        </PageLayout>
    )
}

export default MoreHooksPageLayout
