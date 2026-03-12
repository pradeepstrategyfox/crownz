import { useEffect, useState, useRef } from 'react';

export default function Cosmism() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section 
            id="cosmism"
            ref={sectionRef}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: 'var(--void)',
                padding: '100px 24px',
            }}
        >
            {/* Cosmic Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url("/cosmism-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                opacity: 0.4,
                zIndex: 0,
                transform: visible ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 10s ease-out',
            }} />

            {/* Gradient Overlay for blending */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, var(--void) 0%, transparent 20%, transparent 80%, var(--void) 100%)',
                zIndex: 1,
            }} />

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                {/* Section Header */}
                <div style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 1.2s var(--ease-cosmic)',
                }}>
                    <span className="section-label" style={{ color: 'var(--gold-glow)', display: 'block', marginBottom: '24px' }}>
                        The Essence of CrownZ
                    </span>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(40px, 6vw, 84px)',
                        fontWeight: 300,
                        color: 'var(--star)',
                        lineHeight: 1.1,
                        marginBottom: '40px',
                    }}>
                        CrownZ represent <span className="gold-text">Cosmism</span>
                    </h2>
                </div>

                {/* Glass Card */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(12px)',
                    padding: '60px 40px',
                    borderRadius: '2px',
                    border: '1px solid var(--glass-border)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'all 1.5s var(--ease-cosmic)',
                    transitionDelay: '0.4s',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(18px, 2vw, 24px)',
                        color: 'var(--star)',
                        lineHeight: 1.6,
                        fontWeight: 300,
                        letterSpacing: '0.05em',
                    }}>
                        Cosmism is a framework of thought rooted in recognizing and harnessing humanity’s intrinsic connection to cosmic forces, energies, and universal laws.
                    </p>
                    
                    <div style={{
                        width: '80px',
                        height: '1px',
                        background: 'var(--gold)',
                        margin: '40px auto',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                        transition: 'all 1s ease',
                        transitionDelay: '1s',
                    }} />

                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(20px, 2.5vw, 32px)',
                        color: 'var(--gold-glow)',
                        lineHeight: 1.4,
                        fontStyle: 'italic',
                        fontWeight: 300,
                    }}>
                        It is the conscious alignment of the Local Self with the Cosmic Self.
                    </p>
                </div>
            </div>
        </section>
    );
}
