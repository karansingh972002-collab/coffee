import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LivePurchase from './components/LivePurchase';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderPage from './pages/OrderPage';
import Auth from './pages/Auth';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i =>
        i.id === item.id &&
        JSON.stringify(i.customization) === JSON.stringify(item.customization)
      );
      if (existing) {
        return prev.map(i =>
          (i.id === item.id && JSON.stringify(i.customization) === JSON.stringify(item.customization))
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (item) => {
    setWishlistItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
    // Optional: Show a toast or feedback
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <Router>
      <div className="App">
        <Header
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={addToCart} onAddToWishlist={addToWishlist} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} onAddToWishlist={addToWishlist} />} />
            <Route path="/cart" element={<CartPage items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onAddToWishlist={addToWishlist} />} />
            <Route path="/checkout" element={<Checkout items={cartItems} clearCart={clearCart} />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/order" element={<OrderPage onAddToCart={addToCart} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wishlist" element={<Wishlist items={wishlistItems} onAddToCart={addToCart} onRemoveFromWishlist={removeFromWishlist} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Account />} />
          </Routes>
        </main>

        <LivePurchase />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

