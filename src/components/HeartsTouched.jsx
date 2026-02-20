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
                        <h2 className="hearts-title mb-3">
                            A Community of Celestial Givers
                        </h2>
                        <p className="hearts-subtitle lead mx-auto">
                            Join thousands of people around the world who have created
                            eternal memories with our official star naming certificates.
                            A gift that truly lasts a lifetime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeartsTouched;
