export default function Footer() {
    return (
        <footer style={{
            background: 'var(--void)',
            borderTop: '1px solid rgba(200,164,90,0.1)',
            padding: '60px 0 40px',
        }}>
            <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 60px' }}>
                {/* Top row */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr auto 1fr',
                    gap: 40, alignItems: 'start', marginBottom: 60,
                }}>
                    {/* Logo + tagline */}
                    <div>
                        <div style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 28,
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #7a6030, #c8a45a, #e8c47a)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: 16,
                        }}>
                            CROWNZ
                        </div>
                        <p style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 13,
                            lineHeight: 1.7,
                            color: 'var(--muted)',
                            maxWidth: 280,
                        }}>
                            Cosmism-inspired streetwear and handcrafted jewelry. Wear the symbols of freedom, justice and equality.
                        </p>
                    </div>

                    {/* Center: Newsletter */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 10, letterSpacing: '0.35em', color: 'var(--gold)', marginBottom: 16, fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                            Cosmic Signal
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, fontFamily: 'var(--font-sans)' }}>
                            Solar &amp; Lunar updates, drops &amp; news
                        </p>
                        <div style={{ display: 'flex', gap: 0 }}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(200,164,90,0.2)',
                                    borderRight: 'none',
                                    borderRadius: '2px 0 0 2px',
                                    color: 'var(--star)',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: 12,
                                    outline: 'none',
                                }}
                                onFocus={e => e.target.style.borderColor = 'rgba(200,164,90,0.5)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(200,164,90,0.2)'}
                            />
                            <button
                                className="cta-btn"
                                style={{
                                    padding: '12px 20px',
                                    background: 'linear-gradient(135deg, var(--gold), rgba(200,164,90,0.8))',
                                    color: '#000',
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    borderRadius: '0 2px 2px 0',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Join
                            </button>
                        </div>
                    </div>

                    {/* Right: Links */}
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, letterSpacing: '0.35em', color: 'var(--gold)', marginBottom: 20, fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                            Navigate
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { label: 'Shop All', href: 'https://crownz19.com/collections/all' },
                                { label: 'Jewelry', href: 'https://crownz19.com/collections/all' },
                                { label: 'Apparel', href: 'https://crownz19.com/collections/all' },
                                { label: 'Philosophy', href: '#story' },
                            ].map(l => (
                                <a
                                    key={l.label}
                                    href={l.href}
                                    data-hover
                                    style={{
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: 12,
                                        color: 'var(--muted)',
                                        letterSpacing: '0.1em',
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                                    onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid rgba(200,164,90,0.08)',
                    paddingTop: 28,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted)' }}>
                        © 2024 CrownZ. All rights reserved.
                    </span>
                    <span style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 12, fontStyle: 'italic',
                        color: 'rgba(200,164,90,0.4)',
                    }}>
                        ✦ &nbsp; Become a walking symbol &nbsp; ✦
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--muted)' }}>
                        crownz19.com
                    </span>
                </div>

                {/* Design credit */}
                <div style={{
                    marginTop: 20,
                    textAlign: 'center',
                    paddingTop: 16,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                }}>
                    <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 11,
                        color: 'rgba(106,106,138,0.6)',
                        letterSpacing: '0.05em',
                    }}>
                        Designed by{' '}
                        <a
                            href="https://www.strategyfox.in"
                            target="_blank"
                            rel="noreferrer"
                            data-hover
                            style={{
                                color: 'rgba(200,164,90,0.7)',
                                textDecoration: 'none',
                                transition: 'color 0.3s',
                                borderBottom: '1px solid rgba(200,164,90,0.25)',
                                paddingBottom: 1,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = 'var(--gold)';
                                e.currentTarget.style.borderBottomColor = 'var(--gold)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'rgba(200,164,90,0.7)';
                                e.currentTarget.style.borderBottomColor = 'rgba(200,164,90,0.25)';
                            }}
                        >
                            Strategy Fox
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
