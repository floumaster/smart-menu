import React from "react";
import styles from './style.module.css'

const DishCounter = ({ increaseCount, decreaseCount, count, isInCard }) => {
    return (
        <div className={styles.dishCountSelector}>
            <img
                className={styles.dishCountDevider}
                src="./images/minusButton.png"
                alt="minus"
                onClick={decreaseCount}
            />
            <p className={isInCard ? `${styles.dishCount} ${styles.black}` : styles.dishCount}>{count}</p>
            <img
                className={styles.dishCountDevider}
                src="./images/plusButton.png"
                alt="plus"
                onClick={increaseCount}
            />
        </div>
    )
}

export default DishCounter