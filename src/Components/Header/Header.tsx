import styles from './Header.module.css'
import Button from "../Button/Button";
import React  from "react";

type HeaderPropsType = {
    showFormHandler: ()=>void;
    showMenuHandler: ()=> void;
}

const Header: React.FC<HeaderPropsType> =React.memo(({showFormHandler, showMenuHandler}) => {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className={styles.container}>
            <img className={styles.wawa} src='./WAWA.png' alt='WAWA' />
            <div className={styles.frame}>
                <a href={'#GameList'} className={styles.landing} onClick={(e) => scrollToSection(e, 'GameList')}>Game list</a>
                <a href={'#HowWeWork'} className={styles.landing} onClick={(e) => scrollToSection(e, 'HowWeWork')}>How we work</a>
                <a href={'#WhyWe'} className={styles.landing} onClick={(e) => scrollToSection(e, 'WhyWe')}>Why we</a>
                <a href={'#Reviews'} className={styles.landingSecond} onClick={(e) => scrollToSection(e, 'Reviews')}>Reviews</a>
                <a href={'#FAQ'} className={styles.landingSecond} onClick={(e) => scrollToSection(e, 'FAQ')}>FAQ</a>
            </div>
            <div className={styles.btnBoostYourGame}>
                <Button size={'small'} showFormHandler={showFormHandler} >
                    Boost your game
                </Button>
            </div>
                <button className={styles.menu} onClick={()=> showMenuHandler()}>
                    <img src='./menuBtn.png' alt='menuBtn' />
                </button>
        </div>
    );
});

export default Header;