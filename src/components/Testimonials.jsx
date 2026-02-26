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
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card glass">
                            <div className="testimonial-rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <span key={i} className="star">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    </span>
                                ))}
                            </div>
                            <h4 className="testimonial-title">{testimonial.title}</h4>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">{testimonial.name}</div>
                        </div>
                    ))}
                </div>

                <div className="trustpilot-section fade-in">
                    <div className="trustpilot-badge glass">
                        <div className="trustpilot-stars">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#00b67e">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        <div className="trustpilot-text">Rated Excellent on <strong>Trustpilot</strong></div>
                        <div className="trustpilot-reviews">Based on 1,200+ global registry reviews</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
