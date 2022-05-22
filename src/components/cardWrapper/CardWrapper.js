import React, { useEffect, useState, useRef } from 'react'
import styles from './style.module.css'
import useWindowDimensions from '../hooks/useWindowDimensions';

const CardWrapper = ({ isVisible, onClose, children }) => {
    const cardRef = useRef()
    const [style, setStyle] = useState(null)
    const [maxHeight, setMaxHeight] = useState(0)
    const { height } = useWindowDimensions();

    const onTouchMoveHandler = (e) => {
        const currentHeight = e.targetTouches[0].clientY
        const newTop = currentHeight * 100 / height
        if(currentHeight >= (height - maxHeight)){
            setStyle({
                top: newTop + 'vh'
            })
        }
    }

    const onTouchCancelHandler = (e) => {
        const currentHeight = e.changedTouches[0].clientY
        if(currentHeight - 100 > (height - maxHeight)){
            setStyle({
                top: '100vh',
                transition: 'bottom 0.3s, top 0.3s'
            })
            onClose()
            setTimeout(() => {
                setStyle(null)
            }, 300)
        }
    }

    useEffect(() => {
        setMaxHeight(cardRef.current.getBoundingClientRect().height)
    }, [isVisible])

    return (
        <section className={isVisible ? styles.cardWrapper : `${styles.cardWrapper} ${styles.gotDown}`} style={style} ref={cardRef}>
            <div className={styles.cardLine} onTouchMove={onTouchMoveHandler} onTouchEnd={onTouchCancelHandler} onClick={()=>console.log(1)}/>
            <section className={styles.cardContentWrapper}>
                {children}
            </section>
        </section>
    )
}

export default CardWrapper