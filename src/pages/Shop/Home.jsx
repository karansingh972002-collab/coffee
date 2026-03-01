import Hero from '../../components/Hero';
import TrustBadge from '../../components/TrustBadge';
import Shop from './Shop';
import WhatsInside from '../../components/WhatsInside';
import Testimonials from '../../components/Testimonials';
import HeartsTouched from '../../components/HeartsTouched';
import FAQ from '../../components/FAQ';

const Home = ({ onAddToCart, onAddToWishlist }) => {
    return (
        <>
            <Hero />
            <TrustBadge />
            <Shop
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                minimal={true}
                limit={3}
            />
            <WhatsInside />
            <HeartsTouched />
            <Testimonials />

            <FAQ />
        </>
    );
};

export default Home;
