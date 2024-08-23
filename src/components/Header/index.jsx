import styles from './Header.module.css'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.searchContainer}>
            <h1>Name or Number</h1>
            <SearchBar/>
            <p>Use the Advance Search to explore Pokemon by type, weakness, ability, and more!</p>
        </div>
        <div className={styles.message}>
            <p>Search for a Pokemon by name or using its National Pokedex number</p>
        </div>
    </header>
  )
}

export default Header
