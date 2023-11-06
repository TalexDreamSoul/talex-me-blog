function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

class Point {
  ctx: any
  radius: number
  x: number
  y: number

  constructor(ctx: any, radius: number) {
    this.ctx = ctx
    this.radius = radius / 2

    const rad = getRandom(0, 360) * Math.PI / 180
    this.x = radius / 2 + this.radius * Math.cos(rad)
    this.y = radius / 2 + this.radius * Math.sin(rad)

    this.size = 1 // getRandom(1, 3)
  }

  draw() {
    const darkMode = document.querySelector('html.dark')

    this.ctx.beginPath()
    this.ctx.fillStyle = /* '#2676D850' */ darkMode ? '#eeeeee50' : '#5445544d'
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  moveTo(tx, ty) {
    const duration = getRandom(100, 2000)

    const sx = this.x
    const sy = this.y

    const xSpeed = (tx - sx) / duration
    const ySpeed = (ty - sy) / duration

    const startTime = Date.now()

    const _move = () => {
      const t = Date.now() - startTime

      const x = sx + xSpeed * t
      const y = sy + ySpeed * t

      this.x = x
      this.y = y

      if (t >= duration) {
        this.x = tx
        this.y = ty

        return
      }

      requestAnimationFrame(_move)
    }

    _move()
  }
}

function getPoints(imageData: any) {
  const { width, height, data } = imageData

  const points = []

  const gap = 1

  for (let i = 0; i < width; i += gap) {
    for (let j = 0; j < height; j += gap) {
      const index = (i + j * width) * 4

      const r = data[index]
      const g = data[index + 1]
      const b = data[index + 2]
      const a = data[index + 3]

      if (r === 0 && g === 0 && b === 0 && a === 255)
        points.push([i, j])
    }
  }

  return points
}

export function createCodeRenderer(cvs: Canvas) {
  const ctx = cvs.getContext('2d', {
    willReadFrequently: true,
  })

  const points = []
  const result = getPoints(ctx.getImageData(0, 0, cvs.clientWidth, cvs.clientHeight))

  const refreshPoints = () => {
    ctx.clearRect(0, 0, cvs.clientWidth, cvs.clientHeight)

    points.forEach(point => point.draw())

    requestAnimationFrame(refreshPoints)
  }

  refreshPoints()

  for (let i = 0; i < result.length; ++i) {
    let p = points[i]

    if (!p) {
      p = new Point(ctx, cvs.clientWidth)
      points.push(p)
    }

    const [x, y] = result[i]

    p.moveTo(x, y)
  }

  if (result.length < points.length)
    points.splice(result.length)

  return points
}
