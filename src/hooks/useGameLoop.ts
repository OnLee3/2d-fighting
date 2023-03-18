import { useCallback, useEffect } from 'react';

export const useGameLoop = (update: () => void, draw: () => void) => {
    const gameLoop = useCallback(() => {
        update();
        draw();
    }, [update, draw]);

    useEffect(() => {
        const animationId = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(animationId);
    }, [gameLoop]);
};
