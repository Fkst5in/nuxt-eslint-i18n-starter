import type { Ref } from 'vue'

export const usePersistedState = <T>(identifier: string, initFunction: () => T): Ref<T> => {
  const item = useCookie<T>(identifier)
  const persistedObject = useState<T>(identifier, (): T => {
    console.log(item.value)
    if (!item.value) return initFunction()

    return item.value
  })

  watch(
    persistedObject,
    object => {
      item.value = object
    },
    { deep: true }
  )

  return persistedObject
}
