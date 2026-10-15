import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Scrapbook, pageHead } from '@/components/birthday/scrapbook';
import { useOpenedGift } from '@/components/birthday/opened-gifts';
import { GiftBox } from '@/components/birthday/gift-box';
import { useCutoutImage } from '@/components/birthday/use-cutout-image';
import bouquet from '@/assets/bouquet.png';

export const Route = createFileRoute('/flowers')({
  head: () => pageHead('Flowers for My Sweetheart', 'A bouquet of love, just for you.'),
  component: Flowers,
});

const messages = [
  'You’re my favorite person',
  'My happy place',
  'Forever and always',
  'You make my heart smile',
  'Lucky to have you',
  'You are so loved',
];

// x/y are the bouquet centre in % of the stage, size is % of the stage width.
const bouquets = [
  { x: 31, y: 9, size: 10, tilt: -18 },
  { x: 14, y: 22, size: 14, tilt: -12 },
  { x: 7, y: 56, size: 16, tilt: -6 },
  { x: 19, y: 86, size: 13, tilt: 10 },
  { x: 69, y: 9, size: 10, tilt: 18 },
  { x: 86, y: 22, size: 14, tilt: 12 },
  { x: 93, y: 56, size: 16, tilt: 6 },
  { x: 81, y: 86, size: 13, tilt: -10 },
];

function Flowers() {
  useOpenedGift('flowers');
  const [lifting, setLifting] = useState(false);
  const [opened, setOpened] = useState(false);
  const cartoon = useCutoutImage('/cartoon/flower.jpeg', 'checkerboard');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpened(true);
      return;
    }
    const lift = window.setTimeout(() => setLifting(true), 700);
    const reveal = window.setTimeout(() => setOpened(true), 1750);
    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(reveal);
    };
  }, []);

  return (
    <Scrapbook back>
      {opened ? (
        <div className="flowers-revealed">
          <h1 className="flowers-caption">Flowers for my sweetheart!</h1>
          <div className="flower-stage">
            {bouquets.map((b, i) => (
              <span
                className="stage-bouquet"
                key={i}
                aria-hidden="true"
                style={
                  {
                    left: `${b.x}%`,
                    top: `${b.y}%`,
                    width: `${b.size}%`,
                    '--tilt': `${b.tilt}deg`,
                    animationDelay: `${0.35 + i * 0.14}s`,
                  } as React.CSSProperties
                }
              >
                <img src={bouquet} alt="" style={{ animationDelay: `${i * -0.45}s` }} />
              </span>
            ))}
            <img
              className="stage-cartoon"
              src={cartoon ?? undefined}
              style={{ visibility: cartoon ? 'visible' : 'hidden' }}
              width={719}
              height={1024}
              alt="Cartoon of a smiling, winking man kneeling and holding out a bouquet of roses, lilies and carnations"
            />
          </div>
          <div className="flower-messages">
            {messages.map((text) => (
              <p key={text}>♥ {text}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className={lifting ? 'gift-reveal opening' : 'gift-reveal'} role="img" aria-label={lifting ? 'The gift box is opening' : 'A closed gift box'}>
          <GiftBox />
        </div>
      )}
    </Scrapbook>
  );
}
