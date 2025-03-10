import React, {useCallback, useEffect, useState} from 'react';
import styles from './GameList.module.css';
import MainImg from "./MainImg/MainImg.tsx";
import Button from "../../Button/Button.tsx";
import PerkPower from "./PerkPower/PerkPower.tsx";
import GameSelection from "./GameSelection/GameSelection.tsx";
import ScrollableContainer from "./ScrollableContainer/ScrollableContainer.tsx";

type GameListPropsType = {
    id: string,
    showFormHandler: ()=> void
};

type ImageMap = {
    [key: number]: string;
};

type TitleMap = {
    [key: number]: string;
};

type PerkPowerItem = {
    title: string;
    description: string;
};

type PerkPowerMap = {
    [key: number]: PerkPowerItem;
};

const GameList: React.FC<GameListPropsType> = ({id, showFormHandler}) => {
    const [currentCard, setCurrentCard] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log(screenWidth);
    const mainImgMap: ImageMap = {
        0: '../../../../public/BlackOps6Back.png',
        1: '../../../../public/CoDMW2.png',
        2: '../../../../public/WarzoneBack.png',
        3: '../../../../public/BlackOps6Back.png',
        4: '../../../../public/CoDMW3Back.png',
        5: '../../../../public/SP2Back.png',
        6: '../../../../public/BlackOPS6ZombiesBack.png'
    }
    const mainImgMobileMap: ImageMap = {
        0: '../../../../public/Destiny2BackMobile.png',
        1: '../../../../public/CoDMW2Mobile.png',
        2: '../../../../public/WarzoneBackMobile.png',
        3: '../../../../public/BlackOps6BackMobile.png',
        4: '../../../../public/CoDMW3BackMobile.png',
        5: '../../../../public/SP2BackMobile.png',
        6: '../../../../public/BlackOPS6ZombiesBackMobile.png'
    }
    const soldierMap: ImageMap = {
        0:'../../../../public/DestinySoldier.png',
        1:'../../../../public/CoDMW2Soldier.png',
        2:'../../../../public/WarzoneSoldier.png',
        3:'../../../../public/BlackOps6Soldier.png',
        4:'../../../../public/CoDMW3Soldier.png',
        5:'../../../../public/SMSoldier.png',
        6:'../../../../public/BO6ZombiesSoldier.png'
    }
    const mainTitleMap: TitleMap = {
        0:'Destiny 2',
        1:'CoD MW2',
        2:'WARZONE',
        3:'BLACK OPS 6',
        4:'CoD MW 3',
        5:'SPACE MARINE 2',
        6:'ZOMBIES'
    }
    const titleMap: TitleMap = {
        0:'',
        1:'',
        2:'',
        3:'',
        4:'',
        5:'WARHAMMER',
        6:'BLACK OPS 6'
    }
    const descriptionMap: TitleMap = {
        0:'Boosting in Destiny 2 includes completing raids, dungeons, PvP activities (such as Trials of Osiris and Crucible), Nightfalls, power level upgrades, seasonal content, exotic quests, and triumphs.',
        1:'Boosting in Call of Duty: Modern Warfare 2 includes leveling up your rank, unlocking weapons and attachments, completing camo challenges, earning killstreaks, progressing through Spec Ops missions, and dominating multiplayer matches.',
        2:'Boosting in Call of Duty: Warzone includes increasing your K/D ratio, leveling up weapons, completing battle pass tiers, earning wins, unlocking skins and camos, and completing challenges to dominate the battlefield effortlessly.',
        3:'Boosting in Call of Duty: Black Ops 6 includes ranking up your level, unlocking weapons and attachments, completing camo challenges, earning achievements, progressing through the battle pass, and dominating in multiplayer and zombie modes.',
        4:'Boosting in Call of Duty: Modern Warfare 3 includes ranking up, unlocking weapons and perks, completing camo challenges, earning killstreaks, progressing through Spec Ops missions, and dominating multiplayer modes.',
        5:'Boosting in Warhammer 40,000: Space Marine 2 includes leveling up your character, unlocking weapons and abilities, completing campaign missions, mastering multiplayer combat, and earning achievements to enhance your gameplay experience efficiently.',
        6:'Boosting in Call of Duty: Black Ops 6 Zombies includes leveling up, unlocking powerful weapons and perks, completing missions, surviving endless waves of undead, and mastering the latest maps.'
    }
    const perkPowerMap1: PerkPowerMap = {
        0:{
            title:'LIGHT POWER',
            description:'Level up and face the darkness'
        },
        1:{
            title:'VETERAN INSTINCTS',
            description:'Only the strongest make it out alive'
        },
        2:{
            title:'GULAG DOMINANCE',
            description:'Win your fight and redeploy'
        },
        3:{
            title:'TRAINING',
            description:'You ready for the next mission'
        },
        4:{
            title:'OPERATOR RANK',
            description:'Rank up and take command on the battlefield'
        },
        5:{
            title:'EMPEROR WRATH',
            description:'Purge the heretics, crush the xenos – for the Imperium'
        },
        6:{
            title:'PERK POWER',
            description:'stronger'
        }
    }
    const perkPowerMap2: PerkPowerMap = {
        0:{
            title:'GUARDIAN STRENGTH',
            description:'Upgrade your gear and become legend'
        },
        1:{
            title:'KILLSTREAK',
            description:'You\'re one step closer to that nuke'
        },
        2:{
            title:'LOADOUT EFFICIENCY',
            description:'Drop in fully geared and ready to take the win'
        },
        3:{
            title:'EXECUTION',
            description:'Your skills aren\'t. Get in, get out, stay alive'
        },
        4:{
            title:'SUPREMACY',
            description:'Overcome. Dominate. Your mission never ends'
        },
        5:{
            title:'ASTARTES MIGHT',
            description:'A Space Marine knows no fear. Strengthen your resolve'
        },
        6:{
            title:'UNDEAD SURVIVAL',
            description:'The horde is endless, but so is your will to fight'
        }
    }
    const currentCardHandler = useCallback((index:number) => {
        if (index<6)setCurrentCard(index+1)
        else setCurrentCard(0)
    },[])
    return (
        <div id={id} className={styles.variants}>
            {/*<img src='../../../../public/BlackOps6Back.png'/>*/}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <GameSelection/>
            </div>
            <div className={styles.container}>
                <MainImg mainImg={
                    screenWidth < 768
                        ? mainImgMobileMap[currentCard]
                        : mainImgMap[currentCard]
                }
                         soldierImg={soldierMap[currentCard]} currentCard={currentCard} />
                <div className={styles.titleContainer}>
                    <div className={styles.mainTitleContainer}>
                        <div className={styles.title}>
                            <div className={styles.mainTitle}>{titleMap[currentCard]}</div>
                            <div className={styles.secondaryTitle}>{mainTitleMap[currentCard]}</div>
                        </div>
                        <div className={styles.btn}>
                            <Button size={'small'} color={'secondary'} showFormHandler={showFormHandler}>Order boosting</Button>
                        </div>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={styles.description}>{descriptionMap[currentCard]}</div>
                    </div>
                    <div className={styles.perkPowerContainer}>
                        <div className={styles.perkPower}>
                            <PerkPower
                                title={perkPowerMap1[currentCard].title}
                                description={perkPowerMap1[currentCard].description}
                                powerValue={200}
                                segments={13}
                            />
                        </div>
                        <div className={styles.perkPower}>
                            <PerkPower
                                title={perkPowerMap2[currentCard].title}
                                description={perkPowerMap2[currentCard].description}
                                powerValue={200}
                                segments={13}
                            />
                        </div>
                    </div>
                    <ScrollableContainer currentCardHandler={currentCardHandler}/>
                </div>
            </div>
        </div>
    );
};

export default GameList;