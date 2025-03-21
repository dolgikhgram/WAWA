import styles from "./Polygon.module.css";
import LevelUpCard from "./Card/LevelUpCard.tsx";
import React, { useState, useEffect, useRef } from 'react';

interface PolygonPropsType {
    isFormOpen: boolean;
}

const Polygon: React.FC<PolygonPropsType> = React.memo(({ isFormOpen }) => {
    const cardData = [
        {
            id: 0,
            title: "XP BOOST",
            description: "Faster progress, bigger rewards. Level up now",
            totalSegments: 13,
            filledSegments: 7,
            pointsGained: 100
        },
        {
            id: 1,
            title: "LIGHT OF POWER",
            description: "Your strength grows! Level up and become a true Guardian",
            totalSegments: 13,
            filledSegments: 11,
            pointsGained: 200
        },
        {
            id: 2,
            title: "PESTIGE",
            description: "Rise above the rest. Prove your dominance on the battlefield",
            totalSegments: 13,
            filledSegments: 11,
            pointsGained: 120
        }
    ];

    // Track positions and animation state
    const [cardsPositions, setCardsPositions] = useState([
        {id: 0, position: 0}, // top card
        {id: 1, position: 1}, // middle card
        {id: 2, position: 2}  // bottom card
    ]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [animationTrigger, setAnimationTrigger] = useState(0); // Used to trigger CSS animations
    const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    // Define z-indices for proper layering
    const zIndices = {
        0: 2, // top card
        1: 3, // middle card
        2: 1, // bottom card
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        // Function to handle the carousel animation cycle
        const handleCarouselCycle = () => {
            // Trigger the CSS animation
            setAnimationTrigger(prev => prev + 1);
            
            // After the animation completes, update the positions
            const animationDuration = 800; // Match with CSS
            animationRef.current = setTimeout(() => {
                // Update card positions
                setCardsPositions(prevPositions => {
                    return prevPositions.map(card => ({
                        id: card.id,
                        position: (card.position + 1) % 3
                    }));
                });
                
                // Schedule the next cycle
                animationRef.current = setTimeout(handleCarouselCycle, 6000 - animationDuration);
            }, animationDuration + 100); // Add small buffer
        };
        
        // Start the first cycle
        animationRef.current = setTimeout(handleCarouselCycle, 6000);
        
        // Cleanup
        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, []);

    // Get CSS class names for each card based on position and animation state
    const getCardClassNames = (cardPosition: number) => {
        // Base class for position
        const positionClass = styles[`card${cardPosition + 1}`];
        
        // Animation classes
        let animationClass = '';
        
        if (animationTrigger > 0) {
            if (cardPosition === 0) { // Top to middle
                animationClass = styles.animateTopToMiddle;
            } else if (cardPosition === 1) { // Middle to bottom
                animationClass = styles.animateMiddleToBottom;
            } else { // Bottom to top
                animationClass = styles.animateBottomToTop;
            }
        }
        
        return `${positionClass} ${animationClass}`;
    };

    // Get inline styles for each card
    const getCardStyle = (position: number) => {
        const scale = position === 1 ? 1 : 0.85;
        
        return {
            transform: `scale(${scale})`,
            zIndex: zIndices[position as keyof typeof zIndices],
        };
    };

    // Render the cards
    const renderCards = () => {
        return cardData.map(card => {
            const cardPosition = cardsPositions.find(pos => pos.id === card.id)?.position || 0;
            
            return (
                <div
                    key={card.id}
                    className={getCardClassNames(cardPosition)}
                    style={getCardStyle(cardPosition)}
                    data-animation-key={animationTrigger} // Force re-evaluation of animations
                >
                    <LevelUpCard
                        title={card.title}
                        description={card.description}
                        totalSegments={card.totalSegments}
                        filledSegments={card.filledSegments}
                        pointsGained={card.pointsGained}
                    />
                </div>
            );
        });
    };

    return (
        <div className={styles.unionContainer}>
            {/* Use a unique class wrapper for scoped animations */}
            <style>
                {`
                .polygonAnimationScope .${styles.animateTopToMiddle} {
                    animation: 800ms ease-in-out forwards;
                    animation-name: polygon_topToMiddle_${animationTrigger};
                }
                
                .polygonAnimationScope .${styles.animateMiddleToBottom} {
                    animation: 800ms ease-in-out forwards;
                    animation-name: polygon_middleToBottom_${animationTrigger};
                }
                
                .polygonAnimationScope .${styles.animateBottomToTop} {
                    animation: 800ms ease-in-out forwards;
                    animation-name: polygon_bottomToTop_${animationTrigger};
                }

                @keyframes polygon_topToMiddle_${animationTrigger} {
                    0% { transform: scale(0.85) translateY(0); }
                    100% { transform: scale(1) translateY(125%); }
                }
                
                @keyframes polygon_middleToBottom_${animationTrigger} {
                    0% { transform: scale(1) translateY(0); }
                    100% { transform: scale(0.85) translateY(125%); }
                }
                
                @keyframes polygon_bottomToTop_${animationTrigger} {
                    0% { transform: scale(0.85) translateY(0); }
                    100% { transform: scale(0.85) translateY(-250%); }
                }
                `}
            </style>
            <img className={styles.polygon} src={screenWidth < 768 ? './polygon2.0Mobile.png'  :  './polygon2.0.png'}  alt='polygon'/>
            <div className={`polygonAnimationScope ${styles.cards}`} style={{opacity: isFormOpen ? 0 : 1, transition: 'opacity 0.3s ease-in-out'}}>
                {renderCards()}
            </div>
        </div>
    );
});

export default Polygon;