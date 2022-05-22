import React, { useState } from 'react'
import styles from './style.module.css'
import CardWrapper from '../../../components/cardWrapper/CardWrapper';
import OrderDate from '../../../components/orderDate/OrderDate';

const Order = ({ order }) => {
    return (
        <div className={styles.dishOrderWrapper}>
            <div>
                <p className={styles.dishNumber}>#{order.number}</p>
                <OrderDate
                    date={order.date}
                    time={order.time}
                />
            </div>
            <div className={styles.metricsWrapper}>
                <div className={styles.metric}>
                    <p className={styles.metricName}>Positions:</p>
                    <p className={styles.metricValue}>{order.count}</p>
                </div>
                <div className={styles.metric}>
                    <p className={styles.metricName}>Cost:</p>
                    <p className={styles.metricValue}>{order.price}$</p>
                </div>
            </div>
        </div>
    )
}

const HistoryCard = ({isVisible, orders}) => {
    const [orderList, setOrderList] = useState([
        {
            id: 1,
            number: '228337',
            date: '01.02.2022',
            time: '16:54',
            price: 139,
            count: 1
        },
        {
            id: 2,
            number: '228337',
            date: '01.02.2022',
            time: '16:54',
            price: 139,
            count: 1
        },
        {
            id: 3,
            number: '228337',
            date: '01.02.2022',
            time: '16:54',
            price: 139,
            count: 1
        },
        {
            id: 4,
            number: '228337',
            date: '01.02.2022',
            time: '16:54',
            price: 139,
            count: 1
        },
    ])

    return (
        <CardWrapper isVisible={isVisible}>
            <div className={styles.dishNameCardWrapper}>
                <p className={styles.dishNameCard}>Order history</p>
            </div>
            {orderList.length === 0 ?
            <div className={styles.emptyHistoryWrapper}>
                <div className={styles.emptyOrderText}>
                    <p className={styles.emptyOrderTitle}>Your order history is empty</p>
                    <p className={styles.emptyOrderMessage}>DYou can start from creating new order</p>
                    <button className={`${styles.buyButtoSmall} ${styles.fullWidth}`}>GO TO MENU</button>
                </div>
            </div> :
            <>
                <section className={styles.dishOrdersWrapper}>
                    {
                        orderList.map(order => {
                            return <Order
                                order={order}
                                key={Math.random()}
                            />
                        })
                    }
                </section>
            </>}
        </CardWrapper>
    )
}

export default HistoryCard