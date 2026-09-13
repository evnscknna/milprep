interface ProgressBarProps {
  label: string;
  checkedCount: number;
  totalCount: number;
  percent: number;
  completeMessage?: string;
}

export function ProgressBar({
  label,
  checkedCount,
  totalCount,
  percent,
  completeMessage = 'Đã sẵn sàng lên đường! Đừng quên kiểm tra lại lần cuối nhé.',
}: ProgressBarProps) {
  const isComplete = percent === 100;

  return (
    <div className="w-full rounded-xl border border-military/20 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-semibold text-military">{label}</span>
        <span
          className={
            isComplete
              ? 'shrink-0 rounded-full bg-military px-3 py-1 text-sm font-bold text-white'
              : 'shrink-0 rounded-full bg-military/10 px-3 py-1 text-sm font-bold text-military'
          }
        >
          {checkedCount}/{totalCount} ({percent}%)
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-military/10">
        <div
          className="h-full rounded-full bg-military transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      {isComplete && <p className="mt-2 text-sm font-medium text-military">{completeMessage}</p>}
    </div>
  );
}
