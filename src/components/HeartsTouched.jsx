import './HeartsTouched.css';

const HeartsTouched = () => {
    return (
        <section className="hearts-touched py-5 overflow-hidden">
            <div className="container position-relative">
                <div className="hearts-bg-glow"></div>
                <div className="row align-items-center justify-content-center text-center">
                    <div className="col-lg-10">
                        <div className="heart-icon-wrapper mb-4">
                            <div className="main-heart">❤️</div>
                            <div className="floating-hearts">
                                <span className="float-heart h1">❤️</span>
                                <span className="float-heart h2">❤️</span>
                                <span className="float-heart h3">❤️</span>
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
