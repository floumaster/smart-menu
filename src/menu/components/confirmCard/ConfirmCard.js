import React, { useState } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import styles from './style.module.css'
import CardWrapper from '../../../components/cardWrapper/CardWrapper';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const ConfirmCard = ({isVisible, orders}) => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const onNameChange = (e) => {
        setUserName(e.target.calue)
    }

    const onEmailChange = (e) => {
        setUserEmail(e.target.calue)
    }

    return (
        <CardWrapper isVisible={isVisible}>
            <div className={styles.cardNameWrapper}>
                <p className={styles.cardName}>Confirm order</p>
                <p className={styles.tip}>Please enter info about yourself to pay</p>
                <div className={styles.contentWrapper}>
                    <input
                        className={styles.input}
                        value={userName}
                        onChange={onNameChange}
                        placeholder="Name"
                    />
                    <input
                        className={`${styles.input} ${styles.last}`}
                        value={userEmail}
                        onChange={onEmailChange}
                        placeholder="Email"
                    />
                    <PrimaryButton text="send"/>
                </div>
            </div>
            
        </CardWrapper>
    )
}

export default ConfirmCard