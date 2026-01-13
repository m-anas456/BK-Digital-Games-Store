import { createContext, useContext, useState, useEffect } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('bkdg-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bkdg-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (game) => {
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItem = prevItems.find(item => item.id === game.id);
      if (existingItem) {
        // Increase quantity if exists
        return prevItems.map(item =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...game, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (gameId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
  };

  // Update item quantity
  const updateQuantity = (gameId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(gameId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === gameId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Value object to provide to consumers
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
