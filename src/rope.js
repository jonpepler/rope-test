// import Line from './drawables/line.js'
// import { Point, FixedPoint } from './drawables/point.js'
import { Point } from './drawables/point.js'
import { Rope } from './drawables/rope.js'

const setBackground = p => p.background(80)
const bounds = [600, 600]

// const points = [
//   new FixedPoint(300, 100, 'red'),
//   new Point(301, 101, 301.1, 101.1, 'black')
// ]

// const lines = [
//   new Line(points[0], points[1])
// ]

const rope = new Rope(400, 300, 100)
// const rope2 = new Rope(100, 5, 400, 100)
const rope2point = new Point(400, 100, 401.2, 101.8, 'black', true, false, false)

export default p => {
  p.setup = () => {
    p.createCanvas(...bounds)
    setBackground(p)
  }

  p.draw = () => {
    setBackground(p)

    rope.draw(p, bounds)
    // rope2.draw(p, bounds)
    rope2point.update()
    rope2point.constrain(bounds)
    // rope2.updatePos(rope2point.x, rope2point.y)
  }
}
