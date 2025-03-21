import React from 'react';
import styles from './ScrollableContainer.module.css'
import { useRef, useState, useEffect } from "react";

interface GameData {
    id: number;
    imgSrc: string;
    altText: string;
}

const gamesList: GameData[] = [
    { id: 0, imgSrc: './Destiny2.2.png', altText: 'Destiny 2' },
    { id: 1, imgSrc: './MW2.png', altText: 'Modern Warfare 2' },
    { id: 2, imgSrc: './CallOfDutyWarzone.png', altText: 'Call of Duty Warzone' },
    { id: 3, imgSrc: './CallOfDutyBlackOps6.png', altText: 'Call of Duty Black Ops' },
    { id: 4, imgSrc: './CallOfDutyMW3.png', altText: 'Call of Duty MW3' },
    { id: 5, imgSrc: './spaceMarine.png', altText: 'Space Marine' },
    { id: 6, imgSrc: './pugolo.png', altText: 'Pugolo' },
];

type ScrollableContainerPropsType = {
    currentCardHandler: (index: number) => void,
    isTransitioning?: boolean
}

const ScrollableContainer: React.FC<ScrollableContainerPropsType> = React.memo(({ currentCardHandler, isTransitioning }) => {
    const listRef = useRef<HTMLUListElement>(null);
    const [currentIndex, setCurrentIndex] = useState(gamesList.length);
    const [highlightedIndex, setHighlightedIndex] = useState(gamesList.length + 1);
    const [isAnimating, setIsAnimating] = useState(false);

    const extendedItems = [...gamesList, ...gamesList, ...gamesList];

    useEffect(() => {
        if (listRef.current) {
            const items = listRef.current.querySelectorAll(`.${styles.item}`);
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const marginRight = 10;
                listRef.current.style.transform = `translateX(-${currentIndex * (itemWidth + marginRight)}px)`;
            }
        }
    }, []);

    // Общая функция для обработки переключения карточек
    const handleCardChange = (nextIndex: number, nextHighlightedIndex: number) => {
        if (isAnimating || isTransitioning || !listRef.current) return;
        
        setIsAnimating(true);
        const items = listRef.current.querySelectorAll(`.${styles.item}`);
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const marginRight = 20;
            
            // Если достигли конца второго набора, перепрыгиваем в начало второго набора
            if (nextIndex >= gamesList.length * 2) {
                nextIndex = gamesList.length;
                nextHighlightedIndex = gamesList.length + 1;
                listRef.current.style.transition = 'none';
                listRef.current.style.transform = `translateX(-${nextIndex * (itemWidth + marginRight)}px)`;
                void listRef.current.offsetHeight;
                listRef.current.style.transition = 'transform 0.3s ease';
            }

            setCurrentIndex(nextIndex);
            setHighlightedIndex(nextHighlightedIndex);
            
            // Главное изменение - вызываем обработчик с использованием модуля, а не индекса списка
            // Это обеспечит правильный индекс для родительского компонента GameList
            currentCardHandler(nextIndex % gamesList.length);
            
            // Обновляем позицию списка
            listRef.current.style.transform = `translateX(-${nextIndex * (itemWidth + marginRight)}px)`;
        }

        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    const handleNextClick = () => {
        const nextIndex = currentIndex + 1;
        const nextHighlightedIndex = highlightedIndex + 1;
        handleCardChange(nextIndex, nextHighlightedIndex);
    };

    // Обработчик клика на карточку
    const handleCardClick = (index: number) => {
        // Игнорируем клик на текущую выделенную карточку
        if (index === highlightedIndex) return;
        
        // Вычисляем разницу между текущим индексом и индексом карточки, на которую кликнули
        const diff = index - highlightedIndex;
        const nextIndex = currentIndex + diff;
        const nextHighlightedIndex = highlightedIndex + diff;
        
        handleCardChange(nextIndex, nextHighlightedIndex);
    };

    useEffect(() => {
        handleNextClick()
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.scrollableContainer}>
                <ul className={styles.list} ref={listRef}>
                    {extendedItems.map((item, index) => (
                         <li
                            key={`${item.id}-${index}`}
                            className={`${styles.item} ${index === highlightedIndex ? styles.firstVisible : ''} ${ index === highlightedIndex-1 ? styles.firstItem : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <div className={styles.gameCard}>
                                <img 
                                    className={`${styles.img} ${index !== highlightedIndex ? styles.dimmed : ''}`} 
                                    src={item.imgSrc} 
                                    alt={item.altText} 
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
                onClick={handleNextClick}
                aria-label="Scroll right"
                type="button"
                tabIndex={0}
                style={{
                    WebkitTapHighlightColor: 'transparent',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none'
                }}
            >
                <img src='./btnCardsR.png' alt={'vector'} />
            </button>
        </div>
    );
});

export default ScrollableContainer;