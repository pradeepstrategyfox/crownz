import { useEffect, useRef, useState } from 'react';

const stats = [
    { value: 19, suffix: '', label: 'Cosmic Keys' },
    { value: 3, suffix: '', label: 'Sacred Symbols' },
    { value: 1, suffix: '', label: 'Universe' },
];

function useMoonPhase() {
    const now = new Date();
    const knownNew = new Date('2000-01-06T00:00:00Z');
    const lunarCycle = 29.53058867;
    const elapsed = (now - knownNew) / (1000 * 60 * 60 * 24);
    const phase = ((elapsed % lunarCycle) + lunarCycle) % lunarCycle;
    const pct = phase / lunarCycle;

    if (pct < 0.0625) return { name: 'New Moon', symbol: '🌑', pct };
    if (pct < 0.1875) return { name: 'Waxing Crescent', symbol: '🌒', pct };
    if (pct < 0.3125) return { name: 'First Quarter', symbol: '🌓', pct };
    if (pct < 0.4375) return { name: 'Waxing Gibbous', symbol: '🌔', pct };
    if (pct < 0.5625) return { name: 'Full Moon', symbol: '🌕', pct };
    if (pct < 0.6875) return { name: 'Waning Gibbous', symbol: '🌖', pct };
    if (pct < 0.8125) return { name: 'Last Quarter', symbol: '🌗', pct };
    return { name: 'Waning Crescent', symbol: '🌘', pct };
}

function AnimatedCounter({ target, suffix, visible }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const step = () => {
            start += Math.ceil((target - start) * 0.08);
            setCount(start >= target ? target : start);
            if (start < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [visible, target]);
    return <>{count}{suffix}</>;
}

function useVisible(ref) {
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return vis;
}

export default function SignatureExperience() {
    const moon = useMoonPhase();
    const sectionRef = useRef(null);
    const visible = useVisible(sectionRef);
    const canvasRef = useRef(null);

    // Live time
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    // Solar angle
    const hours = time.getHours() + time.getMinutes() / 60;
    const sunAngle = ((hours - 6) / 24) * 360;

    // Orbital canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;
        let frame = 0;
        const W = canvas.width = 400;
        const H = canvas.height = 400;
        const cx = W / 2, cy = H / 2;

        const draw = () => {
            frame++;
            ctx.clearRect(0, 0, W, H);

            // Deep space bg
            const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
            bg.addColorStop(0, 'rgba(15,8,40,1)');
            bg.addColorStop(1, 'rgba(5,5,16,1)');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Stars
            for (let i = 0; i < 60; i++) {
                const seed = i * 7.3;
                const sx = (Math.sin(seed) * 0.5 + 0.5) * W;
                const sy = (Math.cos(seed * 1.3) * 0.5 + 0.5) * H;
                const op = 0.3 + 0.3 * Math.sin(frame * 0.02 + seed);
                ctx.fillStyle = `rgba(245,240,232,${op})`;
                ctx.beginPath();
                ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
                ctx.fill();
            }

            // Orbit rings
            [80, 130, 170].forEach((r, i) => {
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(200,164,90,${0.06 + i * 0.04})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Sun (center)
            const sunGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22);
            sunGrd.addColorStop(0, '#fff8d0');
            sunGrd.addColorStop(0.4, '#e8c47a');
            sunGrd.addColorStop(1, 'rgba(200,164,90,0)');
            ctx.fillStyle = sunGrd;
            ctx.beginPath();
            ctx.arc(cx, cy, 22, 0, Math.PI * 2);
            ctx.fill();

            // Orbiting Earth
            const a1 = (frame * 0.008) % (Math.PI * 2);
            const ex = cx + Math.cos(a1) * 80;
            const ey = cy + Math.sin(a1) * 80;
            ctx.fillStyle = 'rgba(26,212,200,0.9)';
            ctx.beginPath();
            ctx.arc(ex, ey, 6, 0, Math.PI * 2);
            ctx.fill();

            // Moon
            const a2 = (frame * 0.024) % (Math.PI * 2);
            const mx = cx + Math.cos(a2) * 130;
            const my = cy + Math.sin(a2) * 130;
            ctx.fillStyle = 'rgba(200,180,140,0.9)';
            ctx.beginPath();
            ctx.arc(mx, my, 4, 0, Math.PI * 2);
            ctx.fill();

            // Outer star body
            const a3 = (frame * 0.004) % (Math.PI * 2);
            const vx = cx + Math.cos(a3) * 170;
            const vy = cy + Math.sin(a3) * 170;
            ctx.fillStyle = 'rgba(123,47,255,0.8)';
            ctx.beginPath();
            ctx.arc(vx, vy, 3, 0, Math.PI * 2);
            ctx.fill();

            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            style={{
                background: 'var(--cosmos)',
                padding: '120px 0',
                position: 'relative',
                overflow: 'hidden',
                borderTop: '1px solid rgba(200,164,90,0.08)',
            }}
        >
            {/* Background noise texture suggestion */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'0\' y=\'0\' width=\'1\' height=\'1\' fill=\'%23fff\'/%3E%3C/svg%3E")',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 60px' }}>
                {/* Header */}
                <div style={{ marginBottom: 80 }}>
                    <span className="section-label">The Cosmic Tracker</span>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(36px, 5vw, 68px)',
                        fontWeight: 300,
                        color: 'var(--star)',
                        marginTop: 16,
                        lineHeight: 1.05,
                    }}>
                        Aligned With<br />
                        <span className="gold-text" style={{ fontWeight: 600 }}>The Universe</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 80,
                    alignItems: 'center',
                }}>
                    {/* Left: Orbital canvas */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                        <canvas
                            ref={canvasRef}
                            style={{
                                width: 340, height: 340, borderRadius: '50%',
                                border: '1px solid rgba(200,164,90,0.15)',
                                boxShadow: '0 0 60px rgba(200,164,90,0.05)',
                            }}
                        />

                        {/* Moon phase display */}
                        <div style={{
                            display: 'flex', gap: 24, alignItems: 'center',
                            padding: '16px 32px',
                            border: '1px solid rgba(200,164,90,0.15)',
                            borderRadius: 4,
                            background: 'rgba(200,164,90,0.03)',
                        }}>
                            <span style={{ fontSize: 32 }}>{moon.symbol}</span>
                            <div>
                                <div style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                                    Current Moon Phase
                                </div>
                                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--star)', marginTop: 4 }}>
                                    {moon.name}
                                </div>
                            </div>
                            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.2em' }}>
                                    {time.toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div>
                        <p style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(22px, 2.5vw, 32px)',
                            fontWeight: 300,
                            lineHeight: 1.5,
                            color: 'var(--star)',
                            fontStyle: 'italic',
                            marginBottom: 40,
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s var(--ease-cosmic)',
                        }}>
                            "Every piece was crafted under cosmic alignment — the same forces that govern the stars govern the intention behind each stitch and setting."
                        </p>

                        <p style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: 15,
                            lineHeight: 1.8,
                            color: 'var(--muted)',
                            marginBottom: 60,
                            opacity: visible ? 1 : 0,
                            transition: 'opacity 0.8s 0.3s',
                        }}>
                            Cosmism is not a religion or a trend. It is a framework — recognizing that you exist as both a local self and a cosmic self. CrownZ gives you the language to wear that truth.
                        </p>

                        {/* Counters */}
                        <div style={{ display: 'flex', gap: 40 }}>
                            {stats.map((s) => (
                                <div key={s.label}>
                                    <div style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontSize: 56,
                                        fontWeight: 600,
                                        lineHeight: 1,
                                        color: 'var(--gold)',
                                        animation: 'counter-glow 3s ease-in-out infinite',
                                    }}>
                                        <AnimatedCounter target={s.value} suffix={s.suffix} visible={visible} />
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: 11, letterSpacing: '0.25em',
                                        color: 'var(--muted)', textTransform: 'uppercase',
                                        marginTop: 8,
                                    }}>
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quote bar */}
                        <div style={{
                            marginTop: 48,
                            padding: '20px 0',
                            borderTop: '1px solid rgba(200,164,90,0.15)',
                            display: 'flex', alignItems: 'center', gap: 16,
                        }}>
                            <div style={{ width: 32, height: 1, background: 'var(--gold)' }} />
                            <span style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 15,
                                fontStyle: 'italic',
                                color: 'var(--muted)',
                            }}>
                                Solar &amp; Lunar Events — tracked, honored, worn
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
