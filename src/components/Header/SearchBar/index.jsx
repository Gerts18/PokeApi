import { useContext, useState } from 'react'
import styles from './SearchBar.module.css'
import searchIcon from '@/assets/search-icon.svg'
import { PokemonContext } from '@/context/PokemonContext'

const SearchBar = () => {

  const {filterPokemons} = useContext(PokemonContext)

  const [word, setWord] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    filterPokemons(word)
    setWord('')
  }
  
  return (
    <form className={styles.form} onSubmit={handleSubmit} >
        <input type="text" onChange={(e) => setWord(e.target.value)} value={word} />
        <button type='submit' className={styles.button} ><img src={searchIcon} alt="" /></button>
    </form>
  )
}

export default SearchBar
