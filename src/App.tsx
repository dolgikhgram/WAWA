import './App.css'
import Header from './Components/Header/Header.tsx';
import Footer from "./Components/Footer/Footer.tsx";
import Form from "./Components/Form/Form.tsx";
import {useCallback, useState, useEffect} from "react";
import WeBoostYouWin from "./Components/Content/WeBoostYouWin/WeBoostYouWin.tsx";
import GameList from "./Components/Content/GameList/GameList.tsx";
import HowWeWork from "./Components/Content/HowWeWork/HowWeWork.tsx";
import WhyWe from "./Components/Content/WhyWe/WhyWe.tsx";
import Reviews from "./Components/Content/Reviews/Reviews.tsx";
import FAQ from "./Components/Content/FAQ/FAQ.tsx";
import Menu from './Components/Menu/Menu.tsx';
import BackgroundFlashes from './Components/BackgroundFlashes/BackgroundFlashes.tsx';
import FormOfGratitude from "./Components/FormOfGratitude/FormOfGratitude.tsx";
import { trackPageView, trackMenuOpen, trackMenuClose } from './services/analyticsService';

function App() {
    const [showForm, setShowForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showFormOfGratitude, setshowFormOfGratitude] = useState(false);

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
                <GameList id={"GameList"} showFormHandler={showFormHandler}/>
            </div>
            <HowWeWork id={"HowWeWork"}/>
            <WhyWe id={"WhyWe"}/>
            <Reviews id={"Reviews"}  showFormHandler={showFormHandler}/>
            <FAQ id={"FAQ"}  showFormOfGratitudeHandler={showFormOfGratitudeHandler} />
            <Footer/>
            {showForm ? <Form closeFormHandler={closeFormHandler} showFormOfGratitudeHandler={showFormOfGratitudeHandler}/> : null}
            {showMenu ? <Menu showFormHandler={showFormHandler} closeMenuHandler={closeMenuHandler}/> : null}
            { showFormOfGratitude ? <FormOfGratitude showFormOfGratitudeHandler={showFormOfGratitudeHandler} closeFormOfGratitudeHandler={closeFormOfGratitudeHandler}/> : null}
        </div>
      )
}

export default App
