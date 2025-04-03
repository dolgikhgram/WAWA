import React, { useEffect, useState } from "react";
import styles from "./MainImg.module.css";

type MainImgPropsType = {
    soldierImg: string,
    currentCard: number,
    mainImg?: string
}

const MainImg: React.FC<MainImgPropsType> = React.memo(({mainImg, soldierImg, currentCard}) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [prevSoldierImg, setPrevSoldierImg] = useState(soldierImg);
    const [prevMainImg, setPrevMainImg] = useState(mainImg);
    const [showNewContent, setShowNewContent] = useState(true);
    const [opacity, setOpacity] = useState(1);
    
    useEffect(() => {
        if (soldierImg !== prevSoldierImg || mainImg !== prevMainImg) {
            // Начинаем анимацию исчезновения
            setIsTransitioning(true);
            setShowNewContent(false);
            setOpacity(0);
            
            // Ждем завершения анимации исчезновения
            const hideTimer = setTimeout(() => {
                // Обновляем оба изображения одновременно
                setPrevSoldierImg(soldierImg);
                setPrevMainImg(mainImg);
                setShowNewContent(true);
                
                // Показываем новый контент
                requestAnimationFrame(() => {
                    setOpacity(1);
                });
            }, 200);
            
            // Завершаем анимацию
            const finishTimer = setTimeout(() => {
                setIsTransitioning(false);
            }, 400);
            
            return () => {
                clearTimeout(hideTimer);
                clearTimeout(finishTimer);
            };
        }
    }, [soldierImg, mainImg, prevSoldierImg, prevMainImg]);

    const getSoldierClassName = () => {
        switch(currentCard) {
            case 0: return styles.imageSoldierDestiny2;
            case 1: return styles.imageSoldierCoDMW2;
            case 2: return styles.imageSoldierWarzone;
            case 3: return styles.imageSoldierBlackOps;
            case 4: return styles.imageSoldierCoDMW3;
            case 5: return styles.imageSoldierSM2;
            case 6: return styles.imageSoldierBlackOpsZombies;
            default: return styles.imageSoldier;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <div className={styles.transitionWrapper}>
                    {isTransitioning && !showNewContent && prevMainImg && (
                        <img
                            loading="lazy"
                            src={prevMainImg}
                            alt="Previous main content"
                            className={styles.image}
                            style={{ 
                                opacity: 0,
                                transition: 'opacity 0.2s ease-out',
                                position: 'absolute'
                            }}
                        />
                    )}
                    <img
                        loading="lazy"
                        src={mainImg}
                        alt="Main content image"
                        className={styles.image}
                        style={{ 
                            opacity: showNewContent ? opacity : 0,
                            transition: 'opacity 0.2s ease-out',
                            position: 'absolute'
                        }}
                    />
                </div>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c116929bb3d3d344f8985b18ec3fe8e7190c9849fd4591da255d8175347631c3?placeholderIfAbsent=true&apiKey=8a3404d7eee74db5a8def1a4eb5e7a09"
                    alt="Background image"
                    className={styles.imageBackGround}
                />
                <div className={styles.soldierWrapper}>
                    {isTransitioning && !showNewContent && (
                        <img
                            loading="lazy"
                            src={prevSoldierImg}
                            alt="Previous soldier"
                            className={getSoldierClassName()}
                            style={{ 
                                opacity: 0,
                                transition: 'opacity 0.2s ease-out',
                                position: 'absolute',
                                transform: 'none'
                            }}
                        />
                    )}
                    {showNewContent && (
                        <img
                            loading="lazy"
                            src={soldierImg}
                            alt="Current soldier"
                            className={getSoldierClassName()}
                            style={{ 
                                opacity,
                                transition: 'opacity 0.2s ease-out',
                                position: 'absolute',
                                transform: 'none'
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});

export default MainImg;