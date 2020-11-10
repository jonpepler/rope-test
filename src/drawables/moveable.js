import Drawable from './drawable.js'

export default class Moveable extends Drawable {
  constructor (x, y, x0, y0) {
    super(x, y)
    this.x0 = x0
    this.y0 = y0
  }

  update () {
    const x = this.x * 2 - this.x0
    const y = this.y * 2 - this.y0
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
        newPoint.c = bound
        newPoint.c0 = bound + vc
      }
      if (c < radius) {
        newPoint.c = radius
        newPoint.c0 = radius - Math.abs(vc)
      }
      return [newPoint.c, newPoint.c0]
    }
    console.log('x')
    const [x, y, x0, y0] = [this.x, this.y, this.x0, this.y0];
    [this.x, this.x0] = constrainAxis(x, x0, bounds[0])
    console.log('y');
    [this.y, this.y0] = constrainAxis(y, y0, bounds[1])
  }
}
