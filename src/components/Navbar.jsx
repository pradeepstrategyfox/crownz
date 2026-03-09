import { useEffect, useRef, useState } from 'react';

const links = [
    { label: 'Collection', href: '#collection' },
    { label: 'Philosophy', href: '#story' },
    { label: 'Jewelry', href: '#products' },
    { label: 'Cosmic Tracker', href: '#experience' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav ref={navRef} style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
            padding: '0 24px',
            height: 72,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'background 0.5s, border-bottom 0.5s, backdrop-filter 0.5s',
            background: scrolled ? 'rgba(5,5,16,0.88)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
            borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        }}>
            {/* Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,80 25,30 50,60 75,30 90,80" fill="none" stroke="#c8a45a" strokeWidth="5" strokeLinejoin="round" />
                    <circle cx="50" cy="18" r="6" fill="#c8a45a" />
                    <circle cx="10" cy="80" r="5" fill="#c8a45a" />
                    <circle cx="90" cy="80" r="5" fill="#c8a45a" />
                    <line x1="10" y1="80" x2="90" y2="80" stroke="#c8a45a" strokeWidth="4" />
                </svg>
                <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    background: 'linear-gradient(135deg, #7a6030, #c8a45a, #e8c47a, #c8a45a)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 4s linear infinite',
                }}>CROWNZ</span>
            </a>

            {/* Desktop Links */}
            <ul style={{
                display: 'flex', gap: 20, listStyle: 'none',
                alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end',
            }}>
                <div className="nav-links" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    {links.map((l) => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                data-hover
                                style={{
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: 12,
                                    fontWeight: 500,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    color: 'var(--muted)',
                                    transition: 'color 0.3s',
                                    position: 'relative',
                                }}
                                onMouseEnter={e => e.target.style.color = 'var(--star)'}
                                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                            >
                                {l.label}
                                <span style={{
                                    position: 'absolute', bottom: -4, left: 0, right: 0,
                                    height: 1, background: 'var(--gold)',
                                    transform: 'scaleX(0)', transformOrigin: 'left',
                                    transition: 'transform 0.3s var(--ease-cosmic)',
                                }} className="nav-underline" />
                            </a>
                        </li>
                    ))}
                </div>
                <li>
                    <a
                        href="#collection"
                        className="cta-btn"
                        style={{
                            padding: '10px 24px',
                            border: '1px solid var(--glass-border)',
                            borderRadius: 2,
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--gold)',
                            background: 'linear-gradient(135deg, rgba(200,164,90,0.08), rgba(200,164,90,0.02))',
                            transition: 'all 0.3s',
                            display: 'block',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(200,164,90,0.15)';
                            e.currentTarget.style.borderColor = 'var(--gold)';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(200,164,90,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(200,164,90,0.08), rgba(200,164,90,0.02))';
                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Enter The Cosmos
                    </a>
                </li>
            </ul>
        </nav>
    );
}
