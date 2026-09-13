import { useRef } from 'react';
import type { TouchEvent } from 'react';

const SWIPE_THRESHOLD_PX = 50;

export interface SwipeHandlers {
  onTouchStart: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}

export function useSwipeNavigation(onSwipeLeft: () => void, onSwipeRight: () => void): SwipeHandlers {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    const endX = touch?.clientX ?? start.x;
    const endY = touch?.clientY ?? start.y;
    const deltaX = endX - start.x;
    const deltaY = endY - start.y;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    // A predominantly vertical drag is a scroll, not a swipe - ignore it so
    // scrolling a long checklist (Slides 3/4) never accidentally changes slides.
    if (Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchEnd };
}
