import React from 'react';
import styles from './ScrollableContainer.module.css'
import { useRef, useState, useEffect } from "react";

interface GameData {
    id: number;
    imgSrc: string;
    altText: string;
}

const gamesList: GameData[] = [
    { id: 0, imgSrc: '../../../../../public/Destiny2.2.png', altText: 'Destiny 2' },
    { id: 1, imgSrc: '../../../../../public/MW2.png', altText: 'Modern Warfare 2' },
    { id: 2, imgSrc: '../../../../../public/CallOfDutyWarzone.png', altText: 'Call of Duty Warzone' },
    { id: 3, imgSrc: '../../../../../public/CallOfDutyBlackOps6.png', altText: 'Call of Duty Black Ops' },
    { id: 4, imgSrc: '../../../../../public/CallOfDutyMW3.png', altText: 'Call of Duty MW3' },
    { id: 5, imgSrc: '../../../../../public/spaceMarine.png', altText: 'Space Marine' },
    { id: 6, imgSrc: '../../../../../public/pugolo.png', altText: 'Pugolo' },
];

type ScrollableContainerPropsType = {
    currentCardHandler: (index: number) => void,
}

const ScrollableContainer: React.FC<ScrollableContainerPropsType> = ({ currentCardHandler }) => {
    const listRef = useRef<HTMLUListElement>(null);
    const [currentIndex, setCurrentIndex] = useState(gamesList.length);
    const [highlightedIndex, setHighlightedIndex] = useState(gamesList.length + 1);
    const [isAnimating, setIsAnimating] = useState(false);

    // Создаем расширенный список для бесконечной прокрутки
    const extendedItems = [...gamesList, ...gamesList, ...gamesList];

    useEffect(() => {
        if (listRef.current) {
            // Начальная позиция - середина списка
            const items = listRef.current.querySelectorAll(`.${styles.item}`);
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const marginRight = 10;
                listRef.current.style.transform = `translateX(-${currentIndex * (itemWidth + marginRight)}px)`;
            }
        }
    }, []);

    const handleNextClick = () => {
        if (isAnimating || !listRef.current) return;
        
        setIsAnimating(true);
        const items = listRef.current.querySelectorAll(`.${styles.item}`);
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const marginRight = 20;
            let nextIndex = currentIndex + 1;
            let nextHighlightedIndex = highlightedIndex + 1;
            
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
            currentCardHandler(nextIndex % gamesList.length);
            
            listRef.current.style.transform = `translateX(-${nextIndex * (itemWidth + marginRight)}px)`;
        }

        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className={styles.container}>
            <div className={styles.scrollableContainer}>
                <ul className={styles.list} ref={listRef}>
                    {extendedItems.map((item, index) => (
                        <li
                            key={`${item.id}-${index}`}
                            className={`${styles.item} ${index === highlightedIndex ? styles.firstVisible : ''}`}
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
            >
                <img src='../../../../../public/btnCardsR.png' alt={'vector'} />
            </button>
        </div>
    );
};

export default ScrollableContainer;