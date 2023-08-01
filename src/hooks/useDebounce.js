import useTimeout from 'hooks/useTimeout';
import { useEffect } from 'react';

const useDebounce = (callback, delay, dependencies) => {
  const { reset, clear } = useTimeout(callback, delay);

  // The timeout is reset, every time the dependencies changed
  useEffect(reset, [...dependencies, reset]);

  // Clear the timer at first render
  useEffect(clear, []);
};
export default useDebounce;
