import { useState } from 'react';
import { Backpack, Droplets, LayoutGrid, Pill, Shirt, UtensilsCrossed } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GEAR_CATEGORIES } from '../../data/militaryData';
import { useChecklistStorage } from '../../hooks/useChecklistStorage';
import type { UseChecklistStorageResult } from '../../hooks/useChecklistStorage';
import { Checkbox } from '../Checkbox';
import { OptionalProgressBar } from '../OptionalProgressBar';

const ALL_ID = 'all';

const ICONS: Record<string, LucideIcon> = {
  Shirt,
  Droplets,
  Pill,
  UtensilsCrossed,
  LayoutGrid,
};

const TABS = [{ id: ALL_ID, title: 'Tất cả', icon: 'LayoutGrid' }, ...GEAR_CATEGORIES];

function GearCategoryPanel({
  category,
  checklist,
}: {
  category: (typeof GEAR_CATEGORIES)[number];
  checklist: UseChecklistStorageResult;
}) {
  const Icon = ICONS[category.icon];
  return (
    <div className="rounded-xl border border-military/15 bg-white p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-military" />
          <h2 className="font-semibold text-military">{category.title}</h2>
        </div>
        <span className="shrink-0 text-sm text-charcoal/60">
          {checklist.progress.checkedCount}/{checklist.progress.totalCount}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
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
    </div>
  );
}

export function Slide4RecommendedGear() {
  const [activeId, setActiveId] = useState<string>(GEAR_CATEGORIES[0].id);

  const trangPhuc = useChecklistStorage(`gear-${GEAR_CATEGORIES[0].id}`, GEAR_CATEGORIES[0].items);
  const veSinh = useChecklistStorage(`gear-${GEAR_CATEGORIES[1].id}`, GEAR_CATEGORIES[1].items);
  const tuThuoc = useChecklistStorage(`gear-${GEAR_CATEGORIES[2].id}`, GEAR_CATEGORIES[2].items);
  const anUong = useChecklistStorage(`gear-${GEAR_CATEGORIES[3].id}`, GEAR_CATEGORIES[3].items);
  const categoryChecklists = [trangPhuc, veSinh, tuThuoc, anUong];

  const totalChecked = categoryChecklists.reduce((sum, c) => sum + c.progress.checkedCount, 0);
  const totalItems = categoryChecklists.reduce((sum, c) => sum + c.progress.totalCount, 0);
  const overallPercent = totalItems === 0 ? 0 : Math.round((totalChecked / totalItems) * 100);

  const activeIndex = GEAR_CATEGORIES.findIndex((c) => c.id === activeId);
  const showAll = activeId === ALL_ID;
  const activeCategory = GEAR_CATEGORIES[activeIndex] ?? GEAR_CATEGORIES[0];
  const activeChecklist = categoryChecklists[activeIndex] ?? categoryChecklists[0];

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-4 md:max-w-4xl">
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

      <div className="flex gap-2">
        {TABS.map((tab) => {
          const Icon = ICONS[tab.icon];
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              aria-label={tab.title}
              aria-pressed={isActive}
              className={
                isActive
                  ? 'flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-military px-3 py-2 font-medium text-white'
                  : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-military/25 text-military transition-colors hover:bg-military/5'
              }
            >
              <Icon size={18} className="shrink-0" />
              {isActive && <span className="truncate">{tab.title}</span>}
            </button>
          );
        })}
      </div>

      {showAll ? (
        <div className="flex flex-col gap-4">
          {GEAR_CATEGORIES.map((category, index) => (
            <GearCategoryPanel key={category.id} category={category} checklist={categoryChecklists[index]} />
          ))}
        </div>
      ) : (
        <GearCategoryPanel category={activeCategory} checklist={activeChecklist} />
      )}
    </div>
  );
}
