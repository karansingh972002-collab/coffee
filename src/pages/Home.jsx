import Hero from '../components/Hero';
import TrustBadge from '../components/TrustBadge';
import Packages from '../components/Packages';
import WhatsInside from '../components/WhatsInside';
import Testimonials from '../components/Testimonials';
import HeartsTouched from '../components/HeartsTouched';

import FAQ from '../components/FAQ';

const Home = ({ onAddToCart }) => {
    return (
        <>
            <Hero />
            <TrustBadge />
            <Packages onAddToCart={onAddToCart} />
            <WhatsInside />
            <HeartsTouched />
            <Testimonials />

            <FAQ />
        </>
    );
};

export default Home;
