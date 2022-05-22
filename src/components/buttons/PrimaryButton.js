import React from 'react'
import styles from './style.module.css'

const PrimaryButton = ({ text, onClick }) => {
    return (
        <button
            className={styles.primaryButton}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default PrimaryButton