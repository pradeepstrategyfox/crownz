import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const raf = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      raf.current = requestAnimationFrame(loop);
    };

    const onEnter = (e) => {
      const el = e.target;
      if (el.matches('a, button, [data-hover], .product-card, .cta-btn')) {
        dot.style.opacity = '0';
        ringEl.style.width = '60px';
        ringEl.style.height = '60px';
        ringEl.style.borderColor = 'var(--gold-glow)';
        ringEl.style.background = 'rgba(200,164,90,0.08)';
        ringEl.style.marginLeft = '-30px';
        ringEl.style.marginTop = '-30px';
      }
    };

    const onLeave = () => {
      dot.style.opacity = '1';
      ringEl.style.width = '40px';
      ringEl.style.height = '40px';
      ringEl.style.borderColor = 'rgba(200,164,90,0.6)';
      ringEl.style.background = 'transparent';
      ringEl.style.marginLeft = '0';
      ringEl.style.marginTop = '0';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout', onLeave);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 8, height: 8,
          borderRadius: '50%', background: 'var(--gold)',
          pointerEvents: 'none', zIndex: 99999,
          boxShadow: '0 0 12px var(--gold), 0 0 24px rgba(200,164,90,0.4)',
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 40, height: 40,
          borderRadius: '50%', border: '1px solid rgba(200,164,90,0.6)',
          pointerEvents: 'none', zIndex: 99998,
          transition: 'width 0.3s var(--ease-cosmic), height 0.3s var(--ease-cosmic), border-color 0.3s, background 0.3s, margin 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
