import { useEffect, useRef, useState } from 'react';

export default function Hero() {
    const canvasRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    // Animated starfield canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;
        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        const STAR_COUNT = 280;
        const stars = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.6 + 0.2,
            speed: Math.random() * 0.15 + 0.03,
            opacity: Math.random() * 0.7 + 0.2,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            layer: Math.floor(Math.random() * 3), // 0=back,1=mid,2=front
        }));

        let mouseX = W / 2;
        let mouseY = H / 2;
        window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

        let frame = 0;
        const draw = () => {
            frame++;
            ctx.clearRect(0, 0, W, H);

            // Deep space gradient
            const bg = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.9);
            bg.addColorStop(0, 'rgba(15,8,40,1)');
            bg.addColorStop(0.4, 'rgba(8,5,25,1)');
            bg.addColorStop(1, 'rgba(0,0,0,1)');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Nebula effect — golden violet glow at center
            const nebula = ctx.createRadialGradient(W * 0.5, H * 0.38, 0, W * 0.5, H * 0.38, W * 0.35);
            nebula.addColorStop(0, 'rgba(123,47,255,0.04)');
            nebula.addColorStop(0.5, 'rgba(200,164,90,0.03)');
            nebula.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = nebula;
            ctx.fillRect(0, 0, W, H);

            // Stars with parallax mouse offset
            const layers = [0.008, 0.018, 0.035];
            stars.forEach((s) => {
                s.twinkle += s.twinkleSpeed;
                const twinkleOp = s.opacity * (0.6 + 0.4 * Math.sin(s.twinkle));
                const px = s.x + (mouseX - W / 2) * layers[s.layer];
                const py = s.y + (mouseY - H / 2) * layers[s.layer];
                ctx.save();
                ctx.globalAlpha = twinkleOp;
                const grd = ctx.createRadialGradient(px, py, 0, px, py, s.r * 2);
                grd.addColorStop(0, s.layer === 2 ? 'rgba(245,240,232,1)' : 'rgba(255,255,255,0.9)');
                grd.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(px, py, s.r * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });

            raf = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
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
            {/* Starfield */}
            <canvas ref={canvasRef} style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                pointerEvents: 'none',
            }} />

            {/* Vignette */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
            }} />

            {/* Floating cosmic ring behind text */}
            <div style={{
                position: 'absolute',
                width: 400, height: 400,
                borderRadius: '50%',
                border: '1px solid rgba(200,164,90,0.12)',
                boxShadow: '0 0 80px rgba(200,164,90,0.06), inset 0 0 80px rgba(123,47,255,0.04)',
                animation: 'orbit 30s linear infinite',
                transformOrigin: 'center center',
                top: '50%', left: '50%',
                marginTop: -200, marginLeft: -200,
            }} />
            <div style={{
                position: 'absolute',
                width: 580, height: 580,
                borderRadius: '50%',
                border: '1px solid rgba(200,164,90,0.07)',
                animation: 'orbit 50s linear infinite reverse',
                top: '50%', left: '50%',
                marginTop: -290, marginLeft: -290,
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
