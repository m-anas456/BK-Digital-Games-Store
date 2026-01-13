import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/logo.png" alt="BK Digital Games" className="logo-image" />
          <span className="logo-text">BK Digital Games</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/games" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={closeMenu}
            >
              Buy Games
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={closeMenu}
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item cart-item">
            <NavLink 
              to="/cart" 
              className={({ isActive }) => isActive ? 'nav-link cart-link active' : 'nav-link cart-link'}
              onClick={closeMenu}
            >
              <FaShoppingCart />
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
