import classes from '@utils/classes'
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'
import { Color } from '../../types/Color'
import { ColorToRGB, RGBAToColor, changeHueOfRGB, changeSaturationOfRGB } from '../../utils/Colors'
import styles from './ColorPicker.module.css'

enum Palette {
    red_s = '#f00f',
    yellow = '#ff0f',
    green = '#0f0f',
    cyan = '#0fff',
    blue = '#00ff',
    magenta = '#f0ff',
    red_e = '#f00f',
}

const BLACK = '#000f'
const WHITE = '#ffff'
// const RED = '#f00f'
// const YELLOW = '#ff0f'
// const GREEN = '#0f0f'
// const CYAN = '#0fff'
// const BLUE = '#00ff'
// const MAGENTA = '#f0ff'

type ColorPickerProps = {
    color?: string
    onColorChange?: ((color: Color) => {} | void) | (() => {} | void)
}

const ColorPicker: FC<HTMLAttributes<HTMLDivElement> & ColorPickerProps> = (props) => {
    const { color: inputColor = '#333f', onColorChange, children, className, ...otherProps } = props

    const [color, setColor] = useState<Color>(RGBAToColor(inputColor))

    const hueRGBRef = useRef<Color>(RGBAToColor(inputColor))
    const saturationRGBRef = useRef<Color>(RGBAToColor(inputColor))
    const luminosityRGBRef = useRef<Color>(RGBAToColor(inputColor))

    const hueCanvasRef = useRef<HTMLCanvasElement>(null)
    const saturationCanvasRef = useRef<HTMLCanvasElement>(null)
    const luminosityCanvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        window.addEventListener('resize', drawOnCanvas)

        const hueCanvas = getHueCanvas()
        hueCanvas.addEventListener('mousedown', handleHueCanvasClick)
        hueCanvas.addEventListener('mousemove', handleHueCanvasClick)

        const saturationCanvas = getSaturationCanvas()
        saturationCanvas.addEventListener('mousedown', handleSaturationCanvasClick)
        saturationCanvas.addEventListener('mousemove', handleSaturationCanvasClick)

        const luminosityCanvas = getLuminosityCanvas()
        luminosityCanvas.addEventListener('mousedown', handleLuminosityCanvasClick)
        luminosityCanvas.addEventListener('mousemove', handleLuminosityCanvasClick)

        drawOnCanvas()

        return () => {
            hueCanvas.removeEventListener('mousedown', handleHueCanvasClick)
            hueCanvas.removeEventListener('mousemove', handleHueCanvasClick)
            saturationCanvas.removeEventListener('mousedown', handleSaturationCanvasClick)
            saturationCanvas.removeEventListener('mousemove', handleSaturationCanvasClick)
            luminosityCanvas.removeEventListener('mousedown', handleLuminosityCanvasClick)
            luminosityCanvas.removeEventListener('mousemove', handleLuminosityCanvasClick)
        }
    }, [])

    useEffect(() => {
        if (onColorChange) onColorChange(color)
    }, [color])

    const drawOnCanvas = () => {
        redrawHueCanvas()
        redrawSaturationCanvas()
        redrawLuminosityCanvas()
    }

    const redrawHueCanvas = () => {
        try {
            const parent = getHueCanvas().parentNode as HTMLElement
            const hueCanvas = getHueCanvas()
            hueCanvas.width = parent.clientWidth
            hueCanvas.height = parent.clientHeight
            const hueContext = getHueContext()
            const gradient = hueContext.createLinearGradient(0, 0, hueCanvas.width, 0)
            Object.values(Palette).forEach((color, index, array) => {
                const colorStop = (1 / (array.length - 1)) * index
                gradient.addColorStop(colorStop, color)
            })
            hueContext.fillStyle = gradient
            hueContext.fillRect(0, 0, hueCanvas.width, hueCanvas.height)
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    const redrawSaturationCanvas = () => {
        try {
            const parent = getHueCanvas().parentNode as HTMLElement
            const saturationCanvas = getSaturationCanvas()
            saturationCanvas.width = parent.clientWidth
            saturationCanvas.height = parent.clientHeight
            const saturationContext = getSaturationContext()
            const gradient = saturationContext.createLinearGradient(0, 0, saturationCanvas.width, 0)
            const desaturatedColor = changeSaturationOfRGB(hueRGBRef.current, {
                blue: 255,
                green: 255,
                red: 255,
            })
            gradient.addColorStop(0, ColorToRGB(desaturatedColor))
            gradient.addColorStop(1, ColorToRGB(hueRGBRef.current))
            saturationContext.fillStyle = gradient
            saturationContext.fillRect(0, 0, saturationCanvas.width, saturationCanvas.height)
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    const redrawLuminosityCanvas = () => {
        try {
            const parent = getHueCanvas().parentNode as HTMLElement
            const luminosityCanvas = getLuminosityCanvas()
            luminosityCanvas.width = parent.clientWidth
            luminosityCanvas.height = parent.clientHeight
            const luminosityContext = getLuminosityContext()
            const gradient = luminosityContext.createLinearGradient(0, 0, luminosityCanvas.width, 0)
            gradient.addColorStop(0, BLACK)
            gradient.addColorStop(0.5, ColorToRGB(saturationRGBRef.current))
            gradient.addColorStop(1, WHITE)
            luminosityContext.fillStyle = gradient
            luminosityContext.fillRect(0, 0, luminosityCanvas.width, luminosityCanvas.height)
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    const handleHueCanvasClick = (ev: MouseEvent | TouchEvent) => {
        if (
            (ev.type === 'mousemove' && (ev as MouseEvent).buttons !== 1) ||
            (ev.type === 'touchmove' && !(ev as TouchEvent).touches.length)
        ) {
            return
        }

        const hueContext = getHueContext()
        const colorCanvas = getHueCanvas()
        const rect = colorCanvas.getBoundingClientRect()
        const x = ev instanceof MouseEvent ? ev.clientX - rect.left : (ev as TouchEvent).touches[0].clientX - rect.left
        const y = ev instanceof MouseEvent ? ev.clientY - rect.top : (ev as TouchEvent).touches[0].clientY - rect.top

        if (x < 0 || y < 0 || x > colorCanvas.width - 1 || y > colorCanvas.height - 1) {
            return
        }

        const [red, green, blue] = hueContext.getImageData(x, y, 1, 1).data
        const newHue: Color = { red, green, blue }
        hueRGBRef.current = newHue

        const newSaturationColor = changeHueOfRGB(saturationRGBRef.current, newHue)
        saturationRGBRef.current = newSaturationColor
        redrawSaturationCanvas()

        const newLuminosityColor = changeHueOfRGB(luminosityRGBRef.current, newHue)
        luminosityRGBRef.current = newLuminosityColor
        redrawLuminosityCanvas()

        setColor(newHue)
    }

    const handleLuminosityCanvasClick = (ev: MouseEvent) => {
        if (ev.type === 'mousemove' && ev.buttons !== 1) return
        const luminosityContext = getLuminosityContext()
        const luminosityCanvas = getLuminosityCanvas()
        const x = ev.offsetX
        const y = ev.offsetY
        if (x < 0 || y < 0 || x > luminosityCanvas.width - 1 || y > luminosityCanvas.height - 1) return
        const [red, green, blue] = luminosityContext.getImageData(x, y, 1, 1).data
        const newLuminosity: Color = { red, green, blue }
        luminosityRGBRef.current = newLuminosity
        redrawSaturationCanvas()
        setColor(newLuminosity)
    }

    const handleSaturationCanvasClick = (ev: MouseEvent) => {
        if (ev.type === 'mousemove' && ev.buttons !== 1) return
        const saturationCanvas = getSaturationCanvas()
        const saturationContext = getSaturationContext()
        const x = ev.offsetX
        const y = ev.offsetY
        if (x < 0 || y < 0 || x > saturationCanvas.width - 1 || y > saturationCanvas.height - 1) return
        const [red, green, blue] = saturationContext.getImageData(x, y, 1, 1).data
        const newSaturation: Color = { red, green, blue }
        saturationRGBRef.current = newSaturation
        redrawLuminosityCanvas()
        setColor(newSaturation)
    }

    const getHueCanvas = (): HTMLCanvasElement => {
        const hueCanvas = hueCanvasRef.current
        if (!hueCanvas) throw new Error('Hue canvas is null')
        return hueCanvas
    }
    const getHueContext = (): CanvasRenderingContext2D => {
        const hueCanvas = getHueCanvas()
        const hueContext = hueCanvas.getContext('2d')
        if (!hueContext) throw new Error('Hue context is null')
        return hueContext
    }

    const getSaturationCanvas = (): HTMLCanvasElement => {
        const saturationCanvas = saturationCanvasRef.current
        if (!saturationCanvas) throw new Error('Saturation canvas is null')
        return saturationCanvas
    }
    const getSaturationContext = (): CanvasRenderingContext2D => {
        const saturationCanvas = getSaturationCanvas()
        const saturationContext = saturationCanvas.getContext('2d')
        if (!saturationContext) throw new Error('Saturation context is null')
        return saturationContext
    }

    const getLuminosityCanvas = (): HTMLCanvasElement => {
        const luminosityCanvas = luminosityCanvasRef.current
        if (!luminosityCanvas) throw new Error('Luminosity canvas is null')
        return luminosityCanvas
    }
    const getLuminosityContext = (): CanvasRenderingContext2D => {
        const luminosityCanvas = getLuminosityCanvas()
        const luminosityContext = luminosityCanvas.getContext('2d')
        if (!luminosityContext) throw new Error('Luminosity context is null')
        return luminosityContext
    }

    return (
        <div className={classes(styles.colorPicker, className)} {...otherProps}>
            <label>Hue</label>
            <div className={styles.canvasContainer}>
                <canvas ref={hueCanvasRef} />
            </div>
            <label>Saturation</label>
            <div className={styles.canvasContainer}>
                <canvas ref={saturationCanvasRef} />
            </div>
            <label>Luminosity</label>
            <div className={styles.canvasContainer}>
                <canvas ref={luminosityCanvasRef} />
            </div>
        </div>
    )
}

export default ColorPicker
