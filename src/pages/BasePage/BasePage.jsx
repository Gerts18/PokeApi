import { Outlet } from 'react-router-dom'
import PokemonProvider from '@/context/PokemonContext'
import styles from './BasePage.module.css'

const BasePage = () => {
  return (
    <div className={styles.outerContainer} >
      <main className={styles.pincipalContainer}>
        <PokemonProvider>
          <Outlet />
        </PokemonProvider>
      </main>
    </div>
  )
}

export default BasePage
