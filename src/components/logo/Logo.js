import React, { useContext } from 'react'
import styles from './style.module.css'
import { UserContext } from '../../context/userContext';

const Logo = () => {

    const { isDarkMode } = useContext(UserContext)


    return (
        <div className={styles.logoWrapper}>
            <img className={styles.logoImg} src="./images/logo.svg" alt="logo"/>
            <div>
                <p className={styles.logoTitle}>SMART MENU</p>
            </div>
        </div>
    )
}

export default Logo