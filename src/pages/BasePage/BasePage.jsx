import { Outlet } from 'react-router-dom'
import PokemonProvider from '@/context/PokemonContext'
import styles from './BasePage.module.css'

const BasePage = () => {
  return (
    <main>
      <PokemonProvider>
         <Outlet/>
      </PokemonProvider>
    </main>
  )
}

export default BasePage
