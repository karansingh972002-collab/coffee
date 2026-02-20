import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Priya Sharma',
            title: 'I named a star for my daughter ❤️',
            text: 'I never thought such a perfect gift existed, but naming a star for my daughter made it possible.',
            rating: 5
        },
        {
            name: 'Rahul Verma',
            title: 'From a prank to the coolest gift ever!',
            text: 'At first, I thought my buddy was joking... but this turned out to be the most incredible gift ever!',
            rating: 5
        },
        {
            name: 'Anjali & Vikram',
            title: 'What an exciting gift!',
            text: 'We\'ve been married for over 25 years, and finding a new and exciting gift is really difficult. But now, we\'ve finally found one!',
            rating: 5
        },
        {
            name: 'Arjun Patel',
            title: '5 Reasons Not to Name a Star (Ironically)',
            text: 'Too emotional, too unique, too unforgettable... yeah, naming a star is definitely a bad idea. 😜',
            rating: 5
        },
        {
            name: 'Meera Singh',
            title: 'The Perfect Birthday Gift for My Daughter!',
            text: 'I wanted something truly unique for my daughter\'s birthday—she was so excited and couldn\'t wait to find her star with me!',
            rating: 5
        }
    ];

    return (
        <section id="testimonials" className="testimonials section">
            <div className="testimonials-container">
                <div className="section-header text-center">
                    <h2>Be Inspired</h2>
                    <p>Experience the magic of star naming through our community</p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="star">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    </span>
                                ))}
                            </div>
                            <h4 className="testimonial-title">{testimonial.title}</h4>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">— {testimonial.name}</div>
                        </div>
                    ))}
                </div>

                <div className="trustpilot-section">
                    <div className="trustpilot-badge">
                        <div className="trustpilot-stars">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span key={i} className="tp-star">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#00b67a" stroke="none">
                                        <path d="M23.9986 9.6l-9.1432 0-2.8335-8.7L9.1906 9.6L.0452 9.6l7.387 5.378-2.822 8.685 7.412-5.395 7.411 5.395-2.822-8.685 7.389-5.378z"></path>
                                    </svg>
                                </span>
                            ))}
                        </div>
                        <div className="trustpilot-text">
                            <strong>Excellent</strong> 4.9 out of 5
                        </div>
                        <div className="trustpilot-reviews">
                            Based on 100,000+ reviews
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
