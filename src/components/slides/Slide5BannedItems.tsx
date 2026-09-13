import { Ban } from 'lucide-react';
import { BANNED_ITEMS } from '../../data/militaryData';
import type { UseChecklistStorageResult } from '../../hooks/useChecklistStorage';

interface Slide5BannedItemsProps {
  checklist: UseChecklistStorageResult;
}

export function Slide5BannedItems({ checklist }: Slide5BannedItemsProps) {
  const mainItems = BANNED_ITEMS.slice(0, -1);
  const easterEggItem = BANNED_ITEMS[BANNED_ITEMS.length - 1];
  const allMainChecked = mainItems.every((item) => checklist.isChecked(item.id));
  const easterEggChecked = checklist.isChecked(easterEggItem.id);

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

      <p className="text-sm text-charcoal/60">
        Đánh dấu từng mục để xác nhận đã đọc và sẽ không mang theo - cần tích hết để sang trang
        tiếp theo.
      </p>

      <ul className="flex flex-col divide-y divide-danger/10 rounded-xl border-2 border-danger/30 bg-danger/5 p-2">
        {mainItems.map((item) => {
          const checked = checklist.isChecked(item.id);
          return (
            <li key={item.id}>
              <label
                htmlFor={item.id}
                className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-danger/10"
              >
                <input
                  id={item.id}
                  type="checkbox"
                  checked={checked}
                  onChange={() => checklist.toggle(item.id)}
                  className="mt-0.5 h-6 w-6 shrink-0 accent-danger"
                />
                <span
                  className={
                    checked
                      ? 'min-w-0 flex-1 break-words text-charcoal/50 line-through'
                      : 'min-w-0 flex-1 break-words text-charcoal'
                  }
                >
                  <span className="mr-1 font-bold text-danger">❌</span>
                  {item.label}
                  {item.note && (
                    <span className="mt-0.5 block text-sm text-charcoal/60">{item.note}</span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {allMainChecked && (
        <label
          htmlFor={easterEggItem.id}
          className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-xl border-2 border-violet-300 bg-violet-50 px-3 py-2 transition-colors hover:bg-violet-100"
        >
          <input
            id={easterEggItem.id}
            type="checkbox"
            checked={easterEggChecked}
            onChange={() => checklist.toggle(easterEggItem.id)}
            className="mt-0.5 h-6 w-6 shrink-0 accent-violet-500"
          />
          <span
            className={
              easterEggChecked
                ? 'min-w-0 flex-1 break-words text-violet-400 line-through'
                : 'min-w-0 flex-1 break-words text-violet-700'
            }
          >
            <span className="mr-1">😏</span>
            {easterEggItem.label}
          </span>
        </label>
      )}
    </div>
  );
}
