import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="stars-background"></div>
            <div className="hero-overlay"></div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-icon">✨</span>
                        <span>Chosen to name the star for Dr. Ambedkar – trusted by media & 100,000+ customers</span>
                    </div>

                    <h1 className="hero-title">
                        Name a Star in India
                        <br />
                        <span className="text-gradient">Gift a Star with Meaning</span>
                    </h1>

                    <p className="hero-description">
                        Gift a real star in India. Trusted by 100,000+ customers.<br />
                        Official registry – we named the star for Dr. Ambedkar.<br />
                        Instant delivery & mobile app.
                    </p>

                    <div className="hero-actions">
                        <a href="#packages" className="btn btn-primary">
                            <span>Choose Your Package</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="#app" className="btn btn-outline">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <span>See How It Works</span>
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-icon">⭐</div>
                            <div className="stat-number">100,000+</div>
                            <div className="stat-label">Happy Customers</div>
                        </div>
                        <div className="stat">
                            <div className="stat-icon">🌟</div>
                            <div className="stat-number">4.9/5</div>
                            <div className="stat-label">Customer Rating</div>
                        </div>
                        <div className="stat">
                            <div className="stat-icon">⚡</div>
                            <div className="stat-number">15 Min</div>
                            <div className="stat-label">Instant Delivery</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
