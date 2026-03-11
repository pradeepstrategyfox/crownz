import { useEffect, useState } from 'react';

export default function Hero() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Scroll indicator
    const scrollDown = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

    return (
        <section id="hero" style={{
            position: 'relative', width: '100%', height: '100vh',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1763130782857-62b04f88ebdb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.35, // Low opacity for cosmic blend
                zIndex: 0,
            }} />

            {/* Content */}
            <div style={{
                position: 'relative', zIndex: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', padding: '0 24px',
            }}>
                {/* Label */}
                <div style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 1.2s var(--ease-cosmic), transform 1.2s var(--ease-cosmic)',
                    transitionDelay: '0.2s',
                }}>
                    <span className="section-label" style={{ letterSpacing: '0.5em' }}>
                        ✦ &nbsp; Cosmism &nbsp; ✦
                    </span>
                </div>

                {/* Main Headline */}
                <div style={{
                    margin: '24px 0 0',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 1.2s var(--ease-cosmic), transform 1.2s var(--ease-cosmic)',
                    transitionDelay: '0.5s',
                }}>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 300,
                        lineHeight: 0.88,
                        fontSize: 'clamp(72px, 12vw, 160px)',
                        letterSpacing: '-0.02em',
                        color: 'var(--star)',
                    }}>
                        WEAR THE
                    </h1>
                    <h1 className="gold-text" style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 600,
                        lineHeight: 0.88,
                        fontSize: 'clamp(72px, 12vw, 160px)',
                        letterSpacing: '-0.02em',
                    }}>
                        COSMOS
                    </h1>
                </div>

                {/* Tagline */}
                <div style={{
                    marginTop: 32,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 1.2s var(--ease-cosmic), transform 1.2s var(--ease-cosmic)',
                    transitionDelay: '0.9s',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(14px, 1.5vw, 17px)',
                        letterSpacing: '0.08em',
                        color: 'var(--muted)',
                        maxWidth: 480,
                    }}>
                        Become a walking symbol of the world<br />you wish to live in
                    </p>
                </div>

                {/* CTA Row */}
                <div style={{
                    marginTop: 48,
                    display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 1s var(--ease-cosmic), transform 1s var(--ease-cosmic)',
                    transitionDelay: '1.2s',
                }}>
                    <HeroBtn primary href="#collection">Shop Collection</HeroBtn>
                    <HeroBtn href="#story">Our Philosophy</HeroBtn>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollDown}
                style={{
                    position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    opacity: visible ? 0.6 : 0,
                    transition: 'opacity 1.5s',
                    transitionDelay: '2s',
                    background: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
            >
                <span style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--muted)', textTransform: 'uppercase' }}>Scroll</span>
                <div style={{ animation: 'float 2s ease-in-out infinite' }}>
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                        <rect x="1" y="1" width="14" height="22" rx="7" stroke="rgba(200,164,90,0.5)" strokeWidth="1.5" />
                        <rect x="6.5" y="4" width="3" height="6" rx="1.5" fill="rgba(200,164,90,0.8)">
                            <animate attributeName="y" values="4;11;4" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                        </rect>
                    </svg>
                </div>
            </button>
        </section>
    );
}

function HeroBtn({ children, href, primary }) {
    const [hov, setHov] = useState(false);
    return (
        <a
            href={href}
            className="cta-btn"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                padding: '14px 36px',
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                borderRadius: 2,
                display: 'inline-block',
                transition: 'all 0.35s var(--ease-cosmic)',
                ...(primary ? {
                    background: hov
                        ? 'linear-gradient(135deg, var(--gold), var(--gold-glow))'
                        : 'linear-gradient(135deg, rgba(200,164,90,0.9), rgba(200,164,90,0.7))',
                    color: '#000',
                    boxShadow: hov ? '0 0 40px rgba(200,164,90,0.5), 0 8px 30px rgba(0,0,0,0.4)' : '0 0 20px rgba(200,164,90,0.2)',
                } : {
                    border: `1px solid ${hov ? 'rgba(200,164,90,0.6)' : 'rgba(200,164,90,0.25)'}`,
                    color: hov ? 'var(--gold-glow)' : 'var(--muted)',
                    background: hov ? 'rgba(200,164,90,0.06)' : 'transparent',
                }),
            }}
        >
            {children}
        </a>
    );
}

import PropTypes from 'prop-types';
HeroBtn.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
    primary: PropTypes.bool,
};
