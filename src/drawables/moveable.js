import Drawable from './drawable.js'

export default class Moveable extends Drawable {
  constructor (x, y, x0, y0, moveable = true) {
    super(x, y)
    this.x0 = x0
    this.y0 = y0
    this.moveable = moveable
    this.dampFactor = this.moveable ? 0.999 : 1
    this.bounceFactor = this.moveable ? 0.9 : 1
    // this.gravity = 9.81 / 60 // 9.81 m/s^2 divided by target 60fps
    this.gravity = this.moveable ? 9.81 / 60 : 0 // 9.81 m/s^2 divided by target 60fps
  }

  update () {
    const x = this.x + (this.x - this.x0) * this.dampFactor
    const y = this.y + (this.y - this.y0) * this.dampFactor + this.gravity
    this.x0 = this.x
    this.y0 = this.y
    this.x = x
    this.y = y
  }

  constrain (bounds) {
    const radius = 1 // stroke weight / 2
    const constrainAxis = (c, c0, bound) => {
      const newPoint = { c, c0 }
      const vc = c - c0
      if (c + radius > bound) {
        newPoint.c = bound - radius
        newPoint.c0 = bound - radius + vc * this.bounceFactor
      }
      if (c < radius) {
        newPoint.c = radius
        newPoint.c0 = radius - Math.abs(vc * this.bounceFactor)
      }
      return [newPoint.c, newPoint.c0]
    }
    const [x, y, x0, y0] = [this.x, this.y, this.x0, this.y0];
    [this.x, this.x0] = constrainAxis(x, x0, bounds[0]);
    [this.y, this.y0] = constrainAxis(y, y0, bounds[1])
  }
}
