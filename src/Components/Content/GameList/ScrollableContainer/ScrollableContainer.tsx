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
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(gamesList.length);
    const [highlightedIndex, setHighlightedIndex] = useState(gamesList.length + 1);
    const [isAnimating, setIsAnimating] = useState(false);
    // Добавляем состояние для предыдущего выделенного индекса
    const [prevHighlightedIndex, setPrevHighlightedIndex] = useState(gamesList.length);
    // Состояние для отслеживания направления прокрутки
    const [scrollDirection, setScrollDirection] = useState<'next' | 'prev' | null>(null);
    // Добавляем состояние для отслеживания текущей карточки игры
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    // Добавляем состояние для отслеживания видимых карточек
    const [visibleCardCount, setVisibleCardCount] = useState(5); // По умолчанию показываем 5 карточек
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const extendedItems = [...gamesList, ...gamesList, ...gamesList];

    // Функция для расчета количества видимых карточек на основе размера контейнера
    const calculateVisibleCards = () => {
        if (containerRef.current && listRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const items = listRef.current.querySelectorAll(`.${styles.item}`);
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const itemMargin = 15; // Отступ между карточками
                
                // Сколько карточек поместится в контейнер
                const maxVisibleCards = Math.floor(containerWidth / (itemWidth + itemMargin));
                setVisibleCardCount(maxVisibleCards);
            }
        }
    };

    useEffect(() => {
        // Рассчитываем видимые карточки при монтировании и изменении размера окна
        calculateVisibleCards();
        
        const handleResize = () => {
            calculateVisibleCards();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
    const handleCardChange = (nextIndex: number, nextHighlightedIndex: number, direction: 'next' | 'prev') => {
        if (isAnimating || isTransitioning || !listRef.current) return;
        
        setIsAnimating(true);
        // Устанавливаем направление прокрутки
        setScrollDirection(direction);
        // Сохраняем предыдущий индекс для анимации
        setPrevHighlightedIndex(highlightedIndex);
        
        const items = listRef.current.querySelectorAll(`.${styles.item}`);
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            // Увеличиваем отступ между карточками
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
            // Добавляем проверку для нижней границы
            else if (nextIndex < gamesList.length) {
                nextIndex = gamesList.length * 2 - 1;
                nextHighlightedIndex = gamesList.length * 2;
                listRef.current.style.transition = 'none';
                listRef.current.style.transform = `translateX(-${nextIndex * (itemWidth + marginRight)}px)`;
                void listRef.current.offsetHeight;
                listRef.current.style.transition = 'transform 0.3s ease';
            }

            setCurrentIndex(nextIndex);
            setHighlightedIndex(nextHighlightedIndex);
            
            // Вычисляем индекс карточки, которая будет выделена (видна пользователю)
            // Мы хотим чтобы именно эта карточка стала текущей в GameList
            const actualGameIndex = (nextHighlightedIndex - 1) % gamesList.length;
            setCurrentGameIndex(actualGameIndex);
            // Передаем индекс выбранной карточки родительскому компоненту
            currentCardHandler(actualGameIndex);
            
            // Обновляем позицию списка с дополнительным отступом слева для предотвращения наложения
            // Добавляем дополнительное смещение на 20px вправо
            listRef.current.style.transform = `translateX(-${(nextIndex * (itemWidth + marginRight)) - 20}px)`;
        }

        setTimeout(() => {
            setIsAnimating(false);
            setScrollDirection(null);
        }, 300);
    };

    const handleNextClick = () => {
        setIsButtonClicked(true);
        const nextIndex = currentIndex + 1;
        const nextHighlightedIndex = highlightedIndex + 1;
        handleCardChange(nextIndex, nextHighlightedIndex, 'next');
        setTimeout(() => {
            setIsButtonClicked(false);
        }, 300);
    };

    const handlePrevClick = () => {
        setIsButtonClicked(true);
        const nextIndex = currentIndex - 1;
        const nextHighlightedIndex = highlightedIndex - 1;
        handleCardChange(nextIndex, nextHighlightedIndex, 'prev');
        setTimeout(() => {
            setIsButtonClicked(false);
        }, 300);
    };

    // Обработчик клика на карточку
    const handleCardClick = (index: number) => {
        // Игнорируем клик на текущую выделенную карточку
        if (index === highlightedIndex - 1) return;
        
        // Вычисляем разницу между текущим индексом и индексом карточки, на которую кликнули
        const diff = index - (highlightedIndex - 1);
        const nextIndex = currentIndex + diff;
        // Устанавливаем nextHighlightedIndex так, чтобы выделенной была карточка, на которую кликнули
        const nextHighlightedIndex = index + 1;
        
        // Определяем направление прокрутки на основе разницы
        const direction = diff > 0 ? 'next' : 'prev';
        handleCardChange(nextIndex, nextHighlightedIndex, direction);
    };

    useEffect(() => {
        // Применяем начальное смещение при монтировании
        if (listRef.current) {
            const items = listRef.current.querySelectorAll(`.${styles.item}`);
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const marginRight = 10;
                // Добавляем начальное дополнительное смещение на 20px вправо
                listRef.current.style.transform = `translateX(-${(currentIndex * (itemWidth + marginRight)) - 20}px)`;
            }
        }
        
        // Начальный вызов для установки правильного расположения
        handleNextClick();
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={`${styles.scrollableContainer} ${styles.adjustedContainer}`}>
                <ul className={styles.list} ref={listRef}>
                    {extendedItems.map((item, index) => {
                        // Определяем дополнительные классы для анимации
                        const isExiting = isAnimating && scrollDirection === 'next' && index === prevHighlightedIndex - 1;
                        const isEntering = isAnimating && scrollDirection === 'next' && index === highlightedIndex;
                        const isPrevExiting = isAnimating && scrollDirection === 'prev' && index === prevHighlightedIndex;
                        const isPrevEntering = isAnimating && scrollDirection === 'prev' && index === highlightedIndex - 1;
                        
                        // Определяем, является ли карточка текущей выбранной игрой
                        const isCurrentGame = item.id === currentGameIndex && index === highlightedIndex - 1;
                        
                        // Возвращаем скрытую предыдущую карточку для правильного отступа 
                        // и предотвращения наложения на главное изображение
                        const isFirstItem = index === highlightedIndex - 2;
                        
                        // Определяем, помещается ли карточка полностью
                        const relativeIndex = index - (highlightedIndex - 1);
                        const isFullyVisible = relativeIndex >= 0 && relativeIndex < visibleCardCount;
                        
                        // Если карточка не помещается полностью, добавляем класс для её скрытия
                        const visibilityClass = isFullyVisible ? '' : styles.notFullyVisible;
                        
                        return (
                            <li
                                key={`${item.id}-${index}`}
                                className={`
                                    ${styles.item} 
                                    ${index === highlightedIndex - 1 ? styles.firstVisible : ''} 
                                    ${index === highlightedIndex ? styles.nextItem : ''}
                                    ${isFirstItem ? styles.firstItem : ''}
                                    ${isExiting ? styles.exiting : ''}
                                    ${isEntering ? styles.entering : ''}
                                    ${isPrevExiting ? styles.prevExiting : ''}
                                    ${isPrevEntering ? styles.prevEntering : ''}
                                    ${isCurrentGame ? styles.currentGame : ''}
                                    ${visibilityClass}
                                `}
                                onClick={() => handleCardClick(index)}
                            >
                                <div className={styles.gameCard}>
                                    <img 
                                        className={`${styles.img} ${index !== highlightedIndex - 1 ? styles.dimmed : ''}`} 
                                        src={item.imgSrc} 
                                        alt={item.altText} 
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <button
                className={`${styles.scrollButton} ${styles.scrollButtonRight} ${isButtonClicked ? styles.buttonClicked : ''}`}
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
                <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrowIcon}
                >
                    <path 
                        d="M9 6L15 12L9 18" 
                        stroke="white" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {/* Добавляем кнопку для прокрутки влево */}
            <button
                className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
                onClick={handlePrevClick}
                aria-label="Scroll left"
                type="button"
                tabIndex={0}
                style={{
                    WebkitTapHighlightColor: 'transparent',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    display: 'none' // Скрываем кнопку, но оставляем функциональность
                }}
            >
                <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.arrowIcon}
                >
                    <path 
                        d="M15 6L9 12L15 18" 
                        stroke="white" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
});

export default ScrollableContainer;