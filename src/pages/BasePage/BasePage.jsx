import { Outlet } from 'react-router-dom'
import PokemonProvider from '@/context/PokemonContext'

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
