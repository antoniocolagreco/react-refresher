import classes from '@utils/classes'
import { FC, HTMLAttributes } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './ColorPalettesPage.module.css'

const ColorPalettesPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={classes(styles.colorPalettesPage, className)} {...otherProps}>
            <Helmet>
                <title>Color Palettes</title>
            </Helmet>
            ColorPalettesPage{children}
        </div>
    )
}

export default ColorPalettesPage
