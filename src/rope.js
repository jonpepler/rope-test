import Line from './drawables/line.js'
import { Point } from './drawables/point.js'
import { Rope } from './drawables/rope.js'

const setBackground = p => p.background(80)
const bounds = [600, 600]

const rope = new Rope(3, 200, 100)
const rope2 = new Rope(3, 400, 100)

const points = [
  rope.points[rope.points.length - 1],
  rope2.points[rope2.points.length - 1],
  Point.getRandomPoint('#00aaff', ...bounds),
  Point.getRandomPoint('#ff00ff', ...bounds)
]

const lines = [
  new Line(points[0], points[1]),
  new Line(points[1], points[2]),
  new Line(points[2], points[3]),
  new Line(points[3], points[0])
]

export default p => {
  p.setup = () => {
    p.createCanvas(...bounds)
    setBackground(p)
    p.frameRate(1)
  }

  p.draw = () => {
    setBackground(p)
    p.strokeWeight(4)
    points.forEach(point => {
      point.update()
      point.constrain(bounds)
    })
    rope.draw(p, bounds)
    rope2.draw(p, bounds)

    lines.forEach(line => {
      p.push()
      p.strokeWeight(2)
      line.constrain()
      line.draw(p)
      p.pop()
    })
    points.forEach(point => {
      point.draw(p)
    })
  }
}
