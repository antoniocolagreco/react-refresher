import NavigationBar from '@components/bar/NavigationBar'
import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './PageLayout.module.css'

type PageLayoutProps = {}

const PageLayout: FC<HTMLAttributes<HTMLElement & PageLayoutProps>> = (props) => {
    const { children, className, ...otherProps } = props

    return (
        <div className={classes(styles.layoutContainer, className)} {...otherProps}>
            <header className={styles.layoutHeader}>
                <NavigationBar />
            </header>
            {children}
            <footer className={styles.layoutFooter}></footer>
        </div>
    )
}

export default PageLayout
