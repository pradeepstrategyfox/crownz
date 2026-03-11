import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const collections = [
  {
    id: 'apparel',
    title: 'Cosmic Apparel',
    image: 'https://images.unsplash.com/photo-1627811269913-c0d964da1eb2?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '#',
    span: 'col-span-12 md:col-span-6',
  },
  {
    id: 'jewelry',
    title: 'Fine Jewelry',
    image: 'https://images.unsplash.com/photo-1616837874254-8d5aaa63e273?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmVja2xhY2V8ZW58MHwyfDB8fHwy',
    link: '#',
    span: 'col-span-12 md:col-span-6',
  },
  {
    id: 'rings',
    title: 'Signature Rings',
    image: 'https://images.unsplash.com/photo-1769313724371-19dc9a052dc9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '#',
    span: 'col-span-12 md:col-span-6',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop',
    link: '#',
    span: 'col-span-12 md:col-span-6',
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 24,
        }}>
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

  // Parse col-span manually if needed, or use gridColumn based on span prop
  let gridCol = 'span 12';
  if (item.span.includes('md:col-span-6')) gridCol = 'span 6';

  // Responsive logic for mobile (forces full width under 768px, which index.css handles usually, but we apply inline style here as a hack since index.css doesn't have a utility class)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <a
      href={item.link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{
        gridColumn: isMobile ? 'span 12' : gridCol,
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
