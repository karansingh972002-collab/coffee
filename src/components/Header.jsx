import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/api';
import Logo from './Logo';
import './Header.css';

const Header = ({ cartCount, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check authentication status
    useEffect(() => {
        const authStatus = isAuthenticated();
        if (isLoggedIn !== authStatus) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoggedIn(authStatus);
        }
    }, [location, isLoggedIn]);

    // Close mobile menu on route change
    useEffect(() => {
        if (isMobileMenuOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsMobileMenuOpen(false);
        }
    }, [location, isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleLogoClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container" style={{ maxWidth: '95%' }}>
                <div className="header-content">
                    <Link to="/" className="logo text-decoration-none" onClick={handleLogoClick}>
                        <div className="logo-container">
                            <Logo className="logo-svg" size={45} />
                            <span className="logo-text">Star Naming</span>
                        </div>
                    </Link>

                    <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                        <Link to="/" className="nav-link" onClick={handleLogoClick}>Home</Link>
                        <Link to="/shop" className="nav-link">Shop</Link>
                        <a href="/#packages" className="nav-link">Packages</a>
                        <a href="/#testimonials" className="nav-link">Reviews</a>
                        <Link to="/wishlist" className="nav-link">Wishlist</Link>
                        {isLoggedIn && (
                            <Link to="/account" className="nav-link">Dashboard</Link>
                        )}
                    </nav>


                    <div className="header-actions">
                        <div className="profile-container">
                            <div className="profile-btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span className="profile-text">Profile</span>
                            </div>

                            <div className="profile-dropdown">
                                <div className="profile-dropdown-content">
                                    {!isLoggedIn ? (
                                        <div className="profile-header-section">
                                            <div style={{ fontWeight: 700, marginBottom: '4px', color: 'white' }}>Welcome</div>
                                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>To access account and manage orders</p>
                                            <Link to="/auth" className="login-btn-header">LOGIN / SIGNUP</Link>
                                        </div>
                                    ) : (
                                        <div className="profile-header-section">
                                            <div style={{ fontWeight: 700, marginBottom: '4px', color: 'white' }}>Hello User</div>
                                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{localStorage.getItem('userEmail') || 'Welcome back'}</p>
                                        </div>
                                    )}

                                    <div className="profile-menu-items">
                                        <Link to="/account" className="profile-menu-item">
                                            My Orders
                                        </Link>
                                        <Link to="/wishlist" className="profile-menu-item">
                                            My Wishlist
                                        </Link>
                                        <div className="profile-menu-item">
                                            Certificate Search
                                        </div>
                                        <div className="profile-menu-item">
                                            Official Registry Help
                                        </div>

                                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

                                        <div className="profile-menu-item">
                                            Saved Coordinates
                                        </div>

                                        {isLoggedIn && (
                                            <>
                                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>
                                                <div className="profile-menu-item" onClick={handleLogout}>
                                                    Logout
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/wishlist" className="cart-btn action-icon-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span className="profile-text">Wishlist</span>
                        </Link>

                        <Link to="/wishlist" className="cart-btn action-icon-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span className="profile-text">Wishlist</span>
                        </Link>

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
