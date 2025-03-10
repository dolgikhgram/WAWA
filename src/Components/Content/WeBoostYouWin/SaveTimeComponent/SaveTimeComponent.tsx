import React from 'react';
import styles from './SaveTimeComponent.module.css';

interface DescriptionParagraphProps {
    text: string;
}

const DescriptionParagraph: React.FC<DescriptionParagraphProps> = ({ text }) => (
    <p className={styles.descriptionParagraph}>{text}</p>
);

const SaveTimeComponent: React.FC = () => {
    const descriptionParagraphs = [
        "Game boosting is a smart solution for players who want to focus on the fun and exciting parts of their favorite games. Instead of spending weeks on repetitive tasks, let us handle the hard work so you can enjoy the rewards",
        "Trusted by thousands of gamers worldwide, boosting is the easiest way to level up quickly and make the most of your gaming time"
    ];

    return (
        <div >
            <div className={styles.container}>
                <div className={styles.heading}>
                    <div className={styles.text}>Save your time and focus on what really matters – enjoying the game</div>
                    <div className={styles.containerImg}>
                        <img className={styles.img} src='Frame%20250.png' alt='frame 250.png'/>
                        <img className={styles.maskImg} src='Mask%20group.png' alt='mask group'/>
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.description}>
                        {descriptionParagraphs.map((paragraph, index) => (
                            <DescriptionParagraph key={index} text={paragraph}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveTimeComponent;