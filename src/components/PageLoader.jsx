import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageLoader.css';

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Start loading
    setLoading(true);
    setProgress(0);

    // Animate progress
    const timer1 = setTimeout(() => setProgress(30), 50);
    const timer2 = setTimeout(() => setProgress(60), 150);
    const timer3 = setTimeout(() => setProgress(80), 300);
    const timer4 = setTimeout(() => setProgress(100), 400);
    const timer5 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="page-loader">
      <div 
        className="page-loader-bar" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default PageLoader;
