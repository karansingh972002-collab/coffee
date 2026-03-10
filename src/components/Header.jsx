import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getStoredUser } from '../services/api';
import Logo from './Logo';
import './Header.css';

const Header = ({ cartCount, onCartClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
            if (authStatus) {
                const user = getStoredUser();
                setIsAdmin(user?.role === 'admin');
            } else {
                setIsAdmin(false);
            }
        }
    }, [location, isLoggedIn]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleLogoClick = (e) => {
        setIsMobileMenuOpen(false);
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
                        <a href="/#testimonials" className="nav-link">Reviews</a>
                        <Link to="/wishlist" className="nav-link">Wishlist</Link>
                        {isLoggedIn && (
                            <Link to="/account" className="nav-link">Dashboard</Link>
                        )}
                        {isAdmin && (
                            <Link to="/admin" className="nav-link" style={{ color: '#a5b4fc', fontWeight: 'bold' }}>Admin</Link>
                        )}
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="nav-link mobile-only-link" style={{ background: 'transparent', border: 'none', color: '#ff3f6c', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>Logout</button>
                        ) : (
                            <Link to="/auth" className="nav-link mobile-only-link" style={{ color: '#ec4899', fontWeight: 'bold' }}>Login / Signup</Link>
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

                                        {isAdmin && (
                                            <>
                                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>
                                                <Link to="/admin" className="profile-menu-item" style={{ color: '#a5b4fc' }}>
                                                    Admin Control Center
                                                </Link>
                                            </>
                                        )}

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

                        <Link to="/wishlist" className="action-icon-btn">
                            <div className="icon-badge-container">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </div>
                            <span className="profile-text">Wishlist</span>
                        </Link>

                        <div className="action-icon-btn cart-toggle"
                            style={{ padding: '8px', cursor: 'pointer', borderRadius: '50%', minWidth: '45px', minHeight: '45px', justifyContent: 'center' }}
                            onClick={() => {
                                if (window.innerWidth > 768) {
                                    onCartClick();
                                } else {
                                    navigate('/cart');
                                }
                            }}
                        >
                            <div className="icon-badge-container">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                    <path d="M3 6h18" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </div>
                            <span className="profile-text">Bag</span>
                        </div>

                        <button
                            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
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
