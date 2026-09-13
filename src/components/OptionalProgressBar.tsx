interface OptionalProgressBarProps {
  checkedCount: number;
  totalCount: number;
  percent: number;
}

function getMessage(percent: number): string {
  if (percent === 0) return 'Trống trơn vậy nè? Vali kiểu "để đó tính sau" hả? 😏';
  if (percent < 30) return 'Ít đồ vậy chắc định sống tối giản trong trường luôn hả? 😅';
  if (percent < 70) return 'Cũng kha khá rồi đó, cố thêm chút nữa nha!';
  if (percent < 100) return 'Xịn sò dữ vậy! Chuẩn bị kỹ như này thì yên tâm ghê! 🔥';
  return 'Chuẩn bị maxed out luôn rồi! Không thiếu thứ gì đâu! 🏆';
}

export function OptionalProgressBar({ checkedCount, totalCount, percent }: OptionalProgressBarProps) {
  return (
    <div className="w-full rounded-xl border border-fpt/25 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-semibold text-fpt">Đồ nên mang đã chuẩn bị</span>
        <span className="shrink-0 rounded-full bg-fpt/10 px-3 py-1 text-sm font-bold text-fpt">
          {checkedCount}/{totalCount} ({percent}%)
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-fpt/10">
        <div
          className="h-full rounded-full bg-fpt transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-2 text-sm font-medium text-charcoal/80">{getMessage(percent)}</p>
    </div>
  );
}
