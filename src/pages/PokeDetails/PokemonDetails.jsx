import { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '@/context/PokemonContext'
import { useParams } from 'react-router-dom'
import styles from './PokemonDetails.module.css'
import pokeball from '@/assets/pokeball_colored.png'

const PokemonDetails = () => {

  const { id } = useParams()

  const { pokemonsList, typeColors, refactorDetails, requestData } = useContext(PokemonContext);

  const [pokemonImage, setPokemonImage] = useState('')
  const [species, setSpecies] = useState(null)

  const [url, setUrl] = useState(null);
  const [data, setData] = useState(null);

  const pokemon = pokemonsList.find(pokemon => pokemon.id == id);

  useEffect(() => {
    if (pokemon) {
      setPokemonImage(pokemon.sprites.other['official-artwork'].front_default);
    }
  }, [pokemon]);

  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        const request = await requestData(url);
        setData(request);
      }
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    handleRequests();
  }, [pokemon, data]);

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

  const handleRequests = async () => {
    if (pokemon) {
      /*Here i can put individual urls to made request to get specific data */
      const urls = [
        {
          url: pokemon.species.url,
          set_data: setSpecies
        }
      ];

      for (const urlObj of urls) {
        setUrl(urlObj.url);

        /*Wait for data to be available after the url change */
        await new Promise(resolve => {
          const checkData = setInterval(() => {
            if (data) {
              clearInterval(checkData);
              urlObj.set_data(data);
              console.log(data)
              resolve();
            }
          }, 100);
        });
      }
    }
  };

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
                  {
                    pokemon.stats.map((stat, index) => {
                      return (
                        <p key={index} >{stat.stat.name}, {stat.base_stat} </p>
                      )
                    })
                  }
                </div>
              </div>

              <div className={styles.pokemonDescription}>

                <p>
                   {species && species.flavor_text_entries[0].flavor_text.replace(/\f/g, ' ')}
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
                      <p className={styles.infoDescription}>20.40</p>
                      </div>

                      <div className={styles.infoItem}>
                      <span className={styles.info}>Category</span>
                      <p className={styles.infoDescription}>Seed</p>
                      </div>

                      <div className={styles.infoItem}>
                      <span className={styles.info}>Weight</span>
                      <p className={styles.infoDescription}>15.2 lb</p>
                      </div>

                      <div className={styles.infoItem}>
                      <span className={styles.info}>Abilities</span>
                      <p className={styles.infoDescription}>Overgrow</p>
                      </div>

                      <div className={styles.infoItem}>
                      <span className={styles.info}>Gender</span>
                      <p className={styles.infoDescription}>none</p>
                      </div>  
                      

                </div>

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
