import Drawable from './drawable.js'
import Line from './line.js'
import { FixedPoint, Point } from './point.js'

export class Rope extends Drawable {
  constructor (length, sx, sy) {
    super(sx, sy)
    this.anchor = new FixedPoint(sx, sy, 'red')
    this.points = []
    this.links = []
    this.targetLinkLength = 2
    this.constructRope(length)
  }

  updatePos (x, y) {
    this.x = x
    this.y = y
    this.anchor.x = x
    this.anchor.y = y
  }

  constructRope (length) {
    this.points = Array.from({ length: length / this.targetLinkLength })
      .map((v, i) => new Point(this.x, this.y + i, this.x, this.y + i, 'black'))

    this.links.push(new Line(this.anchor, this.points[0], this.targetLinkLength))
    this.links.push(...this.points
      .map(
        (point, i) =>
          ((i + 1) < this.points.length)
            ? new Line(point, this.points[i + 1], this.targetLinkLength)
            : undefined)
      .filter(e => e))
  }

  draw (p, bounds) {
    p.strokeWeight(4)
    this.points.forEach(point => {
      point.update()
      point.constrain(bounds)
    })
    this.links.forEach(line => {
      p.push()
      p.strokeWeight(2)
      line.constrain()
      // line.draw(p)
      p.pop()
    })
    p.noFill()
    p.beginShape()
    p.curveVertex(this.anchor.x, this.anchor.y)
    p.curveVertex(this.anchor.x, this.anchor.y)
    this.points.forEach(point => {
      p.push()
      p.stroke(point.colour)
      p.curveVertex(point.x, point.y)
      p.pop()
    })
    p.curveVertex(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y)
    p.endShape()
    this.anchor.draw(p)
  }
}
