import { useContext } from 'react'
import {PokemonContext} from '@/context/PokemonContext'
import PokeCard from '../PokeCard'
import styles from './Pokedex.module.css'


const Pokedex = () => {

    const {pokemonsList} = useContext(PokemonContext);

    if (!pokemonsList) {
        return <p style={{ fontWeight: 'bolder' }}>Error...</p>;
    }
    
    return (
        <section className={styles.mainContainer}>
            {
                pokemonsList.map((pokemon) => (  
                    <PokeCard key={pokemon.id} pokemonDetails = {pokemon} /> 
                ))
            }
        </section>
    )
}

export default Pokedex
