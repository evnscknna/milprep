import { PERSONAL_BUDGET } from '../data/militaryData';

interface BudgetSliderProps {
  amount: number;
  checked: boolean;
  onToggleConfirm: () => void;
  onLiveChange: (value: number) => void;
  onCommit: (value: number) => void;
}

function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}₫`;
}

export function BudgetSlider({
  amount,
  checked,
  onToggleConfirm,
  onLiveChange,
  onCommit,
}: BudgetSliderProps) {
  const isLow = amount <= PERSONAL_BUDGET.lowThreshold;
  const isHigh = amount >= PERSONAL_BUDGET.highThreshold;

  return (
    <div className="rounded-lg border border-military/15 bg-white p-3">
      <label
        htmlFor="cost-personal-confirm"
        className="flex min-h-[44px] cursor-pointer items-start gap-3"
      >
        <input
          id="cost-personal-confirm"
          type="checkbox"
          checked={checked}
          onChange={onToggleConfirm}
          className="mt-1 h-6 w-6 shrink-0 accent-military"
        />
        <span
          className={
            checked
              ? 'min-w-0 flex-1 break-words font-medium text-charcoal/50 line-through'
              : 'min-w-0 flex-1 break-words font-medium text-charcoal'
          }
        >
          {PERSONAL_BUDGET.label}
        </span>
      </label>

      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="text-sm text-charcoal/60">Tự chọn số tiền mang theo</span>
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
