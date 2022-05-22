import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import Logo from '../components/logo/Logo';

function StartPage() {
    return (
        <div className={styles.screenWrapper}>
            <div className={styles.content}>
                <Logo />
                <main className={styles.startScreenWrapper}> 
                    <section className={styles.startScreenTextWrapper}>
                        <p className={styles.startScreenText}>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum.</p>
                    </section>
                    <Link to={`/menu`} className={styles.startScreenStartButton}>START</Link>
                    <section className={styles.socialNetworkLogoWrapper}>
                        <img className={styles.socialNetworkLogo} src="./images/instagram.svg" alt="logo"/>
                        <img className={styles.socialNetworkLogo} src="./images/facebook.svg" alt="logo"/>
                        <img className={styles.socialNetworkLogo} src="./images/twitter.svg" alt="logo"/>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default StartPage;
