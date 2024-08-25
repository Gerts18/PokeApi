import styles from './Change.module.css'
import next from '@/assets/next_icon.png'
import previous from '@/assets/previous_icon.png'

const Change = (props) => {

    const {left, number, name} = props

    return (
        <section 
            className={styles.container}
            style={{
                gridTemplateColumns: left ? '25% 75%' : '75% 25%', 
            }}
        >
            {
                left ? 
                <div 
                    className={styles.top} 
                    style={{
                        justifyContent:'flex-start' 
                    }}
                >
                    <img className={styles.image} src={ previous} alt="" />
                    <p className={styles.number}> {number} </p>
                    <p className={styles.name}> {name} </p>
                </div>
                :
                <div 
                    className={styles.top} 
                    style={{
                        justifyContent:'flex-end' 
                    }}
                >
                    <p className={styles.name}> {name} </p>
                    <p className={styles.number}> {number} </p>
                    <img className={styles.image} src={ next} alt="" />
                </div>
            }
            <div className={left ? styles.bottom_left : styles.bottom_right}></div>
            <div className={left ? styles.bottom_right : styles.bottom_left}></div>
        </section>
    );
}

export default Change
