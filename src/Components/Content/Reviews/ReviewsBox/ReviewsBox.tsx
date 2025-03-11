import React from 'react';
import styles from './ReviewsBox.module.css';

type ReviewsBoxProps = {
    review: {
        game: {
            title: string;
            duration: string;
            image: string;
        };
        user: {
            name: string;
            status: string;
            avatar: string;
        };
        review: {
            text: string;
            type: string;
            date: string;
        };
    };
};

const ReviewsBox: React.FC<ReviewsBoxProps> = React.memo(({review}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.gamesContainer}>
                    <img src={review.game.image} alt="game" className={styles.img}/>
                    <div className={styles.textContainer}>
                        <div className={styles.mainTitle}>{review.game.title}</div>
                        <div className={styles.title}>{review.game.duration}</div>
                    </div>
                </div>
                <div className={styles.usersAccContainer}>
                    <img src={review.user.avatar} alt="avatar" className={styles.usersAvatar}/>
                    <div className={styles.usersInfo}>
                        <div className={styles.userName}>{review.user.name}</div>
                        <div className={styles.userStatus}>{review.user.status}</div>
                    </div>
                </div>
                <div className={styles.reviewContainer}>
                    <div className={styles.review}>
                        <div className={styles.reviewMainTitle}>{review.review.text}</div>
                        <div className={styles.line}></div>
                        <div className={styles.btnDataContainer}>
                            <div className={styles.btn}>
                                <div className={styles.btnText}>{review.review.type}</div>
                            </div>
                            <div className={styles.data}>{review.review.date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ReviewsBox;