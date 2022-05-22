import React, { useState, useContext } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from './style.module.css'
import CancelModal from '../../../components/modals/cancelModal/CancelModal';
import CardWrapper from '../../../components/cardWrapper/CardWrapper';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Order from '../orderItem/OrderItem';
import OrderDate from '../../../components/orderDate/OrderDate';
import currencySymbols from '../../../constants/currencySymbols';
import { UserContext } from '../../../context/userContext';

const OrderHistoryCard = ({isVisible, orders}) => {

    const {currency} = useContext(UserContext)

    const [orderList, setOrderList] = useState([
        {
            id: 1,
            title: 'Very very very very very very long dish name in two...',
            price: 139,
            count: 1
        },
        {
            id: 2,
            title: 'Dish name in one row',
            price: 139,
            oldPrice: 337,
            count: 1,
            isDeleted: true
        },
        {
            id: 3,
            title: 'Dish name in one row',
            price: 139,
            count: 1
        },
        {
            id: 4,
            title: 'Dish name in one row',
            price: 139,
            count: 1
        },
    ])
    const [isCancelModalVisible, setIsCancelmodalVisible] = useState(false)

    const onOpenCancelModal = () => {
        setIsCancelmodalVisible(true)
    }

    const onCloseCancelmodal = () => {
        setIsCancelmodalVisible(false)
    }

    const onOrderCancel = () => {
        setOrderList([])
        onCloseCancelmodal()
    }

    const getDishById = (id) => {
        const newOrderList = [...orderList]
        const searchedDish = newOrderList.find(dish => dish.id === id)
        return {
            newOrderList,
            searchedDish
        }
    }

    const increaseDishCount = (id) => {
        const { newOrderList, searchedDish } = getDishById(id)
        searchedDish.count = searchedDish.count + 1
        setOrderList(newOrderList)
    }

    const decreaseDishCount = (id) => {
        const { newOrderList, searchedDish } = getDishById(id)
        if(searchedDish.count - 1 !== 0){
            searchedDish.count = searchedDish.count - 1
        }
        setOrderList(newOrderList)
    }


    return (
        <CardWrapper isVisible={isVisible}>
            <div className={styles.dishNameCardWrapper}>
                <p className={styles.dishNameCard}>#231231324 (3)</p>
                <OrderDate date="01.02.2022" time="16:54"/>
            </div>
            {orderList.length === 0 ?
            <div className={styles.emptyOrderWrapper}>
                <div className={styles.emptyOrderText}>
                    <p className={styles.emptyOrderTitle}>Your order is empty</p>
                    <p className={styles.emptyOrderMessage}>Don't keep yourself hungry, add some items</p>
                    <button className={`${styles.buyButtoSmall} ${styles.fullWidth}`}>GO TO MENU</button>
                </div>
            </div> :
            <>
                <section className={styles.dishOrdersWrapper}>
                    {
                        orderList.map(order => {
                            return <Order
                                order={order}
                                increaseDishCount={increaseDishCount}
                                decreaseDishCount={decreaseDishCount}
                                key={Math.random()}
                                isDishCounter={false}
                                isInCard
                            />
                        })
                    }
                </section>
                <PrimaryButton text={`Repeat order (1000${currencySymbols[currency]})`}/>
            </>}
            <CancelModal
                isVisible={isCancelModalVisible}
                onYesClick={onOrderCancel}
                onNoClick={onCloseCancelmodal}
            />
        </CardWrapper>
    )
}

export default OrderHistoryCard