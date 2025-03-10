import React from "react";
import styles from "./MainImg.module.css";

type MainImgPropsType = {
    soldierImg: string,
    currentCard: number,
    mainImg?: undefined
}


const MainImg: React.FC<MainImgPropsType> = ({mainImg, soldierImg, currentCard}) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img
                    loading="lazy"
                    src={mainImg}
                    alt="Main content image"
                    className={styles.image}
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c116929bb3d3d344f8985b18ec3fe8e7190c9849fd4591da255d8175347631c3?placeholderIfAbsent=true&apiKey=8a3404d7eee74db5a8def1a4eb5e7a09"
                    alt="Main content image"
                    className={styles.imageBackGround}
                />
                <img
                    loading="lazy"
                    src={soldierImg}
                    alt="Descriptive alt text for the image"
                    className={
                        currentCard === 0 ? styles.imageSoldierDestiny2
                            : currentCard === 1 ? styles.imageSoldierCoDMW2
                                : currentCard === 2 ? styles.imageSoldierWarzone
                                    : currentCard === 3 ? styles.imageSoldierBlackOps
                                        : currentCard === 4 ? styles.imageSoldierCoDMW3
                                            : currentCard === 5 ? styles.imageSoldierSM2
                                                : currentCard === 6 ? styles.imageSoldierBlackOpsZombies
                                                    : styles.imageSoldier
                    }
                />
            </div>
        </div>
    );
};

export default MainImg;