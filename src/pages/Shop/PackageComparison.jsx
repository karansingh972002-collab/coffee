import './PackageComparison.css';

const PackageComparison = () => {
    const features = [
        { name: 'Star Registry Entry', silver: true, super: true, duo: true },
        { name: 'Digital Certificate', silver: true, super: true, duo: true },
        { name: 'Star Map (PDF)', silver: true, super: true, duo: true },
        { name: 'Constellation Choice', silver: false, super: true, duo: true },
        { name: 'Printed Certificate & Folder', silver: 'Optional', super: true, duo: true },
        { name: 'Double Star Registration', silver: false, super: false, duo: true },
        { name: 'Premium Gift Box', silver: false, super: 'Optional', duo: true },
    ];

    return (
        <section className="comparison-section py-5">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2>Compare Our Packages</h2>
                    <p>Find the perfect gift for your special moment</p>
                </div>

                <div className="table-responsive">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Silvernova</th>
                                <th>Supernova</th>
                                <th>Duonova</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, idx) => (
                                <tr key={idx}>
                                    <td className="feature-name">{feature.name}</td>
                                    <td className={feature.silver === true ? 'included' : 'not-included'}>
                                        {feature.silver === true ? '✓' : feature.silver === false ? '✕' : feature.silver}
                                    </td>
                                    <td className={feature.super === true ? 'included' : 'not-included'}>
                                        {feature.super === true ? '✓' : feature.super === false ? '✕' : feature.super}
                                    </td>
                                    <td className={feature.duo === true ? 'included' : 'not-included'}>
                                        {feature.duo === true ? '✓' : feature.duo === false ? '✕' : feature.duo}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default PackageComparison;
