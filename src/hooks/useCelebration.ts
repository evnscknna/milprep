import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const CELEBRATION_KEY = 'milprep:celebration:hasCelebrated';

function readHasCelebrated(): boolean {
  try {
    return localStorage.getItem(CELEBRATION_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeHasCelebrated(): void {
  try {
    localStorage.setItem(CELEBRATION_KEY, 'true');
  } catch {
    // localStorage unavailable (private mode, in-app browser restrictions) - safe to ignore
  }
}

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function fireFireworks(): void {
  if (prefersReducedMotion()) return;
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.3, y: 0.6 },
  });
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.7, y: 0.6 },
    });
  }, 150);
}

export interface UseCelebrationParams {
  packingPercent: number;
  isOnSlide6: boolean;
}

export function useCelebration({ packingPercent, isOnSlide6 }: UseCelebrationParams): void {
  const hasCelebratedRef = useRef(readHasCelebrated());

  useEffect(() => {
    if (hasCelebratedRef.current) return;
    if (packingPercent === 100 || isOnSlide6) {
      fireFireworks();
      hasCelebratedRef.current = true;
      writeHasCelebrated();
    }
  }, [packingPercent, isOnSlide6]);
}
