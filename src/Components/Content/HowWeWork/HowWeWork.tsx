import React, { useState, useMemo } from 'react';
import styles from './HowWeWork.module.css';

type HowWeWorkPropsType = {
    id: string,
}

const numbers = ['01', '02', '03', '04']
const elementMap = {
    '01':{
        title:'Choose your game',
        description:'Select the game you want to boost from our list of available services.'
    },
    '02':{
        title:'Submit Your Information',
        description:'Fill out the form with your contact details, and feel free to ask any questions during the process.'
    },
    '03':{
        title:'Connect with Our Manager',
        description:'Our team will reach out to you to discuss the details and help you select the right booster for your needs.'
    },
    '04':{
        title:'Make the Payment',
        description:'Complete your payment, and relax while we take care of your account progress.'
    },
}

const HowWeWork: React.FC<HowWeWorkPropsType> = React.memo(({id}) => {
    const [selectedNumber, setSelectedNumber] = useState('01');
    const [isAnimating, setIsAnimating] = useState(false);

    const visibleNumbers = useMemo(() => {
        const currentIndex = numbers.indexOf(selectedNumber);
        const prevNumber = numbers[currentIndex - 1] || numbers[numbers.length - 1];
        const nextNumber = numbers[currentIndex + 1] || numbers[0];
        return [prevNumber, selectedNumber, nextNumber];
    }, [selectedNumber]);

    const handleNumberClick = (number: string) => {
        if (number === selectedNumber) return;
        
        setIsAnimating(true);
        setSelectedNumber(number);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        
        return () => clearTimeout(timer);
    };

    return (
        <div id={id}>
            <div className={styles.containerText}>
                <h2 className={styles.sectionTitle}>Main steps</h2>
                <div style={{display: 'flex', gap: '15px'}}>
                    <div className={styles.mainHeading}>How we</div>
                    <div className={styles.work}>work</div>
                </div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.GameBoostContainer}>
                    <div className={styles.content}>
                        <div className={styles.numberList}>
                            {visibleNumbers.map((number, index) => (
                                <div 
                                    key={number}  
                                    className={`${index === 1 ? styles.numberPrimary : styles.numberSecondary} ${styles.numberClickable}`}
                                    onClick={() => handleNumberClick(number)}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div className={styles.divider1}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div className={styles.divider2}/>
                        </div>
                        <div className={`${styles.textContent} ${isAnimating ? styles.fadeContent : ''}`}>
                            <div className={styles.heading}>{elementMap[selectedNumber as keyof typeof elementMap].title}</div>
                            <p className={styles.description}>
                                {elementMap[selectedNumber as keyof typeof elementMap].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HowWeWork;