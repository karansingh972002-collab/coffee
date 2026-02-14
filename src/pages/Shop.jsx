import { useState } from 'react';
import './Shop.css';

const Shop = ({ onAddToCart }) => {
    const [filterType, setFilterType] = useState('All');

    // Star Naming Products
    const products = [
        {
            id: 'silvernova-digital',
            name: 'Silvernova - Digital',
            type: 'Standard',
            price: 1999,
            features: 'Visible Star | Digital Cert',
            image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=800&q=80',
            badge: 'Entry Level'
        },
        {
            id: 'silvernova-gift',
            name: 'Silvernova - Gift Pack',
            type: 'Standard',
            price: 2499,
            features: 'Visible Star | Physical Pack',
            image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=80',
            badge: 'Best Value'
        },
        {
            id: 'supernova-digital',
            name: 'Supernova - Digital',
            type: 'Premium',
            price: 2999,
            features: 'Brightest Star | Constellation Choice',
            image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
            badge: 'Most Popular'
        },
        {
            id: 'supernova-gift',
            name: 'Supernova - Gift Pack',
            type: 'Premium',
            price: 3499,
            features: 'Brightest Star | Full Gift Set',
            image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=800&q=80',
            badge: 'Top Choice'
        },
        {
            id: 'duonova-digital',
            name: 'Duonova - Digital',
            type: 'Binary',
            price: 3999,
            features: 'Two Stars | Orbiting Pair',
            image: 'https://images.unsplash.com/photo-1506318137071-a8bcbf675b27?auto=format&fit=crop&w=800&q=80',
            badge: 'Romantic Gift'
        },
        {
            id: 'duonova-gift',
            name: 'Duonova - Gift Pack',
            type: 'Binary',
            price: 4499,
            features: 'Two Stars | Premium Double Set',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            badge: 'Luxury'
        },
    ];

    const filteredProducts = filterType === 'All'
        ? products
        : products.filter(p => p.type === filterType);

    return (
        <div className="shop-page">
            <div className="shop-container">
                <div className="section-header text-center">
                    <div className="section-badge">Celestial Gifts</div>
                    <h2>Name a Star</h2>
                    <p>Choose from our range of official star naming packages. The perfect gift for any occasion.</p>
                </div>

                <div className="shop-grid">
                    <aside className="filters-sidebar">
                        <h5>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="21" x2="4" y2="14"></line>
                                <line x1="4" y1="10" x2="4" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12" y2="3"></line>
                                <line x1="20" y1="21" x2="20" y2="16"></line>
                                <line x1="20" y1="12" x2="20" y2="3"></line>
                                <line x1="1" y1="14" x2="7" y2="14"></line>
                                <line x1="9" y1="8" x2="15" y2="8"></line>
                                <line x1="17" y1="16" x2="23" y2="16"></line>
                            </svg>
                            Filters
                        </h5>
                        <div className="filter-group">
                            <label className="filter-label">Package Type</label>
                            <select className="custom-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="All">All Packages</option>
                                <option value="Standard">Standard (Silvernova)</option>
                                <option value="Premium">Premium (Supernova)</option>
                                <option value="Binary">Binary (Duonova)</option>
                            </select>
                        </div>
                    </aside>

                    <main className="products-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image-container">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    {product.badge && <div className="product-badge">{product.badge}</div>}
                                </div>
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <div className="product-specs">
                                        <span>{product.type}</span> • <span>{product.features}</span>
                                    </div>
                                    <div className="product-footer">
                                        <div className="product-price">₹{product.price.toLocaleString()}</div>
                                        <button className="add-cart-btn" onClick={() => onAddToCart(product)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="9" cy="21" r="1"></circle>
                                                <circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Shop;
