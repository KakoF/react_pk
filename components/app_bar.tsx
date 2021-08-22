import type { NextPage } from 'next'
//import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const AppBar: NextPage = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3'>
        <div className='container'>
          <Image
            src='/images/logo.png'
            alt='Vercel Logo'
            width={60}
            height={60}
          />
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='.navbar-collapse'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse'>
            <ul className='navbar-nav flex-grow-1'>
              <li className='nav-item'>
                <Link href='/'>
                  <a className='nav-link text-dark'>Home</a>
                </Link>
              </li>
              <li className='nav-item'>
                <Link href='/history'>
                  <a className='nav-link text-dark'>Histórico de Trocas</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AppBar
