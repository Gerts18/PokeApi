import { useContext } from 'react'
import {PokemonContext} from '@/context/PokemonContext'
import { useParams } from 'react-router-dom'
import styles from './PokemonDetails.module.css'

const PokemonDetails = () => {

  const {id} = useParams()
  
  const {pokemonsList, typeColors, refactorDetails} = useContext(PokemonContext);

  const pokemon = pokemonsList.find(pokemon => pokemon.id == id);

  const handleVersions = (versions) => {
    const sprites = []

    Object.entries(versions).forEach(
      ([generation, games]) => {
        Object.entries(games).forEach(
          ([gameName, sprite]) => {
            if (sprite.front_default) {
              sprites.push({ gameName, imageUrl: sprite.front_default });
            }
          }
        )
      }
    );

    return (
      <>
        {
          sprites.map((sprite, index) => (
            <div key={index}>
              <p>{sprite.gameName} </p>
              <img src={sprite.imageUrl} alt="" />
            </div>
          ))
        }
      </>
    )
  } 

  return (
    <>
      {
        pokemon && 
        <>
          <section className={styles.mainContainer}>
            <div className={styles.pokemonTitle}>
              <h1> {refactorDetails('name', pokemon.name)} </h1>
              <p> {`#${refactorDetails('id', pokemon.id)}` } </p>
            </div>
            <div className={styles.pokemonInfo}>

              <div className={styles.pokemonStats}>
                <img src={pokemon.sprites.other['official-artwork'].front_default} alt="" />
                {
                  pokemon.stats.map((stat, index) => {
                    return (
                      <p key={index} >{stat.stat.name}, {stat.base_stat} </p>
                    )
                  } )
                }
              </div>
              <div className={styles.pokemonDescription}>
                <p>{pokemon.species.url}</p>
                {
                 handleVersions(pokemon.sprites.versions)
                }
              </div>

            </div>
          </section>
          <section className={styles.pokemonEvolutions}>

          </section>
        </>
      }
    </>
  )
}

export default PokemonDetails
