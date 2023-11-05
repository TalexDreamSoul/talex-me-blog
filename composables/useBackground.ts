const scripts = ['https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js']

function injectScripts() {
  scripts.forEach((script) => {
    const el = document.createElement('script')

    el.src = script

    document.body.appendChild(el)
  })
}

export async function useBackground() {
  injectScripts()

  const el = document.createElement('div')

  el.id = 'Blog-BackView'

  Object.assign(el.style, {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    zIndex: '-1',
    opacity: '.15',
    overflow: 'hidden',
  })

  document.body.appendChild(el)

  const init = () => {
    if (!window.VANTA?.TOPOLOGY)
      return requestAnimationFrame(init)

    if (window._bgInit)
      return

    setTimeout(() => {
      window._bgInit = true
      window.VANTA.TOPOLOGY({
        el: '#Blog-BackView',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: '#2676D8',
        backgroundColor: '#00000000',
      })
    }, 500)
  }

  requestAnimationFrame(init)
}
