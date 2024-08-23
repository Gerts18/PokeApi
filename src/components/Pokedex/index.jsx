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
                    <PokeCard key={index} pokemonName={pokemon.name} url = {pokemon.url} />
                ))
            }
        </section>
    )
}

export default Pokedex
