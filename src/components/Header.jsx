import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './Header.css';

const Header = ({ cartCount, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo text-decoration-none">
                        <div className="logo-container">
                            <img src={logo} alt="Star Naming Logo" className="logo-img" width="50" height="50" />
                            <span className="logo-text">Star Naming</span>
                        </div>
                    </Link>

                    <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/shop" className="nav-link">Shop</Link>
                        {location.pathname === '/' && (
                            <>
                                <a href="#packages" className="nav-link">Packages</a>
                                <a href="#testimonials" className="nav-link">Reviews</a>
                            </>
                        )}
                        <Link to="/wishlist" className="nav-link">Wishlist</Link>
                        <Link to="/account" className="nav-link">Dashboard</Link>
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

                        <Link to="/auth" className="btn btn-primary d-none d-md-inline-block ms-3">Login</Link>

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

