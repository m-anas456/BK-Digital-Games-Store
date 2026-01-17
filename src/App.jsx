import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingCart from './components/FloatingCart';
import PageLoader from './components/PageLoader';
import './App.css';
import './styles/animations.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Games = lazy(() => import('./pages/Games'));
const GameDetail = lazy(() => import('./pages/GameDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));

// Loading component for Suspense fallback
const SuspenseLoader = () => (
  <div className="suspense-loader">
    <div className="loader-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <PageLoader />
          <div className="app">
            {/* Navigation Bar */}
            <Navbar />
            
            {/* Main Content with Suspense for lazy loading */}
            <main className="main-content">
              <Suspense fallback={<SuspenseLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/game/:id" element={<GameDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </Suspense>
            </main>
            
            {/* Floating Cart Button */}
          <FloatingCart />
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
    </ThemeProvider>
  );
}

export default App
