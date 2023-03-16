import { useKey } from "react-use";

export const useMultiKeyPress = (
  keys: string[],
  callback: (key: string) => void
) => {
  useKey(
    (event) => keys.includes(event.key),
    (event) => {
      event.preventDefault(); // Prevent browser shortcuts
      callback(event.key);
    },
    { event: "keydown" },
    [keys, callback]
  );
};
