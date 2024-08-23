import styles from './PokeCard.module.css'
import { useEffect, useState } from 'react'

const PokeCard = (props) => {

  const typeColors = {
    fire: 'orange',
    water: 'lightblue',
    grass: 'lightgreen',
    electric: 'yellow',
    ice: 'lightblue',
    fighting: 'red',
    poison: 'blueviolet',
    ground: 'brown',
    flying: 'lightgrey',
    psychic: 'pink',
    bug: 'olive',
    rock: 'gray',
    ghost: 'indigo',
    dragon: 'purple',
    dark: 'darkslategray',
    steel: 'silver',
    fairy: 'pink',
    normal: 'beige'
  };

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

  const pokemonNumber = pokemonDetails && pokemonDetails.id.toString().padStart(3, '0');  
  const name = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.pokemonImage}
        src={pokemonDetails && pokemonDetails.sprites.other.home.front_default}
        alt=""
      />
      <div className={styles.pokemonInfo}>
        <p className={styles.pokemonNumber}> {pokemonDetails && `#${pokemonNumber}` } </p>
        <h1 className={styles.pokemonName}>{name}</h1>
        <div className={styles.typesContainer}>
          {
            pokemonDetails && 
            pokemonDetails.types.map((type, index) => (
              <p className={styles.type} key={index} style={{backgroundColor: typeColors[type.type.name]}}  >{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</p>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PokeCard
