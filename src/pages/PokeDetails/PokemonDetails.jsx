import { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '@/context/PokemonContext'
import { Link, useParams } from 'react-router-dom'
import styles from './PokemonDetails.module.css'
import pokeball from '@/assets/pokeball_colored.png'
import male from '@/assets/male_icon.svg'
import female from '@/assets/female_icon.svg'
import StatsBar from './StatsBar'
import PokeCard from '../../components/PokeCard'
import Change from './ChangePokemon'

const PokemonDetails = () => {

  const { id } = useParams()

  const { pokemonsList, typeColors, refactorDetails, requestData } = useContext(PokemonContext);

  const [pokemon, setPokemon] = useState(null)

  const [pokemonImage, setPokemonImage] = useState('')
  const [species, setSpecies] = useState(null)
  const [types, setTypes] = useState([])
  const [weaknesses, setWeaknesses] = useState([])
  const [evolutionChain, setEvolutionChain] = useState([])

  const pokeId = Number(id)

  const nextPokemon = pokemonsList.find(pokemon => pokemon.id == (
    (pokeId + 1 > pokemonsList.length) ? 1 : pokeId + 1
  ))
  const previousPokemon = pokemonsList.find(pokemon => pokemon.id == (
    (pokeId - 1 == 0) ? pokemonsList.length : pokeId - 1
  ))

  let states = [
    pokemonsList, pokemon, pokemonImage, species, types, weaknesses, evolutionChain, pokeId
  ]

  console.log(pokemonsList)

  useEffect(() => {
    if (pokemonsList.length === 0) return;

    const currentPokemon = pokemonsList.find(pokemon => pokemon.id == pokeId);
    setPokemon(currentPokemon);

    setPokemonImage('');
    setSpecies(null);
    setTypes([]);
    setWeaknesses([]);
    setEvolutionChain([]);

  }, [pokeId, pokemonsList])


  useEffect(() => {
    if (!pokemon) return;

    setPokemonImage(pokemon.sprites.other['official-artwork'].front_default);
    setTypes(pokemon.types.map(typeInfo => typeInfo.type.url));

    const fetchSpeciesData = async () => {
      const speciesData = await requestData(pokemon.species.url);
      setSpecies(speciesData);
    };

    fetchSpeciesData();
    
  }, [pokemon, requestData]);

  useEffect(() => {
    if (types.length === 0 || !pokemon) return;

    const fetchWeaknessesData = async () => {
      const urls = types.map(typeUrl => ({
        url: typeUrl,
        set_data: (data) => {
          setWeaknesses((prev) => {
            const newWeaknesses = data.damage_relations.double_damage_from.map(type => type.name);
            return [...new Set([...prev, ...newWeaknesses])];
          });
        }
      }));

      for (const { url, set_data } of urls) {
        const response = await requestData(url);
        set_data(response);
      }
    };

    fetchWeaknessesData();
  }, [types, pokemon, requestData]);

  useEffect(() => {
    if (!species || !species.evolution_chain) return;

    const fetchEvolutionChainData = async () => {
      const evolutionData = await requestData(species.evolution_chain.url);
      setEvolutionChain(evolutionData);
    };

    fetchEvolutionChainData();
  }, [species, requestData]);

  const handleVersions = (versions) => {

    const sprites = Object.entries(versions).map(([key, url]) => {
      return {
        name: key.replace("front_", ""),
        image: url
      };
    });

    return (
      <>
        {
          sprites.map((sprite, index) => (

            <div key={index} className={styles.versionContainer} >
              <p className={styles.overlay}> {refactorDetails('name', sprite.name)} </p>
              <img
                className={styles.imageVersion}
                src={pokeball}
                onClick={() => setPokemonImage(sprite.image)}
              />
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
    switch (rate) {
      case -1:
        return <p className={styles.infoDescription} >Unknown</p>
      case 0:
        return <img className={styles.genderImg} src={male} />
      case 8:
        return <img className={styles.genderImg} src={female} />
      default:
        return (
          <div style={{ display: 'flex' }}  >
            <img className={styles.genderImg} src={male} />
            <img className={styles.genderImg} src={female} />
          </div>
        )
    }
  }

  const handleEvolutions = (evolutionChain) => {

    if (!evolutionChain || !evolutionChain.chain) {
      return [];
    }

    const results = [];

    function traverseEvolution(chain) {
      // Obtain name and url 
      const { name, url } = chain.species;
      // Obtain only the id form url
      const id = url.split('/').filter(Boolean).pop();

      // Add pokemon
      results.push({ name, id });

      // Go to the next Evolution
      chain.evolves_to.forEach(evolution => traverseEvolution(evolution));
    }

    traverseEvolution(evolutionChain.chain);

    return results;
  }

  return (
    <>
      {
        pokemon &&
        <>
          <section className={styles.changeContainer}>
            <Change
              left
              name={refactorDetails('name', previousPokemon.name)}
              number={`#${refactorDetails('id', previousPokemon.id)}`}
              id={previousPokemon.id}
            />
            <Change
              name={refactorDetails('name', nextPokemon.name)}
              number={`#${refactorDetails('id', nextPokemon.id)}`}
              id={nextPokemon.id}
            />
          </section>

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
                            key={index}
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
                    {
                      handleVersions(pokemon.sprites.other['official-artwork'])
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
                      display: 'flex', gap: '8px'
                    }}>
                      {
                        species &&
                        species.egg_groups.map((egg, index) => {
                          return (
                            <p key={index} className={styles.infoDescription}>
                              {refactorDetails('name', egg.name)}
                            </p>
                          )
                        })
                      }
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.info}>Weight</span>
                    <p className={styles.infoDescription}>
                      {`${Math.round(pokemon.weight / 4.53592 * 100) / 100} lbs`}
                    </p>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.info}>Abilities</span>
                    <p className={styles.infoDescription}>
                      {refactorDetails('name', pokemon.abilities[0].ability.name)}
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
          <section className={styles.evolutions}>
            <h2>Evolutions</h2>
            <div className={styles.pokemonEvolutions}>
              {
                species &&
                handleEvolutions(evolutionChain).map((evolution, index) => {
                  let pokemonData = pokemonsList.find(pokemon => pokemon.id == evolution.id)
                  if (!pokemonData) {
                    console.error(`Pokemon with id ${evolution.id} not found in pokemonsList`);
                    return null;
                  }
                  return (
                    <PokeCard
                      key={index}
                      pokemonDetails={pokemonData}
                      evolution
                    >
                    </PokeCard>
                  )

                })
              }
            </div>
          </section>
        </>
      }
    </>
  )
}

export default PokemonDetails
