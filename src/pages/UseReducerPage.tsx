import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import styles from './UseReducerPage.module.css'

type UseReducerPageProps = {}

const UseReducerPage: FC<HTMLAttributes<HTMLDivElement> & UseReducerPageProps> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.useReducerPage, className)} {...otherProps}>
            UseReducerPage{children}
        </div>
    )
}

export default UseReducerPage
