import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBadge from './components/TrustBadge';
import Packages from './components/Packages';
import WhatsInside from './components/WhatsInside';
import Testimonials from './components/Testimonials';
import AppFeatures from './components/AppFeatures';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Cart from './components/Cart';

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
    setIsCartOpen(true);
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
    <div className="App">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero />
      <TrustBadge />
      <Packages onAddToCart={addToCart} />
      <WhatsInside />
      <Testimonials />
      <AppFeatures />
      <FAQ />
      <Footer />
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default App;
