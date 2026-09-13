import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SlideMeta } from '../types';

interface SlideNavigationProps {
  slides: SlideMeta[];
  currentSlide: number;
  onNext: () => void;
  onPrev: () => void;
  onJump: (slideId: number) => void;
}

export function SlideNavigation({
  slides,
  currentSlide,
  onNext,
  onPrev,
  onJump,
}: SlideNavigationProps) {
  const isFirst = currentSlide === 1;
  const isLast = currentSlide === slides.length;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-military/15 bg-offwhite/95 px-3 pb-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Trước"
          className="flex min-h-[44px] min-w-[44px] items-center gap-1 rounded-full bg-military px-4 py-2 font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Trước</span>
        </button>

        <div className="flex min-h-[44px] items-center gap-2">
          {slides.map((slide) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => onJump(slide.id)}
              aria-label={`Đi tới slide ${slide.id}: ${slide.title}`}
              aria-current={slide.id === currentSlide}
              className="flex h-[44px] w-[24px] items-center justify-center"
            >
              <span
                className={
                  slide.id === currentSlide
                    ? 'h-2.5 w-2.5 rounded-full bg-fpt'
                    : 'h-2 w-2 rounded-full bg-military/25'
                }
              />
            </button>
          ))}
        </div>

        <span className="min-w-[44px] text-center text-sm font-semibold text-charcoal/70">
          {currentSlide} / {slides.length}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          aria-label="Tiếp theo"
          className="flex min-h-[44px] min-w-[44px] items-center gap-1 rounded-full bg-military px-4 py-2 font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span className="hidden sm:inline">Tiếp theo</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </nav>
  );
}
