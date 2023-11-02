export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function useWrapperValue(props: any, emits: any, name = 'modelValue') {
  return computed({
    get: () => props[name],
    set: value => emits(`update:${name}`, value),
  })
}
