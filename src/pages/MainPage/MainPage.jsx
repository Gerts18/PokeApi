import { useContext } from 'react';
import AdvanceSearch from "@/components/AdvanceSearch"
import Header from "@/components/Header"
import Pokedex from "@/components/Pokedex"
import AdvancedButton from "../../components/AdvanceSearch/AdvancedButton"
import styles from './Main.module.css'
import { PokemonContext } from '@/context/PokemonContext'; 

const MainPage = () => {

  const { loadMorePokemons } = useContext(PokemonContext);

  return (
    <div className={styles.container}>
        <Header/>
        <AdvanceSearch/>
        <Pokedex/>
        <div className={styles.buttonContainer} >
          <AdvancedButton load onClick={loadMorePokemons}>
            <p>Load More Pokemons</p>
          </AdvancedButton>
        </div>
    </div>
  )
}

export default MainPage
