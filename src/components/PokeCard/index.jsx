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

  const { pokemonDetails } = props 

  const pokemonNumber =  pokemonDetails.id.toString().padStart(3, '0');  
  const pokemonName = pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
  const pokemonTypes = pokemonDetails.types


  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.pokemonImage}
        src={pokemonDetails.sprites.other.home.front_default}
        alt=""
      />
      <div className={styles.pokemonInfo}>
        <p className={styles.pokemonNumber}> {`#${pokemonNumber}` } </p>
        <h1 className={styles.pokemonName}>{pokemonName}</h1>
        <div className={styles.typesContainer}>
          { 
            pokemonTypes.map((type, index) => (
              <p 
                className={styles.type} 
                key={index} 
                style={{backgroundColor: typeColors[type.type.name]}}>
                  {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PokeCard
