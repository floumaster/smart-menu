import React from 'react'
import styles from './style.module.css'
import Logo from '../../logo/Logo'

const MenuItem = ({ text, src, alt, isBorder }) => {
    return (
        <div key={Math.random()} className={isBorder ? `${styles.menuItemWrapper} ${styles.bordered}` : styles.menuItemWrapper}>
            <img
                className={styles.menuItemImg}
                src={src}
                alt={alt}
            />
            <p>{text}</p>
        </div>
    )
}

const MenuItemList = ({ items }) => {
    return (
        <div className={styles.menuWrapper}>
            {items.map((item, key) => {
                return (
                    <MenuItem
                        key={Math.random()}
                        text={item.text}
                        src={item.src}
                        alt={item.alt}
                        isBorder={key < items.length - 1}
                    />
                )
            })}
        </div>
    )
}

const DrawerModal = ({ isVisible, onCloseDrawerModal }) => {
    const menuItems = [
        {
            text: 'Order history',
            src: './images/history.png',
            alt: 'history'
        },
        {
            text: 'About us',
            src: './images/about.png',
            alt: 'about'
        },
        {
            text: 'Contacts',
            src: './images/contact.png',
            alt: 'contact'
        }
    ]
    return (
        <section className={isVisible ? styles.drawerModalWrapper : `${styles.drawerModalWrapper} ${styles.closed}`}>
            <div className={styles.closeButtonWrapper}>
                <img
                    className={styles.closeButton}
                    src="./images/close.png"
                    alt="close"
                    onClick={onCloseDrawerModal}
                />
            </div>
            <div className={styles.drawerModalContent}>
                <div>
                    <Logo />
                    <MenuItemList items={menuItems} />
                </div>
                <div className={styles.drawerModalFooter}>
                    <p className={styles.drawerModalFooterText}>8:00 – 23:00 every day</p>
                    <p className={styles.drawerModalFooterText}>Parker Rd. Allentown, New Mexico</p>
                </div>
            </div>
        </section>
    )
}

export default DrawerModal