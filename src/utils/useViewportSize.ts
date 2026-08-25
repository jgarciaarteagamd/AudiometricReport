import { useState, useEffect } from 'react';

export const useViewportSize = (mobileBreakpoint = 768, tabletBreakpoint = 1024) => {
  const [viewport, setViewport] = useState({
    isMobile: window.innerWidth < mobileBreakpoint,
    isTablet: window.innerWidth >= mobileBreakpoint && window.innerWidth < tabletBreakpoint,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewport({
        isMobile: width < mobileBreakpoint,
        isTablet: width >= mobileBreakpoint && width < tabletBreakpoint,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint, tabletBreakpoint]);

  return viewport;
};
