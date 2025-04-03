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
            title: "PRESTIGE",
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
    
    // Generate unique animation identifiers for this component instance
    const uniqueId = useRef(`polygon_${Math.random().toString(36).substr(2, 9)}`);
    const animationNames = {
        topToMiddle: `${uniqueId.current}_topToMiddle`,
        middleToBottom: `${uniqueId.current}_middleToBottom`,
        bottomToTop: `${uniqueId.current}_bottomToTop`
    };
    
    // Define z-indices for proper layering
    const zIndices = {
        0: 2, // top card
        1: 3, // middle card
        2: 1, // bottom card
    };

    // Create scoped style object for animations
    const animationStyles = {
        [`@keyframes ${animationNames.topToMiddle}`]: {
            '0%': { transform: 'scale(0.85) translateY(0)' },
            '100%': { transform: 'scale(1) translateY(125%)' }
        },
        [`@keyframes ${animationNames.middleToBottom}`]: {
            '0%': { transform: 'scale(1) translateY(0)' },
            '100%': { transform: 'scale(0.85) translateY(125%)' }
        },
        [`@keyframes ${animationNames.bottomToTop}`]: {
            '0%': { transform: 'scale(0.85) translateY(0)' },
            '100%': { transform: 'scale(0.85) translateY(-250%)' }
        }
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

    const getCardStyle = (position: number) => {
        const scale = position === 1 ? 1 : 0.85;
        let animation = '';
        
        if (animationTrigger > 0) {
            const animationName = position === 0 
                ? animationNames.topToMiddle 
                : position === 1 
                    ? animationNames.middleToBottom 
                    : animationNames.bottomToTop;
            
            animation = `${animationName} 800ms ease-in-out forwards`;
        }
        
        return {
            transform: `scale(${scale})`,
            zIndex: zIndices[position as keyof typeof zIndices],
            animation: animation
        };
    };

    // Render the cards
    const renderCards = () => {
        return cardData.map(card => {
            const cardPosition = cardsPositions.find(pos => pos.id === card.id)?.position || 0;
            
            return (
                <div
                    key={card.id}
                    className={styles[`card${cardPosition + 1}`]}
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

    // Convert animation styles to CSS string
    const getCssText = () => {
        let cssText = '';
        for (const [key, value] of Object.entries(animationStyles)) {
            cssText += `${key} { `;
            for (const [prop, propValue] of Object.entries(value)) {
                cssText += `${prop} { ${propValue}; } `;
            }
            cssText += `} `;
        }
        return cssText;
    };

    return (
        <div className={styles.unionContainer}>
            {/* Scoped CSS keyframe animations */}
            <style>
                {getCssText()}
            </style>
            <img className={styles.polygon} src={screenWidth < 768 ? './polygon2.0Mobile.svg'  :  './polygon2.0.png'}  alt='polygon'/>
            <div className={styles.cards} style={{opacity: isFormOpen ? 0 : 1, transition: 'opacity 0.3s ease-in-out'}}>
                {renderCards()}
            </div>
        </div>
    );
});

export default Polygon;