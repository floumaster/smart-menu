import React, { useState, useContext, useEffect } from 'react'
import styles from './style.module.css';
import FilterModal from './components/filterModal/FilterModal';
import DishCard from './components/dishCard/DishCard'
import OrderCard from './components/orderCard/OrderCard';
import OrderHistoryCard from './components/orderHistoryCard/OrderHistoryCard';
import DishCounter from '../components/dishCounter/DishCounter';
import PrimaryButton from '../components/buttons/PrimaryButton';
import DrawerModal from '../components/modals/drawerModal/DrawerModal';
import HistoryCard from './components/historyCard/HistoryCard';
import { UserContext } from '../context/userContext';
import ConfirmCard from './components/confirmCard/ConfirmCard';
import ThankModal from '../components/modals/thankModal/ThankModal';
import DropList from '../components/dropList/DropList';
import currencySymbols from '../constants/currencySymbols';

const Dish = ({
        id,
        name,
        weight,
        price,
        isLiked,
        selected,
        likeDish,
        dislikeDish,
        selectDish,
        increaseDishCount,
        decreaseDishCount,
        count,
        openDishCard,
        setCurrentDishId,
        currency
    }) => {

    const increaseCount = () => {
        increaseDishCount(id)
    }

    const decreaseCount = () => {
        decreaseDishCount(id)
    }

    const onDishOpen = () => {
        selectDish(id)
        setCurrentDishId(id)
        openDishCard()
    }
    
    return (
        <div className={styles.dishWrapper}>
            <div>
                <img className={styles.dishImage} src="./images/dish.png" alt="dishImage" onClick={onDishOpen}/>
                <div className={styles.heartWrapper}>
                    {
                        isLiked ?
                        <img
                            className={styles.heart}
                            src="./images/heartFullfilled.png"
                            alt="heart"
                            onClick={() => dislikeDish(id)}
                        /> :
                        <img
                            className={styles.heart}
                            src="./images/heartBoarder.png"
                            alt="heart"
                            onClick={() => likeDish(id)}
                        />
                    }
                </div>
            </div>
            <div className={styles.dishDescriptionWrapper}>
                <div className={styles.dishDescriptionText}>
                    <p className={styles.dishName}>{name}</p>
                    <p className={styles.dishWeight}>{weight}g</p>
                </div>
                {selected ?
                    (
                        <DishCounter
                            increaseCount={increaseCount}
                            decreaseCount={decreaseCount}
                            count={count}
                        />
                    ) :
                    <button className={styles.dishPrice} onClick={() => selectDish(id)}>{price} {currencySymbols[currency]}</button>
                }
            </div>
        </div>
    )
}

const DishList = ({
    dishes,
    likeDish,
    dislikeDish,
    selectDish,
    increaseDishCount,
    decreaseDishCount,
    openDishCard,
    setCurrentDishId,
    currency
    }) => {
    
    return (
        <section className={styles.dishes}>
            <p className={styles.dishesTitle}>Category</p>
            <div className={styles.dishesWrapper}>
            {
                dishes.map(dish => {
                    return (
                        <Dish
                            id={dish.id}
                            name={dish.name}
                            weight={dish.weight} 
                            price={dish.price}
                            isLiked={dish.isLiked}
                            selected={dish.selected}
                            key={Math.random()}
                            likeDish={likeDish}
                            dislikeDish={dislikeDish}
                            selectDish={selectDish}
                            increaseDishCount={increaseDishCount}
                            decreaseDishCount={decreaseDishCount}
                            count={dish.count}
                            openDishCard={openDishCard}
                            setCurrentDishId={setCurrentDishId}
                            currency={currency}
                        />
                    )
                })
            }
            </div>
        </section>
    )
}

const DishTypesList = ({ dishTypes, unselectDishTypeById, selectDishTypeById, onFilterClick, isFilterModalVisible, isDarkMode }) => {
    const filterSrc = isFilterModalVisible ? 
    isDarkMode ? "./images/filter.png" : "./images/FilterWhite.png" : 
    isDarkMode ? "./images/FilterWhite.png" : "./images/filter.png"

    return (
        <section className={styles.filterWrapper}>
            <div className={isFilterModalVisible ? `${styles.filterButton} ${styles.buttonSelected}` : styles.filterButton} onClick={onFilterClick}>
                <div className={styles.blackCircle}/>
                <img className={styles.filterIcon} src={filterSrc} alt="filter"/>
            </div>
            <section className={styles.typesWrapper}>
                {dishTypes.map(type => {
                    const className = type.selected ? `${styles.dishTypeWrapper} ${styles.selected}` : styles.dishTypeWrapper
                    const onClickFunction = type.selected ? unselectDishTypeById : selectDishTypeById
                    return (
                        <div className={className} key={Math.random()} onClick={() => onClickFunction(type.id)}>
                            <p className={styles.dishType}>{type.title}</p>
                        </div>
                    )
                })}
            </section>
        </section>
    )
}

const Menu = () => {
    const {
        showNotification,
        systemLang,
        setSystemLang,
        currency,
        setCurrency,
        isDarkMode
    } = useContext(UserContext)

    const [dishes, setDishes] = useState([
        {
            id: 1,
            name: 'Very very long dish name in two rows...',
            weight: 350,
            price: 130,
            isLiked: false,
            type: 'Salads',
            count: 0
        },
        {
            id: 2,
            name: 'Small dish name',
            weight: 350,
            price: 130,
            isLiked: true,
            type: 'Pasta',
            count: 0
        },
        {
            id: 3,
            name: 'Very very long dish name in two rows...',
            weight: 350,
            price: 130,
            isLiked: false,
            type: 'Pasta',
            count: 0
        },
        {
            id: 4,
            name: 'Very very long dish name in two rows...',
            weight: 350,
            price: 130,
            isLiked: false,
            type: 'Salads',
            count: 0
        },
    ])

    const [dishTypes, setDishTypes] = useState([
        {
            id: 1,
            title: 'Coffee',
        },
        {
            id: 2,
            title: 'Salads',
            selected: true
        },
        {
            id: 3,
            title: 'Pasta',
        },
        {
            id: 4,
            title: 'Pasta',
        },
        {
            id: 5,
            title: 'Pasta',
        },
    ])

    const [filters, setFilters] = useState([
        {
            name: 'Menu items',
            filters: [
                {
                    id: 1,
                    title: 'Item 1',
                },
                {
                    id: 2,
                    title: 'Item 2',
                    selected: true
                },
                {
                    id: 3,
                    title: 'Item 3',
                },
                {
                    id: 4,
                    title: 'Item 4',
                },
                {
                    id: 5,
                    title: 'Item 5',
                },
            ]
        },
        {
            name: 'Other items',
            filters: [
                {
                    id: 1,
                    title: 'Item 1',
                },
                {
                    id: 2,
                    title: 'Item 2',
                    selected: true
                },
                {
                    id: 3,
                    title: 'Item 3',
                },
                {
                    id: 4,
                    title: 'Item 4',
                },
                {
                    id: 5,
                    title: 'Item 5',
                },
            ]
        }
    ])

    const [filteredDishes, setFilteredDished] = useState([])

    useEffect(() => {
        filterDishesByName()
    }, [dishTypes, dishes])

    const [isDrawerModalVisible, setIsDrawerModalVisible] = useState(false)
    const [isLangListVisible, setIsLangListVisible] = useState(false)
    const [isCurrencyListVisible, setIsCurrencyListVisible] = useState(false)

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchedDishes, setSearchedDishes] = useState('')
    const [isOrderCardVisible, setIsOrderCardVisible] = useState(false)
    const [isBackgroundBlack, setIsBackgroundBlack] = useState(false)
    const [isDishCardVisible, setIsDishCardVisible] = useState(false)
    const [currentDishId, setCurrentDishId] = useState(null)


    const getSearchedDishes = () => {
        if(searchText){
            const searchedDishes = (filteredDishes.length ? filteredDishes : dishes)
            .filter(dish => dish.name.startsWith(searchText))
            setSearchedDishes(searchedDishes)
        }
        else{
            setSearchedDishes('')
        }
    }

    useEffect(() => {
        getSearchedDishes()
    }, [searchText, filteredDishes])

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const openDrawerModal = () => {
        setIsDrawerModalVisible(true)
        setIsBackgroundBlack(true)
    }

    const closeDrawerModal = () => {
        setIsDrawerModalVisible(false)
        setIsBackgroundBlack(false)
    }

    const onFilterClick = () => {
        setIsFilterModalVisible(isFilterModalVisible => !isFilterModalVisible)
    }

    const getSelectedDishTypes = () => {
        return dishTypes.filter(type => type.selected).map(type => type.title)
    }

    const filterDishesByName = () => {
        const selectedDishTypes = getSelectedDishTypes();
        if(!selectedDishTypes.length){
            setFilteredDished([])
            return
        }
        const newFilteredDishes = dishes.filter(dish => selectedDishTypes.includes(dish.type))
        setFilteredDished(newFilteredDishes)
    }

    const selectFilterById = (id, groupName) => {
        const newFilters = [...filters]
        const searchedFilter = newFilters
        .find(group => group.name === groupName)
        .filters.find(filter => filter.id === id)
        searchedFilter.selected = true
        setFilters(newFilters);
    }

    const unselectFilterById = (id, groupName) => {
        const newFilters = [...filters]
        const searchedFilter = newFilters
        .find(group => group.name === groupName)
        .filters.find(filter => filter.id === id)
        searchedFilter.selected = false
        setFilters(newFilters);
    }

    const selectDishTypeById = (id) => {
        const newDishTypes = [...dishTypes]
        const searchedDishType = newDishTypes.find(dish => dish.id === id)
        searchedDishType.selected = true
        setDishTypes(newDishTypes)
    }

    const unselectDishTypeById = (id) => {
        const newDishTypes = [...dishTypes]
        const searchedDishType = newDishTypes.find(dish => dish.id === id)
        searchedDishType.selected = false
        setDishTypes(newDishTypes)
    } 

    const getDishById = (id) => {
        const newDishes = [...dishes]
        const searchedDish = newDishes.find(dish => dish.id === id)
        return {
            newDishes,
            searchedDish
        }
    }

    const likeDish = (id) => {
        const { newDishes, searchedDish } = getDishById(id)
        searchedDish.isLiked = true
        setDishes(newDishes)
    }

    const dislikeDish = (id) => {
        const { newDishes, searchedDish } = getDishById(id)
        searchedDish.isLiked = false
        setDishes(newDishes)
    }

    const selectDish = (id) => {
        const { newDishes, searchedDish } = getDishById(id)
        searchedDish.selected = true
        searchedDish.count = searchedDish.count || 1
        setDishes(newDishes)
    }

    const increaseDishCount = (id) => {
        const { newDishes, searchedDish } = getDishById(id)
        searchedDish.count = searchedDish.count + 1
        setDishes(newDishes)
    }

    const decreaseDishCount = (id) => {
        const { newDishes, searchedDish } = getDishById(id)
        if(searchedDish.count - 1 === 0){
            searchedDish.selected = false
        }
        else{
            searchedDish.count = searchedDish.count - 1
        }
        setDishes(newDishes)
    }

    const countPrice = () => {
        let price = 0
        dishes.forEach((dish) => {
            if(dish.selected)
                price += dish.price * dish.count
        });
        return price
    }

    const onLanguagesToggle = () => {
        setIsLangListVisible(isVisible => !isVisible)
    }

    const onCurrenciesToggle = () => {
        setIsCurrencyListVisible(isVisible => !isVisible)
    }

    const openDishCard = () => {
        setIsDishCardVisible(true)
        setIsBackgroundBlack(true)
    }

    const onCloseDishCard = () => {
        setIsDishCardVisible(false)
        setIsBackgroundBlack(false)
    }

    const onCloseOrderCard = () => {
        setIsOrderCardVisible(false)
        setIsBackgroundBlack(false)
    }

    const onMakeOrder = () => {
        setIsOrderCardVisible(true)
        setIsBackgroundBlack(true)
    }
    
    const onCloseAllCards = () => {
        setIsOrderCardVisible(false)
        setIsBackgroundBlack(false)
        setIsDishCardVisible(false)
    }

    const unselectAllDishes = () => {
        setDishes(dishes => 
            dishes.map(dish => {
                return {
                    ...dish,
                    selected: false,
                    count: 0
                }
            })
        )
    }

    const [order, setOrder] = useState([])

    useEffect(() => {
        setOrder(dishes.filter(dish => dish.selected))
    }, [isOrderCardVisible, dishes])

    const crearOrder = () => {
        unselectAllDishes()
    }

    const langs = ['En', 'Rus', 'Pln', 'Ukr']
    const currencies = ['USD', 'UAH', 'EUR', 'BTC']

    const logoSrc = isDarkMode ? "./images/logoWhite.png" : "./images/logo.svg"
    const arrowSrc = isDarkMode ? "./images/ArrowWhite.png" : "./images/arrowDown.png"
    const sandwichSrc = isDarkMode ? "./images/BurgerWhite.png" : "./images/sandwich.png"
    const loopSrc = isDarkMode ? "./images/loopWhite.png" : "./images/loop.png"

    return (
        <div className={styles.wrapper}>
            <header className={styles.menuHeader}>
                <img className={styles.logo} src={logoSrc} alt="logo" onClick={() => dislikeDish(2)}/>
                <div className={styles.headerOptions}>
                    <div className={styles.optionWrapper} onClick={onLanguagesToggle}>
                        <p className={styles.headerOptionsText}>{systemLang}</p>
                        <img
                            className={isLangListVisible ? `${styles.arrowDown} ${styles.rotated}` : styles.arrowDown}
                            src={arrowSrc}
                            alt="arrowDown"
                        />
                        <DropList isVisible={isLangListVisible} onChoose={setSystemLang} items={langs}/>
                    </div>
                    <div className={styles.optionWrapper} onClick={onCurrenciesToggle}>
                        <p className={styles.headerOptionsText}>{currency}</p>
                        <img
                            className={isCurrencyListVisible ? `${styles.arrowDown} ${styles.rotated}` : styles.arrowDown}
                            src={arrowSrc}
                            alt="arrowDown"
                        />
                        <DropList isVisible={isCurrencyListVisible} onChoose={setCurrency} items={currencies} isCurrency/>
                    </div>
                    <img
                        onClick={openDrawerModal}
                        className={styles.sandwich}
                        src={sandwichSrc}
                        alt="arrowDown"
                    />
                </div>
            </header>
            <section className={styles.contentWrapper}>
                <form className={styles.inputWrapper}>
                    <img className={styles.loop} src={loopSrc} alt="loop"/>
                    <input
                        className={styles.searchInput}
                        placeholder="Search"
                        value={searchText}
                        onChange={onSearchTextChange}
                    />
                </form>
            </section>
            <DishTypesList
                dishTypes={dishTypes}
                selectDishTypeById={selectDishTypeById}
                unselectDishTypeById={unselectDishTypeById}
                onFilterClick={onFilterClick}
                isFilterModalVisible={isFilterModalVisible}
                isDarkMode={isDarkMode}
            />
            <section className={styles.contentWrapper}>
                <DishList
                    dishes={
                        searchedDishes ? searchedDishes :
                        (filteredDishes.length ? filteredDishes : dishes)
                    }
                    likeDish={likeDish}
                    dislikeDish={dislikeDish}
                    selectDish={selectDish}
                    filteredDishes={filteredDishes}
                    increaseDishCount={increaseDishCount}
                    decreaseDishCount={decreaseDishCount}
                    openDishCard={openDishCard}
                    setCurrentDishId={setCurrentDishId}
                    currency={currency}
                />
            </section>
            <footer className={styles.buyButtonWrapper}>
                <PrimaryButton
                    text={`your order (${countPrice()})${currencySymbols[currency]}`}
                    onClick={onMakeOrder}
                />
            </footer>
            <FilterModal
                isVisible={isFilterModalVisible}
                filters={filters}
                selectFilterById={selectFilterById}
                unselectFilterById={unselectFilterById}
            />
            <DishCard
                isVisible={isDishCardVisible}
                dish={getDishById(currentDishId)}
                increaseDishCount={increaseDishCount}
                decreaseDishCount={decreaseDishCount}
                onCloseDishCard={onCloseDishCard}
            />
            <OrderCard
                isVisible={isOrderCardVisible}
                order={order}
                onCloseOrderCard={onCloseOrderCard}
                crearOrder={crearOrder}
                setOrder={setOrder}
                price={countPrice()}
            />
            <HistoryCard isVisible={false}/>
            <OrderHistoryCard isVisible={false} />
            <ConfirmCard isVisible={false} />
            <ThankModal isVisible={false}/>
            <DrawerModal isVisible={isDrawerModalVisible} onCloseDrawerModal={closeDrawerModal}/>
            <div
                className={isBackgroundBlack ? styles.darkEffect : `${styles.darkEffect} ${styles.hidden}`}
            />
        </div>
    )
}

export default Menu