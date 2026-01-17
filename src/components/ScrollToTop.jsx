import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Also reset body scroll position
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Reset body overflow in case it was locked by a modal
    document.body.style.overflow = 'auto';
  }, [pathname]);

  return null;
};

export default ScrollToTop;
