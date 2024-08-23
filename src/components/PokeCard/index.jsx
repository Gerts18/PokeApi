import styles from './PokeCard.module.css'

const PokeCard = ({props}) => {
  return (
    <div className={styles.cardContainer}>
      <img
        className={styles.pokemonImage}
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        alt="Bulbasaur"
      />
      <p className={styles.number}>#001</p>
      <p className={styles.name}>Bulbasaur</p>
      <p className={styles.type}>Grass</p>
    </div>
  )
}

export default PokeCard
