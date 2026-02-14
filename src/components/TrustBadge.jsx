import './TrustBadge.css';

const TrustBadge = () => {
    return (
        <section className="trust-badge">
            <div className="container">
                <div className="trust-content">
                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </div>
                        <div className="trust-text">
                            <div className="trust-title">Official Registry</div>
                            <div className="trust-subtitle">International Space Registry</div>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>
                        <div className="trust-text">
                            <div className="trust-title">4.9/5 Rating</div>
                            <div className="trust-subtitle">100,000+ Reviews</div>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                            </svg>
                        </div>
                        <div className="trust-text">
                            <div className="trust-title">Instant Delivery</div>
                            <div className="trust-subtitle">Digital in 15 Minutes</div>
                        </div>
                    </div>

                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                <line x1="12" y1="18" x2="12.01" y2="18"></line>
                            </svg>
                        </div>
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
