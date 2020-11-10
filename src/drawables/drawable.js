import unimplemented from '../util/unimplemented.js'

export default class Drawable {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  draw () {
    unimplemented('draw')
  }
}
