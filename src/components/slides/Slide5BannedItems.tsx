import { Ban } from 'lucide-react';
import { BANNED_ITEMS } from '../../data/militaryData';
import type { UseChecklistStorageResult } from '../../hooks/useChecklistStorage';

const AGREE_ID = 'banned-agree';

interface Slide5BannedItemsProps {
  checklist: UseChecklistStorageResult;
}

export function Slide5BannedItems({ checklist }: Slide5BannedItemsProps) {
  const mainItems = BANNED_ITEMS.slice(0, -1);
  const easterEggItem = BANNED_ITEMS[BANNED_ITEMS.length - 1];
  const agreed = checklist.isChecked(AGREE_ID);

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
          <Ban size={24} />
        </span>
        <h1 className="text-xl font-bold text-danger sm:text-2xl">
          Những Thứ Bị Cấm & Không Nên Mang
        </h1>
      </div>

      <ul className="flex flex-col gap-3 rounded-xl border-2 border-danger/30 bg-danger/5 p-4">
        {mainItems.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 font-bold text-danger">❌</span>
            <span className="min-w-0 break-words text-charcoal">
              {item.label}
              {item.note && (
                <span className="mt-0.5 block text-sm text-charcoal/60">{item.note}</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <label
        htmlFor={AGREE_ID}
        className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-xl border-2 border-military/25 bg-white px-4 py-3 transition-colors hover:bg-military/5"
      >
        <input
          id={AGREE_ID}
          type="checkbox"
          checked={agreed}
          onChange={() => checklist.toggle(AGREE_ID)}
          className="mt-0.5 h-6 w-6 shrink-0 accent-military"
        />
        <span className="font-medium text-charcoal">
          Tôi đã đọc và sẽ không mang theo bất kỳ thứ nào bị cấm ở trên.
        </span>
      </label>

      {agreed && (
        <div className="flex items-start gap-3 rounded-xl border-2 border-violet-300 bg-violet-50 px-4 py-3">
          <span className="mt-0.5 shrink-0">😏</span>
          <p className="min-w-0 break-words text-violet-700">{easterEggItem.label}</p>
        </div>
      )}
    </div>
  );
}
