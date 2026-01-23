import './Packages.css';

const Packages = ({ onAddToCart }) => {
    const packages = [
        {
            id: 'silvernova',
            name: 'SILVERNOVA',
            subtitle: 'Our Entry Package',
            description: 'A meaningful gift at an unbeatable price – start your journey to the stars!',
            price: 1999,
            features: [
                'Name a guaranteed visible star',
                'Lifetime registration in the International Space Registry',
                'Digital or Physical Package – Includes certificate & documents',
                'Localize your star anytime with our AR app'
            ],
            delivery: {
                digital: 'Ready in 15 minutes',
                physical: 'Arrives in 2–4 days'
            },
            badge: null,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'supernova',
            name: 'SUPERNOVA',
            subtitle: 'Our Most Popular Package',
            description: 'A best-selling gift that shines bright – perfect for any occasion!',
            price: 2999,
            features: [
                'Name a guaranteed visible star in a constellation of your choice',
                'Easier to locate in the night sky',
                'Lifetime registration in the International Space Registry',
                'Digital or Physical Package – Includes certificate & documents',
                'Localize your star anytime with our AR app'
            ],
            delivery: {
                digital: 'Ready in 15 minutes',
                physical: 'Arrives in 2–4 days'
            },
            badge: 'Most Popular',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 'duonova',
            name: 'DUONOVA',
            subtitle: 'A Star Pair',
            description: 'A unique celestial bond – because some stars are meant to shine together!',
            price: 3999,
            features: [
                'Name two guaranteed visible stars that orbit together – a rare and meaningful pairing',
                'Perfect for couples, best friends, or a symbol of eternal connection',
                'Two personalized certificates featuring both stars\' coordinates',
                'Lifetime registration in the International Space Registry',
                'Digital or Physical Package – Includes all documents & certificates',
                'Localize your stars anytime with our AR app'
            ],
            delivery: {
                digital: 'Ready in 15 minutes',
                physical: 'Arrives in 2–4 days'
            },
            badge: null,
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        }
    ];

    return (
        <section id="packages" className="packages section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Discover Our Gift Sets</h2>
                    <p>Choose the perfect package to create an unforgettable memory</p>
                </div>

                <div className="packages-grid">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="package-card">
                            {pkg.badge && (
                                <div className="package-badge" style={{ background: pkg.gradient }}>
                                    {pkg.badge}
                                </div>
                            )}

                            <div className="package-header">
                                <h3 className="package-name">{pkg.name}</h3>
                                <p className="package-subtitle">{pkg.subtitle}</p>
                                <p className="package-description">{pkg.description}</p>
                            </div>

                            <div className="package-price">
                                <span className="currency">₹</span>
                                <span className="amount">{pkg.price.toLocaleString()}</span>
                            </div>

                            <ul className="package-features">
                                {pkg.features.map((feature, index) => (
                                    <li key={index} className="feature-item">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="package-delivery">
                                <div className="delivery-info">
                                    <strong>Delivery:</strong>
                                    <div>Digital Documents: {pkg.delivery.digital}</div>
                                    <div>Gift Package: {pkg.delivery.physical}</div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary package-btn"
                                onClick={() => onAddToCart({
                                    id: pkg.id,
                                    name: pkg.name,
                                    price: pkg.price,
                                    type: 'digital'
                                })}
                                style={{ background: pkg.gradient }}
                            >
                                Name Your Star
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;
