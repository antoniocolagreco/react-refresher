import { AlphaColor, Color } from '../types/Color'

export const RGBAToColor = (input: string): AlphaColor => {
    const value = input.replace('#', '')
    let red = 255
    let green = 255
    let blue = 255
    let alpha = 255

    switch (value.length) {
        case 3:
            red = (parseInt(value[0], 16) + 1) * 16 - 1
            green = (parseInt(value[1], 16) + 1) * 16 - 1
            blue = (parseInt(value[2], 16) + 1) * 16 - 1
            break
        case 4:
            red = (parseInt(value[0], 16) + 1) * 16 - 1
            green = (parseInt(value[1], 16) + 1) * 16 - 1
            blue = (parseInt(value[2], 16) + 1) * 16 - 1
            alpha = (parseInt(value[3], 16) + 1) * 16 - 1
            break
        case 6:
            red = parseInt(value.substring(0, 2), 16)
            green = parseInt(value.substring(2, 4), 16)
            blue = parseInt(value.substring(4, 6), 16)
            break
        case 8:
            red = parseInt(value.substring(0, 2), 16)
            green = parseInt(value.substring(2, 4), 16)
            blue = parseInt(value.substring(4, 6), 16)
            alpha = parseInt(value.substring(6, 8), 16)
    }
    return { red, green, blue, alpha }
}

export const RGBToColor = (input: string): Color => {
    const { red, green, blue } = RGBAToColor(input)
    return { red, green, blue }
}

export const ColorToRGBA = (color: AlphaColor) => {
    const result = `#${color.red.toString(16).padStart(2, '0')}${color.green.toString(16).padStart(2, '0')}${color.blue
        .toString(16)
        .padStart(2, '0')}${color.alpha && color.alpha.toString(16).padStart(2, '0')}`
    return result
}

export const ColorToRGB = (color: Color) => {
    const result = `#${color.red.toString(16).padStart(2, '0')}${color.green.toString(16).padStart(2, '0')}${color.blue
        .toString(16)
        .padStart(2, '0')}`
    return result
}

export const copyHueFromTargetColor = (color: Color, targetColor: Color): Color => {
    const [, saturation, luminosity] = convertRGBtoHSL(color.red, color.green, color.blue)
    const [targetHue, ,] = convertRGBtoHSL(targetColor.red, targetColor.green, targetColor.blue)
    const [red, green, blue] = convertHSLtoRGB(targetHue, saturation, luminosity)
    return { red, green, blue }
}

export const copySaturationFromTargetColor = (color: Color, targetColor: Color): Color => {
    const [hue, , luminosity] = convertRGBtoHSL(color.red, color.green, color.blue)
    const [, targetSaturation] = convertRGBtoHSL(targetColor.red, targetColor.green, targetColor.blue)
    const [red, green, blue] = convertHSLtoRGB(hue, targetSaturation, luminosity)
    return { red, green, blue }
}

export const changeSaturationOfRGBColor = (color: Color, targetSaturation: number): Color => {
    const [hue, , luminosity] = convertRGBtoHSL(color.red, color.green, color.blue)
    if (targetSaturation > 100 || targetSaturation < 0) return color
    const [red, green, blue] = convertHSLtoRGB(hue, targetSaturation, luminosity)
    return { red, green, blue }
}

export const copyLuminosityFromTargetColor = (color: Color, targetColor: Color): Color => {
    const [hue, saturation] = convertRGBtoHSL(color.red, color.green, color.blue)
    const [, , targetLuminosity] = convertRGBtoHSL(targetColor.red, targetColor.green, targetColor.blue)
    const [red, green, blue] = convertHSLtoRGB(hue, saturation, targetLuminosity)
    return { red, green, blue }
}

export const changeLuminosityOfRGBColor = (color: Color, targetLuminosity: number): Color => {
    const [hue, saturation] = convertRGBtoHSL(color.red, color.green, color.blue)
    if (targetLuminosity > 100 || targetLuminosity < 0) return color
    const [red, green, blue] = convertHSLtoRGB(hue, saturation, targetLuminosity)
    return { red, green, blue }
}

export const convertRGBtoHSL = (red: number, green: number, blue: number): [number, number, number] => {
    const normalizedRed = red / 255
    const normalizedGreen = green / 255
    const normalizedBlue = blue / 255

    const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue)
    const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue)

    let hue = 0
    let saturation = 0
    const luminosity = (max + min) / 2

    if (max !== min) {
        const delta = max - min
        saturation = luminosity > 0.5 ? delta / (2 - max - min) : delta / (max + min)

        switch (max) {
            case normalizedRed:
                hue = ((normalizedGreen - normalizedBlue) / delta + (normalizedGreen < normalizedBlue ? 6 : 0)) * 60
                break
            case normalizedGreen:
                hue = ((normalizedBlue - normalizedRed) / delta + 2) * 60
                break
            case normalizedBlue:
                hue = ((normalizedRed - normalizedGreen) / delta + 4) * 60
                break
        }
    }

    return [hue, saturation, luminosity]
}

export const convertHSLtoRGB = (hue: number, saturation: number, luminosity: number): [number, number, number] => {
    const chroma = (1 - Math.abs(2 * luminosity - 1)) * saturation
    const huePrime = hue / 60
    const x = chroma * (1 - Math.abs((huePrime % 2) - 1))
    let red = 0
    let green = 0
    let blue = 0

    if (huePrime >= 0 && huePrime < 1) {
        red = chroma
        green = x
    } else if (huePrime >= 1 && huePrime < 2) {
        red = x
        green = chroma
    } else if (huePrime >= 2 && huePrime < 3) {
        green = chroma
        blue = x
    } else if (huePrime >= 3 && huePrime < 4) {
        green = x
        blue = chroma
    } else if (huePrime >= 4 && huePrime < 5) {
        red = x
        blue = chroma
    } else if (huePrime >= 5 && huePrime < 6) {
        red = chroma
        blue = x
    }

    const luminosityAdjustment = luminosity - chroma / 2
    red += luminosityAdjustment
    green += luminosityAdjustment
    blue += luminosityAdjustment

    const normalizedRed = Math.round(red * 255)
    const normalizedGreen = Math.round(green * 255)
    const normalizedBlue = Math.round(blue * 255)

    return [normalizedRed, normalizedGreen, normalizedBlue]
}
