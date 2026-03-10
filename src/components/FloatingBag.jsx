import { useLocation, useNavigate } from 'react-router-dom';
import './FloatingBag.css';

const FloatingBag = ({ count, onOpenCart }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (window.innerWidth > 768) {
            onOpenCart();
        } else {
            navigate('/cart');
        }
    };

    // Hide the floating bag on Checkout, Cart, and Success pages to avoid overlap
    if (count === 0 || location.pathname === '/checkout' || location.pathname === '/cart' || location.pathname === '/success') return null;

    return (
        <div className="floating-bag" onClick={handleClick} title="View Bag">
            <div className="bag-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {count > 0 && <span className="bag-count">{count}</span>}
            </div>
        </div>
    );
};

export default FloatingBag;
