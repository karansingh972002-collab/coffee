import './HeartsTouched.css';

const HeartsTouched = () => {
    return (
        <section className="hearts-touched py-5 overflow-hidden">
            <div className="container position-relative">
                <div className="hearts-bg-glow"></div>
                <div className="row align-items-center justify-content-center text-center">
                    <div className="col-lg-10">
                        <div className="heart-icon-wrapper mb-4">
                            <div className="main-heart">
                                <svg width="72" height="72" viewBox="0 0 24 24" fill="url(#mainGrad)">
                                    <defs>
                                        <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f472b6" />
                                            <stop offset="100%" stopColor="#818cf8" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <div className="floating-hearts">
                                <span className="float-heart h1"><svg width="32" height="32" viewBox="0 0 24 24" fill="url(#mainGrad)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
                                <span className="float-heart h2"><svg width="24" height="24" viewBox="0 0 24 24" fill="url(#mainGrad)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
                                <span className="float-heart h3"><svg width="28" height="28" viewBox="0 0 24 24" fill="url(#mainGrad)"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg></span>
                            </div>
                        </div>
                        <div className="section-header text-center">
                            <span className="section-badge fade-in">Community</span>
                            <div className="header-title-wrapper">
                                <div className="header-decoration left"></div>
                                <h2 className="premium-title">Hearts Touched by Stars</h2>
                                <div className="header-decoration right"></div>
                            </div>
                            <p className="section-subtitle lead mx-auto fade-in">
                                Join thousands of people around the world who have created
                                <span className="magic-text"> eternal memories</span> with our official star naming certificates.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeartsTouched;
