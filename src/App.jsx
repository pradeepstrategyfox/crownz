import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import ProductShowcase from './components/ProductShowcase';
import SignatureExperience from './components/SignatureExperience';
import SocialProof from './components/SocialProof';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <ProductShowcase />
        <SignatureExperience />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

