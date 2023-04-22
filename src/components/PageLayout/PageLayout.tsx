import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './PageLayout.module.css'

type PageLayoutProps = {}

const PageLayout: FC<HTMLAttributes<HTMLElement & PageLayoutProps>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.layout, className)} {...otherProps}>
            <Outlet />
        </div>
    )
}

export default PageLayout
