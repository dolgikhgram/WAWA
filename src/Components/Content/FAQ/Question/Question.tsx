import React, { useState } from 'react';
import styles from './Question.module.css';

type QuestionPropsType = {
    title: string
    answer: string
}

const Question: React.FC<QuestionPropsType> = React.memo(({ title, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className={styles.FAQ} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.title}>{title}</div>
                <button
                    className={styles.btn}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <img
                        src='./VectorUpwards.png'
                        alt='vector'
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                    />
                </button>
            </div>
            {isOpen && (
                <div className={styles.answer}>
                    {answer}
                </div>
            )}
        </div>
    );
});

export default Question;