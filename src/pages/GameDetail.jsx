import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaStar, FaPlus, FaCheck, FaPlaystation, FaPlay, FaSpinner, FaYoutube } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import games from '../data/games';
import './GameDetail.css';

// RAWG API Key (Free tier)
const RAWG_API_KEY = '0c9e0900a70e4e32a4be768714f4cfab';

const GameDetail = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [gameData, setGameData] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  // Find the game from our store
  const storeGame = games.find(g => g.id === parseInt(id));
  const isInCart = cartItems.some(item => item.id === storeGame?.id);

  // Search term mapping for better API results
  const searchTerms = {
    "God of War": "god-of-war-2018",
    "The Last of Us Part II": "the-last-of-us-part-ii",
    "Marvel's Spider-Man": "marvels-spider-man",
    "Horizon Zero Dawn": "horizon-zero-dawn",
    "Uncharted 4: A Thief's End": "uncharted-4-a-thiefs-end",
    "Ghost of Tsushima": "ghost-of-tsushima",
    "Bloodborne": "bloodborne",
    "Red Dead Redemption 2": "red-dead-redemption-2",
    "FIFA 24": "ea-sports-fc-24",
    "Call of Duty: Modern Warfare": "call-of-duty-modern-warfare-2019",
    "Grand Theft Auto V": "grand-theft-auto-v",
    "The Witcher 3: Wild Hunt": "the-witcher-3-wild-hunt",
    "Sekiro: Shadows Die Twice": "sekiro-shadows-die-twice",
    "Death Stranding": "death-stranding",
    "Persona 5 Royal": "persona-5-royal",
    "Final Fantasy VII Remake": "final-fantasy-vii-remake",
    "Elden Ring": "elden-ring",
    "Resident Evil Village": "resident-evil-village",
    "Cyberpunk 2077": "cyberpunk-2077",
    "Assassin's Creed Valhalla": "assassins-creed-valhalla",
    "Days Gone": "days-gone",
    "God of War Ragnarök": "god-of-war-ragnarok",
    "Mortal Kombat 11": "mortal-kombat-11",
    "NBA 2K24": "nba-2k24",
    "NieR: Automata": "nier-automata",
    "Monster Hunter: World": "monster-hunter-world",
    "Devil May Cry 5": "devil-may-cry-5",
    "Tekken 7": "tekken-7",
    "Horizon Forbidden West": "horizon-forbidden-west",
    "Ratchet & Clank": "ratchet-clank",
    "Uncharted: The Nathan Drake Collection": "uncharted-the-nathan-drake-collection",
    "The Last of Us Remastered": "the-last-of-us-remastered",
    "Detroit: Become Human": "detroit-become-human",
    "Until Dawn": "until-dawn",
    "Shadow of the Colossus": "shadow-of-the-colossus-2018",
    "Infamous Second Son": "infamous-second-son",
    "Dark Souls III": "dark-souls-iii",
    "Street Fighter V": "street-fighter-v",
    "Metal Gear Solid V: The Phantom Pain": "metal-gear-solid-v-the-phantom-pain",
    "Resident Evil 2 Remake": "resident-evil-2"
  };

  useEffect(() => {
    const fetchGameData = async () => {
      if (!storeGame) return;
      
      setLoading(true);
      try {
        const slug = searchTerms[storeGame.title] || storeGame.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Fetch game details
        const gameResponse = await fetch(
          `https://api.rawg.io/api/games/${slug}?key=${RAWG_API_KEY}`
        );
        
        if (gameResponse.ok) {
          const data = await gameResponse.json();
          setGameData(data);
          
          // Fetch screenshots
          const screenshotsResponse = await fetch(
            `https://api.rawg.io/api/games/${slug}/screenshots?key=${RAWG_API_KEY}`
          );
          
          if (screenshotsResponse.ok) {
            const screenshotsData = await screenshotsResponse.json();
            setScreenshots(screenshotsData.results || []);
          }
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
      setLoading(false);
    };

    fetchGameData();
  }, [id, storeGame]);

  const handleAddToCart = () => {
    if (storeGame) {
      addToCart(storeGame);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  if (!storeGame) {
    return (
      <div className="game-detail-page">
        <div className="not-found">
          <h2>Game not found</h2>
          <Link to="/games" className="back-btn">
            <FaArrowLeft /> Back to Games
          </Link>
        </div>
      </div>
    );
  }

  const youtubeSearchQuery = encodeURIComponent(`${storeGame.title} PS4 gameplay trailer`);

  return (
    <div className="game-detail-page">
      {/* Back Button */}
      <Link to="/games" className="back-link">
        <FaArrowLeft /> Back to Games
      </Link>

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Loading game details...</p>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="game-hero">
            <div className="hero-background">
              {gameData?.background_image && (
                <img src={gameData.background_image} alt="" className="hero-bg-image" />
              )}
              <div className="hero-overlay"></div>
            </div>
            
            <div className="hero-content">
              <div className="game-cover">
                <img 
                  src={storeGame.image} 
                  alt={storeGame.title}
                  loading="lazy"
                />
              </div>
              
              <div className="game-info">
                <h1>{storeGame.title}</h1>
                
                <div className="game-meta">
                  <span className="console-badge">
                    <FaPlaystation /> {storeGame.console}
                  </span>
                  <span className="genre-badge">{storeGame.genre}</span>
                  {gameData?.metacritic && (
                    <span className="metacritic-badge">{gameData.metacritic}</span>
                  )}
                </div>

                <div className="rating-section">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(storeGame.rating) ? 'star filled' : 'star'} 
                      />
                    ))}
                  </div>
                  <span className="rating-text">{storeGame.rating} / 5</span>
                  {gameData?.ratings_count && (
                    <span className="reviews-count">({gameData.ratings_count.toLocaleString()} reviews)</span>
                  )}
                </div>

                <p className="game-description">
                  {gameData?.description_raw || storeGame.description}
                </p>

                <div className="purchase-section">
                  <span className="price">Rs. {storeGame.price.toLocaleString()}</span>
                  <button 
                    className={`add-cart-btn ${isAdded || isInCart ? 'added' : ''}`}
                    onClick={handleAddToCart}
                    disabled={isAdded}
                  >
                    {isAdded || isInCart ? (
                      <><FaCheck /> Added to Cart</>
                    ) : (
                      <><FaPlus /> Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Game Details */}
          {gameData && (
            <section className="game-details-section">
              <div className="details-grid">
                {gameData.released && (
                  <div className="detail-item">
                    <span className="label">Release Date</span>
                    <span className="value">{new Date(gameData.released).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
                {gameData.developers?.length > 0 && (
                  <div className="detail-item">
                    <span className="label">Developer</span>
                    <span className="value">{gameData.developers.map(d => d.name).join(', ')}</span>
                  </div>
                )}
                {gameData.publishers?.length > 0 && (
                  <div className="detail-item">
                    <span className="label">Publisher</span>
                    <span className="value">{gameData.publishers.map(p => p.name).join(', ')}</span>
                  </div>
                )}
                {gameData.playtime > 0 && (
                  <div className="detail-item">
                    <span className="label">Average Playtime</span>
                    <span className="value">{gameData.playtime} hours</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Screenshots Gallery */}
          {screenshots.length > 0 && (
            <section className="screenshots-section">
              <h2><FaPlay className="section-icon" /> Screenshots</h2>
              <div className="screenshot-gallery">
                <div className="screenshot-main-container">
                  <img 
                    src={screenshots[activeScreenshot]?.image} 
                    alt={`Screenshot ${activeScreenshot + 1}`}
                    className="screenshot-main-image"
                    loading="lazy"
                  />
                  <div className="screenshot-nav">
                    <button 
                      className="nav-btn prev"
                      onClick={() => setActiveScreenshot(prev => prev > 0 ? prev - 1 : screenshots.length - 1)}
                    >
                      ‹
                    </button>
                    <span className="screenshot-counter">{activeScreenshot + 1} / {screenshots.length}</span>
                    <button 
                      className="nav-btn next"
                      onClick={() => setActiveScreenshot(prev => prev < screenshots.length - 1 ? prev + 1 : 0)}
                    >
                      ›
                    </button>
                  </div>
                </div>
                <div className="screenshot-thumbnails">
                  {screenshots.slice(0, 8).map((screenshot, index) => (
                    <div 
                      key={screenshot.id}
                      className={`thumbnail ${index === activeScreenshot ? 'active' : ''}`}
                      onClick={() => setActiveScreenshot(index)}
                    >
                      <img src={screenshot.image} alt={`Thumbnail ${index + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* YouTube Videos */}
          <section className="videos-section">
            <h2><FaYoutube className="section-icon youtube-red" /> Gameplay & Trailers</h2>
            <div className="video-links">
              <a 
                href={`https://www.youtube.com/results?search_query=${youtubeSearchQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link-card"
              >
                <div className="youtube-icon">
                  <FaPlay />
                </div>
                <div className="youtube-text">
                  <h3>Watch Gameplay Videos</h3>
                  <p>View trailers, gameplay, and walkthroughs on YouTube</p>
                </div>
              </a>
              <a 
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(storeGame.title + ' review')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link-card"
              >
                <div className="youtube-icon review">
                  <FaStar />
                </div>
                <div className="youtube-text">
                  <h3>Watch Reviews</h3>
                  <p>See what critics and players think</p>
                </div>
              </a>
            </div>
          </section>

          {/* Ratings Breakdown */}
          {gameData?.ratings && gameData.ratings.length > 0 && (
            <section className="ratings-section">
              <h2>Player Ratings</h2>
              <div className="ratings-breakdown">
                {gameData.ratings.map(rating => (
                  <div key={rating.id} className="rating-bar">
                    <span className="rating-title">{rating.title}</span>
                    <div className="bar-container">
                      <div 
                        className={`bar ${rating.title.toLowerCase()}`}
                        style={{ width: `${rating.percent}%` }}
                      ></div>
                    </div>
                    <span className="rating-percent">{rating.percent.toFixed(0)}%</span>
                    <span className="rating-count">({rating.count.toLocaleString()})</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default GameDetail;
