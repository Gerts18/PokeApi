import { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '@/context/PokemonContext'
import { useParams } from 'react-router-dom'
import styles from './PokemonDetails.module.css'
import pokeball from '@/assets/pokeball_colored.png'
import male from '@/assets/male_icon.svg'
import female from '@/assets/female_icon.svg'
import StatsBar from './StatsBar'

const PokemonDetails = () => {

  const { id } = useParams()

  const { pokemonsList, typeColors, refactorDetails, requestData } = useContext(PokemonContext);

  const [pokemonImage, setPokemonImage] = useState('')
  const [species, setSpecies] = useState(null)
  const [types, setTypes] = useState([])
  const [weaknesses, setWeaknesses] = useState([])

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);

  const pokemon = pokemonsList.find(pokemon => pokemon.id == id);

  /*To handle data from the pokemon */
  useEffect(() => {
    if (pokemon) {
      setPokemonImage(pokemon.sprites.other['official-artwork'].front_default);
      setTypes(pokemon.types.map(typeInfo => typeInfo.type.url))
    }
  }, [pokemon]);

  /*To handle individual requests */
  useEffect(() => {
    if (!pokemon) return;

    const fetchData = async () => {
      const urls = [
        {
          url: pokemon.species.url,
          set_data: setSpecies
        },
        ...types.map(typeObj => ({
          url: typeObj,
          set_data: (obj) => {
            setWeaknesses ( (prev) => {
              const newWeaknesses = obj.damage_relations.double_damage_from.map((type) => type.name);
              return [...new Set([...prev, ...newWeaknesses])];
            } )
          }
        }))
      ];

      for (const { url, set_data } of urls) {
        const response = await requestData(url);
        set_data(response);
      }
    };

    fetchData();
  }, [pokemon, types, requestData]);


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
            <div key={index} className={styles.versionContainer} >
              <p className={styles.overlay} >{sprite.gameName} </p>
              <img className={styles.imageVersion} src={pokeball} alt="" onClick={() => setPokemonImage(sprite.imageUrl)} />
            </div>
          ))
        }
      </>
    )
  }

  const handleHeight = (dm) => {
    //From decimeters to meters
    const meters = dm * 0.1;
    
    // From meters to feet
    const totalFeet = meters * 3.28084;
  
    // Feet
    const feet = Math.floor(totalFeet);
  
    // Inches
    const inches = Math.round((totalFeet - feet) * 12);
  
    return `${feet}' ${inches}''`;
  }

  const handleGender = (rate) => {
      switch (rate){
        case -1:
          return <p className={styles.infoDescription} >Unknown</p>
        case 0:
          return <img className={styles.genderImg} src={male} />
        case 8:
          return <img className={styles.genderImg} src={female} />
        default:
          return (
            <div style={{display:'flex'}}  >
              <img className={styles.genderImg} src={male}/>
              <img className={styles.genderImg} src={female} />
            </div>
          )
      }
  }

  return (
    <>
      {
        pokemon &&
        <>
          <section className={styles.mainContainer} >
            <div className={styles.pokemonTitle}>
              <h1 className={styles.text}> {refactorDetails('name', pokemon.name)} </h1>
              <p className={styles.text} > {`#${refactorDetails('id', pokemon.id)}`} </p>
            </div>

            <div className={styles.pokemonInfo}>

              <div className={styles.pokemonStats}>
                <img className={styles.pokeImage} src={pokemonImage} alt="" />

                <div className={styles.stats}>
                  <p>Stats</p>
                  <div className={styles.statsContainer}>
                    {
                    pokemon.stats.map((stat, index) => {
                        return (
                          <StatsBar
                            label={refactorDetails('name', stat.stat.name)} 
                            value={stat.base_stat} 
                            maxValue={200} 
                          />
                        )
                      })
                    }
                  </div>
                </div>

              </div>

              <div className={styles.pokemonDescription}>

                <p>
                  {species && species.flavor_text_entries[2].flavor_text.replace(/\f/g, ' ')}
                </p>

                <div className={styles.mainVersionsContainer}>
                  <p>Versions:</p>

                  <div className={styles.versions}>
                    <div className={styles.versionContainer} >
                      <div className={styles.overlay}> current design </div>
                      <img className={styles.imageVersion} src={pokeball} alt="" onClick={() => setPokemonImage(pokemon.sprites.other['official-artwork'].front_default)} />
                    </div>
                    {
                      handleVersions(pokemon.sprites.versions)
                    }
                  </div>


                </div>

                <div className={styles.generalInformation}>
                  <div className={styles.infoItem}>
                    <span className={styles.info}>Height</span>
                    <p className={styles.infoDescription}>
                       {handleHeight(pokemon.height)} 
                    </p>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.info}>Category</span>
                      <div style={{
                        display: 'flex', gap: '5px'
                      }}>
                      {
                        species &&
                        species.egg_groups.map((egg, index) => {
                          return (
                            <p key={index} className={styles.infoDescription}>
                              *{refactorDetails('name', egg.name)}
                            </p>
                          )
                        })
                      }
                      </div>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.info}>Weight</span>
                    <p className={styles.infoDescription}>
                       {`${Math.round(pokemon.weight/4.53592 *100)/100} lbs`} 
                    </p>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.info}>Abilities</span>
                    <p className={styles.infoDescription}> 
                      { refactorDetails('name', pokemon.abilities[0].ability.name ) }
                    </p>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.info}>Gender</span>
                      {
                        species && 
                        handleGender(species.gender_rate)
                      }
                  </div>


                </div>

                <div>
                  <h2>Type</h2>
                  <div className={styles.typesContainer}>
                    {
                      pokemon.types.map((type, index) => {
                        return (
                          <p
                            key={index}
                            style={{ backgroundColor: typeColors[type.type.name] }}
                            className={styles.type}
                          >
                            {refactorDetails('name', type.type.name)}
                          </p>
                        )
                      })
                    }
                  </div>
                </div>

                <div>
                  <h2>Weaknesses</h2>
                  <div className={styles.typesContainer}>
                    {weaknesses &&
                      weaknesses.map((weak, index) => {
                        return (
                          <p
                            key={index}
                            style={{ backgroundColor: typeColors[weak] }}
                            className={styles.type}
                          >
                            {refactorDetails('name', weak)}
                          </p>
                        )
                      })
                      }
                  </div>
                </div>

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
