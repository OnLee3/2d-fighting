import { useEffect, useState } from 'react';

export const useMultiKeyPress = (
    keyBindings: Array<{ keys: string[]; callback: (key: string) => void }>
) => {
    const [pressedKeys, setPressedKeys] = useState(new Set<string>());

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const binding = keyBindings.find((binding) =>
                binding.keys.includes(event.key)
            );
            if (binding && !pressedKeys.has(event.key)) {
                event.stopPropagation();
                event.preventDefault();
                setPressedKeys((prevPressedKeys) => {
                    const newPressedKeys = new Set(prevPressedKeys);
                    newPressedKeys.add(event.key);
                    return newPressedKeys;
                });
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const binding = keyBindings.find((binding) =>
                binding.keys.includes(event.key)
            );
            if (binding) {
                event.stopPropagation();
                event.preventDefault();
                setPressedKeys((prevPressedKeys) => {
                    const newPressedKeys = new Set(prevPressedKeys);
                    newPressedKeys.delete(event.key);
                    return newPressedKeys;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [keyBindings, pressedKeys]);

    useEffect(() => {
        const animationId = requestAnimationFrame(() => {
            pressedKeys.forEach((key) => {
                const binding = keyBindings.find((binding) =>
                    binding.keys.includes(key)
                );
                if (binding) {
                    binding.callback(key);
                }
            });
        });
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [pressedKeys, keyBindings]);
};
