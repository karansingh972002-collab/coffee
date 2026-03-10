import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './OrderSuccess.css';

const OrderSuccess = () => {
    // Get the latest order ID from sessionStorage (if set by checkout)
    const [orderId] = useState(() => sessionStorage.getItem('lastOrderId') || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Keep the order ID in storage so it persists on refresh
        if (orderId && !sessionStorage.getItem('lastOrderId')) {
            sessionStorage.setItem('lastOrderId', orderId);
        }
    }, [orderId]);

    const copyOrderId = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="success-page">
            {/* CSS Confetti */}
            <div className="confetti-container">
                {[...Array(20)].map((_, i) => <div key={i} className="confetti"></div>)}
            </div>

            <div className="success-card glass">
                <div className="success-icon-container">
                    <div className="success-icon">✨</div>
                    <div className="icon-glow"></div>
                </div>
                <h2>A New Star Is Born!</h2>
                <p className="success-lead">
                    Your request to name a star has been registered in the eternal cosmic database.
                </p>

                <div className="order-id-box" onClick={copyOrderId} title="Click to copy">
                    <span className="id-label">Registration ID:</span>
                    <strong className="id-value">{orderId}</strong>
                    <div className="copy-action">
                        {copied ? <span className="text-success">✅</span> : <span className="text-primary-light">📋</span>}
                    </div>
                </div>

                <div className="success-features">
                    <h4>Next Celestial Steps</h4>
                    <ul className="steps-list">
                        <li>
                            <div className="step-num">01</div>
                            <div className="step-text">Check your email for an instant digital copy of your certificate.</div>
                        </li>
                        <li>
                            <div className="step-num">02</div>
                            <div className="step-text">Our cartographers are prepping your physical gift pack (2-4 days).</div>
                        </li>
                        <li>
                            <div className="step-num">03</div>
                            <div className="step-text">View your star coordinates and track delivery in your dashboard.</div>
                        </li>
                    </ul>
                </div>

                <div className="action-buttons">
                    <button
                        onClick={() => {
                            const printWindow = window.open('', '_blank');
                            const registryId = orderId;
                            printWindow.document.write(`
                                <html>
                                    <head>
                                        <title>Certificate Of Registry - Celestial Star</title>
                                        <style>
                                            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;700&display=swap');
                                            body { margin: 0; background: #050816; color: #fff; font-family: 'Montserrat', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
                                            .certificate-container { width: 1000px; height: 700px; padding: 60px; background: radial-gradient(circle at center, #1e293b 0%, #050816 100%); border: 2px solid #fbbf24; position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
                                            .border-pattern { position: absolute; top: 15px; left: 15px; right: 15px; bottom: 15px; border: 1px solid rgba(251, 191, 36, 0.3); }
                                            header h2 { font-family: 'Cinzel', serif; color: #fbbf24; font-size: 1.2rem; letter-spacing: 8px; margin-bottom: 40px; text-transform: uppercase; }
                                            .cert-title { font-family: 'Cinzel', serif; font-size: 3.5rem; margin: 20px 0; background: linear-gradient(to bottom, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                                            .presentation { font-weight: 300; font-size: 1.2rem; color: #94a3b8; margin: 20px 0; }
                                            .star-name { font-family: 'Cinzel', serif; font-size: 4rem; color: #fbbf24; margin: 30px 0; text-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
                                            .registry-details { margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; width: 80%; display: flex; justify-content: space-around; }
                                            .detail-item h4 { font-size: 0.7rem; color: #fbbf24; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px; }
                                            .seal { position: absolute; bottom: 50px; right: 70px; width: 120px; height: 120px; border: 4px double #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fbbf24; font-family: 'Cinzel', serif; font-weight: bold; font-size: 0.8rem; transform: rotate(-15deg); background: rgba(251, 191, 36, 0.05); }
                                            @media print { body { background: #fff !important; color: #000 !important; } .certificate-container { border: 1px solid #000 !important; background: #fff !important; box-shadow: none !important; width: 100%; height: 100%; } .star-name, .cert-title, header h2, .seal { -webkit-text-fill-color: #000 !important; color: #000 !important; border-color: #000 !important; } }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="certificate-container">
                                            <div class="border-pattern"></div>
                                            <header><h2>The Official Celestial Registry</h2></header>
                                            <div class="presentation">THIS ACCREDITATION CERTIFIES THAT</div>
                                            <h1 class="cert-title">The Star</h1>
                                            <div class="star-name">Your Celestial Star</div>
                                            <div class="presentation">IS OFFICIALLY RECORDED AND REGISTERED IN OUR PERMANENT ARCHIVES</div>
                                            <div class="registry-details">
                                                <div class="detail-item"><h4>Registry ID</h4><p>${registryId}</p></div>
                                                <div class="detail-item"><h4>Registration Date</h4><p>${new Date().toLocaleDateString()}</p></div>
                                            </div>
                                            <div class="seal">OFFICIAL<br>REGISTRY<br>SEAL</div>
                                        </div>
                                        <script>
                                            window.onload = function() { setTimeout(() => { window.print(); }, 1000); }
                                        </script>
                                    </body>
                                </html>
                            `);
                            printWindow.document.close();
                        }}
                        className="btn-primary-glow"
                        style={{ border: 'none', cursor: 'pointer', marginBottom: '12px', width: '100%', display: 'block' }}
                    >
                        ✨ DOWNLOAD DIGITAL CERTIFICATE
                    </button>
                    <Link to="/account" className="btn-outline-celestial" style={{ display: 'block', textAlign: 'center', marginBottom: '12px' }}>View My Star Registry</Link>
                    <Link to="/shop" className="btn-outline-celestial" style={{ display: 'block', textAlign: 'center' }}>Continue Exploring</Link>
                </div>
            </div>
        </div >
    );
};

export default OrderSuccess;
