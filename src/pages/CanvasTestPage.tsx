import classes from '@utils/classes'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import styles from './CanvasTestPage.module.css'

const CanvasTestPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        console.log(canvas)
    }, [])

    return (
        <div className={classes(styles.canvasTestPage, className)} {...otherProps}>
            <Helmet>
                <title>Canvas Test</title>
            </Helmet>
            <canvas ref={canvasRef} className={styles.canvas_1} />
        </div>
    )
}

export default CanvasTestPage
