import { copy } from '~/composables/common'

interface IRichFunc {
  onClick?(e: MouseEvent): void
  onBlur?(e: FocusEvent): void
  onFocus?(e: FocusEvent): void
  onKeydown?(e: KeyboardEvent): void
  onKeyup?(e: KeyboardEvent): void
  onEnter?(e: Event): void
  onLeave?(e: Event): void
  onMove?(e: Event): void
  init(editor: HTMLElement): void
}

const preRich: IRichFunc = (() => {
  let editor: HTMLElement | null = null

  function _genCopy(dom: Element) {
    const langDom = document.createElement('div')

    langDom.innerHTML = dom.attributes[0].nodeValue!
    langDom.className = 'rich-article rich-lang'

    const copyDom = document.createElement('div')

    copyDom.innerHTML = '<span class=\'un\'>Copy</span><span class=\'did\'>Copied!</copy>'
    copyDom.className = 'rich-article rich-copy'

    copyDom.addEventListener('click', () => {
      const codeDom: HTMLElement = dom.querySelector('code')!

      copy(codeDom.innerText)

      // mention
      copyDom.classList.add('did')

      setTimeout(() => {
        copyDom.classList.remove('did')
      }, 1000)
    })

    dom.appendChild(langDom)
    dom.appendChild(copyDom)
  }

  function _genWatermark(dom: Element) {
    const rect = dom.getBoundingClientRect()

    if (rect.width < 1 || rect.height < 1)
      return

    const waterMark = document.createElement('div')

    // 防君子不防小人2333
    waterMark.className = 'rich-article rich-watermark'
    waterMark.innerHTML = '<span class=\'watermark\'>TalexMeBlog</span>'

    // 获取parent
    const parentDom = dom.parentElement

    // 找到索引
    const arr = [...parentDom.children]

    const ind = arr.indexOf(dom)

    // 替换指定位置的索引为watermark
    parentDom.insertBefore(waterMark, arr[ind])
    parentDom.removeChild(dom)
    waterMark.appendChild(dom)
  }

  function genCopy() {
    if (!editor)
      return

    const dom = editor.children[0]!

    dom.querySelectorAll('img').forEach((element) => {
      _genWatermark(element)
    })

    ;[...dom.children[0].children].forEach((e: Element) => {
      if (e.tagName !== 'PRE')
        return

      _genCopy(e)
    })
  }

  return {
    init(_editor) {
      editor = _editor

      genCopy()
    },
  }
})()

const funcs = new Array<IRichFunc>()

funcs.push(preRich)

export function useRichArticle(editorDom: HTMLElement) {
  [...funcs].forEach(func => func.init(editorDom))

  editorDom.addEventListener('click', e => [...funcs].forEach(func => func?.onClick?.(e)))
  editorDom.addEventListener('focus', e => [...funcs].forEach(func => func?.onFocus?.(e)))
  editorDom.addEventListener('blur', e => [...funcs].forEach(func => func?.onBlur?.(e)))
  editorDom.addEventListener('keydown', e => [...funcs].forEach(func => func?.onKeydown?.(e)))
  editorDom.addEventListener('keyup', e => [...funcs].forEach(func => func?.onKeyup?.(e)))
  editorDom.addEventListener('mouseenter', e => [...funcs].forEach(func => func?.onEnter?.(e)))
  editorDom.addEventListener('mouseleave', e => [...funcs].forEach(func => func?.onLeave?.(e)))
  editorDom.addEventListener('mousemove', e => [...funcs].forEach(func => func?.onMove?.(e)))

  return () => {
    editorDom.removeEventListener('click', e => [...funcs].forEach(func => func?.onClick?.(e)))
    editorDom.removeEventListener('focus', e => [...funcs].forEach(func => func?.onFocus?.(e)))
    editorDom.removeEventListener('blur', e => [...funcs].forEach(func => func?.onBlur?.(e)))
    editorDom.removeEventListener('keydown', e => [...funcs].forEach(func => func?.onKeydown?.(e)))
    editorDom.removeEventListener('keyup', e => [...funcs].forEach(func => func?.onKeyup?.(e)))
    editorDom.removeEventListener('mouseenter', e => [...funcs].forEach(func => func?.onEnter?.(e)))
    editorDom.removeEventListener('mouseleave', e => [...funcs].forEach(func => func?.onLeave?.(e)))
    editorDom.removeEventListener('mousemove', e => [...funcs].forEach(func => func?.onMove?.(e)))
  }
}
