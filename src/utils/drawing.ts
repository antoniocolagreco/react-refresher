import { Circle, Line, Rect } from '../types/geometry'

export const drawCircle = (ctx: CanvasRenderingContext2D, c: Circle) => {
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

export const drawRect = (ctx: CanvasRenderingContext2D, r: Rect) => {
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

export const drawLine = (ctx: CanvasRenderingContext2D, l: Line) => {
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
