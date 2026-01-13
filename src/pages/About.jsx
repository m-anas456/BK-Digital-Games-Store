import { FaGamepad, FaUsers, FaAward, FaHeart, FaRocket, FaShieldAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About <span className="highlight">BK Digital Games</span></h1>
          <p>Your trusted destination for authentic digital PlayStation games</p>
        </div>
        <div className="hero-decoration">
          <div className="deco-circle"></div>
          <div className="deco-circle"></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="story-container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, BK Digital Games started with a simple mission: 
              to make gaming more accessible and affordable for everyone. We understand 
              the passion gamers have for their favorite titles, and we're here to 
              deliver that experience without breaking the bank.
            </p>
            <p>
              What started as a small venture has grown into a trusted platform 
              serving thousands of happy customers. Our commitment to authenticity, 
              instant delivery, and exceptional customer service has made us a 
              go-to destination for PlayStation enthusiasts.
            </p>
          </div>
          <div className="story-visual">
            <div className="visual-card">
              <FaGamepad className="visual-icon" />
              <span>Gaming First</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <FaGamepad />
            </div>
            <span className="stat-number">500+</span>
            <span className="stat-label">Games Available</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <span className="stat-number">10,000+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaAward />
            </div>
            <span className="stat-number">4.9</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaHeart />
            </div>
            <span className="stat-number">99%</span>
            <span className="stat-label">Satisfaction Rate</span>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="values-container">
          <h2>Our Values</h2>
          <p className="values-subtitle">What drives us every day</p>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <FaShieldAlt />
              </div>
              <h3>Trust & Security</h3>
              <p>
                Every transaction is secure and every game code is 100% authentic. 
                Your trust is our top priority.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaRocket />
              </div>
              <h3>Instant Delivery</h3>
              <p>
                No waiting around. Get your game codes instantly after purchase 
                and start playing immediately.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaHeart />
              </div>
              <h3>Customer First</h3>
              <p>
                Our dedicated support team is always ready to help you with 
                any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="team-container">
          <h2>Meet the Team</h2>
          <p className="team-subtitle">Passionate gamers serving passionate gamers</p>
          
          <div className="team-message">
            <div className="message-content">
              <p>
                "We're not just a business - we're gamers who understand what 
                it means to be part of a gaming community. Every game we sell, 
                every customer we serve, is a reflection of our love for gaming. 
                Thank you for being part of our journey."
              </p>
              <div className="message-author">
                <span className="author-name">The BK Digital Games Team</span>
                <span className="author-role">Founders & Gaming Enthusiasts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
