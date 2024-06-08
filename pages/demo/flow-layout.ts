// export class FlowLayout {

//   constructor(container: HTMLElement) {

//   }

//   pushEl(el: HTMLElement) {

//   }
// }

const windowSize = useWindowSize()

let EL_WIDTH = 550

function calculateMaxColumnsAndGap(containerWidth: number) {
  const columnWidth = EL_WIDTH
  const minGap = 10
  if (containerWidth <= columnWidth)
    return { maxColumns: 1, gap: minGap }

  let columns = +(Number.parseInt(`${containerWidth / columnWidth}`).toFixed(0))

  for (; columns > 1; --columns) {
    const width = columns * columnWidth + (columns - 1) * minGap
    if (width <= containerWidth)
      break
  }

  const gap = (containerWidth - (columns * columnWidth)) / columns

  return { maxColumns: columns, gap }
}

export function flowLayout(container: HTMLElement) {
  EL_WIDTH = (windowSize.width.value < 768 ? windowSize.width.value * 0.8 : 550)

  let timer: any

  timer = setTimeout(() => {
    watch(
      () => windowSize.width.value + windowSize.height.value,
      () => flowLayout(container),
    )
  }, 200)

  // get width
  const { width } = container.getBoundingClientRect()
  const { maxColumns, gap } = calculateMaxColumnsAndGap(width - 10)

  const map = new Map<number, {
    ind: number
    left: number
    height: number
    ele: Array<any>
  }>()

  for (let i = 0; i < maxColumns; ++i) {
    map.set(i, {
      ind: i,
      left: i * EL_WIDTH + gap * i + 5,
      height: 0,
      ele: [],
    })
  }

  function _pushEl(ele: HTMLElement) {
    const { height } = ele.getBoundingClientRect()

    // 计算那一列高度最小
    const target = [...map.values()].sort((a, b) => a.height - b.height)

    target[0].ele.push(ele)

    Object.assign(ele.style, {
      position: 'absolute',
      width: `${EL_WIDTH}px`,
      top: `${target[0].height + 10}px`,
      left: `${target[0].left}px`,
      opacity: '1',
      transition: '.25s',
    })

    target[0].height += height + 20

    container.style.height = `${target[0].height}px`
  }

  for (const el of container.childNodes) {
    const ele = el as HTMLElement

    if (!ele.dataset?.item)
      continue

    const { height } = useElementBounding(ele)

    _pushEl(ele)

    watch(() => height.value, () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        flowLayout(container)
      }, 200)
    })
  }
}
