import { useContext } from 'react';
import { PokemonContext } from '@/context/PokemonContext';
import styles from './PokeCard.module.css'
import { Link } from 'react-router-dom'

const PokeCard = (props) => {

  const { pokemonDetails, evolution } = props 

  const {typeColors, refactorDetails} = useContext(PokemonContext);

  const pokemonNumber =  refactorDetails('id', pokemonDetails.id);
  const pokemonName = refactorDetails('name', pokemonDetails.name);
  const pokemonTypes = refactorDetails('types', pokemonDetails);


  return (
    <div className={!evolution ? styles.cardContainer : styles.card_evo}>
      <Link className={styles.link} to={`/pokemon/${pokemonDetails.id}`}>
        <img
          className={!evolution ? styles.pokemonImage : styles.image_evo}
          src={pokemonDetails.sprites.other['official-artwork'].front_default}
          alt=""
        />
      </Link>
      <div>
        <div className={evolution && styles.pokemonInfo}>
          <p className={!evolution ? styles.pokemonNumber : styles.number_evo}> {`#${pokemonNumber}`}</p>
          <Link className={styles.link} to={`/pokemon/${pokemonDetails.id}`}>
            <h1 className={!evolution ? styles.pokemonName : styles.name_evo}>{pokemonName}</h1>       
          </Link>
        </div>
        <div className={!evolution ? styles.typesContainer : styles.types_evo}>
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
