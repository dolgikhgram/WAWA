import styles from './Footer.module.css'
import React from "react";


const Footer = React.memo(() => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src='./WAWAFooter.png' alt='WAWA'/>
                    <div className={styles.text}>Пользовательское соглашение</div>
                    <div className={styles.text}>Политика конфиденциальности</div>
                </div>
                <div className={styles.containerICons}>
                    <div className={styles.gameIcons}>
                        <img className={styles.gameIcon}
                             loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/36e6184505549baf373d9a1a85468c052f16b36fb4f031f225c29ee555274f26?placeholderIfAbsent=true&apiKey=8a3404d7eee74db5a8def1a4eb5e7a09"
                             alt="Game icon"/>
                    </div>
                    <div className={styles.gameIcons}>
                        <img className={styles.gameIcon}
                             loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e9ad5136a5bbe8bb7b9b911910eef7ad0d876c20dc8dbfed89b99035b8ecda2?placeholderIfAbsent=true&apiKey=8a3404d7eee74db5a8def1a4eb5e7a09"
                             alt="Xbox icon"/>
                    </div>
                    <div className={styles.gameIcons}>
                        <img className={styles.gameIcon}
                             loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4b6d43da6480d38db8451e89da5c7792d875f5c43b6144c05993455342a5e2b?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&"
                             alt="Sony playstation icon"/>
                    </div>
                </div>
                </div>
            </div>
            );
            });

            export default Footer;