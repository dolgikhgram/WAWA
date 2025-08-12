import './App.css'
import Header from './Components/Header/Header';
import Footer from "./Components/Footer/Footer";
import Form from "./Components/Form/Form";
import {useCallback, useState, useEffect} from "react";
import WeBoostYouWin from "./Components/Content/WeBoostYouWin/WeBoostYouWin";
import GameList from "./Components/Content/GameList/GameList";
import HowWeWork from "./Components/Content/HowWeWork/HowWeWork";
import WhyWe from "./Components/Content/WhyWe/WhyWe";
import Reviews from "./Components/Content/Reviews/Reviews";
import FAQ from "./Components/Content/FAQ/FAQ";
import Menu from './Components/Menu/Menu';
import BackgroundFlashes from './Components/BackgroundFlashes/BackgroundFlashes';
import FormOfGratitude from "./Components/FormOfGratitude/FormOfGratitude";
import { trackPageView, trackMenuOpen, trackMenuClose } from './services/analyticsService';

function App() {
    const [showForm, setShowForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showFormOfGratitude, setshowFormOfGratitude] = useState(false);
    const [selectedGame, setSelectedGame] = useState<string>('');

    useEffect(() => {
        // Отслеживаем просмотр главной страницы
        trackPageView('home');
    }, []);

    const showFormHandler = useCallback(() => {
        setShowForm(true);
    }, []);

    const showMenuHandler = useCallback(() => {
        setShowMenu(true);
        trackMenuOpen();
    }, []);

    const showFormOfGratitudeHandler = useCallback(() => {
        setshowFormOfGratitude(true);
    }, []);

    const closeFormHandler = useCallback(() => {
        setShowForm(false);
    }, []);

    const closeMenuHandler = useCallback(() => {
        setShowMenu(false);
        trackMenuClose();
    }, []);

    const closeFormOfGratitudeHandler = useCallback(() => {
        setshowFormOfGratitude(false);
    }, []);

    const setSelectedGameHandler = useCallback((game: string) => {
        setSelectedGame(game);
    }, []);

    return (
        <div className={'container'}>
            <BackgroundFlashes/>
            <div style={{position: "relative", display: "flex", flexDirection: "column", alignItems:"center"}}>
                <img 
                    className={"wallpaper"} 
                    src="./wallpaper.png"
                    alt='wallpaper' 
                    style={{
                        width: "100vw",
                        objectFit: "cover",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
                    }}
                />
                <Header showFormHandler={showFormHandler} showMenuHandler={showMenuHandler}/>
                <WeBoostYouWin 
                    showFormHandler={showFormHandler} 
                    isFormOpen={showForm} 
                    isMenuOpen={showMenu}
                />
            </div>
            <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <GameList id={"GameList"} showFormHandler={showFormHandler} setSelectedGameHandler={setSelectedGameHandler}/>
            </div>
            <HowWeWork id={"HowWeWork"}/>
            <WhyWe id={"WhyWe"}/>
            <Reviews id={"Reviews"}  showFormHandler={showFormHandler}/>
            <FAQ id={"FAQ"}  showFormOfGratitudeHandler={showFormOfGratitudeHandler} />
            <Footer/>
            {showForm ? <Form id="game-form" closeFormHandler={closeFormHandler} showFormOfGratitudeHandler={showFormOfGratitudeHandler} selectedGame={selectedGame}/> : null}
            {showMenu ? <Menu showFormHandler={showFormHandler} closeMenuHandler={closeMenuHandler}/> : null}
            { showFormOfGratitude ? <FormOfGratitude showFormOfGratitudeHandler={showFormOfGratitudeHandler} closeFormOfGratitudeHandler={closeFormOfGratitudeHandler}/> : null}
        </div>
      )
}

export default App
