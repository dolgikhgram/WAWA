import React, {useCallback, useState} from 'react';
import styles from './Reviews.module.css';
import ReviewsBox from "./ReviewsBox/ReviewsBox.tsx";

type ReviewsPropsType = {
    id: string;
    showFormHandler:() => void;
}

const reviewsData = [
    {
        game: {
            title: 'Destiny 2',
            duration: '2 days 4 weeks',
            image: './imageDestiny2.png'
        },
        user: {
            name: 'PrillX',
            status: 'Social',
            avatar: './usersAvatar.png'
        },
        review: {
            text: '"Excellent service and great experience! The team was professional, friendly, and went above and beyond to ensure everything was perfect. Highly recommend!"',
            type: 'BOOSTING',
            date: '02.02.2024'
        }
    },
    {
        game: {
            title: 'Destiny 2',
            duration: '3 days 2 weeks',
            image: './imageDestiny2.png'
        },
        user: {
            name: 'Alex',
            status: 'Pro',
            avatar: './usersAvatar.png'
        },
        review: {
            text: '"Amazing experience with the team! They were very professional and completed everything faster than expected. Would definitely use their services again!"',
            type: 'BOOSTING',
            date: '01.02.2024'
        }
    },
    {
        game: {
            title: 'Destiny 2',
            duration: '1 week',
            image: './imageDestiny2.png'
        },
        user: {
            name: 'Sarah',
            status: 'Elite',
            avatar: './usersAvatar.png'
        },
        review: {
            text: '"Outstanding service! The team was incredibly skilled and efficient. They made the whole process smooth and enjoyable. Highly recommended!"',
            type: 'BOOSTING',
            date: '31.01.2024'
        }
    }
];

const Reviews: React.FC<ReviewsPropsType> = React.memo(({id,showFormHandler}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = useCallback(() => {
        setCurrentIndex(prevIndex => 
            prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
        );
    },[]);

    const handleNextClick = useCallback(() => {
        setCurrentIndex(prevIndex => 
            prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
        );
    },[]);

    return (
        <div id={id}>
            <div>
                <div className={styles.container}>
                    <div className={styles.starsContainer}>
                        <img src='./Average.png' className={styles.starRow} alt="star"/>
                        <div className={styles.ratingText}>5.0 Average</div>
                        <div className={styles.reviewsCount}>1000 reviews</div>
                    </div>
                    <div className={styles.title}>Reviews</div>
                    <div style={{display: "flex", gap: "1rem"}}>
                        <div className={styles.reviews}>Reviews</div>
                        <div className={styles.heading}>that speak</div>
                    </div>
                </div>
            </div>
            <div className={styles.reviewsContainer}>
                <div className={styles.reviewsWrapper}>
                    <ReviewsBox review={reviewsData[currentIndex]} showFormHandler={showFormHandler}/>
                    <ReviewsBox review={reviewsData[(currentIndex + 1) % reviewsData.length]} showFormHandler={showFormHandler}/>
                    <ReviewsBox review={reviewsData[(currentIndex + 2) % reviewsData.length]} showFormHandler={showFormHandler}/>
                </div>
                <div className={styles.btnTabletContainer} onClick={handleNextClick}>
                    <img className={styles.btnTablet} src='./BtnTablet.png' alt="next"/>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button
                    className={styles.btn}
                    onClick={handlePrevClick}
                >
                    <img src='./ArrowBtn.png' alt="arrow"/>
                </button>
                <button
                    className={styles.btn}
                    onClick={handleNextClick}
                >
                    <img src='./ArrowBtnR.png' alt="arrow"/>
                </button>
            </div>
        </div>
    );
});

export default Reviews;