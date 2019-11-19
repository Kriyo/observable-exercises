import { useEffect } from 'react'

export const useObservable = (observable, setter) => {
  useEffect(() => {
    const subscription = observable.subscribe(res => {
      setter(res)
    })
    return () => subscription.unsubscribe()
  }, [observable, setter])
}
