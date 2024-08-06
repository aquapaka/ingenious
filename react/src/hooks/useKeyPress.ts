import { useEffect } from 'react';

export default function useKeyPress(callback: () => void, keycode: string[]): void {
  useEffect(() => {
    function handler({ code }: KeyboardEvent) {
      console.log(code);
      if (keycode.includes(code)) {
        callback();
      }
    }

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [callback, keycode]);
}
