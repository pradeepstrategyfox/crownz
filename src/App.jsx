import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import ProductShowcase from './components/ProductShowcase';
import SignatureExperience from './components/SignatureExperience';
import SocialProof from './components/SocialProof';
import CTA from './components/CTA';
import Footer from './components/Footer';
import EcommerceFeatures from './components/EcommerceFeatures';
import ShoppableReels from './components/ShoppableReels';
import Collections from './components/Collections';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Collections />
        <EcommerceFeatures />
        <BrandStory />
        <ProductShowcase />
        <ShoppableReels />
        <SignatureExperience />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

