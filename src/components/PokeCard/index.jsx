import styles from './PokeCard.module.css'
import { useEffect, useState } from 'react'

const PokeCard = (props) => {

  const { pokemonName, url } = props

  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(
    () => {
      const getPokemonDetails = async () => {
        const request = await fetch(url);
        const data = await request.json();
        setPokemonDetails(data);
      };
      getPokemonDetails();
    }, [url]
  )

  const pokemonNumber = pokemonDetails && pokemonDetails.id.toString().padStart(4, '0');  

  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.pokemonImage}
        src={pokemonDetails && pokemonDetails.sprites.other.home.front_default}
        alt=""
      />
      <div className={styles.pokemonInfo}>
        <p className={styles.pokemonNumber}> {pokemonDetails && `#${pokemonNumber}` } </p>
        <h1 className={styles.pokemonName}>{pokemonName}</h1>
        {
          pokemonDetails && pokemonDetails.types.map((type, index) => (
            <p key={index}>{type.type.name}</p>
          ))
        }
      </div>
    </div>
  )
}

export default PokeCard
