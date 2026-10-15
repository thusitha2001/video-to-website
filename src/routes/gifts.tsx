import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useLayoutEffect, useState } from 'react';
import { Music, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scrapbook, pageHead } from '@/components/birthday/scrapbook';
import { allGiftsOpened, readGallerySeen, readOpenedGifts, type GiftId } from '@/components/birthday/opened-gifts';
import { GiftBox } from '@/components/birthday/gift-box';
import { useCutoutImage } from '@/components/birthday/use-cutout-image';

export const Route = createFileRoute('/gifts')({
  validateSearch: (search: Record<string, unknown>) => ({ menu: search['menu'] === true || search['menu'] === 'true' }),
  head: () => pageHead('Your Birthday Gifts', 'A song, some flowers, and a letter from the heart.'),
  component: Gifts,
});

type Pose = 'love' | 'sad' | 'cute';

const poseLabel: Record<Pose, string> = {
  love: 'Smiling and holding a big red heart',
  sad: 'Crying sadly',
  cute: 'Winking with a finger heart',
};

const poseImage: Record<Pose, string> = {
  love: '/cartoon/love.jpeg',
  sad: '/cartoon/sad.jpeg',
  cute: '/cartoon/cute.jpeg',
};

function Gifts() {
  const { menu } = Route.useSearch();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(menu);
  const [declined, setDeclined] = useState(false);
  const [pose, setPose] = useState<Pose>('love');
  const cartoons: Record<Pose, string | null> = {
    love: useCutoutImage(poseImage.love, 'checkerboard'),
    sad: useCutoutImage(poseImage.sad, 'checkerboard'),
    cute: useCutoutImage(poseImage.cute, 'checkerboard'),
  };
  const cartoon = cartoons[pose];
  const [opened, setOpened] = useState<GiftId[]>([]);
  const [redirecting, setRedirecting] = useState(false);

  useLayoutEffect(() => {
    const gifts = readOpenedGifts();
    if (allGiftsOpened(gifts) && !readGallerySeen()) {
      setRedirecting(true);
      void navigate({ to: '/memories', replace: true });
      return;
    }
    setOpened(gifts);
  }, [navigate]);

  const decline = () => {
    if (pose === 'love') {
      setDeclined(true);
      setPose('sad');
      return;
    }
    setPose('cute');
  };

  const mark = (id: GiftId) => opened.includes(id) && <em className="gift-opened">opened</em>;

  if (redirecting) return <Scrapbook><p className="section-title">Memory Gallery</p></Scrapbook>;

  return (
    <Scrapbook backTo={accepted ? '/birthday' : undefined}>
      {!accepted ? (
        <>
          <h1 className="section-title">Happy Birthday Abinaya</h1>
          <p className="cake-note">15 October</p>
          <p className="accept-title">PLEASE ACCEPT THE GIFT</p>
          <img
            className="gift-reaction-img"
            key={pose}
            src={cartoon ?? undefined}
            style={{ visibility: cartoon ? 'visible' : 'hidden' }}
            alt={poseLabel[pose]}
          />
          <div className="accept-actions">
            <Button variant="gift" onClick={() => setAccepted(true)}>YES <Heart /></Button>
            <Button variant="gift" onClick={decline}>{declined ? 'Pretty please?' : 'NO'}</Button>
          </div>
          {declined && <p className="decline-note">{pose === 'cute' ? 'Come on, just say yes... ♡' : 'But I made it just for you... ♡'}</p>}
        </>
      ) : (
        <>
          <h1 className="section-title">Choose Your Gifts!</h1>
          <div className="gift-options">
            <Button variant="ghost" className="gift-choice" asChild>
              <Link to="/letter">
                <span className="letter-cover" aria-hidden="true">
                  <svg viewBox="0 0 180 140">
                    <rect className="envelope-paper" x="8" y="22" width="164" height="104" rx="4" />
                    <path className="envelope-fold" d="M9 124 90 61 171 124" />
                    <path className="envelope-flap" d="m9 24 73 57c5 4 11 4 16 0l73-57Z" />
                    <circle className="envelope-seal" cx="90" cy="80" r="17" />
                    <path className="envelope-heart" d="M90 89 81 81c-8-8 3-16 9-8 6-8 17 0 9 8Z" />
                  </svg>
                </span>
                <span>A little letter{mark('letter')}</span>
              </Link>
            </Button>
            <Button variant="ghost" className="gift-choice" asChild>
              <Link to="/flowers">
                <GiftBox />
                <span>A gift for you{mark('flowers')}</span>
              </Link>
            </Button>
            <Button variant="ghost" className="gift-choice" asChild>
              <Link to="/music">
                <Music />
                <span>Our little song{mark('music')}</span>
              </Link>
            </Button>
          </div>
          {allGiftsOpened(opened) && (
            <Button variant="scrapbook" className="continue-button memory-return" asChild>
              <Link to="/memories">Memory gallery</Link>
            </Button>
          )}
        </>
      )}
    </Scrapbook>
  );
}
