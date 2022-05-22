import React from "react";
import styles from './style.module.css'

const DropListItem = ({ item, isLast, onChoose }) => {

    const setSystemLang = () => {
        onChoose(item)
    }

    return (
        <div
            className={isLast ? styles.dropListItem : `${styles.dropListItem} ${styles.withBorder}`}
            onClick={setSystemLang}
        >
            {item}
        </div>
    )
}

const DropList = ({ isVisible, onChoose, items, isCurrency }) => {

    const mainStyle = isCurrency ? styles.dropCurrencyWrapper : styles.dropListWrapper

    return (
        <div className={isVisible ? mainStyle : `${mainStyle} ${styles.hidden}`}>
            {
                items.map((item, id) => {
                    return <DropListItem
                        item={item}
                        isLast={id + 1 === 4}
                        onChoose={onChoose}
                        key={Math.random()}
                    />
                })
            }
        </div>
    )
}

export default DropList