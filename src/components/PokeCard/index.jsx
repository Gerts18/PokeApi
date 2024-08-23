import { useContext } from 'react';
import { PokemonContext } from '@/context/PokemonContext';
import styles from './PokeCard.module.css'
import { Link } from 'react-router-dom'

const PokeCard = (props) => {

  const { pokemonDetails } = props 

  const {typeColors, refactorDetails} = useContext(PokemonContext);

  const pokemonNumber =  refactorDetails('id', pokemonDetails.id);
  const pokemonName = refactorDetails('name', pokemonDetails.name);
  const pokemonTypes = refactorDetails('types', pokemonDetails);


  return (
    <div className={styles.cardContainer}>
      <Link className={styles.link} to={`/pokemon/${pokemonDetails.id}`}>
        <img
          className={styles.pokemonImage}
          src={pokemonDetails.sprites.other['official-artwork'].front_default}
          alt=""
        />
      </Link>
      <div className={styles.pokemonInfo}>
        <p className={styles.pokemonNumber}> {`#${pokemonNumber}`}</p>
        <Link className={styles.link} to={`/pokemon/${pokemonDetails.id}`}>
          <h1 className={styles.pokemonName}>{pokemonName}</h1>       
        </Link>
        <div className={styles.typesContainer}>
          { 
            pokemonTypes.map((type, index) => (
              <p 
                className={styles.type} 
                key={index} 
                style={{backgroundColor: typeColors[type.type.name]}}>
                  {refactorDetails('name', type.type.name)}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PokeCard
