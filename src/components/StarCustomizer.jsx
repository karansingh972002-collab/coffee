import { useState } from 'react';
import './StarCustomizer.css';

const StarCustomizer = ({ pkg, isOpen, onClose, onConfirm }) => {
    const [starName, setStarName] = useState('');
    const [dedicationDate, setDedicationDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState('');

    if (!isOpen || !pkg) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm({
            ...pkg,
            customization: {
                starName,
                dedicationDate,
                message
            }
        });
        onClose();
    };

    return (
        <div className="customizer-overlay" onClick={onClose}>
            <div className="customizer-modal glass" onClick={e => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <span className="pkg-type">{pkg.type}</span>
                    <h2>Customize Your {pkg.name.split(' - ')[0]}</h2>
                    <p className="subtitle">Enter the details for your official star registry entry.</p>
                </div>

                <form onSubmit={handleSubmit} className="customizer-form">
                    <div className="form-group">
                        <label>Star Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Orion's Light"
                            value={starName}
                            onChange={e => setStarName(e.target.value)}
                            required
                        />
                        <small>Choose a name that will be registered forever.</small>
                    </div>

                    <div className="form-group">
                        <label>Dedication Date</label>
                        <input
                            type="date"
                            value={dedicationDate}
                            onChange={e => setDedicationDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Personal Message (Optional)</label>
                        <textarea
                            rows="3"
                            placeholder="A message for your loved one..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="modal-footer">
                        <div className="price-summary">
                            <span>Total:</span>
                            <strong>₹{pkg.price.toLocaleString()}</strong>
                        </div>
                        <button type="submit" className="confirm-btn" style={{ background: pkg.gradient }}>
                            Confirm & Add to Bag
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StarCustomizer;
