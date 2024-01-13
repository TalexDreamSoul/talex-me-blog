export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function useWrapperValue(props: any, emits: any, name = 'modelValue') {
  return computed({
    get: () => props[name],
    set: value => emits(`update:${name}`, value),
  })
}

export function createDebounceFunc<P extends any[], R>(fn: (...args: P) => R, duration = 200): (...args: P) => void {
  let timerId: NodeJS.Timeout | undefined

  return (...args: Parameters<typeof fn>): void => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn(...args)
    }, duration)
  }
}

export function copy(text: string) {
  if (navigator.clipboard)
    navigator.clipboard.writeText(text)

  else
    dom.execCommand('copy', false, text)
}
