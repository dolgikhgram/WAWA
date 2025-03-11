import React from 'react';
import styles from './LevelUpCard.module.css';
import ProgressBar from './ProgressBar/ProgressBar.tsx';

interface LevelUpCardProps {
    title: string;
    description: string;
    totalSegments: number;
    filledSegments: number;
    pointsGained: number;
}

const LevelUpCard: React.FC<LevelUpCardProps> = React.memo(({
                                                     title,
                                                     description,
                                                     totalSegments,
                                                     filledSegments,
                                                     pointsGained,
                                                 }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.progressContainer}>
                <ProgressBar totalSegments={totalSegments} filledSegments={filledSegments} />
                <div className={styles.pointsGained}>+{pointsGained}</div>
            </div>
        </div>
    );
});

export default LevelUpCard;