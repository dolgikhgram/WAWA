import React from 'react';
import styles from './PerkPower.module.css';

interface PerkPowerProps {
    title: string;
    description: string;
    powerValue: number;
    segments: number;
}

const PerkPower: React.FC<PerkPowerProps> = React.memo(({ title, description, powerValue, segments }) => {
    return (
        <div>
            <div className={styles.line}></div>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.description}>{description}</div>
                </div>
                <div className={styles.powerContainer}>
                    <div className={styles.powerBarContainer}>
                        {[...Array(segments)].map((_, index) => (
                            <div key={index} className={styles.powerBarSegment}/>
                        ))}
                    </div>
                    <div className={styles.powerValue}>+{powerValue}</div>
                </div>
            </div>
        </div>

    );
});

export default PerkPower;