import classes from '@utils/classes'
import { FC, HTMLAttributes, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import ColorPicker from '../components/colorPicker/ColorPicker'
import { Circle, Coords, Line, Rect } from '../types/geometry'
import { ColorToRGBA } from '../utils/Colors'
import styles from './CanvasTestPage.module.css'

const CanvasTestPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, onResize, ...otherProps } = props
    const previousCoords = useRef<Coords>()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const currentColorRef = useRef<string>('#ff0000ff')
    const currentSizeRef = useRef<number>(5)
    const canvasImageElement = useRef<HTMLImageElement | null>(null)
    const resizeTimeoutID = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const canvas = getCanvas()
        window.addEventListener('resize', handleResize)
        canvas.addEventListener('click', handleClick)
        canvas.addEventListener('mousemove', handleMove)
        canvas.addEventListener('dblclick', clearCanvas)
        handleResize()
    }, [])

    const drawCircle = (ctx: CanvasRenderingContext2D, c: Circle) => {
        if (c.fillColor) ctx.fillStyle = c.fillColor
        if (c.strokeColor) ctx.strokeStyle = c.strokeColor
        if (c.lineWidth) ctx.lineWidth = c.lineWidth
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        if (c.fillColor) ctx.fill()
        if (c.strokeColor) ctx.stroke()
    }

    const drawRect = (ctx: CanvasRenderingContext2D, r: Rect) => {
        if (r.fillColor) ctx.fillStyle = r.fillColor
        if (r.strokeColor) ctx.strokeStyle = r.strokeColor
        if (r.lineWidth) ctx.lineWidth = r.lineWidth
        ctx.beginPath()
        ctx.rect(r.x, r.y, r.width, r.height)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        if (r.fillColor) ctx.fill()
        if (r.strokeColor) ctx.stroke()
    }

    const drawLine = (ctx: CanvasRenderingContext2D, l: Line) => {
        ctx.beginPath()
        ctx.lineCap = 'round'
        ctx.strokeStyle = l.strokeColor
        ctx.lineWidth = l.lineWidth
        ctx.moveTo(l.x1, l.y1)
        ctx.lineTo(l.x2, l.y2)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.stroke()
    }

    const handleClick = (ev: MouseEvent) => {
        const ctx = getContext()
        const x = ev.offsetX
        const y = ev.offsetY
        drawCircle(ctx, {
            x: x,
            y: y,
            fillColor: currentColorRef.current,
            lineWidth: 0,
            radius: currentSizeRef.current / 2,
        })
    }

    const handleMove = (ev: MouseEvent) => {
        const ctx = getContext()
        const x = ev.offsetX
        const y = ev.offsetY
        if (ev.buttons === 1) {
            drawLine(ctx, {
                x1: getPreviousCoords().x,
                y1: getPreviousCoords().y,
                x2: x,
                y2: y,
                lineWidth: currentSizeRef.current,
                strokeColor: currentColorRef.current,
            })
        }
        previousCoords.current = { x, y }
    }

    const clearCanvas = () => {
        const canvas = getCanvas()
        const ctx = getContext()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const handleResize = () => {
        const canvas = getCanvas()
        const context = getContext()

        if (canvasImageElement.current === null) {
            const newImage = new Image()
            newImage.src = canvas.toDataURL()
            canvasImageElement.current = newImage
        }

        if (resizeTimeoutID.current) {
            clearTimeout(resizeTimeoutID.current)
        }

        resizeTimeoutID.current = setTimeout(() => {
            const parent = canvas.parentElement
            if (!parent) throw new Error('Canvas parent is null')
            canvas.width = parent.clientWidth
            canvas.height = parent.clientHeight
            if (!canvasImageElement.current) throw new Error('Cnvas Image Data parent is null')
            context.drawImage(
                canvasImageElement.current,
                0,
                0,
                canvasImageElement.current.width,
                canvasImageElement.current.height,
                0,
                0,
                canvas.width,
                canvas.height
            )
            canvasImageElement.current = null
        }, 500)
    }

    const getCanvas = (): HTMLCanvasElement => {
        const canvas = canvasRef.current
        if (!canvas) throw new Error('Canvas is null')
        return canvas
    }
    const getContext = (): CanvasRenderingContext2D => {
        const canvas = getCanvas()
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('Context is null')
        return ctx
    }

    const getPreviousCoords = (): Coords => {
        const prevCords = previousCoords.current
        if (!prevCords) throw new Error('No coords')
        return prevCords
    }

    return (
        <div className={classes(styles.canvasTestPage, className)} {...otherProps}>
            <Helmet>
                <title>Canvas Test</title>
            </Helmet>
            <ColorPicker
                defaultColor={currentColorRef.current}
                onColorChange={(color) => {
                    currentColorRef.current = ColorToRGBA(color)
                }}
                onSizeChange={(size) => {
                    currentSizeRef.current = size
                }}
                className={styles.colorPicker}
            />
            <div className={styles.frame}>
                <canvas ref={canvasRef} className={styles.canvas_1} />
            </div>
        </div>
    )
}

export default CanvasTestPage
