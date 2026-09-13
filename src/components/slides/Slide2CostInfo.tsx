import { ExternalLink, Search, Wallet } from 'lucide-react';
import {
  COST_ROWS,
  FIXED_COST_TOTAL,
  STUDENT_PORTAL_GUIDANCE,
  STUDENT_PORTAL_URL,
} from '../../data/militaryData';
import type { UseChecklistStorageResult } from '../../hooks/useChecklistStorage';
import { useBudgetSlider } from '../../hooks/useBudgetSlider';
import { BudgetSlider } from '../BudgetSlider';
import { CostTable } from '../CostTable';
import { ProgressBar } from '../ProgressBar';

interface Slide2CostInfoProps {
  checklist: UseChecklistStorageResult;
}

export function Slide2CostInfo({ checklist }: Slide2CostInfoProps) {
  const { amount, setLiveAmount, commitAmount } = useBudgetSlider();
  const total = FIXED_COST_TOTAL + amount;

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-military/10 text-military">
          <Search size={24} />
        </span>
        <h1 className="text-xl font-bold text-military sm:text-2xl">
          Tra Cứu Thông Tin & Dự Toán Chi Phí
        </h1>
      </div>

      <div className="rounded-xl border border-military/15 bg-white p-4">
        <a
          href={STUDENT_PORTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-military px-6 py-3 text-center text-base font-bold text-white shadow-md transition-transform active:scale-[0.98] sm:text-lg"
        >
          <ExternalLink size={20} />
          Tra Cứu Phòng & Đại Đội (QSQK7)
        </a>
        <p className="mt-3 text-sm text-charcoal/70">{STUDENT_PORTAL_GUIDANCE}</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Wallet size={20} className="text-military" />
          <h2 className="font-semibold text-charcoal">Dự Toán Chi Phí</h2>
        </div>
        <ProgressBar
          label="Đã xác nhận đọc kỹ dự toán"
          checkedCount={checklist.progress.checkedCount}
          totalCount={checklist.progress.totalCount}
          percent={checklist.progress.percent}
          completeMessage="Đã xem hết rồi, yên tâm chuẩn bị tiền mặt thôi!"
        />
        <p className="text-sm text-charcoal/60">
          Đánh dấu từng khoản mục để xác nhận đã xem qua trước khi sang trang tiếp theo.
        </p>
        <CostTable
          rows={COST_ROWS}
          checkedMap={checklist.checkedMap}
          onToggle={checklist.toggle}
        />
        <BudgetSlider
          amount={amount}
          checked={checklist.isChecked('cost-personal')}
          onToggleConfirm={() => checklist.toggle('cost-personal')}
          onLiveChange={setLiveAmount}
          onCommit={commitAmount}
        />
        <div className="rounded-full border-2 border-fpt bg-fpt/10 px-4 py-2 text-center font-bold text-fpt md:text-left">
          Tổng dự toán tiền mặt cần mang: {total.toLocaleString('vi-VN')}₫
        </div>
      </div>
    </div>
  );
}
