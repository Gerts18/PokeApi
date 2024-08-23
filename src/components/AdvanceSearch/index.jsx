import { useState } from 'react'
import styles from './AdvanceSearch.module.css'
import Randomizer from './Randomizer'
import Sorter from './Sorter'

const AdvanceSearch = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
            <div className={styles.searchContainer}>
                <div className={styles.searchToggle} onClick={toggleVisibility}>
                    Show Advance Search
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
