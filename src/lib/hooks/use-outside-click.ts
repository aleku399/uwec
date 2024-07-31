import React, { useEffect } from 'react';

interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement>;
  handlers: (() => void)[];
}

const useOutsideClick = ({ ref, handlers }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handlers.forEach(handler => handler());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handlers]);
};

export default useOutsideClick;
