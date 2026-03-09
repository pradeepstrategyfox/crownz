import { useEffect, useRef, useState } from 'react';

const products = [
    {
        id: 1,
        name: '100% High LVL Tee',
        category: 'Apparel',
        price: '$60.00',
        desc: 'Elevated consciousness woven into premium fabric. 100% alignment guaranteed.',
        emoji: '⬛',
        glow: 'var(--teal)',
        href: 'https://crownz19.com/products/untitled-sep11_13-13',
        tag: 'Iconic',
        gradient: 'linear-gradient(135deg, rgba(26,212,200,0.08), rgba(26,212,200,0.02))',
    },
    {
        id: 2,
        name: '19 Keys Calligraphy Necklace',
        category: 'Jewelry',
        price: 'From $74.99',
        desc: '19 ancient keys rendered in artisanal calligraphy. Each key an unlocked door.',
        emoji: '🔑',
        glow: 'var(--gold)',
        href: 'https://crownz19.com/products/keys-chain',
        tag: 'Bestseller',
        gradient: 'linear-gradient(135deg, rgba(200,164,90,0.1), rgba(200,164,90,0.02))',
    },
    {
        id: 3,
        name: 'Black Star CrownZ Ring',
        category: 'Fine Jewelry',
        price: 'From $495.00',
        desc: 'Hand-crafted in obsidian and gold. Worn by those who know their cosmic inheritance.',
        emoji: '⭐',
        glow: 'var(--violet)',
        href: 'https://crownz19.com/products/black-star-ring-special-order-only',
        tag: 'Special Order',
        gradient: 'linear-gradient(135deg, rgba(123,47,255,0.08), rgba(123,47,255,0.02))',
    },
    {
        id: 4,
        name: 'Calligraphy Keys Necklace — Teal',
        category: 'Jewelry',
        price: '$74.99',
        desc: 'The teal edition — sea-born calm meets celestial knowing. Limitless possibilities.',
        emoji: '🌊',
        glow: 'var(--teal)',
        href: 'https://crownz19.com/products/calligraphy-keys-necklace-teal',
        tag: 'Limited',
        gradient: 'linear-gradient(135deg, rgba(26,212,200,0.08), rgba(26,212,200,0.02))',
    },
];

export default function ProductShowcase() {
    const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
    const gridRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = gridRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSpotlight({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            visible: true,
        });
    };

    return (
        <section id="collection" style={{
            background: 'var(--deep)',
            padding: '120px 0',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Ambient background glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800, height: 600,
                background: 'radial-gradient(ellipse, rgba(123,47,255,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 60px' }}>
                {/* Header */}
                <div style={{ marginBottom: 72, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                        <span className="section-label">Cosmic Products</span>
                        <h2 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(40px, 6vw, 80px)',
                            fontWeight: 300,
                            lineHeight: 1.0,
                            marginTop: 16,
                            color: 'var(--star)',
                        }}>
                            Wear What<br />
                            <span className="gold-text" style={{ fontWeight: 600 }}>You Believe</span>
                        </h2>
                    </div>
                    <a
                        href="https://crownz19.com/collections/all"
                        target="_blank"
                        rel="noreferrer"
                        data-hover
                        style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 12,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--muted)',
                            display: 'flex', alignItems: 'center', gap: 8,
                            transition: 'color 0.3s',
                            paddingBottom: 12,
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
                    >
                        View All &nbsp;→
                    </a>
                </div>

                {/* Grid with spotlight */}
                <div
                    ref={gridRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setSpotlight(p => ({ ...p, visible: false }))}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 20,
                        position: 'relative',
                    }}
                >
                    {/* Cursor spotlight */}
                    {spotlight.visible && (
                        <div style={{
                            position: 'absolute',
                            left: spotlight.x, top: spotlight.y,
                            width: 300, height: 300,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(200,164,90,0.06) 0%, transparent 70%)',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            zIndex: 1,
                            transition: 'opacity 0.2s',
                        }} />
                    )}

                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product: p }) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hov, setHov] = useState(false);
    const cardRef = useRef(null);

    const onMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
        setTilt({ x, y });
    };

    return (
        <a
            ref={cardRef}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="product-card"
            onMouseMove={onMove}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
            style={{
                display: 'block',
                borderRadius: 4,
                border: `1px solid ${hov ? 'rgba(200,164,90,0.3)' : 'rgba(200,164,90,0.1)'}`,
                background: hov ? p.gradient : 'rgba(255,255,255,0.02)',
                padding: '36px 28px 28px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.4s, background 0.4s, box-shadow 0.4s',
                boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${p.glow}18` : '0 4px 20px rgba(0,0,0,0.2)',
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${hov ? 8 : 0}px)`,
                willChange: 'transform',
                textDecoration: 'none',
                cursor: 'none',
                zIndex: 2,
            }}
        >
            {/* Glow edge on hover */}
            <div style={{
                position: 'absolute', inset: 0, borderRadius: 4,
                background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, ${p.glow}0a, transparent 60%)`,
                transition: 'opacity 0.3s',
                opacity: hov ? 1 : 0,
                pointerEvents: 'none',
            }} />

            {/* Tag */}
            <div style={{
                position: 'absolute', top: 16, right: 16,
                padding: '4px 10px',
                border: `1px solid ${p.glow}50`,
                borderRadius: 20,
                fontSize: 9,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: p.glow,
                fontFamily: 'var(--font-sans)',
            }}>
                {p.tag}
            </div>

            {/* Emoji / Product visual */}
            <div style={{
                fontSize: 52, marginBottom: 24, lineHeight: 1,
                transform: hov ? 'scale(1.1) translateY(-4px)' : 'scale(1)',
                transition: 'transform 0.4s var(--ease-cosmic)',
                filter: hov ? `drop-shadow(0 0 16px ${p.glow})` : 'none',
            }}>
                {product_icon(p.category)}
            </div>

            {/* Category label */}
            <div style={{
                fontSize: 10, letterSpacing: '0.3em', color: p.glow,
                textTransform: 'uppercase', fontFamily: 'var(--font-sans)',
                marginBottom: 10,
            }}>
                {p.category}
            </div>

            {/* Name */}
            <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.2,
                color: 'var(--star)',
                marginBottom: 12,
            }}>
                {p.name}
            </h3>

            {/* Description */}
            <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                lineHeight: 1.65,
                color: 'var(--muted)',
                marginBottom: 24,
            }}>
                {p.desc}
            </p>

            {/* Price + arrow */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 20,
                    color: 'var(--gold)',
                    letterSpacing: '0.02em',
                }}>
                    {p.price}
                </span>
                <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    border: `1px solid ${hov ? p.glow : 'rgba(200,164,90,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: hov ? p.glow : 'var(--muted)',
                    fontSize: 14,
                    transition: 'all 0.3s',
                    transform: hov ? 'translateX(4px)' : 'translateX(0)',
                }}>
                    →
                </div>
            </div>
        </a>
    );
}

function product_icon(category) {
    if (category === 'Apparel') return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <path d="M10 14L20 8L26 13L32 8L42 14V22H38V44H14V22H10V14Z" stroke="var(--teal)" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(26,212,200,0.06)" />
        </svg>
    );
    if (category === 'Fine Jewelry') return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="16" stroke="var(--violet)" strokeWidth="1.5" fill="none" />
            <circle cx="26" cy="26" r="5" fill="rgba(123,47,255,0.3)" stroke="var(--violet)" strokeWidth="1" />
            <path d="M26 10 L26 18 M26 34 L26 42 M10 26 L18 26 M34 26 L42 26" stroke="var(--violet)" strokeWidth="1" opacity="0.5" />
        </svg>
    );
    return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="12" r="4" stroke="var(--gold)" strokeWidth="1.5" />
            <ellipse cx="26" cy="36" rx="14" ry="6" stroke="var(--gold)" strokeWidth="1.5" fill="rgba(200,164,90,0.05)" />
            <line x1="26" y1="16" x2="26" y2="30" stroke="var(--gold)" strokeWidth="1.5" />
            <path d="M12 30 Q26 44 40 30" stroke="var(--gold)" strokeWidth="1" opacity="0.4" />
        </svg>
    );
}
