import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { sized } from '@/lib/img';

/** Modal image viewer with keyboard (←, →, Esc), focus trap and focus return. */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const returnTo = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      returnTo?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
      else if (e.key === 'Tab') {
        const els = dialogRef.current.querySelectorAll('button');
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, items.length, onClose, onIndex]);

  if (!item) return null;
  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}: ${item.title}`}
      className="fixed inset-0 z-[80] flex animate-fade flex-col bg-chaparral/95 text-adobe backdrop-blur"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 p-4">
        <p className="text-sm text-adobe/80" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo viewer" className="grid h-11 w-11 place-items-center rounded-full bg-poppy text-chaparral">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img
          key={item.src}
          src={sized(item.src, 1600)}
          alt={item.alt}
          className="max-h-full max-w-full animate-fade rounded-3xl object-contain"
        />
        <button
          type="button"
          onClick={() => onIndex((index - 1 + items.length) % items.length)}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-adobe/40 bg-chaparral/70 hover:border-poppy hover:text-poppy sm:left-5"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onIndex((index + 1) % items.length)}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-adobe/40 bg-chaparral/70 hover:border-poppy hover:text-poppy sm:right-5"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="p-5 text-center">
        <p className="font-display text-xl font-bold">{item.title}</p>
        <p className="mt-1 text-sm text-adobe/75">
          {item.category} · {item.alt}
        </p>
      </div>
    </div>
  );
}
