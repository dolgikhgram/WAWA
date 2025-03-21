import React, {useCallback, useState} from 'react';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Reviews.module.css';
import '../../../index.css'
import ReviewsBox from "./ReviewsBox/ReviewsBox.tsx";

type ReviewsPropsType = {
    id: string;
    showFormHandler:() => void;
}

const reviewsData = [
    {
        game: {
            title: 'Destiny 2',
            duration: '2 weeks',
            image: './imageDestiny2.png'
        },
        user: {
            name: 'PrillX',
            status: 'Social',
            avatar: './PrillX.png',
        },
        review: {
            text: '“Wanted to unlock the full Root of Nightmares armor set for my Titan, but raid RNG is brutal. These guys ran the raid weekly until I had the full set! Now my character looks incredible, and I’m ready for endgame content!”',
            type: 'BOOSTING',
            date: '20.02.2025'
        }
    },
    {
        game: {
            title: 'Destiny 2',
            duration: '1 days',
            image: './imageDestiny2.png'
        },
        user: {
            name: 'KDKing',
            status: 'Pro',
            avatar: './KDKing.png'
        },
        review: {
            text: "“I was stuck trying to complete the Root of Nightmares raid on Master difficulty. These guys carried me through it like it was nothing! I got my Collective Obligation exotic and a full set of Adept weapons. 100% worth it!”",
            type: 'BOOSTING',
            date: '02.02.2025'
        }
    },
    {
        game: {
            title: 'Destiny 2',
            duration: '2 days',
            image: './imageDestiny2.png'
        },
        user: {
            name: 'RankRush',
            status: 'Social',
            avatar: './RankRush.png',
        },
        review: {
            text: '“Grinding Trials of Osiris was pure pain, so I ordered a flawless boost. In just one evening, they secured my 7-0 flawless card, got me the Astral Horizon shotgun with perfect perks, and even farmed some extra Ascendant Shards. Insane work!”',
            type: 'BOOSTING',
            date: '17.03.2025'
        }
    },
    {
        game: {
            title: 'CoD BO6',
            duration: '2 days',
            image: './CoDBO6.png'
        },
        user: {
            name: 'XPPhantom',
            status: 'Social',
            avatar: './XPPhantom.png',
        },
        review: {
            text: '“The Dark Matter Ultra camo grind was way too much for me, so I let the pros handle it. They completed all weapon challenges, even the longshots and launcher kills, in record time. Now my guns look insane!”',
            type: 'BOOSTING',
            date: '12.02.2025'
        }
    },
    {
        game: {
            title: 'CoD BO6',
            duration: '2 days',
            image: './CoDBO6.png'
        },
        user: {
            name: 'XPPhantom',
            status: 'Social',
            avatar: './XPPhantom.png',
        },
        review: {
            text: '“The Dark Matter Ultra camo grind was way too much for me, so I let the pros handle it. They completed all weapon challenges, even the longshots and launcher kills, in record time. Now my guns look insane!”',
            type: 'BOOSTING',
            date: '15.03.2025'
        }
    },
    {
        game: {
            title: 'CoD MW2',
            duration: '2 days',
            image: './CoDMW2.png'
        },
        user: {
            name: 'ForeDrendis',
            status: 'Social',
            avatar: './ForeDrendis.png',
        },
        review: {
            text: '“I really wanted the Orion camo but didn’t have the patience to grind longshots and hipfire kills. These guys finished it in just a few days, and now every gun in my loadout looks legendary. Worth every penny!”',
            type: 'BOOSTING',
            date: '11.01.2025'
        }
    },
    {
        game: {
            title: 'CoD MW2',
            duration: '3 days',
            image: './CoDMW2.png'
        },
        user: {
            name: 'IMalefik',
            status: 'Social',
            avatar: './IMalefik.png',
        },
        review: {
            text: '“Ranked Play was a nightmare solo, so I ordered a boost. They took me from Silver 2 to Crimson in no time, and I even got the special rewards for reaching that rank. Now I can flex on my friends!”',
            type: 'BOOSTING',
            date: '16.03.2025'
        }
    },

];

const Reviews: React.FC<ReviewsPropsType> = React.memo(({id,showFormHandler}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'slideLeft' | 'slideRight' | ''>('');

    const handlePrevClick = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSlideDirection('slideRight');

        setTimeout(() => {
            setCurrentIndex(prevIndex =>
                prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
            );
            setSlideDirection('');
            setIsAnimating(false);
        }, 800);
    },[]);

    const handleNextClick = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSlideDirection('slideLeft');

        setTimeout(() => {
            setCurrentIndex(prevIndex =>
                prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
            );
            setSlideDirection('');
            setIsAnimating(false);
        }, 800);
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
                <div className={`${styles.reviewsWrapper} ${styles[slideDirection]}`}>
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
                    disabled={isAnimating}
                >
                    <img src='./ArrowBtn.png' alt="arrow"/>
                </button>
                <button
                    className={styles.btn}
                    onClick={handleNextClick}
                    disabled={isAnimating}
                >
                    <img src='./ArrowBtnR.png' alt="arrow"/>
                </button>
            </div>
        </div>
    );
});

export default Reviews;