import React from 'react'
import styles from './style.module.css'


const FilterModal = ({ isVisible, filters, selectFilterById, unselectFilterById }) => {

    const FilterItem = ({group}) => {
        return (
            <>
            <p className={styles.itemsTitle}>{group.name}</p>
                {group.filters.map(filter => {
                    return (
                        <div className={styles.item} key={Math.random()}>
                            {
                                filter.selected ? 
                                <img
                                    className={styles.checkBox}
                                    src="./images/checked.png"
                                    alt="checkbox"
                                    onClick={() => unselectFilterById(filter.id, group.name)}
                                /> :
                                <img
                                    className={styles.checkBox}
                                    src="./images/notChecked.png"
                                    alt="checkbox"
                                    onClick={() => selectFilterById(filter.id, group.name)}
                                />
                            }
                            <p className={styles.itemTitle}>{filter.title}</p>
                        </div>
                        )
                    })
                }
            <div className={styles.filterItemsDevider}/>
            </>
        )
    }
    
    return (
        <section className={isVisible ? styles.filterModal : styles.hidden}>
            <div className={styles.topTriangle} />
            <section className={styles.menuItems}>
                <div className={styles.helpTriangle}/>
                <div className={styles.itemsWrapper}>
                    {
                        filters.map(group => {
                            return (
                               <FilterItem group={group} key={Math.random()} />
                            )
                        })
                    }
                </div>
            </section>
        </section>
    )
}

export default FilterModal