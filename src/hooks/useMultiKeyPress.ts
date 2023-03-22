import { useCallback, useEffect, useState } from 'react';

export const useMultiKeyPress = (
    keyBindings: Array<{
        keys: string[];
        keyDownCallback: (key: string) => void;
        keyUpCallback?: (key: string) => void;
    }>
) => {
    const [pressedKeys, setPressedKeys] = useState(new Set<string>());
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const binding = keyBindings.find((binding) =>
                binding.keys.includes(event.key)
            );

            setPressedKeys((prevPressedKeys) => {
                event.stopPropagation();
                event.preventDefault();
                if (binding && !prevPressedKeys.has(event.key)) {
                    const newPressedKeys = new Set(prevPressedKeys);
                    newPressedKeys.add(event.key);
                    return newPressedKeys;
                }
                return prevPressedKeys;
            });
        },
        [keyBindings]
    );

    const handleKeyUp = useCallback(
        (event: KeyboardEvent) => {
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
        },
        [keyBindings]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

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
