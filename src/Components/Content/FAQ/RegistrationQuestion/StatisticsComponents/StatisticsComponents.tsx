// import React from 'react';

import styles from "./StatisticsComponents.module.css";

const StatisticsComponents = () => {
    return (
        <div className={styles.container}>
            <img className={styles.img} src='../../../../../../public/UsersStatistics.png' alt='Users Statistics'/>
            <img className={styles.lines} src='../../../../../../public/Line7Black.png' alt='Line 7Black'/>
            <div className={styles.vector}/>
            <div className={styles.mainTitle}>Over 1,000 people</div>
            <div className={styles.title}> have already joined us</div>
        </div>
    );
};

export default StatisticsComponents;