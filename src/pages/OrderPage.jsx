import './OrderPage.css';
import TrustBadge from '../components/TrustBadge';
import Packages from '../components/Packages';
import WhatsInside from '../components/WhatsInside';
import FAQ from '../components/FAQ';
import PackageComparison from '../components/PackageComparison';
import StarCustomizer from '../components/StarCustomizer';
import HeartsTouched from '../components/HeartsTouched';
import { useEffect, useState } from 'react';

const OrderPage = ({ onAddToCart }) => {
    const [selectedPkg, setSelectedPkg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Order Your Star | Official Star Naming Registry";
    }, []);

    const handleCustomize = (pkg) => {
        setSelectedPkg(pkg);
        setIsModalOpen(true);
    };

    const handleConfirmCustomization = (customizedPkg) => {
        onAddToCart({
            id: customizedPkg._id,
            name: customizedPkg.name,
            price: customizedPkg.price,
            type: customizedPkg.type,
            image: customizedPkg.image,
            customization: customizedPkg.customization
        });
    };

    return (
        <div className="order-page">
            {/* --- PREMIUM HERO --- */}
            <div className="order-hero py-5 text-center">
                <div className="container">
                    <div className="section-badge mb-3">⭐ India's #1 Star Registry</div>
                    <h1 className="display-3 mb-4">Name a Star – Choose Your Perfect Package</h1>
                    <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: '750px' }}>
                        Create an eternal memory with our official star naming gift sets. Get a visible star,
                        official registration, and a premium folder delivered across India.
                    </p>

                </div>
            </div>

            {/* --- COMPACT TRUST BADGES --- */}
            <div className="compact-trust bg-dark py-3">
                <div className="container d-flex justify-content-center flex-wrap gap-4 text-muted small">
                    <div className="trust-item"><i className="fas fa-check-circle text-primary"></i> Official Registry</div>
                    <div className="trust-item"><i className="fas fa-truck text-primary"></i> 2-4 Day Delivery</div>
                    <div className="trust-item"><i className="fas fa-file-pdf text-primary"></i> Instant Digital Documents</div>
                </div>
            </div>

            {/* --- PACKAGE SELECTION --- */}
            <div className="packages-section py-5">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <h2>Select Your Package</h2>
                        <p>Our most popular gift sets for every occasion</p>
                    </div>
                    <Packages onAddToCart={onAddToCart} onCustomize={handleCustomize} />
                </div>
            </div>

            {/* --- COMPARISON TABLE --- */}
            <PackageComparison />

            {/* --- WHAT'S INSIDE --- */}
            <div className="whats-inside-wrapper bg-dark-alt py-5">
                <WhatsInside />
            </div>

            {/* --- HEARTS TOUCHED --- */}
            <HeartsTouched />

            {/* --- PAYMENT TRUST --- */}
            <div className="payment-trust py-5 text-center">
                <div className="container">
                    <h5 className="mb-4 text-muted">Safe & Secure Checkout</h5>
                    <div className="payment-icons opacity-50 d-flex justify-content-center gap-4 flex-wrap">
                        {/* Placeholders for payment icons */}
                        <div className="payment-icon">UPI</div>
                        <div className="payment-icon">VISA</div>
                        <div className="payment-icon">MASTERCARD</div>
                        <div className="payment-icon">NETBANKING</div>
                    </div>
                </div>
            </div>

            {/* --- FAQ --- */}
            <div className="faq-section py-5">
                <div className="container">
                    <FAQ />
                </div>
            </div>

            <StarCustomizer
                pkg={selectedPkg}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmCustomization}
            />
        </div>
    );
};

export default OrderPage;
