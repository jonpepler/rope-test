import Moveable from './moveable.js'

export default class Point extends Moveable {
  constructor (x, y, x0, y0, colour) {
    super(x, y, x0, y0)
    this.colour = colour
  }

  draw (p) {
    p.push()
    p.stroke(this.colour)
    p.point(this.x, this.y)
    p.pop()
  }
}
