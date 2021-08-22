import { createContext, useState, ReactNode, useContext } from 'react'

type Pokemon = {
  id: number
  pokemonId: number
  name: string
}
type PokemonContextData = {
  traderOnePokemons: Pokemon[]
  traderTwoPokemons: Pokemon[]
  selectPokemonTradeOne: (pokemon: Pokemon) => void
  selectPokemonTradeTwo: (pokemon: Pokemon) => void
  removePokemonTradeOne: (index: number) => void
  removePokemonTradeTwo: (index: number) => void
}

export const PokemonContext = createContext({} as PokemonContextData)

type PokemonContextProviderProps = {
  children: ReactNode
}

export function PokemonContextProvider({
  children,
}: PokemonContextProviderProps) {
  const [traderOnePokemons, setTraderOnePokemons] = useState<Pokemon[]>([])
  const [traderTwoPokemons, setTraderTwoPokemons] = useState<Pokemon[]>([])

  function selectPokemonTradeOne(pokemon: Pokemon) {
    if (traderOnePokemons.length < 6) {
      pokemon.pokemonId = pokemon.id
      traderOnePokemons.push(pokemon)
      setTraderOnePokemons(traderOnePokemons)
    }
  }
  function selectPokemonTradeTwo(pokemon: Pokemon) {
    if (traderTwoPokemons.length < 7) {
      pokemon.pokemonId = pokemon.id
      traderTwoPokemons.push(pokemon)
      setTraderTwoPokemons(traderTwoPokemons)
    }
  }
  function removePokemonTradeOne(index: number) {
    if (traderOnePokemons.length > 0) {
      traderOnePokemons.splice(index, 1)
    }
  }
  function removePokemonTradeTwo(index: number) {
    if (traderTwoPokemons.length > 0) {
      traderTwoPokemons.splice(index, 1)
    }
  }

  return (
    <PokemonContext.Provider
      value={{
        traderOnePokemons,
        traderTwoPokemons,
        selectPokemonTradeOne,
        selectPokemonTradeTwo,
        removePokemonTradeOne,
        removePokemonTradeTwo,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemon = () => {
  return useContext(PokemonContext)
}
