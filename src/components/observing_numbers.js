import React, { useEffect, useState } from 'react'
import { from } from 'rxjs'
import { delay, filter, map, mergeMap } from 'rxjs/operators'
import { useObservable } from '../util'

const number$ = from([1, 2, 3, 4, 5])
const squaredNumber$ = number$.pipe(
  filter(val => val > 2),
  mergeMap(val => from([val]).pipe(delay(1000 * val))),
  map(val => val * val),
)

export const Observe = () => {
  const [currentNumber, setCurrentNumber] = useState(0)
  useObservable(squaredNumber$, setCurrentNumber)

  return (
    <div>
      <p>Current Number: {currentNumber}</p>
    </div>
  )
}

const foo = () => {
  return Promise.new(res => {
    res(true)
  })
}
