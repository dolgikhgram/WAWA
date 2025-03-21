import Button from "../../Button/Button.tsx";
import styles from './WeBoostYouWin.module.css'
import Polygon from "./Polygon/Polygon.tsx";
import SaveTimeComponent from "./SaveTimeComponent/SaveTimeComponent.tsx";
import React, { useCallback } from "react";

type WeBoostYouWinPropsType = {
    showFormHandler: () => void,
    isFormOpen: boolean,
    isMenuOpen: boolean
}

const WeBoostYouWin: React.FC<WeBoostYouWinPropsType> = ({ showFormHandler, isFormOpen, isMenuOpen }) => {
    const handleShowForm = useCallback(() => {
        showFormHandler();
    }, [showFormHandler]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.weBoostYouWinContainer}>
                <div className={styles.content}>
                    <div>
                        <div className={styles.titleContainer}>
                            <div className={styles.weBoostText}>We boost,</div>
                            <div className={styles.youWinContainer}>
                                <div className={styles.weBoostText}>you</div>
                                <div className={styles.win}>win</div>
                            </div>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.description}>
                                Fast and secure game boosting services: level up your account, achieve ranks, and unlock
                                items at competitive prices with no risks
                            </div>
                        </div>
                        <div className={styles.containerICons}>
                            <div className={styles.gameIcons}>
                                <img 
                                    className={styles.gameIcon}
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/36e6184505549baf373d9a1a85468c052f16b36fb4f031f225c29ee555274f26?placeholderIfAbsent=true&apiKey=8a3404d7eee74db5a8def1a4eb5e7a09"
                                    alt="Game controller icon"
                                />
                            </div>
                            <div className={styles.gameIcons}>
                                <img 
                                    className={styles.gameIcon}
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e9ad5136a5bbe8bb7b9b911910eef7ad0d876c20dc8dbfed89b99035b8ecda2?placeholderIfAbsent=true&apiKey=8a3404d7eee74db5a8def1a4eb5e7a09"
                                    alt="Xbox icon"
                                />
                            </div>
                            <div className={styles.gameIcons}>
                                <img 
                                    className={styles.gameIcon}
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4b6d43da6480d38db8451e89da5c7792d875f5c43b6144c05993455342a5e2b?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&"
                                    alt="PlayStation icon"
                                />
                            </div>
                            <div className={styles.divider}>
                                <div className={styles.line}/>
                            </div>
                            <div className={styles.containerText}>
                                ALL PLATFORMS
                            </div>
                        </div>
                        <div className={styles.btn}>
                            <Button color={'secondary'} showFormHandler={handleShowForm}>
                                Boost your game
                            </Button>
                        </div>
                    </div>
                </div>
                <Polygon isFormOpen={isFormOpen || isMenuOpen}/>
            </div>
            <div  className={styles.arrowContainer}>
                <img src='./ep_arrow-up.png' alt='Scroll up arrow'/>
            </div>
            <SaveTimeComponent/>
        </div>
    );
};

export default React.memo(WeBoostYouWin);