import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.webp';
import heroBgMobile from '../assets/hero-bg-mobile.webp';
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
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        const timer = setInterval(() => {
            setCurrentHeadline((prev) => (prev + 1) % headlines.length);
        }, 4000);

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) * 100;
            const y = (clientY / window.innerHeight) * 100;
            requestAnimationFrame(() => {
                setMousePos({ x, y });
            });
        };

        // Only track mouse on desktop to save battery/CPU on mobile
        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [headlines.length, isMobile]);

    // Optimize star generation by memoizing it
    const starField = useState(() => [...Array(20)].map((_, i) => ({
        key: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.2
    })))[0];

    return (
        <section id="hero" className="hero" style={{
            '--mouse-x': `${mousePos.x}%`,
            '--mouse-y': `${mousePos.y}%`,
            backgroundImage: `url(${isMobile ? heroBgMobile : heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="stars-background"></div>
            <div className="nebula-overlay"></div>
            <div className="parallax-layer" style={{
                transform: `translate(calc(var(--mouse-x) * -0.1), calc(var(--mouse-y) * -0.1))`
            }}>
                {starField.map(star => (
                    <div key={star.key} className="parallax-star" style={{
                        left: star.left,
                        top: star.top,
                        animationDelay: star.animationDelay,
                        opacity: star.opacity
                    }}></div>
                ))}
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                    </span>
                    <span>Chosen to name the star for Dr. Ambedkar – trusted by media and astronomy enthusiasts</span>
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

            </div>

            <div className="hero-visual">
                <img src="/src/assets/hero-mandala.svg" alt="Glowing Lotus Mandala" className="lotus-mandala-img" fetchpriority="high" loading="eager" />
            </div>
        </section >
    );
};

export default Hero;
