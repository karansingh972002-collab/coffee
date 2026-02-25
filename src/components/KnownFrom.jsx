import './KnownFrom.css';

const KnownFrom = () => {
    const brands = [
        "Hindustan Times",
        "Zee News",
        "ABP News",
        "Dainik Jagran",
        "Times of India",
        "Business Standard"
    ];

    return (
        <section className="known-from py-4">
            <div className="container">
                <div className="known-from-content">
                    <h3 className="known-title">THE STAR NAME IS KNOWN FROM</h3>
                    <div className="marquee-container">
                        <div className="marquee-content">
                            {brands.map((brand, index) => (
                                <div key={`brand-1-${index}`} className="brand-item">
                                    {brand}
                                </div>
                            ))}
                        </div>
                        {/* Duplicate for seamless infinite scroll */}
                        <div className="marquee-content" aria-hidden="true">
                            {brands.map((brand, index) => (
                                <div key={`brand-2-${index}`} className="brand-item">
                                    {brand}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnownFrom;
