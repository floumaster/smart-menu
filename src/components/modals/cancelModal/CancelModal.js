import React from 'react'
import styles from './style.module.css'

const CancelModal = ({ isVisible, onYesClick, onNoClick }) => {
    return (
        <section className={isVisible ? styles.cancelModal : styles.hidden}>
            <p className={styles.cancelTitle}>Want to cancel your order?</p>
            <p className={styles.cancelQuestion}>Are you sure you want to cancel this order?</p>
            <div className={styles.cancelButtons}>
                <button
                    className={styles.cancelNo}
                    onClick={onNoClick}
                >
                    NO
                </button>
                <button
                    className={styles.cancelYes}
                    onClick={onYesClick}
                >
                    YES
                </button>
            </div>
        </section>
    )
}

export default CancelModal