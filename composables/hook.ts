import { createApp } from 'vue'
import DynamicCodeVue from '~/components/touch/DynamicCode.vue'

export function useDynamicCode(content: string, parent: HTMLElement = document.body!) {
  const el = document.createElement('div')

  // position page center
  const rect = parent.getBoundingClientRect?.() || { top: 0 }

  const y = Math.abs(rect.top) + (parent.scrollY || 0) + (parent?.scrollTop || 0) + (parent?.offsetTop || 0)

  Object.assign(el.style, {
    position: 'absolute',
    top: `${y}px`,
    width: '100%',
    height: '100vh',
    transition: '1.5s',
    transform: 'perspective(3000px) translateY(25%) rotateX(-90deg) scale(0)',
  })

  function scroll(e: Event) {
    e.preventDefault()
  }

  window.addEventListener('scroll', scroll)

  const vue = createApp(DynamicCodeVue, {
    content,
    close: () => {
      el.style.transition = '.5s'
      el.style.transform = 'perspective(3000px) translateY(-25%) rotateX(90deg) scale(0)'

      setTimeout(() => {
        vue.unmount()

        parent.removeChild(el)

        window.removeEventListener('scroll', scroll)
      }, 500)
    },
  })

  parent.appendChild(el)

  vue.mount(el)

  setTimeout(() => {
    el.style.transform = 'perspective(3000px) translateY(0%) rotateX(0deg) scale(1)'
  })
}
