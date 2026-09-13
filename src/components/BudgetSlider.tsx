import { PERSONAL_BUDGET } from '../data/militaryData';

interface BudgetSliderProps {
  amount: number;
  onLiveChange: (value: number) => void;
  onCommit: (value: number) => void;
}

function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}₫`;
}

export function BudgetSlider({ amount, onLiveChange, onCommit }: BudgetSliderProps) {
  const isLow = amount <= PERSONAL_BUDGET.lowThreshold;
  const isHigh = amount >= PERSONAL_BUDGET.highThreshold;

  return (
    <div className="rounded-lg border border-military/15 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-charcoal">{PERSONAL_BUDGET.label}</span>
        <span className="shrink-0 font-semibold text-military">{formatVND(amount)}</span>
      </div>

      <input
        type="range"
        min={PERSONAL_BUDGET.min}
        max={PERSONAL_BUDGET.max}
        step={PERSONAL_BUDGET.step}
        value={amount}
        onChange={(event) => onLiveChange(Number(event.target.value))}
        onMouseUp={(event) => onCommit(Number(event.currentTarget.value))}
        onTouchEnd={(event) => onCommit(Number(event.currentTarget.value))}
        onKeyUp={(event) => onCommit(Number(event.currentTarget.value))}
        className="mt-2 h-11 w-full cursor-pointer accent-military"
        aria-label={PERSONAL_BUDGET.label}
      />
      <div className="flex justify-between text-xs text-charcoal/40">
        <span>{formatVND(PERSONAL_BUDGET.min)}</span>
        <span>{formatVND(PERSONAL_BUDGET.max)}</span>
      </div>

      {isLow && (
        <p className="mt-2 rounded-lg bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
          ⚠️ {PERSONAL_BUDGET.lowWarning}
        </p>
      )}
      {isHigh && (
        <p className="mt-2 rounded-lg bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
          ⚠️ {PERSONAL_BUDGET.highWarning}
        </p>
      )}
    </div>
  );
}
