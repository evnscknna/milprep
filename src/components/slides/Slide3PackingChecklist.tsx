import { ClipboardList, Home, Warehouse } from 'lucide-react';
import {
  BORROWED_GEAR_SECTION,
  FIRST_DAY_PURCHASE_SECTION,
  FIXED_COST_TOTAL,
  PACKING_SECTION_A,
} from '../../data/militaryData';
import { useBudgetSlider } from '../../hooks/useBudgetSlider';
import type { UseChecklistStorageResult } from '../../hooks/useChecklistStorage';
import { Checkbox } from '../Checkbox';
import { ProgressBar } from '../ProgressBar';

const CASH_ITEM_ID = 'home-03';

interface Slide3PackingChecklistProps {
  homeChecklist: UseChecklistStorageResult;
  borrowedChecklist: UseChecklistStorageResult;
  purchaseChecklist: UseChecklistStorageResult;
}

export function Slide3PackingChecklist({
  homeChecklist,
  borrowedChecklist,
  purchaseChecklist,
}: Slide3PackingChecklistProps) {
  const { amount } = useBudgetSlider();
  const totalCash = FIXED_COST_TOTAL + amount;

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-6 md:max-w-4xl">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-military/10 text-military">
          <ClipboardList size={24} />
        </span>
        <h1 className="text-xl font-bold text-military sm:text-2xl">
          Checklist Bắt Buộc & Quân Trang
        </h1>
      </div>

      <ProgressBar
        label="Tiến độ xếp vali tại nhà"
        checkedCount={homeChecklist.progress.checkedCount}
        totalCount={homeChecklist.progress.totalCount}
        percent={homeChecklist.progress.percent}
      />

      <section className="rounded-xl border border-military/15 bg-white p-4">
        <div className="mb-1 flex items-center gap-2">
          <Home size={20} className="text-military" />
          <h2 className="font-semibold text-military">A. {PACKING_SECTION_A.title}</h2>
        </div>
        <p className="mb-2 text-sm text-charcoal/60">
          Cần tích hết (trừ 2 mục có ghi "có thể bỏ qua") để sang trang tiếp theo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
          {PACKING_SECTION_A.items.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              label={
                item.id === CASH_ITEM_ID
                  ? `Tiền mặt (~${totalCash.toLocaleString('vi-VN')}₫ tự bảo quản)`
                  : item.label
              }
              note={item.note}
              checked={homeChecklist.isChecked(item.id)}
              onChange={() => homeChecklist.toggle(item.id)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-fpt/20 bg-fpt/5 p-4">
        <div className="mb-1 flex items-center gap-2">
          <Warehouse size={20} className="text-fpt" />
          <h2 className="font-semibold text-fpt">B. Kiểm Đếm & Mua Tại Trường</h2>
        </div>
        <p className="mb-3 text-sm text-charcoal/60">
          Không tính vào tiến độ xếp vali ở trên và không bắt buộc để sang trang tiếp theo - dùng
          để kiểm đếm khi nhận đồ tại trường.
        </p>

        <h3 className="mb-1 mt-3 text-sm font-semibold text-charcoal/80">
          {BORROWED_GEAR_SECTION.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
          {BORROWED_GEAR_SECTION.items.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              label={item.label}
              note={item.note}
              checked={borrowedChecklist.isChecked(item.id)}
              onChange={() => borrowedChecklist.toggle(item.id)}
            />
          ))}
        </div>

        <h3 className="mb-1 mt-4 text-sm font-semibold text-charcoal/80">
          {FIRST_DAY_PURCHASE_SECTION.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
          {FIRST_DAY_PURCHASE_SECTION.items.map((item) => (
            <Checkbox
              key={item.id}
              id={item.id}
              label={item.label}
              note={item.note}
              checked={purchaseChecklist.isChecked(item.id)}
              onChange={() => purchaseChecklist.toggle(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
