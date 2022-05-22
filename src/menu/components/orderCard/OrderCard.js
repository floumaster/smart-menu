import React, { useState, useContext } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from './style.module.css'
import CancelModal from '../../../components/modals/cancelModal/CancelModal';
import CardWrapper from '../../../components/cardWrapper/CardWrapper';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import Order from '../orderItem/OrderItem';
import currencySymbols from '../../../constants/currencySymbols';
import { UserContext } from '../../../context/userContext';

const OrderCard = ({isVisible, order, setOrder, onCloseOrderCard, crearOrder, price}) => {

    const {currency} = useContext(UserContext)
    
    const [isCancelModalVisible, setIsCancelmodalVisible] = useState(false)

    const onOpenCancelModal = () => {
        setIsCancelmodalVisible(true)
    }

    const onCloseCancelmodal = () => {
        setIsCancelmodalVisible(false)
    }

    const onOrderCancel = () => {
        crearOrder()
        onCloseCancelmodal()
    }

    const getDishById = (id) => {
        const newOrderList = [...order]
        const searchedDish = newOrderList.find(dish => dish.id === id)
        return {
            newOrderList,
            searchedDish
        }
    }

    const increaseDishCount = (id) => {
        const { newOrderList, searchedDish } = getDishById(id)
        searchedDish.count = searchedDish.count + 1
        setOrder(newOrderList)
    }

    const decreaseDishCount = (id) => {
        const { newOrderList, searchedDish } = getDishById(id)
        if(searchedDish.count - 1 !== 0){
            searchedDish.count = searchedDish.count - 1
        }
        setOrder(newOrderList)
    }


    return (
        <CardWrapper isVisible={isVisible} onClose={onCloseOrderCard}>
            <div className={styles.dishNameCardWrapper}>
                <p className={styles.dishNameCard}>Order {order.length > 0 && `(${order.length})`}</p>
                {order.length > 0  && 
                    <img
                        className={styles.bucketImage}
                        src="./images/bucket.png"
                        alt="bucket"
                        onClick={onOpenCancelModal}
                    />
                }
            </div>
            {order.length === 0 ?
            <div className={styles.emptyOrderWrapper}>
                <div className={styles.emptyOrderText}>
                    <p className={styles.emptyOrderTitle}>Your order is empty</p>
                    <p className={styles.emptyOrderMessage}>Don't keep yourself hungry, add some items</p>
                    <button
                        className={`${styles.buyButtoSmall} ${styles.fullWidth}`}
                        onClick={onCloseOrderCard}
                    >GO TO MENU</button>
                </div>
            </div> :
            <>
                <section className={styles.dishOrdersWrapper}>
                    {
                        order.map(dish => {
                            return <Order
                                order={dish}
                                increaseDishCount={increaseDishCount}
                                decreaseDishCount={decreaseDishCount}
                                key={Math.random()}
                                isDishCounter={true}
                            />
                        })
                    }
                </section>
                <PrimaryButton text={`pay (${price}${currencySymbols[currency]})`}/>
            </>}
            <CancelModal
                isVisible={isCancelModalVisible}
                onYesClick={onOrderCancel}
                onNoClick={onCloseCancelmodal}
            />
        </CardWrapper>
    )
}

export default OrderCard