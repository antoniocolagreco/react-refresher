import classes from '@utils/classes'
import { ChangeEvent, FC, HTMLAttributes, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ColorPicker from '../components/colorPicker/ColorPicker'
import InputRange from '../components/inputRange/InputRange'
import { Color } from '../types/Color'
import { Coords } from '../types/geometry'

import { ColorToRGB, RGBAToColor } from '../utils/Colors'
import { drawCircle, drawLine, drawRect } from '../utils/drawing'
import styles from './CanvasTestPage.module.css'

const HEX_COLOR_REGEX =
    /^#([a-fA-F0-9]{3}){1,2}$|^#([a-fA-F0-9]{4}){1,2}$|^#([a-fA-F0-9]{6}){1,2}$|^#([a-fA-F0-9]{8}){1,2}$/

const CanvasTestPage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const [colorInputString, setColorInputString] = useState('#ff0000ff')

    const [selecteColor, setSelectedColor] = useState<string>('#ff0000')
    const [selectedAlpha, setSelectedAlpha] = useState<number>(255)
    const [selectedSize, setSelectedSize] = useState<number>(5)

    const { children, className, onResize, ...otherProps } = props
    const previousCoords = useRef<Coords>()
    const mainCanvasRef = useRef<HTMLCanvasElement>(null)
    const actionCanvasRef = useRef<HTMLCanvasElement>(null)
    const canvasBackup = useRef<HTMLImageElement | null>(null)
    const resizeTimeoutID = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const actionCanvas = getActionCanvas()
        window.addEventListener('resize', handleResize)
        actionCanvas.addEventListener('dblclick', clearCanvas)

        clearCanvas()
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
            actionCanvas.removeEventListener('dblclick', clearCanvas)
        }
    }, [])

    useEffect(() => {
        const actionCanvas = getActionCanvas()
        actionCanvas.addEventListener('mousedown', handleClick)
        actionCanvas.addEventListener('mousemove', handleMove)

        setColorInputString(`${selecteColor}${selectedAlpha.toString(16).padStart(2, '0')}`)

        return () => {
            actionCanvas.removeEventListener('mousedown', handleClick)
            actionCanvas.removeEventListener('mousemove', handleMove)
        }
    }, [selecteColor, selectedSize])

    useEffect(() => {
        const actionCanvas = getActionCanvas()
        actionCanvas.addEventListener('mouseup', linearInterpolation)
        setColorInputString(`${selecteColor}${selectedAlpha.toString(16).padStart(2, '0')}`)

        return () => {
            actionCanvas.removeEventListener('mouseup', linearInterpolation)
        }
    }, [selectedAlpha])

    const handleClick = (ev: MouseEvent) => {
        const ctx = getActionContext()
        const x = ev.offsetX
        const y = ev.offsetY
        const circleSize = selectedSize > 2 ? selectedSize / 2 : 1
        drawCircle(ctx, {
            x: x,
            y: y,
            fillColor: selecteColor,
            lineWidth: 0,
            radius: circleSize,
        })
    }

    const handleMove = (ev: MouseEvent) => {
        const ctx = getActionContext()
        const x = ev.offsetX
        const y = ev.offsetY
        if (ev.buttons === 1) {
            drawLine(ctx, {
                x1: getPreviousCoords().x,
                y1: getPreviousCoords().y,
                x2: x,
                y2: y,
                lineWidth: selectedSize,
                strokeColor: selecteColor,
            })
        }
        previousCoords.current = { x, y }
    }

    const clearCanvas = () => {
        const mainCanvas = getMainCanvas()
        const mainContext = getMainContext()
        // mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height)
        drawRect(mainContext, { x: 0, y: 0, width: mainCanvas.width, height: mainCanvas.height, fillColor: '#ffff' })
    }

    const handleResize = () => {
        const actionCanvas = getActionCanvas()
        const mainCanvas = getMainCanvas()
        const mainContext = getMainContext()

        if (canvasBackup.current === null) {
            const newImage = new Image()
            newImage.src = mainCanvas.toDataURL()
            canvasBackup.current = newImage
        }

        if (resizeTimeoutID.current) {
            clearTimeout(resizeTimeoutID.current)
        }

        resizeTimeoutID.current = setTimeout(() => {
            const parent = mainCanvas.parentElement
            if (!parent) throw new Error('Canvas parent is null')
            mainCanvas.width = parent.clientWidth
            mainCanvas.height = parent.clientHeight
            actionCanvas.width = parent.clientWidth
            actionCanvas.height = parent.clientHeight
            if (!canvasBackup.current) throw new Error('Canvas backup is null')
            mainContext.drawImage(
                canvasBackup.current,
                0,
                0,
                canvasBackup.current.width,
                canvasBackup.current.height,
                0,
                0,
                mainCanvas.width,
                mainCanvas.height
            )
            canvasBackup.current = null
        }, 500)
    }

    const linearInterpolation = () => {
        const mainCanvas = getMainCanvas()
        const mainContext = getMainContext()
        const actionCanvas = getActionCanvas()
        const actionContext = getActionContext()

        const mainImageData = mainContext.getImageData(0, 0, mainCanvas.width, mainCanvas.height)
        const actionImageData = actionContext.getImageData(0, 0, actionCanvas.width, actionCanvas.height)

        const mainPixelData = mainImageData.data
        const actionPixelData = actionImageData.data
        const outputData = new Uint8ClampedArray(mainPixelData.length)

        for (let i = 0; i < mainPixelData.length; i += 4) {
            const mainRed = mainPixelData[i]
            const mainGreen = mainPixelData[i + 1]
            const mainBlue = mainPixelData[i + 2]
            const mainAlpha = mainPixelData[i + 3]

            const actionRed = actionPixelData[i]
            const actionGreen = actionPixelData[i + 1]
            const actionBlue = actionPixelData[i + 2]
            const actionAlpha = actionPixelData[i + 3]

            const alpha = (actionAlpha / 255) * (selectedAlpha / 255)

            outputData[i] = mainRed * (1 - alpha) + actionRed * alpha // Rosso
            outputData[i + 1] = mainGreen * (1 - alpha) + actionGreen * alpha // Verde
            outputData[i + 2] = mainBlue * (1 - alpha) + actionBlue * alpha // Blue
            outputData[i + 3] = mainAlpha // Alpha
        }

        const outputImageData = new ImageData(outputData, mainCanvas.width, mainCanvas.height)

        mainContext.putImageData(outputImageData, 0, 0)
        actionContext.clearRect(0, 0, actionCanvas.width, actionCanvas.height)
    }

    const getActionCanvas = (): HTMLCanvasElement => {
        const actionCanvas = actionCanvasRef.current
        if (!actionCanvas) throw new Error('ActionCanvas is null')
        return actionCanvas
    }
    const getActionContext = (): CanvasRenderingContext2D => {
        const actionCanvas = getActionCanvas()
        const actionContext = actionCanvas.getContext('2d')
        if (!actionContext) throw new Error('Actioin context is null')
        return actionContext
    }

    const getMainCanvas = (): HTMLCanvasElement => {
        const mainCanvas = mainCanvasRef.current
        if (!mainCanvas) throw new Error('Main canvas is null')
        return mainCanvas
    }
    const getMainContext = (): CanvasRenderingContext2D => {
        const mainCanvas = getMainCanvas()
        const mainContext = mainCanvas.getContext('2d')
        if (!mainContext) throw new Error('Main context is null')
        return mainContext
    }

    const getPreviousCoords = (): Coords => {
        const prevCords = previousCoords.current
        if (!prevCords) throw new Error('No coords')
        return prevCords
    }

    const handleSizeChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(ev.target.value, 10)
        setSelectedSize(newSize)
    }

    const handleAlphaChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const alpha = parseInt(ev.target.value, 10)
        setSelectedAlpha(alpha)
    }

    const handleColorInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const newColor = ev.currentTarget.value
        setColorInputString(newColor)
    }

    const handleColorInputKeyUp = (ev: KeyboardEvent<HTMLInputElement>) => {
        const inputValue = ev.currentTarget.value
        if (ev.key !== 'Enter') return
        if (!inputValue.match(HEX_COLOR_REGEX)) {
            setColorInputString(`${selecteColor}${selectedAlpha.toString(16)}`)
            return
        }
        setColorInputString(inputValue)
        const { red, green, blue, alpha } = RGBAToColor(inputValue)
        setSelectedColor(ColorToRGB({ red, green, blue }))
        setSelectedAlpha(alpha)
    }

    const handleColorChange = (c: Color) => {
        const newColor = ColorToRGB(c)
        setSelectedColor(newColor)
    }

    return (
        <div className={classes(styles.canvasTestPage, className)} {...otherProps}>
            <Helmet>
                <title>ActionCanvas Test</title>
            </Helmet>
            <div className={styles.controls}>
                <ColorPicker color={selecteColor} onColorChange={handleColorChange} className={styles.colorPicker} />
                <div className={styles.inputs}>
                    <label className={styles.otherLabel}>Size</label>
                    <InputRange
                        min="1"
                        max="100"
                        step="1"
                        value={selectedSize}
                        className={styles.range}
                        onChange={handleSizeChange}
                    />
                    <label className={styles.otherLabel}>Alpha</label>
                    <InputRange
                        min="0"
                        max="255"
                        step="1"
                        value={selectedAlpha}
                        className={styles.range}
                        onChange={handleAlphaChange}
                    />
                    <label className={styles.otherLabel}>Color</label>
                    <input
                        type="text"
                        value={colorInputString}
                        className={styles.inputColor}
                        maxLength={9}
                        minLength={4}
                        required
                        onChange={handleColorInputChange}
                        onKeyUp={handleColorInputKeyUp}
                    />
                </div>
                <div className={styles.currentColorContainer}>
                    <div
                        className={styles.currentColor}
                        style={{ backgroundColor: selecteColor, opacity: selectedAlpha / 255 }}
                    />
                </div>
            </div>
            <div className={styles.frame}>
                <canvas ref={mainCanvasRef} className={styles.canvas} />
                <canvas ref={actionCanvasRef} className={styles.canvas} style={{ opacity: selectedAlpha / 255 }} />
            </div>
        </div>
    )
}

export default CanvasTestPage
