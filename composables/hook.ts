import { createApp } from 'vue'
import DynamicCodeVue from '~/components/touch/DynamicCode.vue'

export function useDynamicCode(content: string, parent: HTMLElement = document.body!) {
  const el = document.createElement('div')

  // position page center
  const rect = parent.getBoundingClientRect?.() || { top: 0 }

  const y = Math.abs(rect.top) + (parent.scrollY || 0) + (parent?.scrollTop || 0) + (parent?.offsetTop || 0)

  console.log(rect, parent.scrollY, parent.scrollTop, parent.offsetTop)

  Object.assign(el.style, {
    position: 'absolute',
    top: `${y}px`,
    width: '100vw',
    height: '100vh',
  })

  function scroll(e: Event) {
    e.preventDefault()
  }

  window.addEventListener('scroll', scroll)

  const vue = createApp(DynamicCodeVue, {
    content,
    close: () => {
      vue.unmount()

      parent.removeChild(el)

      window.removeEventListener('scroll', scroll)
    },
  })

  parent.appendChild(el)

  vue.mount(el)
}
