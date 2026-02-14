import { useParams, Link } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({ onAddToCart }) => {
    // In a real app, we'd fetch based on ID. 
    // For this demo, we'll use the ID from URL to show specific packages or default to Supernova.
    const { id } = useParams();

    const allPackages = {
        'silvernova-digital': {
            name: 'Silvernova - Digital',
            type: 'Standard Package',
            price: 1999,
            features: [
                'Guaranteed visible star naming',
                'Official Entry in International Space Registry',
                'Digital High-Resolution Certificate',
                'Star Map with celestial coordinates',
                'Localize with AR Sky App'
            ],
            description: 'Start your cosmic legacy with our Silvernova Digital package. Perfect for those who want a meaningful celestial connection without physical shipping wait times.',
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=80',
            badge: 'Essential Choice'
        },
        'supernova-gift': {
            name: 'Supernova - Gift Pack',
            type: 'Premium Gift Set',
            price: 3499,
            features: [
                'Name the brightest star in a constellation',
                'Premium Gold-Foil Physical Certificate',
                'Elegant Presentation Gift Box',
                'Star Registry ID Card & Sky Map',
                'Lifetime digital entry + AR App access'
            ],
            description: 'The Supernova Gift Pack is our most coveted offering. It includes a stunning physical presentation kit that makes for an unforgettable unwrapping experience.',
            image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1200&q=80',
            badge: 'Most Popular'
        },
        // Using 'supernova-gift' as default for generic ID or 1
    };

    const product = allPackages[id] || allPackages['supernova-gift'];

    return (
        <div className="product-details-page">
            <div className="product-details-container">
                <nav className="breadcrumb-nav">
                    <Link to="/shop">Store</Link> / <span>{product.name}</span>
                </nav>

                <div className="product-layout">
                    <div className="product-visual">
                        <div className="main-image-wrapper glass">
                            <img src={product.image} alt={product.name} className="main-product-image" />
                            {product.badge && <div className="product-status-badge">{product.badge}</div>}
                        </div>
                    </div>

                    <div className="product-content">
                        <div className="content-inner glass">
                            <span className="product-type-badge">{product.type}</span>
                            <h1>{product.name}</h1>

                            <div className="price-tag">
                                <span className="currency">₹</span>
                                <span className="amount">{product.price.toLocaleString()}</span>
                            </div>

                            <p className="product-description">{product.description}</p>

                            <div className="feature-list-section">
                                <h3>What's Included:</h3>
                                <ul className="details-features">
                                    {product.features.map((feature, index) => (
                                        <li key={index}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="purchase-actions">
                                <button className="add-to-cart-big" onClick={() => onAddToCart(product)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    Name Your Star Now
                                </button>
                                <button className="wishlist-btn-large" title="Add to Wishlist">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="shipping-notice">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="3" width="15" height="13"></rect>
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                                </svg>
                                <span>Free Express Shipping in India (2-4 Days)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
