import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = ({ items = [], onAddToCart, onRemoveFromWishlist }) => {
    // Dummy wishlist items for demonstration if real ones aren't available
    const displayItems = items.length === 0 ? [
        {
            id: 'supernova-gift',
            name: 'Supernova - Gift Pack',
            type: 'Premium Gift Set',
            price: 3499,
            image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'silvernova-digital',
            name: 'Silvernova - Digital',
            type: 'Standard Package',
            price: 1999,
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80'
        }
    ] : items;

    return (
        <div className="wishlist-page">
            <div className="wishlist-container">
                <header className="wishlist-header">
                    <h1>Celestial Wishlist</h1>
                    <p className="wishlist-count">{displayItems.length} Saved Treasures</p>
                </header>

                {displayItems.length === 0 ? (
                    <div className="wishlist-empty">
                        <div className="empty-icon-wrapper">
                            <span style={{ fontSize: '48px' }}>✨</span>
                        </div>
                        <h2>Your wishlist is awaiting stars</h2>
                        <p>Explore the cosmos and save your favorite constellations to name them later.</p>
                        <Link to="/shop" className="browse-btn">
                            Explore the Sky
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {displayItems.map(item => (
                            <div key={item.id} className="wishlist-card">
                                <button
                                    className="remove-btn"
                                    onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(item.id)}
                                    title="Remove from wishlist"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>

                                <div className="card-image-wrapper">
                                    <img src={item.image} alt={item.name} className="item-image" />
                                    <div className="card-overlay">
                                        <button className="quick-add-btn" onClick={() => onAddToCart(item)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="card-content">
                                    <span className="item-badge">{item.type || 'Celestial Package'}</span>
                                    <h3>{item.name}</h3>

                                    <div className="card-footer">
                                        <div className="item-price">₹{item.price.toLocaleString()}</div>
                                        <div className="rating-pill">
                                            <span>★</span> 4.9
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
