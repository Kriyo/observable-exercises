import React, { useState } from 'react'
import { from, BehaviorSubject } from 'rxjs'
import { debounceTime, filter, mergeMap } from 'rxjs/operators'
import { useObservable } from '../util'
import { distinctUntilChanged } from 'rxjs/operators'

const apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=1000'
const getPokemonByName = async name => {
  const { results: allPokemon } = await fetch(apiURL).then(res => res.json())
  return allPokemon.filter(pokemon => pokemon.name.includes(name))
}

const searchSubject = new BehaviorSubject('')
const searchSubject$ = searchSubject.pipe(
  filter(val => val.length > 1),
  debounceTime(500),
  distinctUntilChanged(),
  mergeMap(val => from(getPokemonByName(val))),
)

export const PokeApp = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])

  useObservable(searchSubject$, setResult)

  const handleSearchChange = e => {
    const { value } = e.target
    setSearch(value)
    searchSubject.next(value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={handleSearchChange}
      />
      {result.map(pokemon => (
        <div key={pokemon.name}>
          <p>Name: {pokemon.name}</p>
          <p>URL: {pokemon.url}</p>
        </div>
      ))}
    </div>
  )
}
