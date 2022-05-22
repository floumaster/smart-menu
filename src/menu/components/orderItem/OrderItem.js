import React, { useState, useContext } from 'react'
import styles from './style.module.css';
import DishCounter from '../../../components/dishCounter/DishCounter';
import { UserContext } from '../../../context/userContext';
import currencySymbols from '../../../constants/currencySymbols';

const Order = ({ order, increaseDishCount, decreaseDishCount, isDishCounter }) => {

    const {currency} = useContext(UserContext)
    
    const increase = () => {
        increaseDishCount(order.id)
    }
    const decrease = () => {
        decreaseDishCount(order.id)
    }
    return (
        <div className={styles.dishOrderWrapper}>
            <img
                className={order.isDeleted ? `${styles.dishImage} ${styles.disabledImage}` : styles.dishImage}
                src="./images/order.png"
                alt="dish"
            />
            <div className={styles.orderDescriptionWrapper}>
                <div className={styles.orderTextWrapper}>
                    <p className={order.isDeleted ? `${styles.orderName} ${styles.disabled}` : styles.orderName}>{order.name}</p>
                    <p className={styles.orderOption}>Dish option</p>
                </div>
                <div className={styles.optionWrapper}>
                    {isDishCounter && <DishCounter
                        count={order.count}
                        increaseCount={increase}
                        decreaseCount={decrease}
                        isInCard
                    />}
                    {order.oldPrice && 
                    <p
                        className={`${styles.oldPrice} ${styles.disabled}`}
                    >
                        {order.oldPrice}$
                    </p>
                    }
                    <p
                        className={isDishCounter ? `${styles.orderPrice} ${styles.movedLeft}` : styles.orderPrice}
                    >
                        {order.price} {currencySymbols[currency]}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Order