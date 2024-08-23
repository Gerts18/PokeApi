import PokeCard from '../PokeCard'
import styles from './Pokedex.module.css'

const Pokedex = () => {


  return (
    <section className={styles.mainContainer}>
        <PokeCard />
    </section>
  )
}

export default Pokedex
