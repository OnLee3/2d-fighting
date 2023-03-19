import { useCallback, useEffect, useState } from 'react';

export const useMultiKeyPress = (
    keyBindings: Array<{
        keys: string[];
        keyDownCallback: (key: string) => void;
        keyUpCallback?: (key: string) => void;
    }>
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
                    binding.keyUpCallback?.(event.key);
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

    const triggerEvents = useCallback(() => {
        pressedKeys.forEach((key) => {
            const binding = keyBindings.find((binding) =>
                binding.keys.includes(key)
            );
            if (binding) {
                binding.keyDownCallback(key);
            }
        });
    }, [keyBindings, pressedKeys]);
    return { triggerEvents };
};
