import type { CostRow } from '../types';

interface CostTableProps {
  rows: CostRow[];
}

function formatVND(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}₫`;
}

export function CostTable({ rows }: CostTableProps) {
  return (
    <div className="w-full">
      <div className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <div key={row.id} className="rounded-lg border border-military/15 bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <span className="min-w-0 break-words font-medium text-charcoal">{row.label}</span>
              <span className="shrink-0 font-semibold text-military">{formatVND(row.amount)}</span>
            </div>
            {row.note && <p className="mt-1 text-sm text-charcoal/60">{row.note}</p>}
          </div>
        ))}
      </div>

      <table className="hidden w-full border-collapse overflow-hidden rounded-lg text-left md:table">
        <thead>
          <tr className="bg-military/10 text-military">
            <th className="px-4 py-2 font-semibold">Khoản mục</th>
            <th className="px-4 py-2 font-semibold">Số tiền</th>
            <th className="px-4 py-2 font-semibold">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-military/10 bg-white">
              <td className="px-4 py-2">{row.label}</td>
              <td className="px-4 py-2 font-semibold text-military">{formatVND(row.amount)}</td>
              <td className="px-4 py-2 text-charcoal/60">{row.note ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
