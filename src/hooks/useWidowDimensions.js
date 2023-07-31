import { useEffect, useState } from 'react';

const UseWidowDimensions = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleWindowChange = (e) => {
    e.preventDefault();
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowChange);
    return () => {
      window.removeEventListener('resize', handleWindowChange);
    }
  }, []);

  return {
    width,
    height
  }
}
export default UseWidowDimensions;