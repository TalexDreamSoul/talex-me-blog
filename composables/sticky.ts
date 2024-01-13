import { createDebounceFunc } from './common'

export function useSticky(ele: HTMLElement, offset: number, parent: HTMLElement | Window = window): () => void {
  const { top } = ele.getBoundingClientRect()

  function needMove() {
    const y = parent.scrollY || parent.scrollTop

    if (y === 0)
      return -offset

    // if height larger
    let p: HTMLElement | undefined
    if (parent === window)
      p = document.body!
    else p = parent as HTMLElement

    const leftY = (p!.clientHeight - y)

    if (leftY < offset)
      return -99999

    return y - top
  }

  function _listen() {
    const y = needMove() + offset
    if (y >= 0)
      ele.style.transform = `translateY(${y}px)`

    requestAnimationFrame(_listen)
  }

  requestAnimationFrame(_listen)

  // const listen = _listen // createDebounceFunc(_listen, 3)

  // parent.addEventListener('scroll', listen)

  return () => {
    // parent.removeEventListener('scroll', listen)
  }
}
