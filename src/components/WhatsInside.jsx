import './WhatsInside.css';
import giftPackage from '../assets/gift-package.png';
import certificatePreview from '../assets/certificate-preview.png';
import starMapPreview from '../assets/star-map-preview.png';

const WhatsInside = () => {
    const items = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            ),
            title: 'Personalized Certificate',
            description: 'Beautifully printed and customized for the recipient, this certificate includes the star name, dedication date, and coordinates. Enhanced with an elegant embossed seal.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
            ),
            title: 'Elegant Presentation Folder',
            description: 'Stylish and durable – your documents are elegantly presented in a premium folder that combines protection with a high-quality look.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
            ),
            title: 'XXL Star Map',
            description: 'This stunning poster showcases a breathtaking view of the night sky, making it a beautiful decorative piece for any space.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            ),
            title: 'Official Confirmation Letter',
            description: 'An official companion letter that clearly summarizes the key details of your star naming and adds an exclusive touch to your gift.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
            ),
            title: 'Authentication Card',
            description: 'A convenient, wallet-sized card that verifies the authenticity of your star naming. It includes all relevant registration details.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            ),
            title: 'Custom Greeting Card',
            description: 'Create a heartfelt message! The greeting card provides plenty of space for your words, making your gift even more personal and meaningful.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
            ),
            title: 'Universe Star Finder App (AR)',
            description: 'Point your smartphone at the night sky, and the app will use Augmented Reality to show you the exact location of your star.'
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            ),
            title: 'Mini Guide "Star Facts"',
            description: 'Our compact booklet offers fascinating insights into astronomy and explains what makes stars and galaxies so extraordinary.'
        }
    ];

    return (
        <section id="whats-inside" className="whats-inside section">
            <div className="whats-inside-container">
                <div className="section-header text-center">
                    <span className="section-badge fade-in">Premium Collection</span>
                    <div className="header-title-wrapper">
                        <div className="header-decoration left"></div>
                        <h2 className="premium-title">A World of Magic in One Box</h2>
                        <div className="header-decoration right"></div>
                    </div>
                    <p className="section-subtitle fade-in">With every set, you receive everything needed for an <span className="magic-text">unforgettable gift experience</span></p>
                </div>

                <div className="visual-showcase">
                    <div className="showcase-main">
                        <img src={giftPackage} alt="Premium Star Naming Gift Package" className="showcase-image main-image" loading="lazy" />
                    </div>
                    <div className="showcase-secondary">
                        <div className="showcase-item">
                            <img src={certificatePreview} alt="Star Naming Certificate" className="showcase-image" loading="lazy" />
                            <p className="showcase-label">Personalized Certificate</p>
                        </div>
                        <div className="showcase-item">
                            <img src={starMapPreview} alt="XXL Star Map" className="showcase-image" loading="lazy" />
                            <p className="showcase-label">XXL Star Map</p>
                        </div>
                    </div>
                </div>

                <div className="items-grid">
                    {items.map((item, index) => (
                        <div key={index} className="inside-item">
                            <div className="item-icon">{item.icon}</div>
                            <h3 className="item-title">{item.title}</h3>
                            <p className="item-description">{item.description}</p>
                        </div>
                    ))}
                </div>

                <div className="cta-box">
                    <h3>Make Your Gift Even More Special</h3>
                    <p>Get a free XXL Star Poster with all physical packages & a mystery celestial gift with every order!</p>
                    <a href="#packages" className="btn btn-secondary">
                        Choose Package & Claim
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WhatsInside;
