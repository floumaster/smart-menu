import React, { useState, useContext } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import DishCounter from '../../../components/dishCounter/DishCounter';
import styles from './style.module.css'
import CardWrapper from '../../../components/cardWrapper/CardWrapper';
import { UserContext } from '../../../context/userContext';
import currencySymbols from '../../../constants/currencySymbols';

const CarouselDot = ({isActive}) => {
    return (
        <div className={isActive ? styles.activeCarouselDot : styles.carouselDot}/>
    )
}

const DishCard = ({isVisible, dish, decreaseDishCount, increaseDishCount, onCloseDishCard}) => {

    const {
        currency,
        showNotification
    } = useContext(UserContext)

    const [isSmallSize, setIsSmallSize] = useState(true)

    const searchedDish = dish.searchedDish || {}

    const onChangeSize = () => {
        setIsSmallSize(isSmallSize => !isSmallSize)
    }

    const onIncreaseCount = () => {
        increaseDishCount(searchedDish.id)
    }

    const onDecreaseCount = () => {
        decreaseDishCount(searchedDish.id)
    }

    const onAddDishToOrder = () => {
        showNotification(`${searchedDish.name} added to your order`)
    }

    const currentPrice = searchedDish.price * searchedDish.count

    const images = [
        <img className={styles.dishImageCard} src="./images/dish2.png" alt="dish"/>,
        <img className={styles.dishImageCard} src="./images/dish2.png" alt="dish"/>,
        <img className={styles.dishImageCard} src="./images/dish2.png" alt="dish"/>
      ];

    return (
        <CardWrapper isVisible={isVisible} onClose={onCloseDishCard}>
            {searchedDish && 
            <>
            <div className={styles.galeryWrapper}>
                <AliceCarousel
                    innerWidth="100%"
                    mouseTracking
                    items={images}
                    autoWidth
                    disableButtonsControls
                    renderDotsItem={(DotsItem) => 
                    <div className={DotsItem.isActive ? styles.activeCarouselDot : styles.carouselDot}/>
                    }
                />
            </div>
            <div className={styles.infoWrapper}>
                <p className={styles.dishNameCard}>{searchedDish.name}</p>
                <div className={styles.dishAtributesWrapper}>
                    <img className={styles.dishAtribute} src="./images/Chef.png" alt="dishAtribute"/>
                    <img className={styles.dishAtribute} src="./images/Leaf.png" alt="dishAtribute"/>
                    <img className={styles.dishAtribute} src="./images/Wheat.png" alt="dishAtribute"/>
                </div>
            </div>
            <div className={styles.dishSizeWrapper}>
                <p className={styles.dishSizeTitle}>Choose size</p>
                <div className={styles.dishSize}>
                    <div
                        className={isSmallSize ? 
                            styles.radioButtonWrapperSelected :
                            styles.radioButtonWrapper}
                        onClick={onChangeSize}
                    >
                        <div className={isSmallSize ? 
                            styles.radioButton :
                            `${styles.radioButton} ${styles.hidden}`
                        }
                        />
                    </div>
                    <p className={styles.dishSizeName}>Small</p>
                </div>
                <div className={styles.dishSize}>
                    <div
                        className={!isSmallSize ? 
                            styles.radioButtonWrapperSelected :
                            styles.radioButtonWrapper}
                        onClick={onChangeSize}
                    >
                        <div className={!isSmallSize ? 
                            styles.radioButton :
                            `${styles.radioButton} ${styles.hidden}`}/>
                    </div>
                    <p className={styles.dishSizeName}>Big</p>
                </div>
            </div>
            <div className={styles.dishCardShop}>
                <DishCounter
                    increaseCount={onIncreaseCount}
                    decreaseCount={onDecreaseCount}
                    count={searchedDish.count}
                    isInCard
                />
                <button className={styles.buyButtoSmall} onClick={onAddDishToOrder}>{`to card (${currentPrice}${currencySymbols[currency]})`}</button>
            </div>
            </>
            }
        </CardWrapper>
    )
}

export default DishCard