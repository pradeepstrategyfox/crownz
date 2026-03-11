import { useState, useRef } from 'react';
import { Play, Pause, ShoppingBag } from 'lucide-react';
import PropTypes from 'prop-types';

const reels = [
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/shorts/RjMUZm7mLJY',
    productName: '19 Keys Calligraphy Necklace',
    price: 'From $74.99',
    productLink: 'https://crownz19.com/products/keys-chain',
    thumbnail: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
  },
  {
    id: 2,
    videoUrl: 'https://www.youtube.com/shorts/j9mGhIGLVLU',
    productName: '100% High LVL Tee',
    price: '$60.00',
    productLink: 'https://crownz19.com/products/untitled-sep11_13-13',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
  },
  {
    id: 3,
    videoUrl: 'https://www.youtube.com/shorts/CR7C1AV5TcI',
    productName: 'Calligraphy Keys Necklace',
    price: '$74.99',
    productLink: 'https://crownz19.com/products/calligraphy-keys-necklace-teal',
    thumbnail: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&q=80',
  },
  {
    id: 4,
    videoUrl: 'https://www.youtube.com/shorts/JaeEgPkmGmw',
    productName: 'Black Star CrownZ Ring',
    price: 'From $495.00',
    productLink: 'https://crownz19.com/products/black-star-ring-special-order-only',
    thumbnail: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80',
  },
  {
    id: 5,
    videoUrl: 'https://www.youtube.com/shorts/IoHrx_9VmH0',
    productName: ' CrownZ Ring',
    price: 'From $385.00',
    productLink: 'https://crownz19.com/products/black-star-ring-special-order-only',
    thumbnail: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&q=80',
  },
];

export default function ShoppableReels() {
  return (
    <section style={{
      background: 'var(--void)',
      padding: '120px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="section-label">Cosmic Visages</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300,
            color: 'var(--star)',
            marginTop: 16,
          }}>
            See The <span className="gold-text" style={{ fontWeight: 600 }}>CrownZ</span> In Motion
          </h2>
        </div>

        <div className="reels-carousel" style={{
          display: 'flex',
          gap: 24,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: 24,
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          <style>
            {`
              .reels-carousel::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {reels.map((reel) => (
            <div key={reel.id} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 280 }}>
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReelCard({ reel }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : null;
  };
  const ytId = getYouTubeId(reel.videoUrl);

  const togglePlay = (e) => {
    e.preventDefault();
    if (ytId && iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: isPlaying ? 'pauseVideo' : 'playVideo', args: [] }),
        '*'
      );
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="region"
      aria-label={`Reel for ${reel.productName}`}
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        aspectRatio: '9/16',
        backgroundColor: 'var(--void)',
        border: '1px solid rgba(200,164,90,0.1)',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(200,164,90,0.1)' : '0 10px 30px rgba(0,0,0,0.3)',
        transition: 'all 0.4s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Video Player */}
      {ytId ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&modestbranding=1&showinfo=0&rel=0&enablejsapi=1`}
          allow="autoplay; encrypted-media"
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            border: 'none',
            transition: 'transform 0.8s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      ) : (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.8s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      )}

      {/* Play/Pause Overlay Button */}
      <button
        onClick={togglePlay}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--star)',
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
      </button>

      {/* Gradient Overlay for Text Visibility */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Product Details & CTA */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={reel.thumbnail}
            alt={reel.productName}
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              objectFit: 'cover',
              border: '1px solid rgba(200,164,90,0.3)',
            }}
          />
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              color: 'var(--star)',
              marginBottom: 4,
              lineHeight: 1.2,
            }}>
              {reel.productName}
            </h4>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 16,
              color: 'var(--gold)',
            }}>
              {reel.price}
            </span>
          </div>
        </div>

        <a
          href={reel.productLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '12px',
            background: isHovered ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            color: isHovered ? 'var(--cosmos)' : 'var(--star)',
            borderRadius: 8,
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
          }}
        >
          <ShoppingBag size={16} />
          Shop Now
        </a>
      </div>
    </div>
  );
}
