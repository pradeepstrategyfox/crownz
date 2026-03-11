import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const collections = [
  {
    id: 'all-products',
    title: 'All Products',
    image: 'https://crownz19.com/cdn/shop/collections/All_Products.png?v=1692126995&width=1500',
    link: 'https://crownz19.com/collections/all-products',
  },
  {
    id: 'jewelz',
    title: 'Crownz Jewels',
    image: 'https://crownz19.com/cdn/shop/collections/Jewelz.png?v=1696360671&width=1500',
    link: 'https://crownz19.com/collections/jewelz',
  },
  {
    id: 'education',
    title: 'Education',
    image: 'https://crownz19.com/cdn/shop/collections/Books.png?v=1692125100&width=1500',
    link: 'https://crownz19.com/collections/books-1',
  },
  {
    id: 'emf',
    title: 'Frequency (EMF) Protection Chips',
    image: 'https://crownz19.com/cdn/shop/collections/EMF.png?v=1692125413&width=1500',
    link: 'https://crownz19.com/collections/frequency-emf-protection-crownz',
  },
  {
    id: 'legend',
    title: 'Legend Crownz',
    image: 'https://crownz19.com/cdn/shop/collections/IMG_2310.jpg?v=1696231396&width=1500',
    link: 'https://crownz19.com/collections/legend-crownz',
  },
  {
    id: 'luxury',
    title: 'Luxury Crownz',
    image: 'https://crownz19.com/cdn/shop/collections/crownz_collections_eb48801c-bbc9-41e1-bac7-823e5db23a57.png?v=1696360615&width=1500',
    link: 'https://crownz19.com/collections/luxury-crownz',
  },
  {
    id: 'origin',
    title: 'Origin Crownz',
    image: 'https://crownz19.com/cdn/shop/collections/crownz_collections.png?v=1696231057&width=1500',
    link: 'https://crownz19.com/collections/all-crownz',
  },
  {
    id: 'clothing',
    title: 'SS26 Capsule collection',
    image: 'https://crownz19.com/cdn/shop/collections/Clothing.png?v=1696360823&width=1500',
    link: 'https://crownz19.com/collections/clothing',
  },
  {
    id: 'top-crownz',
    title: 'Top CrownZ Collection',
    image: 'https://crownz19.com/cdn/shop/collections/cae5dc19-d260-4194-8413-aed00e8ed299.jpg?v=1696360721&width=1500',
    link: 'https://crownz19.com/collections/legend-crownz-collection',
  },
];

export default function Collections() {
  return (
    <section id="collections" style={{
      background: 'var(--void)',
      padding: '120px 0',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">Curated Selection</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300,
            color: 'var(--star)',
            marginTop: 16,
          }}>
            Explore The <span className="gold-text" style={{ fontWeight: 600 }}>Vault</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="collections-grid">
          {collections.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={item.link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{
        position: 'relative',
        height: 400,
        borderRadius: 12,
        overflow: 'hidden',
        display: 'block',
        textDecoration: 'none',
      }}
    >
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 0.8s var(--ease-cosmic)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isHovered 
          ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
        transition: 'background 0.4s var(--ease-cosmic)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: 32,
        right: 32,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 3vw, 40px)',
          fontWeight: 400,
          color: 'var(--star)',
          margin: 0,
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.4s var(--ease-cosmic)',
        }}>
          {item.title}
        </h3>

        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: isHovered ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isHovered ? 'var(--void)' : 'var(--star)',
          transform: isHovered ? 'rotate(-45deg)' : 'rotate(0deg)',
          transition: 'all 0.4s var(--ease-cosmic)',
        }}>
          <ArrowRight size={20} />
        </div>
      </div>
    </a>
  );
}
