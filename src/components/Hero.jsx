import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const headlines = [
        "Gift a Star. Make Memories Last Forever 🌟",
        "Name a Star After Someone You Love",
        "Give the Universe as a Gift ✨",
        "A Star in the Sky, a Memory in Their Heart",
        "Celebrate Someone Special with a Star"
    ];

    const [currentHeadline, setCurrentHeadline] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeadline((prev) => (prev + 1) % headlines.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [headlines.length]);

    return (
        <section className="hero">
            <div className="stars-background"></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                    </span>
                    <span>Chosen to name the star for Dr. Ambedkar – trusted by media & 100,000+ customers</span>
                </div>

                <h1 className="hero-title">
                    Name a Star in India
                    <br />
                    <span className="text-gradient rotator-text" key={currentHeadline}>
                        {headlines[currentHeadline]}
                    </span>
                </h1>


                <p className="hero-description">
                    A unique, timeless gift that lights up the sky and their heart.<br />
                    Perfect for birthdays, anniversaries, or any special occasion.
                </p>


                <div className="hero-actions">
                    <Link to="/shop" className="btn btn-primary">
                        <span>Shop Now</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <a href="#app" className="btn btn-outline">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>See How It Works</span>
                    </a>
                </div>

                <div className="hero-stats">
                    <div className="stat">
                        <div className="stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div className="stat-number">100,000+</div>
                        <div className="stat-label">Happy Customers</div>
                    </div>
                    <div className="stat">
                        <div className="stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>
                        <div className="stat-number">4.9/5</div>
                        <div className="stat-label">Customer Rating</div>
                    </div>
                    <div className="stat">
                        <div className="stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </div>
                        <div className="stat-number">15 Min</div>
                        <div className="stat-label">Instant Delivery</div>
                    </div>
                </div>
            </div>


            <div className="hero-visual">
                <img src="/src/assets/hero-mandala.png" alt="Glowing Lotus Mandala" className="lotus-mandala-img" />
            </div>
        </section>
    );
};

export default Hero;
