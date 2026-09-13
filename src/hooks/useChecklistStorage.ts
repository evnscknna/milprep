import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChecklistItem } from '../types';

const STORAGE_PREFIX = 'milprep:checklist:';

function readStoredMap(sectionId: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${sectionId}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export interface ChecklistProgress {
  checkedCount: number;
  totalCount: number;
  percent: number;
}

export interface UseChecklistStorageResult {
  checkedMap: Record<string, boolean>;
  isChecked: (itemId: string) => boolean;
  toggle: (itemId: string) => void;
  clearSection: () => void;
  progress: ChecklistProgress;
}

export function useChecklistStorage(
  sectionId: string,
  items: ChecklistItem[],
): UseChecklistStorageResult {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() =>
    readStoredMap(sectionId),
  );

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${sectionId}`, JSON.stringify(checkedMap));
    } catch {
      // localStorage unavailable (private mode, quota) - state still works in-memory
    }
  }, [sectionId, checkedMap]);

  const isChecked = useCallback((itemId: string) => Boolean(checkedMap[itemId]), [checkedMap]);

  const toggle = useCallback((itemId: string) => {
    setCheckedMap((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const clearSection = useCallback(() => {
    setCheckedMap({});
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${sectionId}`);
    } catch {
      // ignore
    }
  }, [sectionId]);

  const progress = useMemo<ChecklistProgress>(() => {
    const totalCount = items.length;
    const checkedCount = items.reduce((count, item) => count + (checkedMap[item.id] ? 1 : 0), 0);
    const percent = totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);
    return { checkedCount, totalCount, percent };
  }, [items, checkedMap]);

  return { checkedMap, isChecked, toggle, clearSection, progress };
}
