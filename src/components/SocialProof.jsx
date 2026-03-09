import { useState, useRef, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Ayo M.',
        handle: '@ayo.cosmos',
        quote: 'Wearing CrownZ feels like a declaration. The necklace gets asked about everywhere I go — it carries a conversation before I speak.',
        stars: 5,
        symbol: '✦',
    },
    {
        id: 2,
        name: 'Zara K.',
        handle: '@zara.aligned',
        quote: 'The Black Star ring is art. Fine jewelry with a philosophy behind it — I\'ve never owned anything that feels this intentional.',
        stars: 5,
        symbol: '✧',
    },
    {
        id: 3,
        name: 'Marcus T.',
        handle: '@marcus.local_self',
        quote: 'The High LVL Tee is my daily reminder. Quality is unmatched and the meaning hits different when you understand cosmism.',
        stars: 5,
        symbol: '⭐',
    },
];

const communityStats = [
    { value: '10K+', label: 'Cosmic Walkers' },
    { value: '40+', label: 'Countries' },
    { value: '5★', label: 'Average Rating' },
];

export default function SocialProof() {
    const [active, setActive] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive(p => (p + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            id="community"
            style={{
                background: 'var(--deep)',
                padding: '120px 0',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid rgba(200,164,90,0.06)',
            }}
        >
            {/* Ambient */}
            <div style={{
                position: 'absolute', top: 0, left: '30%',
                width: 500, height: 400,
                background: 'radial-gradient(ellipse, rgba(123,47,255,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
                    {/* Left: testimonial carousel */}
                    <div>
                        <span className="section-label">Community of Cosmic Walkers</span>
                        <h2 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(36px, 4vw, 60px)',
                            fontWeight: 300,
                            color: 'var(--star)',
                            marginTop: 16, marginBottom: 48,
                            lineHeight: 1.1,
                        }}>
                            Worn By<br />
                            <span className="gold-text" style={{ fontWeight: 600 }}>Those Who Know</span>
                        </h2>

                        {/* Testimonial card */}
                        <div ref={ref} style={{
                            position: 'relative',
                            padding: '40px',
                            border: '1px solid rgba(200,164,90,0.15)',
                            borderRadius: 4,
                            background: 'rgba(200,164,90,0.02)',
                            minHeight: 220,
                            overflow: 'hidden',
                        }}>
                            {/* Glow corner */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0,
                                width: 100, height: 100,
                                background: 'radial-gradient(circle, rgba(200,164,90,0.08) 0%, transparent 70%)',
                                pointerEvents: 'none',
                            }} />

                            {testimonials.map((t, i) => (
                                <div
                                    key={t.id}
                                    style={{
                                        position: i === 0 ? 'relative' : 'absolute',
                                        inset: 0, padding: 40,
                                        opacity: active === i ? 1 : 0,
                                        transform: active === i ? 'translateY(0)' : 'translateY(16px)',
                                        transition: 'all 0.6s var(--ease-cosmic)',
                                        pointerEvents: active === i ? 'auto' : 'none',
                                    }}
                                >
                                    {/* Stars */}
                                    <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                                        {Array(t.stars).fill(0).map((_, j) => (
                                            <span key={j} style={{ color: 'var(--gold)', fontSize: 12 }}>★</span>
                                        ))}
                                    </div>

                                    {/* Symbol */}
                                    <div style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: 28,
                                        color: 'var(--gold)',
                                        marginBottom: 16,
                                        opacity: 0.6,
                                    }}>
                                        {t.symbol}
                                    </div>

                                    <p style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: 'clamp(17px, 1.8vw, 22px)',
                                        fontStyle: 'italic',
                                        lineHeight: 1.6,
                                        color: 'var(--star)',
                                        marginBottom: 24,
                                    }}>
                                        "{t.quote}"
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: '50%',
                                            background: 'linear-gradient(135deg, rgba(200,164,90,0.3), rgba(123,47,255,0.3))',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 14, fontFamily: 'var(--font-serif)',
                                            border: '1px solid rgba(200,164,90,0.3)',
                                        }}>
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, color: 'var(--star)' }}>{t.name}</div>
                                            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted)' }}>{t.handle}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Dots */}
                        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    style={{
                                        width: i === active ? 24 : 8, height: 8,
                                        borderRadius: 4,
                                        background: i === active ? 'var(--gold)' : 'rgba(200,164,90,0.25)',
                                        transition: 'all 0.3s var(--ease-cosmic)',
                                        cursor: 'none',
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Community stats + social */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                        {communityStats.map((s, i) => (
                            <StatCard key={i} stat={s} delay={i * 0.15} />
                        ))}

                        {/* Social links */}
                        <div style={{
                            marginTop: 20,
                            padding: '32px',
                            border: '1px solid rgba(200,164,90,0.1)',
                            borderRadius: 4,
                            background: 'rgba(255,255,255,0.01)',
                        }}>
                            <div style={{
                                fontSize: 10, letterSpacing: '0.35em', color: 'var(--gold)',
                                textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-sans)',
                            }}>
                                Follow The Cosmos
                            </div>
                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                {[
                                    { name: 'Instagram', href: 'http://instagram.com', icon: '◈' },
                                    { name: 'TikTok', href: 'https://tiktok.com', icon: '◉' },
                                    { name: 'X', href: 'https://x.com', icon: '✕' },
                                    { name: 'Pinterest', href: 'https://pinterest.com', icon: '⊕' },
                                ].map(s => (
                                    <SocialPill key={s.name} {...s} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ stat, delay }) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.4 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} style={{
            display: 'flex', alignItems: 'center', gap: 24,
            padding: '24px 32px',
            border: '1px solid rgba(200,164,90,0.1)',
            borderRadius: 4,
            background: 'rgba(200,164,90,0.02)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateX(0)' : 'translateX(30px)',
            transition: `all 0.7s var(--ease-cosmic) ${delay}s`,
        }}>
            <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 48, fontWeight: 600,
                color: 'var(--gold)',
                lineHeight: 1,
                minWidth: 100,
            }}>
                {stat.value}
            </div>
            <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 12, letterSpacing: '0.2em',
                color: 'var(--muted)', textTransform: 'uppercase',
            }}>
                {stat.label}
            </div>
        </div>
    );
}

function SocialPill({ name, href, icon }) {
    const [hov, setHov] = useState(false);
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            data-hover
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px',
                border: `1px solid ${hov ? 'rgba(200,164,90,0.4)' : 'rgba(200,164,90,0.12)'}`,
                borderRadius: 2,
                fontSize: 11,
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: hov ? 'var(--gold)' : 'var(--muted)',
                background: hov ? 'rgba(200,164,90,0.06)' : 'transparent',
                transition: 'all 0.3s',
            }}
        >
            <span style={{ fontSize: 14 }}>{icon}</span>
            {name}
        </a>
    );
}
