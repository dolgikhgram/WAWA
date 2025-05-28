import React, {useCallback, useEffect, useState, useMemo, useRef, lazy, Suspense} from 'react';
import styles from './GameList.module.css';
import Button from "../../Button/Button.tsx";
// Используем lazy loading для компонентов, которые не нужны сразу
const MainImg = lazy(() => import("./MainImg/MainImg.tsx"));
const PerkPower = lazy(() => import("./PerkPower/PerkPower.tsx"));
const GameSelection = lazy(() => import("./GameSelection/GameSelection.tsx"));
const ScrollableContainer = lazy(() => import("./ScrollableContainer/ScrollableContainer.tsx"));

// Fallback компонент для Suspense
const LoadingFallback = () => <div className={styles.loading}>Loading...</div>;

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

// Move all static data outside the component to prevent recreation on each render
    const mainImgMap: ImageMap = {
        0: './Destiny2Back.png',
        1: './CoDMW2.png',
        2: './WarzoneBack.png',
        3: './BlackOps6Back.png',
        4: './CoDMW3Back.png',
        5: './SP2Back.png',
        6: './BlackOPS6ZombiesBack.png'
};

    const mainImgMobileMap: ImageMap = {
        0: './Destiny2BackMobile.png',
        1: './CoDMW2Mobile.png',
        2: './WarzoneBackMobile.png',
        3: './BlackOps6BackMobile.png',
        4: './CoDMW3BackMobile.png',
        5: './SP2BackMobile.png',
        6: './BlackOPS6ZombiesBackMobile.png.png'
};

    const soldierMap: ImageMap = {
        0:'./DestinySoldier.png',
        1:'./CoDMW2Soldier.png',
        2:'./WarzoneSoldier.png',
        3:'./BlackOps6Soldier.png',
        4:'./CoDMW3Soldier.png',
        5:'./SMSoldier.png',
        6:'./BO6ZombiesSoldier.png'
};

    const mainTitleMap: TitleMap = {
        0:'Destiny 2',
        1:'CoD MW2',
        2:'WARZONE',
        3:'BLACK OPS 6',
        4:'CoD MW 3',
        5:'SPACE MARINE 2',
        6:'ZOMBIES'
};

    const titleMap: TitleMap = {
        0:'',
        1:'',
        2:'',
        3:'',
        4:'',
        5:'WARHAMMER',
        6:'BLACK OPS 6'
};

    const descriptionMap: TitleMap = {
        0:'Boosting in Destiny 2 includes completing raids, dungeons, PvP activities (such as Trials of Osiris and Crucible), Nightfalls, power level upgrades, seasonal content, exotic quests, and triumphs.',
        1:'Boosting in Call of Duty: Modern Warfare 2 includes leveling up your rank, unlocking weapons and attachments, completing camo challenges, earning killstreaks, progressing through Spec Ops missions, and dominating multiplayer matches.',
        2:'Boosting in Call of Duty: Warzone includes increasing your K/D ratio, leveling up weapons, completing battle pass tiers, earning wins, unlocking skins and camos, and completing challenges to dominate the battlefield effortlessly.',
        3:'Boosting in Call of Duty: Black Ops 6 includes ranking up your level, unlocking weapons and attachments, completing camo challenges, earning achievements, progressing through the battle pass, and dominating in multiplayer and zombie modes.',
        4:'Boosting in Call of Duty: Modern Warfare 3 includes ranking up, unlocking weapons and perks, completing camo challenges, earning killstreaks, progressing through Spec Ops missions, and dominating multiplayer modes.',
        5:'Boosting in Warhammer 40,000: Space Marine 2 includes leveling up your character, unlocking weapons and abilities, completing campaign missions, mastering multiplayer combat, and earning achievements to enhance your gameplay experience efficiently.',
        6:'Boosting in Call of Duty: Black Ops 6 Zombies includes leveling up, unlocking powerful weapons and perks, completing missions, surviving endless waves of undead, and mastering the latest maps.'
};

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
};

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
};

// Создаем контекст для данных игр, чтобы избежать prop drilling
const GameDataContext = React.createContext<{
    currentCard: number;
    mainTitle: string;
    secondaryTitle: string;
    description: string;
    perkPower1: PerkPowerItem;
    perkPower2: PerkPowerItem;
} | null>(null);

const GameList: React.FC<GameListPropsType> = React.memo(({id, showFormHandler}) => {
    const [currentCard, setCurrentCard] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imagesPreloaded, setImagesPreloaded] = useState<{[key: number]: boolean}>({});
    // Изменяем тип с number на NodeJS.Timeout
    const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Предзагрузка изображений для более плавных переходов
    useEffect(() => {
        // Предзагружаем текущую и следующую карточки
        const nextCard = currentCard < 6 ? currentCard + 1 : 0;
        const cardsToPreload = [nextCard];
        
        cardsToPreload.forEach(cardIndex => {
            if (!imagesPreloaded[cardIndex]) {
                const mainImg = new Image();
                const soldierImg = new Image();
                const isMobile = screenWidth < 768;
                
                mainImg.src = isMobile ? mainImgMobileMap[cardIndex] : mainImgMap[cardIndex];
                soldierImg.src = soldierMap[cardIndex];
                
                Promise.all([
                    new Promise(resolve => { mainImg.onload = resolve; }),
                    new Promise(resolve => { soldierImg.onload = resolve; })
                ]).then(() => {
                    setImagesPreloaded(prev => ({...prev, [cardIndex]: true}));
                });
            }
        });
    }, [currentCard, screenWidth, imagesPreloaded]);

    // Оптимизированный обработчик изменения размера окна с debounce
    useEffect(() => {
        // Изменяем тип с number на NodeJS.Timeout
        let debounceTimeout: NodeJS.Timeout;
        
        const handleResize = () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                setScreenWidth(window.innerWidth);
            }, 100); // Debounce 100ms
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(debounceTimeout);
        };
    }, []);

    // Очистка таймаутов при размонтировании компонента
    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
            if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        };
    }, []);

    // Оптимизированный обработчик смены карточки с плавным переходом
    const currentCardHandler = useCallback((index: number) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        // Вместо того, чтобы изменять выбранный индекс, мы напрямую устанавливаем его
        setCurrentCard(index);
        
        // Устанавливаем таймаут только для сброса состояния перехода
        resetTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    }, [isTransitioning]);

    // Мемоизируем пути к изображениям
    const currentMainImg = useMemo(() => {
        return screenWidth < 768 ? mainImgMobileMap[currentCard] : mainImgMap[currentCard];
    }, [currentCard, screenWidth]);

    const currentSoldierImg = useMemo(() => soldierMap[currentCard], [currentCard]);
    
    // Мемоизируем данные текущей карточки для контекста
    const gameData = useMemo(() => ({
        currentCard,
        mainTitle: titleMap[currentCard],
        secondaryTitle: mainTitleMap[currentCard],
        description: descriptionMap[currentCard],
        perkPower1: perkPowerMap1[currentCard],
        perkPower2: perkPowerMap2[currentCard]
    }), [currentCard]);

    // Мемоизируем компоненты PerkPower
    const perkPower1 = useMemo(() => (
        <PerkPower
            title={perkPowerMap1[currentCard].title}
            description={perkPowerMap1[currentCard].description}
            powerValue={200}
            segments={13}
        />
    ), [currentCard]);

    const perkPower2 = useMemo(() => (
        <PerkPower
            title={perkPowerMap2[currentCard].title}
            description={perkPowerMap2[currentCard].description}
            powerValue={200}
            segments={13}
        />
    ), [currentCard]);

    // Добавляем классы для анимации
    const containerClassName = `${styles.container} ${isTransitioning ? styles.transitioning : ''}`;
    const contentClassName = `${styles.titleContainer} ${isTransitioning ? styles.contentTransitioning : ''}`;

    // Создаем объект с дополнительными пропсами для MainImg
    const mainImgProps = useMemo(() => ({
        mainImg: currentMainImg,
        soldierImg: currentSoldierImg,
        currentCard: currentCard,
        isTransitioning: isTransitioning
    }), [currentMainImg, currentSoldierImg, currentCard, isTransitioning]);

    // Создаем объект с дополнительными пропсами для ScrollableContainer
    const scrollableContainerProps = useMemo(() => ({
        currentCardHandler: currentCardHandler,
        isTransitioning: isTransitioning
    }), [currentCardHandler, isTransitioning]);

    // Мемоизируем кнопку, чтобы избежать ненужных ререндеров
    const orderButton = useMemo(() => (
        <Button size={'small'} color={'secondary'} showFormHandler={showFormHandler}>
            Order boosting
        </Button>
    ), [showFormHandler]);

    return (
        <div id={id} className={styles.variants}>
            <Suspense fallback={<LoadingFallback />}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <GameSelection/>
            </div>
                <GameDataContext.Provider value={gameData}>
                    <div style={{marginTop:"30px"}} className={containerClassName}>
                        <MainImg {...mainImgProps} />
                        <div className={contentClassName}>
                            <div className={styles.mainTitleContainer}>
                                <div className={styles.title}>
                                    <div  className={styles.mainTitle}>{titleMap[currentCard]}</div>
                                    <div className={mainTitleMap[currentCard] === "SPACE MARINE 2" ?  styles.secondaryTitleSM2 : styles.secondaryTitle}>{mainTitleMap[currentCard]}</div>
                                </div>
                                <div className={styles.btn}>{orderButton}</div>
                            </div>
                            <div className={styles.descriptionContainer}>
                                <div className={styles.description}>{descriptionMap[currentCard]}</div>
                            </div>
                            <div className={styles.perkPowerContainer}>
                                <div className={styles.perkPower}>
                                    {perkPower1}
                                </div>
                                <div className={styles.perkPower}>
                                    {perkPower2}
                                </div>
                            </div>
                            <div className={styles.scrollableContainer}>
                                <ScrollableContainer {...scrollableContainerProps} />
                            </div>
                        </div>
                    </div>
                </GameDataContext.Provider>
            </Suspense>
        </div>
    );
});

export default GameList;