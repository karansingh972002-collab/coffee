import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Is my star registration permanent?',
            answer: 'Yes – your star is registered permanently and without any extra fees in the International Space Register (ISR). There are no subscriptions, no hidden costs, and your registration never expires.'
        },
        {
            question: 'Can I actually see my star in the night sky?',
            answer: 'Absolutely! Every star we assign is visible from India – and thanks to our Universe Star Finder App with Augmented Reality, you can easily locate your star on your smartphone by simply pointing it to the night sky.'
        },
        {
            question: 'How quickly will I receive my star certificate?',
            answer: 'You\'ll receive your digital certificate instantly via email, ready to gift. The physical gift set is shipped within 3–5 working days with free delivery across India.'
        },
        {
            question: 'What exactly do I receive with my star naming package?',
            answer: 'You receive: Your own named star with official entry in the International Space Register (ISR), a personalized certificate with exact celestial coordinates, instant digital version by email, a premium gift folder (with physical order), free shipping across India, and full access to the Universe Star Finder App (Android & iOS).'
        },
        {
            question: 'What makes Duonova different from other packages?',
            answer: 'Duonova includes two stars that orbit each other, and comes with two personalized certificates – ideal for couples, best friends or siblings.'
        },
        {
            question: 'Was a star really named after Dr. B. R. Ambedkar?',
            answer: 'Yes, a star was officially named after Dr. B. R. Ambedkar through our platform – the International Space Register. This historic gesture was initiated by Raju Shinde, who registered the star under CX26529US. It was made visible to millions on April 14, Ambedkar Jayanti, via our app. This event received massive national media coverage from Times of India, NDTV, India Today, Zee News, Aaj Tak, News18, and many more.'
        },
        {
            question: 'How do I find my star using the app?',
            answer: 'Just download the Universe Star Finder App, enter your star\'s registration number, and hold your phone up to the night sky. Our Augmented Reality view will guide you directly to your star – available on Android & iOS.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We support secure payments via Razorpay, including: UPI (Google Pay, PhonePe, Paytm, BHIM, etc.), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Netbanking (All major Indian banks), Wallets (Mobikwik, Freecharge, Airtel Money), and Pay Later options (Simpl, LazyPay).'
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq section">
            <div className="faq-container">
                <div className="section-header text-center">
                    <span className="section-badge fade-in">Assistance</span>
                    <div className="header-title-wrapper">
                        <div className="header-decoration left"></div>
                        <h2 className="premium-title">Everything You Need to Know</h2>
                        <div className="header-decoration right"></div>
                    </div>
                    <p className="section-subtitle fade-in">Before <span className="magic-text">naming your star</span></p>
                </div>

                <div className="faq-list">
                    <div className="faq-column">
                        {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={openIndex === index}
                                >
                                    <span>{faq.question}</span>
                                    <div className="faq-icon-wrapper">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="faq-icon">
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </button>
                                <div className="faq-answer-container">
                                    <div className="faq-answer">
                                        <p className="faq-answer-content">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="faq-column">
                        {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, relativeIndex) => {
                            const index = relativeIndex + Math.ceil(faqs.length / 2);
                            return (
                                <div
                                    key={index}
                                    className={`faq-item ${openIndex === index ? 'open' : ''}`}
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => toggleFAQ(index)}
                                        aria-expanded={openIndex === index}
                                    >
                                        <span>{faq.question}</span>
                                        <div className="faq-icon-wrapper">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="faq-icon">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </div>
                                    </button>
                                    <div className="faq-answer-container">
                                        <div className="faq-answer">
                                            <p className="faq-answer-content">{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
