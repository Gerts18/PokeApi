import styles from './AdvancedButton.module.css'
import randomIcon from '@/assets/random_icon.svg'

const AdvancedButton = ({children, load}) => {

  return (
    <div className={styles.container}>
      {
        !load &&
        <img src={randomIcon} alt="" />
      }
      {children}
    </div>
  )
}

export default AdvancedButton
