import Point from './drawables/point.js'

const setBackground = p => p.background(80)
const bounds = [600, 600]

const points = [
  new Point(1, 4, 0, 0.8, 'red'),
  new Point(2, 3.5, 0, 1.6, 'green'),
  new Point(581, 3.6, 578.8, 5.1, '#00aaff')
]

export default p => {
  p.setup = () => {
    p.createCanvas(...bounds)
    setBackground(p)
  }

  p.draw = () => {
    setBackground(p)

    p.strokeWeight(4)
    points.forEach(point => {
      point.update()
      point.constrain(bounds)
    })

    const length = Math.hypot(Math.abs(points[0].x - points[1].x), Math.abs(points[0].y - points[1].y))
    p.push()
    p.stroke(p.map(length, 0, 850, 0, 200))
    p.strokeWeight(4 - p.map(length, 0, 850, 1, 6))
    p.line(points[0].x, points[0].y, points[1].x, points[1].y)
    p.pop()

    points.forEach(point => {
      point.draw(p)
    })
  }
}
