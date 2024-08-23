import { useState } from 'react'
import styles from './AdvanceSearch.module.css'
import Randomizer from './Randomizer'
import Sorter from './Sorter'
import downArrow from '@/assets/arrow_drop_down.svg'
import upArrow from '@/assets/arrow_drop_up.svg'

const AdvanceSearch = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
            <div className={styles.searchContainer}>
                <div className={styles.searchToggle} onClick={toggleVisibility}>
                    <p>Show Advance Search</p>
                    <img className={styles.image} src={isVisible ? upArrow : downArrow} alt="" />
                </div>
                {
                    isVisible && (
                        <div className={styles.advanceSearchContent}>
                            {/* Form for filters */}
                        </div>
                    )
                }
            </div>
            <div className={styles.otherFilters}>
                <Randomizer/>
                <Sorter/>
            </div>
        </>
    )
}

export default AdvanceSearch
