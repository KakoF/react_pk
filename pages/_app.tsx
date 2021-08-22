import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppBar from '../components/app_bar'
import React from 'react'
import { PokemonContextProvider } from '../context/PokemonContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AppBar />
      <div className='container'>
        <main role='main' className='pb-3'>
          <PokemonContextProvider>
            <Component {...pageProps} />
          </PokemonContextProvider>
        </main>
      </div>
    </div>
  )
}
export default MyApp
