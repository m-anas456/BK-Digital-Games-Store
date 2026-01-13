import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <div className="footer-logo">
            <img src="/logo.png" alt="BK Digital Games" className="footer-logo-image" />
            <h3>BK Digital Games</h3>
          </div>
          <p className="footer-description">
            Your trusted destination for digital PlayStation games. 
            Quality gaming experiences at the best prices.
          </p>
          <div className="social-links">
          
            <a href="https://www.instagram.com/bkdigitalgames/" className="social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@ClipsBK786" className="social-link" aria-label="Discord">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/games">Buy Games</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><Link to="/games">Action Games</Link></li>
            <li><Link to="/games">Adventure Games</Link></li>
            <li><Link to="/games">Sports Games</Link></li>
            <li><Link to="/games">RPG Games</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Help Center</Link></li>
            <li><Link to="/contact">FAQs</Link></li>
            <li><Link to="/contact">Terms of Service</Link></li>
            <li><Link to="/contact">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; 2026 BK Digital Games. All Rights Reserved.</p>
          <p className="footer-tagline">Level Up Your Gaming Experience</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
