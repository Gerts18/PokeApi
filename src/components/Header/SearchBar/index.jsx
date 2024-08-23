import searchIcon from '@/assets/search-icon.svg'

const SearchBar = () => {
  return (
    <form>
        <input type="text"/>
        <button type='submit'><img src={searchIcon} alt="" /></button>
    </form>
  )
}

export default SearchBar
