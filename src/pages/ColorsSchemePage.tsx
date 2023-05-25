import classes from '@utils/classes'
import { FC, HTMLAttributes, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Button from '../components/button/Button'
import IconBack from '../icons/IconBack'
import IconClose from '../icons/IconClose'
import IconOK from '../icons/IconOK'
import { Color } from '../types/Color'
import { ColorToRGB, changeLuminosityOfRGBColor, changeSaturationOfRGBColor, convertRGBtoHSL } from '../utils/Colors'
import styles from './ColorsSchemePage.module.css'

enum Steps {
    hue,
    shade,
    result,
}

const ERROR_MARGIN = 0.01
const DEFAULT_AVERAGE_LUMINOSITY = 0.5

const MAX_HUE = 255
const MIN_HUE = 0
const HUE_INCREMENT = 32
const MIN_SATURATION = 0.2
const MAX_SATURATION = 1
const SATURATION_VARIATIONS = 8
const MIN_LUMINOSITY = 0.3
const MAX_LUMINOSITY = 0.8
const LIGHTER_VARIATIONS = 3
const DARKER_VARIATIONS = 2

const ColorsSchemePage: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { children, className, ...otherProps } = props
    const [step, setStep] = useState<Steps>(Steps.hue)
    const [shades, setShades] = useState<Color[]>([])
    const [colorsScheme, setColorsScheme] = useState<Color[]>([])

    const hues = useMemo(() => getHues(), [])

    const handleHueButtonClick = (e: React.MouseEvent<HTMLButtonElement>, hue: Color) => {
        setStep(Steps.shade)
        setShades(getShades(hue))
    }

    const handleShadeButtonClick = (e: React.MouseEvent<HTMLButtonElement>, shade: Color) => {
        setStep(Steps.result)
        setColorsScheme(getColorsScheme(shade))
    }

    return (
        <div className={classes(styles.colorsSchemePage, className)} {...otherProps}>
            <Helmet>
                <title>Colors Scheme</title>
            </Helmet>

            {step === Steps.hue && (
                <>
                    <h3 className={styles.title}>Choose a hue</h3>
                    <div className={styles.colorsGrid}>
                        {hues.map((hue) => {
                            const backgroundColor = ColorToRGB(hue)
                            return (
                                <button
                                    className={classes(styles.color, styles.colorText)}
                                    style={{ backgroundColor: backgroundColor }}
                                    onClick={(e) => handleHueButtonClick(e, hue)}
                                    key={backgroundColor}
                                >
                                    {backgroundColor}
                                </button>
                            )
                        })}
                    </div>
                </>
            )}
            {step === Steps.shade && (
                <>
                    <h3 className={styles.title}>Choose a shade</h3>
                    <div className={styles.colorsGrid}>
                        {shades.map((shade) => {
                            const backgroundColor = ColorToRGB(shade)
                            return (
                                <button
                                    className={classes(styles.color, styles.colorText)}
                                    style={{ backgroundColor: backgroundColor }}
                                    onClick={(e) => handleShadeButtonClick(e, shade)}
                                    key={backgroundColor}
                                >
                                    {backgroundColor}
                                </button>
                            )
                        })}
                    </div>
                    <div className={styles.controls}>
                        <Button className={styles.button} onClick={() => setStep(Steps.hue)}>
                            <IconBack className={styles.icon} />
                            Go back
                        </Button>
                    </div>
                </>
            )}
            {step === Steps.result && (
                <>
                    <h3 className={styles.title}>Here your color scheme!</h3>
                    <div className={styles.container}>
                        <div className={styles.colorsScheme}>
                            {colorsScheme.map((color) => {
                                const backgroundColor = ColorToRGB(color)
                                return (
                                    <div
                                        className={classes(styles.colorBar, styles.colorText)}
                                        style={{ backgroundColor: backgroundColor }}
                                        key={backgroundColor}
                                    >
                                        {backgroundColor}
                                    </div>
                                )
                            })}
                        </div>
                        <MockCard colorsScheme={colorsScheme} />
                    </div>
                    <div className={styles.controls}>
                        <Button className={styles.button} onClick={() => setStep(Steps.shade)}>
                            <IconBack className={styles.icon} />
                            Go back
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ColorsSchemePage

const getHues = (): Color[] => {
    const hues: Color[] = []
    for (let index = MIN_HUE; index <= MAX_HUE + HUE_INCREMENT; index += HUE_INCREMENT) {
        const red = MAX_HUE
        const green = index > MIN_HUE ? index - 1 : MIN_HUE
        const blue = MIN_HUE
        hues.push({ red: red, green: green, blue: blue })
    }

    for (let index = MAX_HUE - HUE_INCREMENT; index > MIN_HUE - HUE_INCREMENT; index -= HUE_INCREMENT) {
        const red = index > MIN_HUE ? index : MIN_HUE
        const green = MAX_HUE
        const blue = MIN_HUE
        hues.push({ red: red, green: green, blue: blue })
    }

    for (let index = MIN_HUE + HUE_INCREMENT; index <= MAX_HUE + HUE_INCREMENT; index += HUE_INCREMENT) {
        const red = MIN_HUE
        const green = MAX_HUE
        const blue = index > MIN_HUE ? index - 1 : MIN_HUE
        hues.push({ red: red, green: green, blue: blue })
    }

    for (let index = MAX_HUE - HUE_INCREMENT; index > MIN_HUE - HUE_INCREMENT; index -= HUE_INCREMENT) {
        const red = MIN_HUE
        const green = index > MIN_HUE ? index : MIN_HUE
        const blue = MAX_HUE
        hues.push({ red: red, green: green, blue: blue })
    }

    for (let index = MIN_HUE + HUE_INCREMENT; index <= MAX_HUE + HUE_INCREMENT; index += HUE_INCREMENT) {
        const red = index > MIN_HUE ? index - 1 : MIN_HUE
        const green = MIN_HUE
        const blue = MAX_HUE
        hues.push({ red: red, green: green, blue: blue })
    }

    for (let index = MAX_HUE - HUE_INCREMENT; index > MIN_HUE; index -= HUE_INCREMENT) {
        const red = MAX_HUE
        const green = MIN_HUE
        const blue = index > MIN_HUE ? index : MIN_HUE
        hues.push({ red: red, green: green, blue: blue })
    }
    return hues
}

const getShades = (color: Color): Color[] => {
    const shades: Color[] = []
    const lumShades: Color[] = []

    const darkInc = (DEFAULT_AVERAGE_LUMINOSITY - MIN_LUMINOSITY) / DARKER_VARIATIONS
    // console.log(`Starting dark luminosity: ${MIN_LUMINOSITY}`)
    for (
        let luminosity = MIN_LUMINOSITY;
        luminosity <= DEFAULT_AVERAGE_LUMINOSITY + ERROR_MARGIN - darkInc;
        luminosity += darkInc
    ) {
        // console.log(`luminosity ${luminosity} of ${DEFAULT_AVERAGE_LUMINOSITY}`)
        const lumColor = changeLuminosityOfRGBColor(color, luminosity)
        lumShades.push(lumColor)
    }

    lumShades.push(color)

    const lightInc = (MAX_LUMINOSITY - DEFAULT_AVERAGE_LUMINOSITY) / LIGHTER_VARIATIONS
    // console.log(`Starting light luminosity: ${DEFAULT_AVERAGE_LUMINOSITY}`)
    for (
        let luminosity = DEFAULT_AVERAGE_LUMINOSITY + lightInc;
        luminosity <= MAX_LUMINOSITY + ERROR_MARGIN;
        luminosity += lightInc
    ) {
        // console.log(`luminosity ${luminosity} of ${DEFAULT_AVERAGE_LUMINOSITY}`)
        const lumColor = changeLuminosityOfRGBColor(color, luminosity)
        lumShades.push(lumColor)
    }

    const satInc = (MAX_SATURATION - MIN_SATURATION) / (SATURATION_VARIATIONS - 1)
    // console.log(`Starting saturation: ${MIN_SATURATION}`)
    for (let lv of lumShades) {
        // console.log(`Light shade n. ${lumShades.indexOf(lv)}`)
        if (SATURATION_VARIATIONS < 2) {
            shades.push(lv)
            continue
        }
        for (let saturation = MIN_SATURATION; saturation <= MAX_SATURATION + ERROR_MARGIN; saturation += satInc) {
            // console.log(`Saturation ${saturation} of ${MAX_SATURATION}`)
            const lumColor = changeSaturationOfRGBColor(lv, saturation)
            shades.push(lumColor)
        }
    }

    return shades
}

const getColorsScheme = (color: Color): Color[] => {
    const scheme: Color[] = []

    const [, , averageLuminosity] = convertRGBtoHSL(color.red, color.green, color.blue)
    // console.log(`Average luminosity: ${averageLuminosity}`)

    const lightUnit = (1 - averageLuminosity) / 100
    // console.log(`Light unit: ${lightUnit}`)
    const darkUnit = averageLuminosity / 100
    // console.log(`Dark unit: ${darkUnit}`)

    const lum_0 = averageLuminosity + lightUnit * 95
    const lum_1 = averageLuminosity + lightUnit * 90
    const lum_2 = averageLuminosity + lightUnit * 75
    const lum_3 = averageLuminosity + lightUnit * 50
    const lum_4 = averageLuminosity + lightUnit * 25

    const lum_6 = averageLuminosity - darkUnit * 15
    const lum_7 = averageLuminosity - darkUnit * 30
    const lum_8 = averageLuminosity - darkUnit * 45
    const lum_9 = averageLuminosity - darkUnit * 60

    scheme.push(changeLuminosityOfRGBColor(color, lum_0)) // 0
    scheme.push(changeLuminosityOfRGBColor(color, lum_1)) // 1
    scheme.push(changeLuminosityOfRGBColor(color, lum_2)) // 2
    scheme.push(changeLuminosityOfRGBColor(color, lum_3)) // 3
    scheme.push(changeLuminosityOfRGBColor(color, lum_4)) // 4
    scheme.push(color) // 5
    scheme.push(changeLuminosityOfRGBColor(color, lum_6)) // 6
    scheme.push(changeLuminosityOfRGBColor(color, lum_7)) // 7
    scheme.push(changeLuminosityOfRGBColor(color, lum_8)) // 8
    scheme.push(changeLuminosityOfRGBColor(color, lum_9)) // 9

    return scheme
}

const MockCard: FC<HTMLAttributes<HTMLDivElement> & { colorsScheme: Color[] }> = (props) => {
    const { colorsScheme, children, className, ...otherProps } = props

    return (
        <div
            className={classes(styles.mock, styles.className)}
            style={{ borderColor: ColorToRGB(colorsScheme[5]) }}
            {...otherProps}
        >
            <header style={{ backgroundColor: ColorToRGB(colorsScheme[5]) }}>
                <h4 style={{ color: ColorToRGB(colorsScheme[0]) }}>Lorem ipsum</h4>
            </header>
            <main
                style={{
                    backgroundColor: ColorToRGB(colorsScheme[1]),
                    color: ColorToRGB(colorsScheme[7]),
                }}
            >
                <h5
                    style={{
                        color: ColorToRGB(colorsScheme[9]),
                    }}
                >
                    Lorem ipsum
                </h5>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus asperiores est labore quo suscipit
                    voluptas nesciunt nobis quas nulla accusantium. Quibusdam quia soluta voluptatibus ut. Modi nam
                    ipsum tempora esse!
                </p>
            </main>
            <footer
                style={{
                    backgroundColor: ColorToRGB(colorsScheme[2]),
                }}
            >
                <button
                    style={{
                        backgroundColor: ColorToRGB(colorsScheme[8]),
                        color: ColorToRGB(colorsScheme[2]),
                    }}
                >
                    <IconClose
                        style={{
                            fill: ColorToRGB(colorsScheme[2]),
                        }}
                    />
                    Lorem
                </button>
                <button
                    style={{
                        backgroundColor: ColorToRGB(colorsScheme[7]),
                        color: ColorToRGB(colorsScheme[1]),
                    }}
                >
                    <IconOK
                        style={{
                            fill: ColorToRGB(colorsScheme[1]),
                        }}
                    />
                    Ipsum
                </button>
            </footer>
        </div>
    )
}
