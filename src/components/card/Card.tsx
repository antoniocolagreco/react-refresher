import Box, { HTMLBoxElement } from '@components/box/Box'
import { FC, HTMLAttributes } from 'react'
import styles from './Card.module.css'

type CardProps = {
    title: string
}

const Card: FC<HTMLAttributes<HTMLBoxElement> & CardProps> = (props) => {
    const { title, ...otherProps } = props
    return (
        <Box className={styles.card} {...otherProps}>
            <header className={styles.header}>
                <h3 className={styles.title}>{props.title}</h3>
            </header>
            {props.children}
        </Box>
    )
}

export default Card
