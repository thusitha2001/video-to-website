import { useEffect, useState } from 'react';

const BACKGROUND_DISTANCE = 40;
const EDGE_DISTANCE = 110;

const CHECKER_MIN = 185;
const CHECKER_SPREAD = 22;
const CHECKER_EDGE_MIN = 130;

/**
 * Turns the backdrop of a flattened image (e.g. a JPEG exported from a transparent PNG) into real
 * transparency. `corners` samples one flat colour from the corners; `checkerboard` removes the
 * light grey/white "transparency" pattern baked into many stickers. Only backdrop pixels connected
 * to the image border are removed, so similar colours inside the subject stay.
 */
export function useCutoutImage(src: string, backdrop: 'corners' | 'checkerboard' = 'corners') {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = image;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        if (!cancelled) setUrl(src);
        return;
      }
      context.drawImage(image, 0, 0);
      const frame = context.getImageData(0, 0, width, height);
      const pixels = frame.data;

      const corners = [0, width - 1, (height - 1) * width, height * width - 1].map((p) => p * 4);
      const key = [0, 1, 2].map((c) => corners.reduce((sum, i) => sum + pixels[i + c], 0) / corners.length);
      const keyDistance = (i: number) =>
        Math.max(Math.abs(pixels[i] - key[0]), Math.abs(pixels[i + 1] - key[1]), Math.abs(pixels[i + 2] - key[2]));
      // Maps checkerboard pixels onto the same 0..EDGE_DISTANCE scale used for the corner colour.
      const checkerDistance = (i: number) => {
        const lo = Math.min(pixels[i], pixels[i + 1], pixels[i + 2]);
        const hi = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
        if (hi - lo > CHECKER_SPREAD) return EDGE_DISTANCE;
        if (lo >= CHECKER_MIN) return 0;
        if (lo <= CHECKER_EDGE_MIN) return EDGE_DISTANCE;
        return BACKGROUND_DISTANCE + ((CHECKER_MIN - lo) / (CHECKER_MIN - CHECKER_EDGE_MIN)) * (EDGE_DISTANCE - BACKGROUND_DISTANCE);
      };
      const distance = backdrop === 'checkerboard' ? checkerDistance : keyDistance;

      const background = new Uint8Array(width * height);
      const queue: number[] = [];
      const visit = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= width || y >= height) return;
        const p = y * width + x;
        if (background[p] || distance(p * 4) > BACKGROUND_DISTANCE) return;
        background[p] = 1;
        queue.push(p);
      };

      for (let x = 0; x < width; x++) {
        visit(x, 0);
        visit(x, height - 1);
      }
      for (let y = 0; y < height; y++) {
        visit(0, y);
        visit(width - 1, y);
      }
      while (queue.length) {
        const p = queue.pop()!;
        const x = p % width;
        const y = (p - x) / width;
        visit(x + 1, y);
        visit(x - 1, y);
        visit(x, y + 1);
        visit(x, y - 1);
      }

      for (let p = 0; p < background.length; p++) {
        const i = p * 4;
        if (background[p]) {
          pixels[i + 3] = 0;
          continue;
        }
        const x = p % width;
        const y = (p - x) / width;
        const touchesBackground =
          (x > 0 && background[p - 1]) ||
          (x < width - 1 && background[p + 1]) ||
          (y > 0 && background[p - width]) ||
          (y < height - 1 && background[p + width]);
        const d = distance(i);
        if (touchesBackground && d < EDGE_DISTANCE) {
          pixels[i + 3] = Math.round((255 * (d - BACKGROUND_DISTANCE)) / (EDGE_DISTANCE - BACKGROUND_DISTANCE));
        }
      }

      context.putImageData(frame, 0, 0);
      if (!cancelled) setUrl(canvas.toDataURL('image/png'));
    };
    image.onerror = () => {
      if (!cancelled) setUrl(src);
    };
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, backdrop]);

  return url;
}
