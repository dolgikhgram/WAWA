import React, { useEffect, useState } from 'react';
import './BackgroundFlashes.css';

interface Flash {
    id: number;
    top: number;
    left: number;
}

const BackgroundFlashes: React.FC = () => {
    const [flashes, setFlashes] = useState<Flash[]>([]);

    useEffect(() => {
        const generateFlashes = () => {
            const numberOfFlashes = Math.floor(Math.random() * 2) + 2; // 2-3 flashes
            const generatedFlashes: Flash[] = [];
            const minDistance = 800;

            const isValidPosition = (newTop: number, newLeft: number) => {
                for (const flash of generatedFlashes) {
                    const distance = Math.sqrt(
                        Math.pow((flash.top - newTop) * window.innerHeight / 100, 2) +
                        Math.pow((flash.left - newLeft) * window.innerWidth / 100, 2)
                    );
                    if (distance < minDistance) {
                        return false;
                    }
                }
                return true;
            };

            for (let i = 0; i < numberOfFlashes; i++) {
                let validPositionFound = false;
                let attempts = 0;
                
                while (!validPositionFound && attempts < 50) {
                    const newTop = Math.random() * 120 - 10;
                    const newLeft = Math.random() * 120 - 10;

                    if (isValidPosition(newTop, newLeft)) {
                        validPositionFound = true;
                        generatedFlashes.push({
                            id: i,
                            top: newTop,
                            left: newLeft,
                        });
                    }
                    attempts++;
                }
            }
            
            return generatedFlashes;
        };

        // Initial generation
        setFlashes(generateFlashes());

        // Update positions every 3 seconds
        const interval = setInterval(() => {
            setFlashes(generateFlashes());
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="background-flashes">
            {flashes.map((flash) => (
                <div
                    key={flash.id}
                    className="flash"
                    style={{
                        top: `${flash.top}%`,
                        left: `${flash.left}%`,
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundFlashes; 