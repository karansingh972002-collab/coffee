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
                    <div className="brand-strip mt-3">
                        {brands.map((brand, index) => (
                            <div key={index} className="brand-item">
                                {brand}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KnownFrom;
