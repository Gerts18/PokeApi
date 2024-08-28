import { useContext } from 'react';
import styles from './Sorter.module.css'
import pokeball from '@/assets/pokeball.png'
import { PokemonContext } from '@/context/PokemonContext';

const Sorter = () => {

    const { sortPokemons } = useContext(PokemonContext);

    const options = ['Lowest Number (first)', 'Highest Number (first)', 'A-Z', 'Z-A']

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        sortPokemons(selectedOption); // Llama a la función de ordenamiento del contexto
    };

    return (
        <div className={styles.optionList}>
            <img className={styles.image} src={pokeball} alt="" />
            <select className={styles.select} onChange={handleSortChange}>
                <option value="" disabled >Sort Results by..</option>
                {
                    options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Sorter
