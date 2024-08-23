import styles from './Sorter.module.css'
import pokeball from '@/assets/pokeball.png'

const Sorter = () => {

    const options = ['Lowest Number (first)', 'Highest Number (first)', 'A-Z', 'Z-A']

    return (
        <div className={styles.optionList}>
            <img className={styles.image} src={pokeball} alt="" />
            <select className={styles.select}>
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
