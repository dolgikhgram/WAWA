import React from 'react';
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
    totalSegments: number;
    filledSegments: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ totalSegments, filledSegments }) => {
    return (
        <div className={styles.progressBar}>
            {[...Array(totalSegments)].map((_, index) => (
                <div
                    key={index}
                    className={`${styles.progressSegment} ${
                        index < filledSegments ? styles.filledSegment : styles.emptySegment
                    }`}
                />
            ))}
        </div>
    );
});

export default ProgressBar;