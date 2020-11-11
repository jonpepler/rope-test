export default class Line {
  constructor (a, b, targetLength) {
    this.a = a
    this.b = b
    this.targetLength = targetLength || this.getLength()
  }

  draw (p) {
    p.line(this.a.x, this.a.y, this.b.x, this.b.y)
  }

  getLength () {
    return Math.hypot(Math.abs(this.a.x - this.b.x), Math.abs(this.a.y - this.b.y))
  }

  constrain () {
    const offset = this.getLength() - this.targetLength
    const ratio = offset / this.targetLength
    const dx = this.a.x - this.b.x
    const dy = this.a.y - this.b.y

    if (this.a.moveable && this.b.moveable) {
      const mratio = ratio / 2
      const mdx = dx * mratio
      const mdy = dy * mratio

      this.b.x += mdx
      this.a.x -= mdx
      this.b.y += mdy
      this.a.y -= mdy
    }

    // if one but not both points are immoveable
    if (this.a.moveable ^ this.b.moveable) {
      const mdx = dx * ratio
      const mdy = dy * ratio
      if (this.a.moveable) {
        this.a.x -= mdx
        this.a.y -= mdy
      } else {
        this.b.x += mdx
        this.b.y += mdy
      }
    }
  }
}
