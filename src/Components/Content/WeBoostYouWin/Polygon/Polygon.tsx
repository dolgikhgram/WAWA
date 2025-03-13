import styles from "./Polygon.module.css";
import LevelUpCard from "./Card/LevelUpCard.tsx";
import React, { useState, useEffect } from 'react';

interface PolygonPropsType {
    isFormOpen: boolean;
}

const Polygon: React.FC<PolygonPropsType> = React.memo(({ isFormOpen }) => {
    const cardData = [
        {
            title: "XP BOOST",
            description: "Faster progress, bigger rewards. Level up now",
            totalSegments: 13,
            filledSegments: 7,
            pointsGained: 100
        },
        {
            title: "LIGHT OF POWER",
            description: "Your strength grows! Level up and become a true Guardian",
            totalSegments: 13,
            filledSegments: 11,
            pointsGained: 200
        },
        {
            title: "PESTIGE",
            description: "Rise above the rest. Prove your dominance on the battlefield",
            totalSegments: 13,
            filledSegments: 11,
            pointsGained: 120
        }
    ];

    const [currentOrder, setCurrentOrder] = useState([0, 1, 2]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
        const interval = setInterval(() => {
            setCurrentOrder(prevOrder => {
                const newOrder = [...prevOrder];
                const last = newOrder.pop();
                if (last !== undefined) {
                    newOrder.unshift(last);
                }
                return newOrder;
            });
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.unionContainer}>
            {

            }
            <img className={styles.polygon} src={screenWidth < 768 ? './polygon2.0Mobile.png'  :  './polygon2.0.png'}  alt='polygon'/>
            <div className={styles.cards} style={{opacity: isFormOpen ? 0 : 1, transition: 'opacity 0.3s ease-in-out'}}>
                {currentOrder.map((index, position) => (
                    <div
                        key={index}
                        className={styles[`card${position + 1}`]}
                    >
                        <LevelUpCard
                            title={cardData[index].title}
                            description={cardData[index].description}
                            totalSegments={cardData[index].totalSegments}
                            filledSegments={cardData[index].filledSegments}
                            pointsGained={cardData[index].pointsGained}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Polygon;