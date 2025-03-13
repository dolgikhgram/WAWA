import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import './BackgroundFlashes.css';

interface Flash {
    id: number;
    top: number;
    left: number;
}

interface Position {
    top: number;
    left: number;
}

interface WindowSize {
    width: number;
    height: number;
}

const MIN_DISTANCE = 800;
const FLASH_UPDATE_INTERVAL = 3000;
// const MAX_ATTEMPTS = 50;
const POSITION_RANGE = 120;
const POSITION_OFFSET = 10;
const POSITION_POOL_SIZE = 20;
const DEBOUNCE_DELAY = 250;

// Pre-calculate constants for better performance
const POSITION_MULTIPLIER = POSITION_RANGE - POSITION_OFFSET;

const calculateDistance = (pos1: Position, pos2: Position, windowSize: WindowSize): number => {
    const dx = ((pos1.left - pos2.left) * windowSize.width) / 100;
    const dy = ((pos1.top - pos2.top) * windowSize.height) / 100;
    // Use multiplication instead of Math.pow for better performance
    return Math.sqrt(dx * dx + dy * dy);
};

const isValidPosition = (
    position: Position, 
    existingFlashes: Position[], 
    windowSize: WindowSize
): boolean => {
    return existingFlashes.every(flash => 
        calculateDistance(position, flash, windowSize) >= MIN_DISTANCE
    );
};

const generateRandomPosition = (): Position => ({
    top: Math.random() * POSITION_MULTIPLIER - POSITION_OFFSET,
    left: Math.random() * POSITION_MULTIPLIER - POSITION_OFFSET,
});

// Pre-generate positions pool
const generatePositionsPool = (): Position[] => {
    const pool: Position[] = [];
    for (let i = 0; i < POSITION_POOL_SIZE; i++) {
        pool.push(generateRandomPosition());
    }
    return pool;
};

const BackgroundFlashes: React.FC = React.memo(() => {
    const [flashes, setFlashes] = useState<Flash[]>([]);
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    const positionsPoolRef = useRef<Position[]>(generatePositionsPool());
    const frameIdRef = useRef<number>(0);
    const lastUpdateRef = useRef<number>(0);

    const updateWindowSize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, []);

    // Debounced window resize handler
    const debouncedUpdateWindowSize = useCallback(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateWindowSize, DEBOUNCE_DELAY);
        };
    }, [updateWindowSize]);

    const generateFlashes = useCallback(() => {
        const numberOfFlashes = Math.floor(Math.random() * 2) + 2;
        const generatedFlashes: Flash[] = [];
        const usedPositions: Position[] = [];

        for (let i = 0; i < numberOfFlashes && usedPositions.length < positionsPoolRef.current.length; i++) {
            for (const position of positionsPoolRef.current) {
                if (!usedPositions.includes(position) && 
                    isValidPosition(position, usedPositions, windowSize)) {
                    usedPositions.push(position);
                    generatedFlashes.push({
                        id: i,
                        ...position,
                    });
                    break;
                }
            }
        }

        // Regenerate positions pool for next update
        positionsPoolRef.current = generatePositionsPool();
        return generatedFlashes;
    }, [windowSize]);

    const updateFlashes = useCallback((timestamp: number) => {
        if (timestamp - lastUpdateRef.current >= FLASH_UPDATE_INTERVAL) {
            setFlashes(generateFlashes());
            lastUpdateRef.current = timestamp;
        }
        frameIdRef.current = requestAnimationFrame(updateFlashes);
    }, [generateFlashes]);

    useEffect(() => {
        const resizeHandler = debouncedUpdateWindowSize();
        window.addEventListener('resize', resizeHandler);

        // Start animation frame loop
        frameIdRef.current = requestAnimationFrame(updateFlashes);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }
        };
    }, [debouncedUpdateWindowSize, updateFlashes]);

    const flashElements = useMemo(() => 
        flashes.map((flash) => (
            <div
                key={flash.id}
                className="flash"
                style={{
                    top: `${flash.top}%`,
                    left: `${flash.left}%`,
                    willChange: 'transform',
                    transform: 'translate3d(0,0,0)'
                }}
            />
        )),
        [flashes]
    );

    return (
        <div className="background-flashes">
            {flashElements}
        </div>
    );
});

BackgroundFlashes.displayName = 'BackgroundFlashes';

export default BackgroundFlashes; 