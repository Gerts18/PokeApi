import { useContext } from 'react'
import {PokemonContext} from '@/context/PokemonContext'
import PokeCard from '../PokeCard'
import styles from './Pokedex.module.css'


const Pokedex = () => {

    const {pokemonsList} = useContext(PokemonContext);

    return (
        <section className={styles.mainContainer}>
            {
                pokemonsList.map((pokemon, index) => (  
                    <PokeCard key={index} pokemonDetails = {pokemon} /> 
                ))
            }
        </section>
    )
}

export default Pokedex
