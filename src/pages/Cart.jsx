import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingCart, FaPlaystation, FaWhatsapp, FaUser, FaPhone, FaCreditCard, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    paymentMethod: ''
  });
  const [formError, setFormError] = useState('');

  // Your WhatsApp Business number
  const whatsappNumber = "923272931704";

  const paymentMethods = [
    { id: 'easypaisa', name: 'Easypaisa', color: '#00c853' },
    { id: 'jazzcash', name: 'JazzCash', color: '#e60000' },
    { id: 'bank', name: 'Bank Transfer', color: '#1976d2' },
    { id: 'cod', name: 'Cash on Delivery', color: '#ff9800' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const handlePaymentSelect = (methodId) => {
    setCustomerInfo(prev => ({
      ...prev,
      paymentMethod: methodId
    }));
    setFormError('');
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      setFormError('Please enter your name');
      return false;
    }
    if (!customerInfo.phone.trim()) {
      setFormError('Please enter your phone number');
      return false;
    }
    if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/[^0-9]/g, ''))) {
      setFormError('Please enter a valid phone number');
      return false;
    }
    if (!customerInfo.paymentMethod) {
      setFormError('Please select a payment method');
      return false;
    }
    return true;
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleConfirmOrder = () => {
    if (!validateForm()) return;

    const selectedPayment = paymentMethods.find(m => m.id === customerInfo.paymentMethod);

    // Create the order message
    let message = `"🎮 *New Order from ${customerInfo.name}*\n\n"`;
    message += "👤 *Customer Details:*\n";
    message += `   Name: ${customerInfo.name}\n`;
    message += `   Phone: ${customerInfo.phone}\n`;
    message += `   Payment: ${selectedPayment?.name}\n\n`;
    message += "📦 *Order Details:*\n";
    message += "─────────────────\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n`;
      message += `   Console: ${item.console}\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Price: Rs. ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    message += "─────────────────\n";
    message += `💰 *Total Amount: Rs. ${getTotalPrice().toLocaleString()}*\n\n`;
    message += "Please confirm my order. Thank you! 🙏";

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Close form
    setShowCheckoutForm(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any games yet.</p>
          <Link to="/games" className="browse-btn">
            <FaPlaystation />
            Browse Games
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Cart Header */}
      <section className="cart-header">
        <div className="header-content">
          <h1>
            <FaShoppingCart className="header-icon" />
            Shopping Cart
          </h1>
          <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="cart-content">
        <div className="cart-container">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                  ) : (
                    <FaPlaystation className="item-icon" />
                  )}
                </div>
                
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <span className="item-console">
                    <FaPlaystation />
                    {item.console}
                  </span>
                  <span className="item-genre">{item.genre}</span>
                </div>

                <div className="item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="item-price">
                  <span className="price-unit">Rs. {item.price.toLocaleString()} each</span>
                  <span className="price-total">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs. {getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span className="discount">-Rs. 0</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-delivery">Instant (Digital)</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>Rs. {getTotalPrice().toLocaleString()}</span>
              </div>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              <FaWhatsapp className="whatsapp-icon" />
              Order via WhatsApp
            </button>

            <p className="checkout-note">
              Click to send your order directly to our WhatsApp for quick processing!
            </p>

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>

            <Link to="/games" className="continue-shopping">
              <FaArrowLeft />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Checkout Form Modal */}
      {showCheckoutForm && (
        <div className="checkout-modal-overlay" onClick={() => setShowCheckoutForm(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCheckoutForm(false)}>
              <FaTimes />
            </button>
            
            <h2>Complete Your Order</h2>
            <p className="modal-subtitle">Please fill in your details to proceed</p>

            <div className="checkout-form">
              <div className="form-group">
                <label>
                  <FaUser className="input-icon" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaPhone className="input-icon" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="03XX XXXXXXX"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaCreditCard className="input-icon" />
                  Payment Method
                </label>
                <div className="payment-methods">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      className={`payment-option ${customerInfo.paymentMethod === method.id ? 'selected' : ''}`}
                      onClick={() => handlePaymentSelect(method.id)}
                      style={{ '--method-color': method.color }}
                    >
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>

              {formError && (
                <div className="form-error">
                  {formError}
                </div>
              )}

              <div className="order-total-preview">
                <span>Order Total:</span>
                <span className="total-amount">Rs. {getTotalPrice().toLocaleString()}</span>
              </div>

              <button className="confirm-order-btn" onClick={handleConfirmOrder}>
                <FaWhatsapp />
                Confirm & Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
