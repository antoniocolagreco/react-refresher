import { FC, HTMLAttributes } from 'react'

import Box, { HTMLBoxElement } from './Box'
import styles from './Card.module.css'

type CardProps = {
    title: string
}

const Card: FC<HTMLAttributes<HTMLBoxElement> & CardProps> = (props) => {
    const { title, ...otherProps } = props
    return (
        <Box {...otherProps}>
            <header className={styles.header}>
                <h3 className={styles.title}>{props.title}</h3>
            </header>
            {props.children}
        </Box>
    )
}

export default Card
