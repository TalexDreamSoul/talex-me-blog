export function useSticky(ele: HTMLElement, offset: number, parent = window): () => void {
  // 将 ele 一直固定在现在的位置
  // 但是当 ele 超过 parent 的高度时，ele 会跟随 parent 滚动

  // 1. 计算 ele 的 top
  // 2. 监听 parent 的 scroll 事件
  // 3. 当 parent 的 scrollTop 大于 ele 的 top 时，将 ele 的 position 设置为 fixed
  // 4. 当 parent 的 scrollTop 小于 ele 的 top 时，将 ele 的 position 设置为 static
  // 5. 当 parent 的 scrollTop 大于 ele 的 top + parent 的高度时，将 ele 的 position 设置为 absolute
  // 6. 当 parent 的 scrollTop 小于 ele 的 top + parent 的高度时，将 ele 的 position 设置为 fixed
  // 7. 当 parent 的 scrollTop 大于 ele 的 top + parent 的高度 + ele 的高度时，将 ele 的 position 设置为 static
  // 8. 当 parent 的 scrollTop 小于 ele 的 top + parent 的高度 + ele 的高度时，将 ele 的 position 设置为 absolute

  const { top, height } = ele.getBoundingClientRect()

  function needMove() {
    const y = parent.scrollY || parent.scrollTop
    return y - top
  }

  function listen(e) {
    const y = needMove() + offset
    if (y <= 0)
      return

    ele.style.transform = `translateY(${y}px)`
  }

  parent.addEventListener('scroll', listen)

  return () => {
    parent.removeEventListener('scroll', listen)
  }
}
