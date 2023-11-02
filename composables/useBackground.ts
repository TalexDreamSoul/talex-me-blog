function _cvs(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvasEl = document.createElement('canvas')
  const ctx = canvasEl.getContext('2d')!

  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight

  canvasEl.style.position = 'absolute'
  canvasEl.style.top = '0'
  canvasEl.style.left = '0'

  canvasEl.style.zIndex = '-1'

  document.body.appendChild(canvasEl)

  return [canvasEl, ctx]
}

export function useBackground() {
  const [el, ctx] = _cvs()

  const draw = () => {
    // draw dynamic flower
    ctx.clearRect(0, 0, el.width, el.height)

    ctx.beginPath()
    ctx.arc(100, 75, 50, 0, 2 * Math.PI)
    ctx.stroke()

    requestAnimationFrame(draw)
  }

  draw()
}
