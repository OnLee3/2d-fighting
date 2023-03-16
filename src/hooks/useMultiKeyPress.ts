import { useEffect, useState } from "react";

export const useMultiKeyPress = (
  keys: string[],
  callback: (key: string) => void
) => {
  const [pressedKeys, setPressedKeys] = useState(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.includes(event.key) && !pressedKeys.has(event.key)) {
        setPressedKeys((prevPressedKeys) => {
          const newPressedKeys = new Set(prevPressedKeys);
          newPressedKeys.add(event.key);
          return newPressedKeys;
        });
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
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
  }, [keys, pressedKeys]);

  useEffect(() => {
    const interval = setInterval(() => {
      pressedKeys.forEach((key) => {
        callback(key);
      });
    }, 1000 / 60); // Call the callback every frame (60 FPS)

    return () => {
      clearInterval(interval);
    };
  }, [pressedKeys, callback]);
};
