import { useState } from 'react';
import { Backpack, Droplets, Pill, Shirt, UtensilsCrossed } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GEAR_CATEGORIES } from '../../data/militaryData';
import { useChecklistStorage } from '../../hooks/useChecklistStorage';
import type { UseChecklistStorageResult } from '../../hooks/useChecklistStorage';
import { Checkbox } from '../Checkbox';
import { OptionalProgressBar } from '../OptionalProgressBar';

const ICONS: Record<string, LucideIcon> = {
  Shirt,
  Droplets,
  Pill,
  UtensilsCrossed,
};

function GearCategoryPanel({
  category,
  checklist,
}: {
  category: (typeof GEAR_CATEGORIES)[number];
  checklist: UseChecklistStorageResult;
}) {
  return (
    <div className="flex flex-col divide-y divide-military/10 rounded-xl border border-military/15 bg-white p-4">
      <p className="pb-2 text-sm text-charcoal/60">
        {checklist.progress.checkedCount}/{checklist.progress.totalCount} đã chuẩn bị
      </p>
      {category.items.map((item) => (
        <Checkbox
          key={item.id}
          id={item.id}
          label={item.label}
          note={item.note}
          checked={checklist.isChecked(item.id)}
          onChange={() => checklist.toggle(item.id)}
        />
      ))}
    </div>
  );
}

export function Slide4RecommendedGear() {
  const [activeCategoryId, setActiveCategoryId] = useState(GEAR_CATEGORIES[0].id);

  const trangPhuc = useChecklistStorage(`gear-${GEAR_CATEGORIES[0].id}`, GEAR_CATEGORIES[0].items);
  const veSinh = useChecklistStorage(`gear-${GEAR_CATEGORIES[1].id}`, GEAR_CATEGORIES[1].items);
  const tuThuoc = useChecklistStorage(`gear-${GEAR_CATEGORIES[2].id}`, GEAR_CATEGORIES[2].items);
  const anUong = useChecklistStorage(`gear-${GEAR_CATEGORIES[3].id}`, GEAR_CATEGORIES[3].items);
  const categoryChecklists = [trangPhuc, veSinh, tuThuoc, anUong];

  const totalChecked = categoryChecklists.reduce((sum, c) => sum + c.progress.checkedCount, 0);
  const totalItems = categoryChecklists.reduce((sum, c) => sum + c.progress.totalCount, 0);
  const overallPercent = totalItems === 0 ? 0 : Math.round((totalChecked / totalItems) * 100);

  const activeIndex = GEAR_CATEGORIES.findIndex((c) => c.id === activeCategoryId);
  const activeCategory = GEAR_CATEGORIES[activeIndex] ?? GEAR_CATEGORIES[0];
  const activeChecklist = categoryChecklists[activeIndex] ?? categoryChecklists[0];

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-military/10 text-military">
          <Backpack size={24} />
        </span>
        <h1 className="text-xl font-bold text-military sm:text-2xl">
          Hành Trang Khuyến Nghị (Đồ Nên Mang)
        </h1>
      </div>

      <OptionalProgressBar
        checkedCount={totalChecked}
        totalCount={totalItems}
        percent={overallPercent}
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {GEAR_CATEGORIES.map((category) => {
          const Icon = ICONS[category.icon];
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategoryId(category.id)}
              className={
                isActive
                  ? 'flex min-h-[44px] shrink-0 items-center gap-2 rounded-full bg-military px-4 py-2 font-medium text-white'
                  : 'flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-military/25 px-4 py-2 font-medium text-military'
              }
            >
              <Icon size={18} />
              {category.title}
            </button>
          );
        })}
      </div>

      <GearCategoryPanel category={activeCategory} checklist={activeChecklist} />
    </div>
  );
}
