import Hero from '../components/Hero';
import TrustBadge from '../components/TrustBadge';
import Packages from '../components/Packages';
import WhatsInside from '../components/WhatsInside';
import Testimonials from '../components/Testimonials';
import AppFeatures from '../components/AppFeatures';
import FAQ from '../components/FAQ';

const Home = ({ onAddToCart }) => {
    return (
        <>
            <Hero />
            <TrustBadge />
            <Packages onAddToCart={onAddToCart} />
            <WhatsInside />
            <Testimonials />
            <AppFeatures />
            <FAQ />
        </>
    );
};

export default Home;
