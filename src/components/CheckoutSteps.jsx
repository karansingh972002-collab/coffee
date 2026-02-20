import './CheckoutSteps.css';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ activeStep }) => {
    // Steps: 'bag', 'address', 'payment'

    return (
        <div className="checkout-steps">
            <div className={`step-item ${activeStep === 'bag' ? 'active' : 'completed'}`}>
                <span className="step-label">BAG</span>
            </div>
            <div className="step-divider"></div>

            <div className={`step-item ${activeStep === 'address' ? 'active' : activeStep === 'payment' ? 'completed' : ''}`}>
                <span className="step-label">ADDRESS</span>
            </div>
            <div className="step-divider"></div>

            <div className={`step-item ${activeStep === 'payment' ? 'active' : ''}`}>
                <span className="step-label">PAYMENT</span>
            </div>
        </div>
    );
};

export default CheckoutSteps;
