import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Auth from './pages/Auth';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // For smoother experience, don't auto-open side cart on full-page shop
    // setIsCartOpen(true);
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

  return (
    <Router>
      <div className="App">
        <Header
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />} />
            <Route path="/checkout" element={<Checkout items={cartItems} />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wishlist" element={<Wishlist items={[]} onAddToCart={addToCart} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Account />} />
          </Routes>
        </main>

        <Footer />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      </div>
    </Router>
  );
}

export default App;

