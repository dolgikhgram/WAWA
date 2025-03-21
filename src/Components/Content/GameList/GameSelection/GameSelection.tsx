import React from 'react';
import styles from './GameSelection.module.css';

const GameSelection: React.FC = React.memo(() => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.sectionTitle}>OUR GAMES</div>
                <div className={styles.titleContainer}>
                    <div className={styles.choose}>Choose</div>
                    <div className={styles.mainHeading}>your game</div>
                </div>
            </div>
        </>
    );
});

export default GameSelection;