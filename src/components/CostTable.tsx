import type { CostRow } from '../types';

interface CostTableProps {
  rows: CostRow[];
  checkedMap: Record<string, boolean>;
  onToggle: (id: string) => void;
}

function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}₫`;
}

export function CostTable({ rows, checkedMap, onToggle }: CostTableProps) {
  return (
    <div className="w-full">
      <div className="grid gap-3 md:hidden">
        {rows.map((row) => {
          const checked = Boolean(checkedMap[row.id]);
          return (
            <label
              key={row.id}
              htmlFor={`cost-${row.id}`}
              className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-lg border border-military/15 bg-white p-3"
            >
              <input
                id={`cost-${row.id}`}
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(row.id)}
                className="mt-1 h-6 w-6 shrink-0 accent-military"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={
                      checked
                        ? 'min-w-0 break-words font-medium text-charcoal/50 line-through'
                        : 'min-w-0 break-words font-medium text-charcoal'
                    }
                  >
                    {row.label}
                  </span>
                  <span className="shrink-0 font-semibold text-military">
                    {formatVND(row.amount)}
                  </span>
                </div>
                {row.note && <p className="mt-1 text-sm text-charcoal/60">{row.note}</p>}
              </div>
            </label>
          );
        })}
      </div>

      <table className="hidden w-full border-collapse overflow-hidden rounded-lg text-left md:table">
        <thead>
          <tr className="bg-military/10 text-military">
            <th className="w-12 px-4 py-2 font-semibold">Đã xem</th>
            <th className="px-4 py-2 font-semibold">Khoản mục</th>
            <th className="px-4 py-2 font-semibold">Số tiền</th>
            <th className="px-4 py-2 font-semibold">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const checked = Boolean(checkedMap[row.id]);
            return (
              <tr key={row.id} className="border-b border-military/10 bg-white">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(row.id)}
                    aria-label={`Đã xem: ${row.label}`}
                    className="h-5 w-5 accent-military"
                  />
                </td>
                <td className={checked ? 'px-4 py-2 text-charcoal/50 line-through' : 'px-4 py-2'}>
                  {row.label}
                </td>
                <td className="px-4 py-2 font-semibold text-military">{formatVND(row.amount)}</td>
                <td className="px-4 py-2 text-charcoal/60">{row.note ?? '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
