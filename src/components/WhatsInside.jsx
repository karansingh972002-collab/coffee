import './WhatsInside.css';
import giftPackage from '../assets/gift-package.png';
import certificatePreview from '../assets/certificate-preview.png';
import starMapPreview from '../assets/star-map-preview.png';

const WhatsInside = () => {
    const items = [
        {
            icon: '📜',
            title: 'Personalized Certificate',
            description: 'Beautifully printed and customized for the recipient, this certificate includes the star name, dedication date, and coordinates. Enhanced with an elegant embossed seal.'
        },
        {
            icon: '📁',
            title: 'Elegant Presentation Folder',
            description: 'Stylish and durable – your documents are elegantly presented in a premium folder that combines protection with a high-quality look.'
        },
        {
            icon: '🗺️',
            title: 'XXL Star Map',
            description: 'This stunning poster showcases a breathtaking view of the night sky, making it a beautiful decorative piece for any space.'
        },
        {
            icon: '✉️',
            title: 'Official Confirmation Letter',
            description: 'An official companion letter that clearly summarizes the key details of your star naming and adds an exclusive touch to your gift.'
        },
        {
            icon: '💳',
            title: 'Authentication Card',
            description: 'A convenient, wallet-sized card that verifies the authenticity of your star naming. It includes all relevant registration details.'
        },
        {
            icon: '💌',
            title: 'Custom Greeting Card',
            description: 'Create a heartfelt message! The greeting card provides plenty of space for your words, making your gift even more personal and meaningful.'
        },
        {
            icon: '📱',
            title: 'Universe Star Finder App (AR)',
            description: 'Point your smartphone at the night sky, and the app will use Augmented Reality to show you the exact location of your star.'
        },
        {
            icon: '📖',
            title: 'Mini Guide "Star Facts"',
            description: 'Our compact booklet offers fascinating insights into astronomy and explains what makes stars and galaxies so extraordinary.'
        }
    ];

    return (
        <section id="whats-inside" className="whats-inside section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>What's Inside Your Gift Set</h2>
                    <p>With every set, you receive everything needed for an unforgettable gift</p>
                </div>

                <div className="visual-showcase">
                    <div className="showcase-main">
                        <img src={giftPackage} alt="Premium Star Naming Gift Package" className="showcase-image main-image" />
                    </div>
                    <div className="showcase-secondary">
                        <div className="showcase-item">
                            <img src={certificatePreview} alt="Star Naming Certificate" className="showcase-image" />
                            <p className="showcase-label">Personalized Certificate</p>
                        </div>
                        <div className="showcase-item">
                            <img src={starMapPreview} alt="XXL Star Map" className="showcase-image" />
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
