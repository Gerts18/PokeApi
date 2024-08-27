import styles from './AdvancedButton.module.css'
import randomIcon from '@/assets/random_icon.svg'

const AdvancedButton = ({children, load, onClick}) => {

  return (
    <div className={styles.container} onClick={onClick}>
      {
        !load &&
        <img src={randomIcon} alt="" />
      }
      {children}
    </div>
  )
}

export default AdvancedButton
