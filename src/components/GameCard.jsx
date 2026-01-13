import { FaPlus, FaCheck, FaStar, FaPlaystation, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css';

const GameCard = memo(({ game }) => {
  const { addToCart, cartItems } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if game is already in cart
  const isInCart = cartItems.some(item => item.id === game.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(game);
    setIsAdded(true);
    
    // Reset the added state after animation
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="game-card">
      <Link to={`/game/${game.id}`} className="game-card-link">
        {/* Game Image */}
        <div className="game-image-container">
          {!imageLoaded && !imageError && (
            <div className="image-skeleton"></div>
          )}
          {!imageError ? (
            <img 
              src={game.image} 
              alt={game.title}
              className={`game-cover-image ${imageLoaded ? 'loaded' : ''}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          ) : (
            <div className="game-image-placeholder">
              <img src="/logo.png" alt="BK Digital Games" className="placeholder-logo" />
              <span>{game.title}</span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="game-overlay">
            <p className="game-description">{game.description}</p>
            <div className="game-rating">
              <FaStar className="star-icon" />
              <span>{game.rating}</span>
            </div>
            <div className="view-details">
              <FaEye /> View Details
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="game-info">
          <h3 className="game-title">{game.title}</h3>
          
          <div className="game-meta">
            <span className="game-console">
              <FaPlaystation />
              {game.console}
            </span>
            <span className="game-genre">{game.genre}</span>
          </div>

          <div className="game-footer">
            <span className="game-price"><small>Starting from</small>Rs. {game.price.toLocaleString()}</span>
            
            <button 
              className={`add-to-cart-btn ${isAdded || isInCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded || isInCart ? (
                <>
                  <FaCheck />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* Decorative Elements */}
      <div className="card-glow"></div>
    </div>
  );
});

GameCard.displayName = 'GameCard';

export default GameCard;
