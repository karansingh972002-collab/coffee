import { useState, useEffect } from 'react';
import './LivePurchase.css';

const LivePurchase = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [purchase, setPurchase] = useState(null);

    const locations = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur"];
    const packages = ["Silvernova Gift Set", "Supernova Gift Set", "Duonova Gift Set", "Zodiac Star Gift Set"];
    const names = ["Karan", "Anjali", "Vikram", "Sneha", "Rahul", "Pooja", "Amit", "Meera", "Rohan", "Sonal"];

    useEffect(() => {
        const showNotification = () => {
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomPackage = packages[Math.floor(Math.random() * packages.length)];
            const randomName = names[Math.floor(Math.random() * names.length)];

            setPurchase({
                location: randomLocation,
                package: randomPackage,
                name: randomName,
                time: "just now"
            });

            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 5000);
        };

        // Initial delay
        const initialDelay = setTimeout(showNotification, 10000);

        // Periodic interval
        const interval = setInterval(() => {
            showNotification();
        }, 30000); // Every 30 seconds

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, []);

    if (!purchase) return null;

    return (
        <div className={`live-purchase-toast ${isVisible ? 'visible' : ''}`}>
            <div className="live-purchase-content">
                <div className="live-purchase-icon">⭐</div>
                <div className="live-purchase-text">
                    <p className="purchase-info">
                        <strong>{purchase.name}</strong> from <strong>{purchase.location}</strong>
                        ordered a <strong>{purchase.package}</strong>
                    </p>
                    <p className="purchase-time">{purchase.time}</p>
                </div>
                <button className="close-toast" onClick={() => setIsVisible(false)}>&times;</button>
            </div>
        </div>
    );
};

export default LivePurchase;
