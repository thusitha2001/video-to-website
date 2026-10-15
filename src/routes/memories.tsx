import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Scrapbook, pageHead } from '@/components/birthday/scrapbook';
import { MemoryGallery } from '@/components/birthday/memory-gallery';
import { allGiftsOpened, markGallerySeen } from '@/components/birthday/opened-gifts';

export const Route = createFileRoute('/memories')({
  head: () => pageHead('Memory Gallery', 'Ten polaroids from the heart, hanging on two little ropes.'),
  component: Memories,
});

function Memories() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!allGiftsOpened()) {
      void navigate({ to: '/gifts', search: { menu: true }, replace: true });
      return;
    }
    markGallerySeen();
  }, [navigate]);

  return (
    <Scrapbook back scroll>
      <MemoryGallery />
    </Scrapbook>
  );
}
