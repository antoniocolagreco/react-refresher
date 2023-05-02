import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './UseMemoPage.module.css'

type UseMemoPageProps = {}

const UseMemoPage: FC<HTMLAttributes<HTMLDivElement> & UseMemoPageProps> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.useMemoPage, className)} {...otherProps}>
            UseMemoPage{children}
        </div>
    )
}

export default UseMemoPage
