import { useState } from 'react';
import { sized, srcSet } from '@/lib/img';

/**
 * Lazy, responsive photo. If an image ever fails to load it is swapped for a
 * branded sun-and-contour gradient, so the layout never shows a broken image.
 */
export default function Img({ src, alt, sizes = '100vw', className = '', priority = false, width = 1600, height = 1067, style }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ ...style, backgroundImage: 'radial-gradient(circle at 70% 30%, #B8C94A 0 12%, transparent 13%), linear-gradient(160deg, #E4EBD7, #D2DFC3 55%, #5C7A4C)' }}
        className={`contours ${className}`}
      />
    );
  }
  return (
    <img
      src={sized(src, 1200)}
      srcSet={srcSet(src)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      onError={() => setFailed(true)}
      style={style}
      className={`bg-adobe-3 object-cover ${className}`}
    />
  );
}
