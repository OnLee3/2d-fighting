import { useEffect, useState } from "react";

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
        setPressedKeys((prevPressedKeys) => {
          const newPressedKeys = new Set(prevPressedKeys);
          newPressedKeys.delete(event.key);
          return newPressedKeys;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyBindings, pressedKeys]);

  useEffect(() => {
    const interval = setInterval(() => {
      pressedKeys.forEach((key) => {
        const binding = keyBindings.find((binding) =>
          binding.keys.includes(key)
        );
        if (binding) {
          binding.callback(key);
        }
      });
    }, 1000 / 60); // Call the callback every frame (60 FPS)

    return () => {
      clearInterval(interval);
    };
  }, [pressedKeys, keyBindings]);
};
