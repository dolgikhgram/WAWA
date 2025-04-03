import React, { useState, useEffect } from 'react';
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
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [visibleNumbers, setVisibleNumbers] = useState({
        top: '04',
        middle: '01',
        bottom: '02'
    });
    const [nextVisibleNumbers, setNextVisibleNumbers] = useState({
        top: '04',
        middle: '01',
        bottom: '02'
    });
    // Новые состояния для отслеживания нажатых цифр
    const [clickedTop, setClickedTop] = useState(false);
    const [clickedBottom, setClickedBottom] = useState(false);

    // Обновляем видимые числа при изменении выбранного числа
    useEffect(() => {
        if (!isAnimating) {
            // Находим индекс текущего выбранного числа в массиве
        const currentIndex = numbers.indexOf(selectedNumber);
            
            // Верхняя цифра - всегда предыдущая в массиве
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : numbers.length - 1;
            
            // Нижняя цифра - всегда следующая в массиве
            const nextIndex = (currentIndex + 1) % numbers.length;
            
            // Устанавливаем видимые цифры в правильном порядке
            setVisibleNumbers({
                top: numbers[prevIndex],
                middle: selectedNumber,
                bottom: numbers[nextIndex]
            });

            console.log('Обновлены видимые цифры:', numbers[prevIndex], selectedNumber, numbers[nextIndex]);
        }
    }, [selectedNumber, isAnimating]);

    // Отслеживаем завершение анимации и сбрасываем состояние
    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setVisibleNumbers(nextVisibleNumbers);
                setSelectedNumber(nextVisibleNumbers.middle);
                setScrollDirection(null);
                setIsAnimating(false);
            }, 800);  // Должно соответствовать длительности анимации
            
            return () => clearTimeout(timer);
        }
    }, [isAnimating, nextVisibleNumbers]);

    const handleNumberClick = (number: string) => {
        if (number === selectedNumber || isAnimating) return;

        // Определяем, какая цифра была нажата и устанавливаем соответствующий флаг
        if (number === visibleNumbers.top) {
            setClickedTop(true);
        } else if (number === visibleNumbers.bottom) {
            setClickedBottom(true);
        }

        // Определяем, какая цифра была нажата
        let direction: 'up' | 'down';
        
        // Выбранная цифра всегда становится центральной (активной)
        const newMiddleNumber = number;
            
        // Находим индекс выбранной цифры в массиве
        const selectedIndex = numbers.indexOf(newMiddleNumber);
            
        // Верхней всегда становится предыдущая цифра в массиве
        const newTopIndex = selectedIndex > 0 ? selectedIndex - 1 : numbers.length - 1;
        const newTopNumber = numbers[newTopIndex];
            
        // Нижней всегда становится следующая цифра в массиве
        const newBottomIndex = (selectedIndex + 1) % numbers.length;
        const newBottomNumber = numbers[newBottomIndex];

        // Определяем направление анимации в зависимости от того, какая цифра была нажата
        if (number === visibleNumbers.bottom) {
            direction = 'up';
            console.log('Нажата нижняя цифра, направление:', direction);
        } else if (number === visibleNumbers.top) {
            direction = 'down';
            console.log('Нажата верхняя цифра, направление:', direction);
        } else {
            // Нажата какая-то другая цифра (не должно происходить в текущей реализации)
            return;
        }

        // Подготавливаем новые значения для следующего набора чисел
        setNextVisibleNumbers({
            top: newTopNumber,
            middle: newMiddleNumber,
            bottom: newBottomNumber
        });
        
        // Устанавливаем направление скролла сразу перед активацией анимации
        setScrollDirection(direction);
        // Включаем анимацию 
        setIsAnimating(true);
        
        console.log('Установлено направление:', direction);
        console.log('Новые цифры:', newTopNumber, newMiddleNumber, newBottomNumber);
    };

    // Сбрасываем состояния нажатых цифр после завершения анимации
    useEffect(() => {
        if (!isAnimating) {
            setClickedTop(false);
            setClickedBottom(false);
        }
    }, [isAnimating]);

    return (
        <div id={id} className={styles.allContainers} >
            <div className={styles.containerText}>
                <div className={styles.sectionTitle}>MAIN STEPS</div>
                <div style={{display: 'flex', gap: '15px'}}>
                    <div className={styles.mainHeading}>How we</div>
                    <div className={styles.work}>work</div>
                </div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.GameBoostContainer}>
                    <div className={styles.content}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '280px'}}>
                            <div className={styles.carouselContainer} style={{height: '380px', width: '150px'}}>
                                <div className={styles.carousel}>
                                    {/* Текущий набор чисел */}
                                    <div 
                                        className={`
                                            ${styles.carouselSlide} 
                                            ${styles.active}
                                            ${scrollDirection === 'up' ? styles.slideOutUp : ''} 
                                            ${scrollDirection === 'down' ? styles.slideOutDown : ''} 
                                        `}
                                    >
                                        <div 
                                            className={`${styles.numberSecondary} ${styles.numberClickable} ${clickedTop ? styles.clicked : ''}`} 
                                            onClick={() => handleNumberClick(visibleNumbers.top)}
                                            style={{
                                                fontSize: '45px', 
                                                marginBottom: '20px',
                                                visibility: isAnimating ? 'hidden' : 'visible' // Скрываем при анимации
                                            }}
                                        >
                                            {visibleNumbers.top}
                                        </div>
                                        <div 
                                            className={`${styles.numberPrimary}`} 
                                            style={{fontSize: '80px', margin: '20px 0'}}
                                        >
                                            {visibleNumbers.middle}
                                        </div>
                                        <div 
                                            className={`${styles.numberSecondary} ${styles.numberClickable} ${clickedBottom ? styles.clicked : ''}`} 
                                            onClick={() => handleNumberClick(visibleNumbers.bottom)}
                                            style={{
                                                fontSize: '45px', 
                                                marginTop: '20px',
                                                visibility: isAnimating ? 'hidden' : 'visible' // Скрываем при анимации
                                            }}
                                        >
                                            {visibleNumbers.bottom}
                                        </div>
                                    </div>
                                    
                                    {/* Следующий набор чисел - всегда в DOM, но скрыт когда нет анимации */}
                                    <div 
                                        className={`
                                            ${styles.carouselSlide} 
                                            ${isAnimating ? styles.inactive : styles.hidden}
                                            ${scrollDirection === 'up' ? styles.slideInUp : ''} 
                                            ${scrollDirection === 'down' ? styles.slideInDown : ''} 
                                        `}
                                    >
                                        <div 
                                            className={`${styles.numberSecondary}`} 
                                            style={{
                                                fontSize: '45px', 
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {nextVisibleNumbers.top}
                                        </div>
                                        <div 
                                            className={`${styles.numberPrimary}`} 
                                            style={{fontSize: '80px', margin: '20px 0'}}
                                        >
                                            {nextVisibleNumbers.middle}
                                        </div>
                                        <div 
                                            className={`${styles.numberSecondary}`} 
                                            style={{
                                                fontSize: '45px', 
                                                marginTop: '20px'
                                            }}
                                        >
                                            {nextVisibleNumbers.bottom}
                                        </div>
                                    </div>
                                </div>
                            </div>
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