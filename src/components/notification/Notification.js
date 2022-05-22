import React from 'react'
import styles from './style.module.css'

const Notification = ({ isVisible, text }) => {
    return (
        <section className={isVisible ? styles.notification : `${styles.notification} ${styles.gotDownNotification}`}>
            <p className={styles.notificationText}>{text}</p>
        </section>
    )
}

export default Notification