import Moveable from './moveable.js'

export class Point extends Moveable {
  constructor (x, y, x0, y0, colour, moveable = true, visible = true, gravity = true) {
    super(x, y, x0, y0, moveable, visible)
    this.colour = colour
  }

  static getRandomPoint (colour, bx, by, moveable = true) {
    const margin = 0.8
    const [mbx, mby] = [bx, by].map(bound => bound * margin)
    const [x, y] = [Math.random() * mbx, Math.random() * mby]
    const speeds = Array.from({ length: 2 }).map(() => Math.random() * 5 - 2.5)
    const x0 = moveable ? x + speeds[0] : x
    const y0 = moveable ? y + speeds[1] : y
    return new Point(x, y, x0, y0, colour, moveable)
  }

  draw (p) {
    p.push()
    p.stroke(this.colour)
    p.point(this.x, this.y)
    p.pop()
  }
}

// Has movable as a super but this is meant to be quick and dirty *shrug*
export class FixedPoint extends Point {
  constructor (x, y, colour) {
    super(x, y, x, y, colour, false)
  }

  static getRandomFixedPoint (colour, bx, by) {
    return Point.getRandomPoint(colour, bx, by, false)
  }
}
