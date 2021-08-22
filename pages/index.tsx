import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { PokemonContext, usePokemon } from '../context/PokemonContext'
import styles from '../styles/Home.module.css'

type Data = {
  message: string
  pokemons: Pokemon[]
}

type Pokemon = {
  id: number
  pokemonId: number
  name: string
}

export default function Home({ pokemons }: Data) {
  const {
    traderOnePokemons,
    traderTwoPokemons,
    selectPokemonTradeOne,
    selectPokemonTradeTwo,
    removePokemonTradeOne,
    removePokemonTradeTwo,
  } = usePokemon()
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([])
  const [traderOne, setTraderOne] = useState('')
  const [traderTwo, setTraderTwo] = useState('')
  const [pageTraderOne, setPageTraderOne] = useState(0)
  const [pageTraderTwo, setPageTraderTwo] = useState(0)
  const [pokemonsTraderOne, setPokemonsTraderOne] = useState<Pokemon[]>([])
  const [pokemonsTraderTwo, setPokemonsTraderTwo] = useState<Pokemon[]>([])

  useEffect(() => {
    fetch(`https://poketraderbxapi.herokuapp.com/Pokemon?offset=0&limit=151`)
      .then((res) => res.json())
      .then((data) => {
        const allPokemons = data.data.results
        setAllPokemons(allPokemons)
        setPokemonsTraderOne(allPokemons.slice(0, 10))
        setPokemonsTraderTwo(allPokemons.slice(0, 10))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [traderOnePokemons, traderTwoPokemons])

  return (
    <div>
      <div className='text-center'>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='input-group mb-3'>
              <input
                onChange={(e) => setTraderOne(e.target.value)}
                type='text'
                className='form-control'
                placeholder='Treinador 1'
              />
            </div>
            <div className='mb-3' id='exchangeTraderOne' />
            {traderOnePokemons.map((pk, index) => {
              console.log(pk)
              return (
                <Image
                  key={index}
                  src='/images/poke.png'
                  alt={pk.name}
                  width={60}
                  title={pk.name}
                  onClick={() => {
                    removePokemonTradeOne(index)
                    paginateTraderOne(pageTraderOne)
                  }}
                  height={60}
                />
              )
            })}

            <table
              className='table table-bordered table-striped table-sm'
              id='tblPokemonOne'
            >
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Pokemon</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pokemonsTraderOne.map((pokemon, index) => {
                  return (
                    <tr key={pokemon.id}>
                      <td>{pokemon.id}</td>
                      <td>{pokemon.name}</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-danger btn-sm'
                          onClick={() => {
                            selectPokemonTradeOne(pokemon)
                            paginateTraderOne(pageTraderOne)
                          }}
                        >
                          Adicionar
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination>
              {allPokemons
                .slice(0, Math.ceil(allPokemons.length / 10))
                .map((element, index) => {
                  return (
                    <Pagination.Item
                      key={index}
                      active={index === pageTraderOne}
                      onClick={(event) => paginateTraderOne(index)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                })}
            </Pagination>
          </div>

          <div className='col-sm-6'>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                onChange={(e) => setTraderTwo(e.target.value)}
                placeholder='Treinador 2'
              />
            </div>
            <div className='mb-3' id='exchangeTraderTwo' />
            {traderTwoPokemons.map((pk, index) => {
              return (
                <Image
                  key={index}
                  src='/images/poke.png'
                  alt={pk.name}
                  width={60}
                  title={pk.name}
                  onClick={() => {
                    removePokemonTradeTwo(index)
                    paginateTraderTwo(pageTraderTwo)
                  }}
                  height={60}
                />
              )
            })}
            <table
              className='table table-bordered table-striped table-sm'
              id='tblPokemonTwo'
            >
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Pokemon</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {pokemonsTraderTwo.map((pokemon, index) => {
                  return (
                    <tr key={pokemon.id}>
                      <td>{pokemon.id}</td>
                      <td>{pokemon.name}</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-danger btn-sm'
                          onClick={() => {
                            selectPokemonTradeTwo(pokemon)
                            paginateTraderTwo(pageTraderTwo)
                          }}
                        >
                          Adicionar
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <Pagination>
              {allPokemons
                .slice(0, Math.ceil(allPokemons.length / 10))
                .map((element, index) => {
                  return (
                    <Pagination.Item
                      key={index}
                      active={index === pageTraderTwo}
                      onClick={(event) => paginateTraderTwo(index)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                })}
            </Pagination>
          </div>
        </div>
      </div>
      <div className='row'>
        <button
          type='button'
          onClick={() => send()}
          className='btn btn-primary btn-lg btn-block'
        >
          Trocar
        </button>
        <ToastContainer />
      </div>
    </div>
  )

  function paginateTraderOne(page: number) {
    setPageTraderOne(page)
    page = page * 10
    setPokemonsTraderOne(allPokemons.slice(page, page + 10))
  }
  function paginateTraderTwo(page: number) {
    setPageTraderTwo(page)
    page = page * 10
    setPokemonsTraderTwo(allPokemons.slice(page, page + 10))
  }

  function send() {
    const data = {
      traderOne: {
        name: traderOne,
        pokemons: traderOnePokemons,
      },
      traderTwo: {
        name: traderTwo,
        pokemons: traderTwoPokemons,
      },
    }
    fetch(`https://poketraderbxapi.herokuapp.com/Exchange`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.data.id) {
          toast.info(data.message, {
            position: 'bottom-right',
          })
        } else {
          toast.error(data.message, {
            position: 'bottom-right',
          })
        }
      })
      .catch((err) => {})
  }
}
