import { useContext } from 'react'
import PokeCard from '../PokeCard'
import styles from './Pokedex.module.css'
import {PokemonContext} from '@/context/PokemonContext'

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
