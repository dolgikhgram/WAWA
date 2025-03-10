import React from 'react';
import styles from './GameCards.module.css';

interface Game {
    id: number;
    image: string;
    altText: string;
}

const games: Game[] = [
    { id: 1, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/2a42e7db1694c65c227d20a9bf9755f69b41536cef808a417b80b2a8a5fada30?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&", altText: "Game 1" },
    { id: 2, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/44f103367c4b122edfb3b40544d140879d4a5b761e8596b31d9d1a154e990b60?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&", altText: "Game 2" },
    { id: 3, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9391ecd19f18d5917682ca56cde3fbefffdcf81e00ffc219517beade42f364a2?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&", altText: "Game 3" },
    { id: 4, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a64ff3b2aee423e24f860bf0aa8c42ce055ad7f158022fcb5885b276a0083b3d?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&", altText: "Game 4" },
    { id: 5, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3c2d188ef624441353b9d3c66cda7e7b1f3ba4db6113de33931fb64400335b2c?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&", altText: "Game 5" },
    { id: 6, image: "https://cdn.builder.io/api/v1/image/assets/TEMP/9581b53b3e30ecd08d3dcd0499756dcb85ab29250f3f252edbc4cba093a16704?apiKey=8a3404d7eee74db5a8def1a4eb5e7a09&", altText: "Game 6" },
];

const GameCards: React.FC = () => {
    return (
        <div className={styles.gameList}>
            {games.map((game) => (
                <div className={styles.gameCard}>
                    <img src={game.image} alt={game.altText} className={styles[`gameImage${game.id}`]}/>
                </div>
            ))}
        </div>
    );
};

export default GameCards;