import { useEffect, useState } from 'react';
type Memory = {
  id: string;
  src: string;
  caption: string;
  tilt: number;
};

const imagePath = (name: string) => encodeURI(`/images/${name}`);

const topRope: Memory[] = [
  { id: 't1', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.31 PM.jpeg'), caption: 'always you', tilt: -6 },
  { id: 't2', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.32 PM.jpeg'), caption: 'my smile', tilt: 4 },
  { id: 't3', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.33 PM.jpeg'), caption: 'this moment', tilt: -3 },
  { id: 't4', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.34 PM.jpeg'), caption: 'my home', tilt: 5 },
  { id: 't5', src: imagePath('girl1.jpeg'), caption: 'forever', tilt: -4 },
  { id: 't6', src: imagePath('girl2.jpeg'), caption: 'my sunshine', tilt: 3 },
];

const bottomRope: Memory[] = [
  { id: 'b1', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.39 PM.jpeg'), caption: 'sweet girl', tilt: 5 },
  { id: 'b2', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.40 PM.jpeg'), caption: 'my wish', tilt: -5 },
  { id: 'b3', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.40 PM (1).jpeg'), caption: 'with you', tilt: 3 },
  { id: 'b4', src: imagePath('WhatsApp Image 2026-10-14 at 2.31.44 PM.jpeg'), caption: 'my heart', tilt: -4 },
  { id: 'b5', src: imagePath('girl3.jpeg'), caption: 'our day', tilt: 6 },
  { id: 'b6', src: imagePath('girl4.jpeg'), caption: 'my princess', tilt: -3 },
];

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return reduce;
}

function Rope({ photos, direction }: { photos: Memory[]; direction: 'rtl' | 'ltr' }) {
  const reduce = useReducedMotion();
  const sets = reduce ? [photos] : [photos, photos];
  return (
    <div className="clothesline">
      <div className="rope-line" aria-hidden="true" />
      <div className="rope-window">
        <div className={`rope-track rope-${direction}`}>
          {sets.map((set, copy) => (
            <div className="rope-set" key={copy} aria-hidden={copy > 0 || undefined}>
              {set.map((photo) => (
                <figure className="clipped-polaroid" key={`${photo.id}-${copy}`}>
                  <span className="clothespin" aria-hidden="true" />
                  <div className="polaroid-frame" style={{ '--tilt': `${photo.tilt}deg` } as React.CSSProperties}>
                    <img className="portrait portrait-photo" src={photo.src} alt={copy > 0 ? '' : photo.caption} loading="eager" decoding="async" />
                    <figcaption>{photo.caption}</figcaption>
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MemoryGallery() {
  return (
    <section className="memory-gallery" aria-label="Memory gallery">
      <h1 className="section-title">Memory Gallery</h1>
      <p className="memory-lead">Twelve little moments, clipped up just for you ♡</p>
      <Rope photos={topRope} direction="rtl" />
      <Rope photos={bottomRope} direction="ltr" />
    </section>
  );
}
