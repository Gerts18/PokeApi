import styles from './SearchBar.module.css'
import searchIcon from '@/assets/search-icon.svg'

const SearchBar = () => {
  return (
    <form className={styles.form} >
        <input type="text"/>
        <button type='submit' className={styles.button} ><img src={searchIcon} alt="" /></button>
    </form>
  )
}

export default SearchBar
