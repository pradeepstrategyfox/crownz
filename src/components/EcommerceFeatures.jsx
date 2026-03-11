import { Truck, ShieldCheck, RefreshCw, Star } from 'lucide-react';

const features = [
  {
    icon: <Truck size={24} strokeWidth={1.5} />,
    title: 'Free Cosmic Shipping',
    desc: 'On all orders over $150',
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    title: 'Authenticity Guaranteed',
    desc: 'Lifetime cosmic warranty',
  },
  {
    icon: <RefreshCw size={24} strokeWidth={1.5} />,
    title: 'Easy Returns',
    desc: '30-day seamless exchanges',
  },
  {
    icon: <Star size={24} strokeWidth={1.5} />,
    title: 'Premium Quality',
    desc: 'Hand-crafted luxury materials',
  },
];

export default function EcommerceFeatures() {
  return (
    <section style={{
      background: 'var(--void)',
      padding: '60px 0',
      borderTop: '1px solid rgba(200,164,90,0.1)',
      borderBottom: '1px solid rgba(200,164,90,0.1)',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32,
        }}>
          {features.map((feature) => (
            <div key={feature.title} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '32px 24px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 8,
              border: '1px solid rgba(200,164,90,0.05)',
              transition: 'transform 0.4s ease, border-color 0.4s ease, background 0.4s ease',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(200,164,90,0.2)';
                e.currentTarget.style.background = 'rgba(200,164,90,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(200,164,90,0.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              }}
              onFocus={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(200,164,90,0.2)';
                e.currentTarget.style.background = 'rgba(200,164,90,0.05)';
              }}
              onBlur={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(200,164,90,0.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              }}
              tabIndex={0}
              role="region"
              aria-label={feature.title}
            >
              <div style={{
                color: 'var(--gold)',
                marginBottom: 16,
                padding: 16,
                background: 'rgba(200,164,90,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 20,
                color: 'var(--star)',
                marginBottom: 8,
                fontWeight: 600,
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: 'var(--muted)',
                lineHeight: 1.5,
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
