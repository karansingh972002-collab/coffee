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
                    <h1>My Wishlist</h1>
                    <p className="wishlist-count">Your saved celestial treasures ({displayItems.length})</p>
                </header>

                {displayItems.length === 0 ? (
                    <div className="wishlist-empty">
                        <div className="empty-icon-wrapper">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p>Explore the cosmos and save your favorite stars to name them later. Your journey through the galaxy starts here.</p>
                        <Link to="/shop" className="browse-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            Explore Registry
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {displayItems.map(item => (
                            <div key={item.id} className="wishlist-card">
                                <div className="card-image-wrapper">
                                    <button
                                        className="remove-btn"
                                        onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(item.id)}
                                        title="Remove from wishlist"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <img src={item.image} alt={item.name} className="item-image" />
                                </div>
                                <div className="card-content">
                                    <span className="item-badge">{item.type || 'Package'}</span>
                                    <h3>{item.name}</h3>
                                    <p className="item-meta">Official Registry Entry | Digital Tracking</p>

                                    <div className="card-footer">
                                        <div className="item-price">₹{item.price.toLocaleString()}</div>
                                        <button className="move-to-cart-btn" onClick={() => onAddToCart(item)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="9" cy="21" r="1"></circle>
                                                <circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            Move to Cart
                                        </button>
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
