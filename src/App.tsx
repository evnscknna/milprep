import { useCallback, useState } from 'react';
import {
  BANNED_ACK_ITEMS,
  BORROWED_GEAR_SECTION,
  FIRST_DAY_PURCHASE_SECTION,
  PACKING_SECTION_A,
  SLIDES,
} from './data/militaryData';
import { useChecklistStorage } from './hooks/useChecklistStorage';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useSwipeNavigation } from './hooks/useSwipeNavigation';
import { useCelebration } from './hooks/useCelebration';
import { SlideNavigation } from './components/SlideNavigation';
import { GateConfirmDialog } from './components/GateConfirmDialog';
import { Slide1Location } from './components/slides/Slide1Location';
import { Slide2CostInfo } from './components/slides/Slide2CostInfo';
import { Slide3PackingChecklist } from './components/slides/Slide3PackingChecklist';
import { Slide4RecommendedGear } from './components/slides/Slide4RecommendedGear';
import { Slide5BannedItems } from './components/slides/Slide5BannedItems';
import { Slide6SurvivalTips } from './components/slides/Slide6SurvivalTips';

function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [pendingSlide, setPendingSlide] = useState<number | null>(null);

  const packingHome = useChecklistStorage(PACKING_SECTION_A.sectionId, PACKING_SECTION_A.items);
  const borrowedGear = useChecklistStorage(
    BORROWED_GEAR_SECTION.sectionId,
    BORROWED_GEAR_SECTION.items,
  );
  const firstDayPurchase = useChecklistStorage(
    FIRST_DAY_PURCHASE_SECTION.sectionId,
    FIRST_DAY_PURCHASE_SECTION.items,
  );
  const bannedAck = useChecklistStorage('banned-ack', BANNED_ACK_ITEMS);

  const requiredHomeItems = PACKING_SECTION_A.items.filter((item) => !item.skippableInGate);
  const isSlide3Complete = requiredHomeItems.every((item) => packingHome.isChecked(item.id));
  const isSlide5Complete = BANNED_ACK_ITEMS.every((item) => bannedAck.isChecked(item.id));

  const gateSatisfied =
    currentSlide === 3 ? isSlide3Complete : currentSlide === 5 ? isSlide5Complete : true;

  const goToSlide = useCallback((next: number) => {
    setCurrentSlide(Math.min(Math.max(next, 1), SLIDES.length));
  }, []);

  const requestNavigate = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 1), SLIDES.length);
      if (clamped > currentSlide && !gateSatisfied) {
        setPendingSlide(clamped);
        return;
      }
      goToSlide(clamped);
    },
    [currentSlide, gateSatisfied, goToSlide],
  );

  const goNext = useCallback(() => requestNavigate(currentSlide + 1), [currentSlide, requestNavigate]);
  const goPrev = useCallback(() => requestNavigate(currentSlide - 1), [currentSlide, requestNavigate]);

  const handleReviewMore = () => setPendingSlide(null);
  const handleProceedAnyway = () => {
    if (pendingSlide !== null) {
      goToSlide(pendingSlide);
    }
    setPendingSlide(null);
  };

  useKeyboardNavigation(goNext, goPrev);
  const swipeHandlers = useSwipeNavigation(goNext, goPrev);

  useCelebration({ packingPercent: packingHome.progress.percent, isOnSlide6: currentSlide === 6 });

  const activeSlideMeta = SLIDES.find((slide) => slide.id === currentSlide) ?? SLIDES[0];

  const renderActiveSlide = () => {
    switch (activeSlideMeta.key) {
      case 'location':
        return <Slide1Location />;
      case 'cost':
        return <Slide2CostInfo />;
      case 'packing':
        return (
          <Slide3PackingChecklist
            homeChecklist={packingHome}
            borrowedChecklist={borrowedGear}
            purchaseChecklist={firstDayPurchase}
          />
        );
      case 'gear':
        return <Slide4RecommendedGear />;
      case 'banned':
        return <Slide5BannedItems checklist={bannedAck} />;
      case 'survival':
        return <Slide6SurvivalTips />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col bg-offwhite">
      <main
        className="flex-1 touch-pan-y overflow-y-auto px-4 pb-28 pt-6"
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        {renderActiveSlide()}
      </main>
      <SlideNavigation
        slides={SLIDES}
        currentSlide={currentSlide}
        onNext={goNext}
        onPrev={goPrev}
        onJump={requestNavigate}
      />
      <GateConfirmDialog
        open={pendingSlide !== null}
        onReview={handleReviewMore}
        onProceed={handleProceedAnyway}
      />
    </div>
  );
}

export default App;
