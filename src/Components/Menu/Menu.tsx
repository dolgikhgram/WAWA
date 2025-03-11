import styles from './Menu.module.css'
import React from "react";
import Button from "../Button/Button.tsx";

type MenuPropsType = {
    showFormHandler: ()=>void;
    closeMenuHandler: ()=>void;
}


const Menu : React.FC<MenuPropsType> = React.memo(({showFormHandler, closeMenuHandler}) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.cross} onClick={()=>closeMenuHandler()}>
                    <img src='../../../public/Крестик.png'/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.frame}>
                    <a href={'#GameList'} className={styles.landing} onClick={()=> closeMenuHandler()}>Game list</a>
                    <a href={'#HowWeWork'} className={styles.landing} onClick={()=> closeMenuHandler()}>How we work</a>
                    <a href={'#WhyWe'} className={styles.landing} onClick={()=> closeMenuHandler()}>Why we</a>
                    <a href={'#Reviews'} className={styles.landing} onClick={()=> closeMenuHandler()}>Reviews</a>
                    <a href={'#FAQ'} className={styles.landing} onClick={()=> closeMenuHandler()}>FAQ</a>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.btn} onClick={()=>closeMenuHandler()}>
                    <Button size="large" color={'primary'} showFormHandler={showFormHandler}>
                        Boost your game
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default Menu;