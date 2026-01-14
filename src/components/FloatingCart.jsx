import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './FloatingCart.css';

const FloatingCart = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Don't show if cart is empty
  if (itemCount === 0) return null;

  return (
    <Link to="/cart" className="floating-cart">
      <div className="floating-cart-icon">
        <FaShoppingCart />
        <span className="floating-cart-badge">{itemCount}</span>
      </div>
      <span className="floating-cart-text">View Cart</span>
    </Link>
  );
};

export default FloatingCart;
