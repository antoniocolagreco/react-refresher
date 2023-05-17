export type Coords = {
    x: number
    y: number
}

export type Circle = Coords & {
    fillColor?: string
    strokeColor?: string
    lineWidth?: number
    radius: number
}

export type Rect = Coords & {
    fillColor?: string
    strokeColor?: string
    lineWidth?: number
    width: number
    height: number
}

export type Line = {
    x1: number
    y1: number
    x2: number
    y2: number
    strokeColor: string
    lineWidth: number
}
