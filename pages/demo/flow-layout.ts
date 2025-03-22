// export class FlowLayout {

//   constructor(container: HTMLElement) {

//   }

//   pushEl(el: HTMLElement) {

//   }
// }

// const windowSize = useWindowSize()

let EL_WIDTH = 550

function calculateMaxColumnsAndGap(containerWidth: number) {
  // 根据容器宽度动态计算最佳列宽
  const minColumnWidth = 300 // 最小列宽
  const maxColumnWidth = 550 // 最大列宽
  const minGap = 16 // 最小间距

  // 计算最佳列数
  let columns = Math.floor(containerWidth / (minColumnWidth + minGap))
  columns = Math.max(1, Math.min(columns, Math.floor(containerWidth / minColumnWidth)))

  // 计算实际列宽
  const availableWidth = containerWidth - (minGap * (columns - 1))
  EL_WIDTH = Math.min(maxColumnWidth, Math.floor(availableWidth / columns))

  // 重新计算间距
  const gap = columns > 1 ? (containerWidth - (columns * EL_WIDTH)) / (columns - 1) : minGap

  return { maxColumns: columns, gap }
}

export function flowLayout(container: HTMLElement) {
  let timer: NodeJS.Timeout | undefined

  // 使用 ResizeObserver 监听容器大小变化
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        updateLayout(entry.target as HTMLElement)
      }, 100) // 减少防抖时间到100ms
    }
  })

  resizeObserver.observe(container)

  // 初始化布局
  updateLayout(container)

  function updateLayout(container: HTMLElement) {
    const { width } = container.getBoundingClientRect()
    const { maxColumns, gap } = calculateMaxColumnsAndGap(width - 10)

    const columns = new Map<number, {
      index: number
      left: number
      height: number
      elements: HTMLElement[]
    }>()

    // 初始化列
    for (let i = 0; i < maxColumns; i++) {
      columns.set(i, {
        index: i,
        left: i * EL_WIDTH + gap * i + 5,
        height: 0,
        elements: [],
      })
    }

    // 更新元素位置
    for (const el of container.childNodes) {
      const element = el as HTMLElement
      if (!element.dataset?.item)
        continue

      const shortestColumn = [...columns.values()].sort((a, b) => a.height - b.height)[0]
      const { height } = element.getBoundingClientRect()

      element.style.cssText = `
        position: absolute;
        width: ${EL_WIDTH}px;
        top: ${shortestColumn.height + 16}px;
        left: ${shortestColumn.left}px;
        opacity: 1;
        transform: scale(1);
        transition: all 0.3s ease;
      `

      shortestColumn.elements.push(element)
      shortestColumn.height += height + 16
    }

    // 更新容器高度
    const maxHeight = Math.max(...[...columns.values()].map(col => col.height))
    container.style.height = `${maxHeight}px`
  }

  return () => {
    resizeObserver.disconnect()
    clearTimeout(timer)
  }
}
