import './TrustBadge.css';

const TrustBadge = () => {
    return (
        <section className="trust-badge">
            <div className="container">
                <div className="trust-content">
                    <div className="trust-item">
                        <div className="trust-icon">🏆</div>
                        <div className="trust-text">
                            <div className="trust-title">Official Registry</div>
                            <div className="trust-subtitle">International Space Registry</div>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">⭐</div>
                        <div className="trust-text">
                            <div className="trust-title">4.9/5 Rating</div>
                            <div className="trust-subtitle">100,000+ Reviews</div>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">🚀</div>
                        <div className="trust-text">
                            <div className="trust-title">Instant Delivery</div>
                            <div className="trust-subtitle">Digital in 15 Minutes</div>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">📱</div>
                        <div className="trust-text">
                            <div className="trust-title">AR App Included</div>
                            <div className="trust-subtitle">Find Your Star Easily</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustBadge;
