import styles from './Randomizer.module.css'
import randomIcon from '@/assets/random_icon.svg'

const Randomizer = () => {
  return (
    <div className={styles.container}>
      <img src={randomIcon} alt="" />
      <p>Surprise Me!</p>
    </div>
  )
}

export default Randomizer
