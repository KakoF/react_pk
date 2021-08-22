import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { usePokemon } from '../context/PokemonContext'
import styles from '../styles/Home.module.css'

type Data = {
  message: string
  exchanges: Exchange[]
}

type Exchange = {
  traderOne: Trader
  traderTwo: Trader
  id: number
}

type Trader = {
  name: string
  pokemons: Pokemon[]
}
type Pokemon = {
  baseExperience: number
  id: number
  name: string
  pokemonId: number
  traderId: number
  url: string
}

export default function Home({ exchanges }: Data) {
  const [allExchanges, setAllExchanges] = useState<Exchange[]>([])
  const [exchangesPaginate, setExchangePaginate] = useState<Exchange[]>([])
  const [page, setPage] = useState(0)
  useEffect(() => {
    fetch(`https://poketraderbxapi.herokuapp.com/Exchange`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        const allPokemons = data.data
        setAllExchanges(allPokemons)
        setExchangePaginate(allPokemons.slice(0, 5))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <div className='text-center'>
        <div className='row'>
          <div className='col-sm-12'>
            <table
              className='table table-bordered table-striped'
              id='tblExchange'
            >
              <thead>
                <tr>
                  <th>Treinador 1</th>
                  <th>Treinador 2</th>
                </tr>
              </thead>
              <tbody>
                {exchangesPaginate.map((ex, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <React.Fragment>
                      <tr key={ex.id}>
                        <td>{ex.traderOne.name}</td>
                        <td>{ex.traderTwo.name}</td>
                      </tr>
                      <tr>
                        <td>
                          {ex.traderOne.pokemons.map((pk, index) => {
                            return (
                              <Image
                                key={pk.id}
                                src={pk.url}
                                alt={pk.name}
                                width={100}
                                title={pk.name}
                                height={100}
                              />
                            )
                          })}
                        </td>
                        <td>
                          {ex.traderTwo.pokemons.map((pk, index) => {
                            return (
                              <Image
                                key={pk.id}
                                src={pk.url}
                                alt={pk.name}
                                width={100}
                                title={pk.name}
                                height={100}
                              />
                            )
                          })}
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
            <Pagination>
              {allExchanges
                .slice(0, Math.ceil(allExchanges.length / 5))
                .map((element, index) => {
                  return (
                    <Pagination.Item
                      key={index}
                      active={index === page}
                      onClick={(event) => paginate(index)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                })}
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )

  function paginate(page: number) {
    console.log(page)
    setPage(page)
    page = page * 5
    setExchangePaginate(allExchanges.slice(page, page + 5))
  }
}
