import React from 'react'
import styles from './style.module.css'
import PrimaryButton from '../../buttons/PrimaryButton'

const ThankModal = ({ isVisible, onRateClick }) => {
    return (
        <section className={isVisible ? styles.cancelModal : styles.hidden}>
            <p className={styles.title}>Thank you for your order</p>
            <p className={styles.description}>Your order is in the kitchen.</p>
            <p className={styles.description}>We'll serve it as fast as possible</p>
            <div className={styles.buttonsWrapper}>
                <PrimaryButton text="Rate your order"/>
                <p className={styles.button}>go to main page</p>
            </div>
        </section>
    )
}

export default ThankModal