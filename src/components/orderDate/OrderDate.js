import React from 'react'
import styles from './style.module.css'

const OrderDate = ({ date, time }) => {
    return (
        <div className={styles.dateWrapper}>
            <p className={styles.date}>{date}</p>
            <p className={styles.time}>{time}</p>
        </div>
    )
}

export default OrderDate