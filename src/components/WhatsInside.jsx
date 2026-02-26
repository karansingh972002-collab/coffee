import { useState, useMemo, useEffect } from 'react';
import './WhatsInside.css';
import giftPackage from '../assets/gift-package.webp';
import certificatePreview from '../assets/certificate-preview.webp';
import starMapPreview from '../assets/star-map-preview.webp';

const WhatsInside = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const items = [
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
            title: 'Personalized Certificate',
            description: 'Beautifully printed and customized for the recipient, this certificate includes the star name, dedication date, and coordinates.',
            color: '#818cf8'
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
            ),
            title: 'Elegant Presentation Folder',
            description: 'Stylish and durable – your documents are elegantly presented in a premium folder with a high-quality look.',
            color: '#a78bfa'
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
            ),
            title: 'XXL Star Map',
            description: 'This stunning poster showcases a breathtaking view of the night sky, making it a beautiful decorative piece.',
            color: '#f472b6'
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            title: 'Official Confirmation Letter',
            description: 'An official companion letter that summarizes the key details of your star naming with an exclusive touch.',
            color: '#60a5fa'
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            ),
            title: 'Authentication Card',
            description: 'A convenient, wallet-sized card that verifies the authenticity of your star naming with all registration details.',
            color: '#34d399'
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            ),
            title: 'Custom Greeting Card',
            description: 'Create a heartfelt message! The greeting card provides space for your words, making your gift personal and meaningful.',
            color: '#fb7185'
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
            ),
            title: 'Star Finder App (AR)',
            description: 'Point your smartphone at the night sky, and the app will use Augmented Reality to show you the exact location of your star.',
            color: '#fbbf24'
        },
        {
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            ),
            title: 'Mini Guide "Star Facts"',
            description: 'Our compact booklet offers fascinating insights into astronomy explaining what makes stars and galaxies extraordinary.',
            color: '#c084fc'
        }
    ];

    const particles = useMemo(() => {
        const count = isMobile ? 8 : 20;
        return [...Array(count)].map((_, i) => ({
            key: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
        }));
    }, [isMobile]);

    return (
        <section id="whats-inside" className="whats-inside section">
            {/* Floating particles background */}
            <div className="wi-particles">
                {particles.map(particle => (
                    <div key={particle.key} className="wi-particle" style={{
                        left: particle.left,
                        top: particle.top,
                        animationDelay: particle.animationDelay,
                        animationDuration: particle.animationDuration,
                        width: particle.width,
                        height: particle.height,
                    }} />
                ))}
            </div>

            <div className="whats-inside-container">
                <div className="section-header text-center">
                    <span className="section-badge fade-in">
                        <span className="badge-dot"></span>
                        Premium Collection
                    </span>
                    <div className="header-title-wrapper">
                        <div className="header-decoration left"></div>
                        <h2 className="premium-title">A World of Magic in One Box</h2>
                        <div className="header-decoration right"></div>
                    </div>
                    <p className="section-subtitle fade-in">
                        With every set, you receive everything needed for an{' '}
                        <span className="magic-text">unforgettable gift experience</span>
                    </p>
                </div>

                {/* Visual showcase with 3D tilt effect */}
                <div className="visual-showcase">
                    <div className="showcase-main">
                        <div className="showcase-glow"></div>
                        <div className="showcase-ring"></div>
                        <img src={giftPackage} alt="Premium Star Naming Gift Package" className="showcase-image main-image" loading="lazy" />
                    </div>
                    <div className="showcase-secondary">
                        <div className="showcase-item">
                            <div className="showcase-item-inner">
                                <img src={certificatePreview} alt="Star Naming Certificate" className="showcase-image" loading="lazy" />
                                <div className="showcase-item-info">
                                    <p className="showcase-label">Personalized Certificate</p>
                                    <span className="showcase-tag">Included</span>
                                </div>
                            </div>
                        </div>
                        <div className="showcase-item">
                            <div className="showcase-item-inner">
                                <img src={starMapPreview} alt="XXL Star Map" className="showcase-image" loading="lazy" />
                                <div className="showcase-item-info">
                                    <p className="showcase-label">XXL Star Map</p>
                                    <span className="showcase-tag">Bonus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced items grid with numbering */}
                <div className="wi-grid-header">
                    <h3 className="wi-grid-title">Everything in Your Package</h3>
                    <p className="wi-grid-subtitle">{items.length} premium items included</p>
                </div>

                <div className="items-grid">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`inside-item ${activeItem === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveItem(index)}
                            onMouseLeave={() => setActiveItem(null)}
                            style={{ '--item-color': item.color }}
                        >
                            <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
                            <div className="item-icon-wrapper">
                                <div className="item-icon" style={{ color: item.color }}>
                                    {item.icon}
                                </div>
                                <div className="item-icon-ring"></div>
                            </div>
                            <h3 className="item-title">{item.title}</h3>
                            <p className="item-description">{item.description}</p>
                            <div className="item-shine"></div>
                        </div>
                    ))}
                </div>

                {/* Enhanced CTA box */}
                <div className="cta-box">
                    <div className="cta-aurora"></div>
                    <div className="cta-content">
                        <div className="cta-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                        </div>
                        <h3>Make Your Gift Even More Special</h3>
                        <p>Get a free XXL Star Poster with all physical packages & a mystery celestial gift with every order!</p>
                        <a href="#packages" className="cta-btn">
                            <span>Choose Package & Claim</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatsInside;
