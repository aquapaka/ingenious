import { useEffect } from 'react';

export default function useKeyCombination(
  callback: () => void,
  withCtrl: boolean,
  withAlt: boolean,
  withShift: boolean,
  keycode: string,
): void {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (withCtrl && !e.ctrlKey) return;
      if (withAlt && !e.altKey) return;
      if (withShift && !e.shiftKey) return;
      if (e.code === keycode) {
        callback();
      }
    }

    // ignore some browser shortcuts
    function ignore(e: KeyboardEvent) {
      if (withCtrl && e.code === 'KeyK') {
        e.preventDefault();
      }
    }

    window.addEventListener('keyup', handler);
    window.addEventListener('keydown', ignore);
    return () => {
      window.removeEventListener('keyup', handler);
      window.removeEventListener('keydown', ignore);
    };
  }, [callback, keycode, withAlt, withCtrl, withShift]);
}
