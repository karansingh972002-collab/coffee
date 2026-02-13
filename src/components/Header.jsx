import { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ cartCount, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-text">Star Naming</span>
                    </div>

                    <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                        <a href="#packages" className="nav-link">Packages</a>
                        <a href="#whats-inside" className="nav-link">What's Inside</a>
                        <a href="#testimonials" className="nav-link">Reviews</a>
                        <a href="#app" className="nav-link">App</a>
                        <a href="#faq" className="nav-link">FAQ</a>
                    </nav>

                    <div className="header-actions">
                        <button className="cart-btn" onClick={onCartClick}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </button>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
