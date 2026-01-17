import { Link } from 'react-router-dom';
import { FaShieldAlt, FaRocket, FaHeadset, FaStar, FaArrowRight, FaPlaystation, FaFire, FaNewspaper } from 'react-icons/fa';
import games from '../data/games';
import GameCard from '../components/GameCard';
import './Home.css';

const Home = () => {
  // Get featured games (top rated)
  const featuredGames = games.filter(game => game.rating >= 4.8).slice(0, 4);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-grid"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-accent">Level Up</span>
            <span>Your Gaming</span>
            <span className="title-highlight">Experience</span>
          </h1>
          
          <p className="hero-description">
            Discover the best PlayStation 4 digital games at unbeatable prices. 
            Instant delivery, authentic codes, and 24/7 support.
          </p>
          
          <div className="hero-buttons">
            <Link to="/games" className="btn btn-primary">
              <FaPlaystation />
              Browse Games
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Us
              <FaArrowRight />
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Games</span>
            </div>
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <img src="/logo.png" alt="BK Digital Games" className="floating-logo" />
          </div>
          <div className="floating-card card-2">
            <FaStar />
          </div>
          <div className="floating-card card-3">
            <FaRocket />
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="games-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <FaFire className="section-icon fire" />
              Featured Games
            </h2>
            <Link to="/games" className="view-all-btn">
              View All <FaArrowRight />
            </Link>
          </div>
          <div className="home-games-grid">
            {featuredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Game Blog Section */}
      <section className="blog-promo-section">
        <div className="section-container">
          <div className="blog-promo-content">
            <FaNewspaper className="blog-promo-icon" />
            <h2>Stay Updated with Gaming News</h2>
            <p>Discover the latest gaming news, tips, gameplay videos, and behind-the-scenes content from the world of PlayStation gaming.</p>
            <div className="blog-promo-buttons">
              <Link to="/blog" className="btn btn-primary">
                <FaNewspaper />
                Visit Blog
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-container">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">
            We provide the best gaming experience with unmatched benefits
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaRocket />
              </div>
              <h3>Instant Delivery</h3>
              <p>Get your game codes instantly after purchase. No waiting, start playing immediately.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>100% Secure</h3>
              <p>All transactions are encrypted and secure. Your data is always protected.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <img src="/logo.png" alt="" className="feature-logo" />
              </div>
              <h3>Authentic Games</h3>
              <p>Only genuine game codes from official sources. No fake or pirated content.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaHeadset />
              </div>
              <h3>24/7 Support</h3>
              <p>Our support team is always ready to help you with any questions or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Start Gaming?</h2>
            <p>
              Join thousands of happy gamers. Browse our collection and find your next favorite game.
            </p>
            <Link to="/games" className="btn btn-primary btn-large">
              <FaPlaystation />
              Shop Now
            </Link>
          </div>
          <div className="cta-decoration">
            <div className="cta-circle"></div>
            <div className="cta-circle"></div>
            <div className="cta-circle"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
