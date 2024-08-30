import styles from './Page404.module.css'
import pikachu from '@/assets/pikachu.png'

const Page404 = () => {
  return (
    <div className={styles.notFound}>
      <img src={pikachu} alt="" />
      <p>It seems like there is nothing here</p>
    </div>
  )
}

export default Page404
