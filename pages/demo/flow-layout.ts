// export class FlowLayout {

//   constructor(container: HTMLElement) {

//   }

//   pushEl(el: HTMLElement) {

//   }
// }

const EL_WIDTH = 450

function calculateMaxColumnsAndGap(containerWidth: number) {
  console.log('e', containerWidth)

  const columnWidth = EL_WIDTH
  const minGap = 10
  if (containerWidth <= columnWidth)
    return { maxColumns: 1, gap: minGap }

  let columns = +(Number.parseInt(`${containerWidth / columnWidth}`).toFixed(0))

  for (; columns > 1; --columns) {
    const width = columns * columnWidth + (columns - 1) * minGap
    console.log('EEE', width, columns)
    if (width <= containerWidth)
      break
  }

  const gap = (containerWidth - (columns * columnWidth)) / columns

  return { maxColumns: columns, gap }
}

export function flowLayout(container: HTMLElement) {
  // get width
  const { width } = container.getBoundingClientRect()
  const { maxColumns, gap } = calculateMaxColumnsAndGap(width)
  console.log('asassa', maxColumns, gap)

  const map = new Map<number, {
    ind: number
    left: number
    height: number
    ele: Array<any>
  }>()

  for (let i = 0; i < maxColumns; ++i) {
    map.set(i, {
      ind: i,
      left: i * EL_WIDTH + gap * i,
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
      top: `${target[0].height}px`,
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

    _pushEl(ele)
  }
}
