import './AppFeatures.css';

const AppFeatures = () => {
    return (
        <section id="app" className="app-features section">
            <div className="container">
                <div className="app-content">
                    <div className="app-text">
                        <h2>Find & Track Your Star with Our App</h2>
                        <p className="app-description">
                            The free Universe Star Finder App uses Augmented Reality to help you
                            locate your star anytime. Simply download the app, enter your registration
                            number, and discover your star with ease!
                        </p>

                        <div className="app-features-list">
                            <div className="app-feature">
                                <div className="feature-icon">🌟</div>
                                <div className="feature-content">
                                    <h4>Augmented Reality</h4>
                                    <p>Point your phone at the sky and see your star highlighted in real-time</p>
                                </div>
                            </div>

                            <div className="app-feature">
                                <div className="feature-icon">📍</div>
                                <div className="feature-content">
                                    <h4>Precise Location</h4>
                                    <p>Get exact coordinates and easy-to-follow directions to your star</p>
                                </div>
                            </div>

                            <div className="app-feature">
                                <div className="feature-icon">📱</div>
                                <div className="feature-content">
                                    <h4>Available on iOS & Android</h4>
                                    <p>Download for free from App Store or Google Play</p>
                                </div>
                            </div>

                            <div className="app-feature">
                                <div className="feature-icon">🔭</div>
                                <div className="feature-content">
                                    <h4>Constellation Guide</h4>
                                    <p>Learn about constellations and celestial objects around your star</p>
                                </div>
                            </div>
                        </div>

                        <div className="app-download-buttons">
                            <button className="btn btn-primary">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                Download on App Store
                            </button>
                            <button className="btn btn-outline">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                </svg>
                                Get it on Google Play
                            </button>
                        </div>
                    </div>

                    <div className="app-visual">
                        <div className="phone-mockup">
                            <div className="phone-screen">
                                <div className="ar-view">
                                    <div className="constellation-dots">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot highlighted"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                    <div className="star-label">
                                        <div className="label-text">Your Star ⭐</div>
                                        <div className="label-coords">RA: 12h 34m 56s | Dec: +45° 12' 34"</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppFeatures;
