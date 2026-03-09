import { useEffect, useRef, useState } from 'react';

export default function CTA() {
    const canvasRef = useRef(null);
    const [hov, setHov] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;
        let W = canvas.width = canvas.offsetWidth;
        let H = canvas.height = canvas.offsetHeight;

        // Nebula particles
        const PARTICLES = 120;
        const particles = Array.from({ length: PARTICLES }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            hue: Math.random() < 0.5 ? 42 : Math.random() < 0.5 ? 265 : 175,
        }));

        let mouseX = W / 2, mouseY = H / 2;
        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };
        window.addEventListener('mousemove', onMove);

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Deep cosmic background
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, 'rgba(3,2,15,1)');
            bg.addColorStop(0.5, 'rgba(8,4,25,1)');
            bg.addColorStop(1, 'rgba(3,2,15,1)');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Mouse attraction nebula
            const neb = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
            neb.addColorStop(0, 'rgba(200,164,90,0.04)');
            neb.addColorStop(0.5, 'rgba(123,47,255,0.02)');
            neb.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = neb;
            ctx.fillRect(0, 0, W, H);

            // Particles
            particles.forEach((p) => {
                // Attract to mouse
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    p.vx += dx * 0.00005;
                    p.vy += dy * 0.00005;
                }
                p.vx *= 0.995;
                p.vy *= 0.995;
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;

                ctx.save();
                ctx.globalAlpha = p.opacity;
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
                grd.addColorStop(0, `hsla(${p.hue},70%,70%,1)`);
                grd.addColorStop(1, `hsla(${p.hue},70%,70%,0)`);
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            raf = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <section
            id="cta"
            style={{
                position: 'relative',
                minHeight: '80vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                borderTop: '1px solid rgba(200,164,90,0.06)',
            }}
        >
            {/* Nebula canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    pointerEvents: 'none',
                }}
            />

            {/* Gold horizontal lines */}
            <div style={{
                position: 'absolute', top: '20%', left: 0, right: 0, height: 1,
                background: 'linear-gradient(to right, transparent, rgba(200,164,90,0.15), transparent)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '20%', left: 0, right: 0, height: 1,
                background: 'linear-gradient(to right, transparent, rgba(200,164,90,0.15), transparent)',
                pointerEvents: 'none',
            }} />

            {/* Content */}
            <div style={{
                position: 'relative', zIndex: 10,
                textAlign: 'center', padding: '80px 24px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
                {/* Crown symbol */}
                <div style={{
                    fontSize: 48,
                    marginBottom: 32,
                    animation: 'float 4s ease-in-out infinite',
                    filter: 'drop-shadow(0 0 24px rgba(200,164,90,0.6))',
                }}>
                    ♛
                </div>

                <span className="section-label" style={{ marginBottom: 24, display: 'block' }}>
                    Your Cosmic Inheritance
                </span>

                <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(52px, 9vw, 120px)',
                    fontWeight: 600,
                    lineHeight: 0.92,
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(135deg, #7a6030 0%, #c8a45a 30%, #e8c47a 50%, #c8a45a 70%, #7a6030 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 4s linear infinite',
                    marginBottom: 32,
                }}>
                    YOUR CROWN<br />AWAITS
                </h2>

                <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(15px, 1.5vw, 18px)',
                    color: 'var(--muted)',
                    maxWidth: 440,
                    lineHeight: 1.7,
                    marginBottom: 56,
                    letterSpacing: '0.03em',
                }}>
                    The cosmos has been waiting for someone like you to wear its symbols. Step into your alignment.
                </p>

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a
                        href="https://crownz19.com/collections/all"
                        target="_blank"
                        rel="noreferrer"
                        className="cta-btn"
                        onMouseEnter={() => setHov(true)}
                        onMouseLeave={() => setHov(false)}
                        style={{
                            padding: '18px 52px',
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            borderRadius: 2,
                            background: hov
                                ? 'linear-gradient(135deg, var(--gold-glow), var(--gold))'
                                : 'linear-gradient(135deg, var(--gold), rgba(200,164,90,0.85))',
                            color: '#000',
                            boxShadow: hov
                                ? '0 0 60px rgba(200,164,90,0.5), 0 0 120px rgba(200,164,90,0.15), 0 12px 40px rgba(0,0,0,0.6)'
                                : '0 0 30px rgba(200,164,90,0.25)',
                            transition: 'all 0.4s var(--ease-cosmic)',
                            transform: hov ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                        }}
                    >
                        Enter The Cosmos
                    </a>

                    <a
                        href="#story"
                        className="cta-btn"
                        style={{
                            padding: '18px 40px',
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            borderRadius: 2,
                            border: '1px solid rgba(200,164,90,0.3)',
                            color: 'var(--gold)',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(200,164,90,0.6)';
                            e.currentTarget.style.background = 'rgba(200,164,90,0.06)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(200,164,90,0.3)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        Learn the Philosophy
                    </a>
                </div>
            </div>
        </section>
    );
}
