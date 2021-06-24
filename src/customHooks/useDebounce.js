import { useState, useEffect } from 'react';

export function useDebouncedValue(input, time = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(input);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return debouncedValue;
}
