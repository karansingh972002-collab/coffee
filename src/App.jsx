import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LivePurchase from './components/LivePurchase';
import Cart from './components/Cart';
import FloatingBag from './components/FloatingBag';
import Toast from './components/Toast';
import './components/FloatingBag.css';
import './components/Toast.css';

// Pages
import Home from './pages/Shop/Home';
import Shop from './pages/Shop/Shop';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Auth from './pages/Auth';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlistItems');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (item) => {
    const itemId = item.id || item._id;
    setCartItems(prev => {
      const existing = prev.find(i => {
        const iId = i.id || i._id;
        return iId === itemId &&
          JSON.stringify(i.customization) === JSON.stringify(item.customization);
      });
      if (existing) {
        setToast({ isVisible: true, message: `Updated quantity for ${item.name}!`, type: 'success' });
        return prev.map(i => {
          const iId = i.id || i._id;
          return (iId === itemId && JSON.stringify(i.customization) === JSON.stringify(item.customization))
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i;
        });
      }
      setToast({ isVisible: true, message: `${item.name} added to your celestial bag!`, type: 'success' });
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => (item.id || item._id) !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        (item.id || item._id) === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };


  const addToWishlist = (item) => {
    const itemId = item.id || item._id;
    setWishlistItems(prev => {
      if (prev.find(i => (i.id || i._id) === itemId)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => (item.id || item._id) !== itemId));
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
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop onAddToCart={addToCart} onAddToWishlist={addToWishlist} />} />
            <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} onAddToWishlist={addToWishlist} />} />
            <Route path="/cart" element={<CartPage items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onAddToWishlist={addToWishlist} />} />
            <Route path="/checkout" element={<Checkout items={cartItems} clearCart={clearCart} />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/wishlist" element={<Wishlist items={wishlistItems} onAddToCart={addToCart} onRemoveFromWishlist={removeFromWishlist} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Account />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <LivePurchase />
        <Footer />

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />

        <FloatingBag
          count={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </Router>
  );
}

export default App;

