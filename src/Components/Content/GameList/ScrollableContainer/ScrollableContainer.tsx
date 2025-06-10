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
    const [prevHighlightedIndex, setPrevHighlightedIndex] = useState(gamesList.length);
    const [scrollDirection, setScrollDirection] = useState<'next' | 'prev' | null>(null);
    const [currentGameIndex, setCurrentGameIndex] = useState(0);
    const [visibleCardCount, setVisibleCardCount] = useState(5);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const extendedItems = [...gamesList, ...gamesList, ...gamesList];

    const calculateVisibleCards = () => {
        if (containerRef.current && listRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const items = listRef.current.querySelectorAll(`.${styles.item}`);
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const itemMargin = 15;
                
                const maxVisibleCards = Math.floor(containerWidth / (itemWidth + itemMargin));
                setVisibleCardCount(maxVisibleCards);
            }
        }
    };

    useEffect(() => {
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

    useEffect(() => {
        if (!isAnimating && !isTransitioning) {
            const targetIndex = gamesList.length + currentGameIndex;
            setHighlightedIndex(targetIndex + 1);
            setCurrentIndex(targetIndex);
            
            if (listRef.current) {
                const items = listRef.current.querySelectorAll(`.${styles.item}`);
                if (items.length > 0) {
                    const itemWidth = items[0].getBoundingClientRect().width;
                    const marginRight = 20;
                    listRef.current.style.transition = 'transform 0.3s ease';
                    listRef.current.style.transform = `translateX(-${(targetIndex * (itemWidth + marginRight)) - 20}px)`;
                }
            }
        }
    }, [currentGameIndex, isAnimating, isTransitioning]);

    const handleCardChange = (nextIndex: number, nextHighlightedIndex: number, direction: 'next' | 'prev') => {
        if (isAnimating || isTransitioning || !listRef.current) return;
        
        setIsAnimating(true);
        setScrollDirection(direction);
        setPrevHighlightedIndex(highlightedIndex);
        
        const items = listRef.current.querySelectorAll(`.${styles.item}`);
        if (items.length > 0) {
            const itemWidth = items[0].getBoundingClientRect().width;
            const marginRight = 20;
            
            if (nextIndex >= gamesList.length * 2) {
                nextIndex = gamesList.length;
                nextHighlightedIndex = gamesList.length + 1;
                listRef.current.style.transition = 'none';
                listRef.current.style.transform = `translateX(-${nextIndex * (itemWidth + marginRight)}px)`;
                void listRef.current.offsetHeight;
                listRef.current.style.transition = 'transform 0.3s ease';
            }
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
            
            const actualGameIndex = (nextHighlightedIndex - 1) % gamesList.length;
            setCurrentGameIndex(actualGameIndex);
            currentCardHandler(actualGameIndex);
            
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

    const handleCardClick = (index: number) => {
        if (isAnimating || isTransitioning) return;
        
        const actualGameIndex = index % gamesList.length;
        
        if (actualGameIndex === currentGameIndex) return;
        
        const targetIndex = gamesList.length + actualGameIndex;
        
        const direction = actualGameIndex > currentGameIndex ? 'next' : 'prev';
        
        setIsAnimating(true);
        setScrollDirection(direction);
        setPrevHighlightedIndex(highlightedIndex);
        
        if (listRef.current) {
            const items = listRef.current.querySelectorAll(`.${styles.item}`);
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const marginRight = 20;
                
                listRef.current.style.transition = 'transform 0.3s ease';
                listRef.current.style.transform = `translateX(-${(targetIndex * (itemWidth + marginRight)) - 20}px)`;
                
                setCurrentIndex(targetIndex);
                setHighlightedIndex(targetIndex + 1);
                setCurrentGameIndex(actualGameIndex);
                
                currentCardHandler(actualGameIndex);
            }
        }
        
        setTimeout(() => {
            setIsAnimating(false);
            setScrollDirection(null);
        }, 300);
    };

    useEffect(() => {
        if (listRef.current) {
            const items = listRef.current.querySelectorAll(`.${styles.item}`);
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const marginRight = 10;
                listRef.current.style.transform = `translateX(-${(currentIndex * (itemWidth + marginRight)) - 20}px)`;
            }
        }
        
        handleNextClick();
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={`${styles.scrollableContainer} ${styles.adjustedContainer}`}>
                <ul className={styles.list} ref={listRef}>
                    {extendedItems.map((item, index) => {
                        const isExiting = isAnimating && scrollDirection === 'next' && index === prevHighlightedIndex - 1;
                        const isEntering = isAnimating && scrollDirection === 'next' && index === highlightedIndex;
                        const isPrevExiting = isAnimating && scrollDirection === 'prev' && index === prevHighlightedIndex;
                        const isPrevEntering = isAnimating && scrollDirection === 'prev' && index === highlightedIndex - 1;
                        
                        const isCurrentGame = (index % gamesList.length) === currentGameIndex && index === highlightedIndex - 1;
                        
                        const isFirstItem = index === highlightedIndex - 2;
                        const relativeIndex = index - (highlightedIndex - 1);
                        const isFullyVisible = relativeIndex >= 0 && relativeIndex < visibleCardCount;
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
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleCardClick(index);
                                    }
                                }}
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
                    display: 'none'
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