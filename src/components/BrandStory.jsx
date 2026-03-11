import { useEffect, useRef, useState } from 'react';

const panels = [
    {
        id: 1,
        label: 'Origin',
        heading: 'The Cosmos Speaks',
        body: 'Since the dawn of civilization, humans have looked to the sky and found meaning in the stars — not as distant lights, but as mirrors of an inner truth.',
        symbol: '✦',
        color: 'var(--gold)',
    },
    {
        id: 2,
        label: 'Symbols',
        heading: 'Freedom · Justice · Equality',
        body: 'The sun burns away illusion. The moon governs the hidden tides within us. The stars chart the path of those brave enough to look up.',
        symbol: '☽',
        color: 'var(--teal)',
    },
    {
        id: 3,
        label: 'Philosophy',
        heading: 'Align Your Local Self',
        body: 'Cosmism is the conscious alignment of individual consciousness with universal patterns — your daily choices in harmony with something far greater.',
        symbol: '◎',
        color: 'var(--violet)',
    },
    {
        id: 4,
        label: 'Practice',
        heading: 'With Your Cosmic Self',
        body: 'Every garment. Every jewel. Every thread. Chosen deliberately. Worn intentionally. As a declaration of who you are becoming.',
        symbol: '∞',
        color: 'var(--gold)',
    },
    {
        id: 5,
        label: 'Wear It',
        heading: 'Wear What You Stand For',
        body: 'You are the universe made conscious — wear it.',
        symbol: '♛',
        color: 'var(--gold-glow)',
        final: true,
    },
];

export default function BrandStory() {
    const stickyRef = useRef(null);
    const trackRef = useRef(null);
    const [active, setActive] = useState(0);
    const [prog, setProg] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = stickyRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const parent = el.parentElement;
            const parentRect = parent.getBoundingClientRect();
            const scrolled = -parentRect.top;
            const total = parent.offsetHeight - window.innerHeight;
            const p = Math.min(Math.max(scrolled / total, 0), 1);
            setProg(p);
            setActive(Math.min(Math.floor(p * panels.length), panels.length - 1));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const translateX = prog * (panels.length - 1) * 100;

    return (
        <section
            id="story"
            style={{ height: `${panels.length * 100}vh`, position: 'relative' }}
        >
            <div
                ref={stickyRef}
                style={{
                    position: 'sticky', top: 0, height: '100vh',
                    overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    background: 'var(--void)',
                }}
            >
                {/* Section Tag */}
                <div style={{ position: 'absolute', top: 80, left: 60, zIndex: 10 }}>
                    <span className="section-label">The Philosophy</span>
                </div>

                {/* Progress dots */}
                <div style={{
                    position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: 10, zIndex: 10,
                }}>
                    {panels.map((_, i) => (
                        <div key={i} style={{
                            width: i === active ? 24 : 8,
                            height: 8, borderRadius: 4,
                            background: i === active ? 'var(--gold)' : 'rgba(200,164,90,0.25)',
                            transition: 'all 0.4s var(--ease-cosmic)',
                        }} />
                    ))}
                </div>

                {/* Sliding track */}
                <div
                    ref={trackRef}
                    style={{
                        display: 'flex', width: `${panels.length * 100}%`,
                        height: '100%',
                        transform: `translateX(-${(prog * (panels.length - 1) * 100) / panels.length}%)`,
                        transition: 'transform 0.05s linear',
                        willChange: 'transform',
                    }}
                >
                    {panels.map((p, i) => (
                        <PanelSlide key={p.id} panel={p} active={active === i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PanelSlide({ panel, active }) {
    return (
        <div style={{
            width: `${100 / panels.length}%`,
            flexShrink: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background glow */}
            <div style={{
                position: 'absolute', width: 600, height: 600, borderRadius: '50%',
                background: `radial-gradient(circle, ${panel.color}08 0%, transparent 70%)`,
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.8s',
                opacity: active ? 1 : 0,
                pointerEvents: 'none',
            }} />

            {/* Vertical divider line */}
            <div style={{
                position: 'absolute', left: 60, top: '15%', bottom: '15%',
                width: 1,
                background: `linear-gradient(to bottom, transparent, ${panel.color}60, transparent)`,
                opacity: active ? 1 : 0,
                transition: 'opacity 0.6s 0.2s',
            }} />

            <div style={{
                maxWidth: 700, padding: '0 80px',
                opacity: active ? 1 : 0,
                transform: active ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.7s var(--ease-cosmic), transform 0.7s var(--ease-cosmic)',
            }}>
                {/* Giant symbol */}
                <div style={{
                    fontSize: 72,
                    color: panel.color,
                    lineHeight: 1,
                    marginBottom: 24,
                    filter: `drop-shadow(0 0 20px ${panel.color})`,
                    animation: active ? 'pulse-glow 3s ease-in-out infinite' : 'none',
                }}>
                    {panel.symbol}
                </div>

                <div style={{
                    fontSize: 11, letterSpacing: '0.4em', color: panel.color,
                    textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-sans)',
                }}>
                    {panel.label}
                </div>

                <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(36px, 5vw, 72px)',
                    fontWeight: panel.final ? 600 : 300,
                    lineHeight: 1.05,
                    letterSpacing: '-0.01em',
                    marginBottom: 24,
                    color: panel.final ? 'transparent' : 'var(--star)',
                    ...(panel.final && {
                        background: 'linear-gradient(135deg, #7a6030, #c8a45a, #e8c47a)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                    }),
                }}>
                    {panel.heading}
                </h2>

                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(15px, 1.4vw, 19px)',
                    lineHeight: 1.75,
                    color: 'var(--muted)',
                    maxWidth: 500,
                }}>
                    {panel.body}
                </p>

                {panel.final && (
                    <a
                        href="#collection"
                        className="cta-btn"
                        style={{
                            marginTop: 40,
                            display: 'inline-block',
                            padding: '14px 36px',
                            border: '1px solid rgba(200,164,90,0.5)',
                            color: 'var(--gold)',
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            borderRadius: 2,
                            background: 'rgba(200,164,90,0.06)',
                        }}
                    >
                        Shop Collection
                    </a>
                )}
            </div>
        </div>
    );
}
