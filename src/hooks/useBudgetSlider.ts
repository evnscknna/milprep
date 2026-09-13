import { useState } from 'react';
import { PERSONAL_BUDGET } from '../data/militaryData';

const STORAGE_KEY = 'milprep:cost-personal-budget';

function readStoredBudget(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw === null ? NaN : Number(raw);
    if (Number.isFinite(parsed) && parsed >= PERSONAL_BUDGET.min && parsed <= PERSONAL_BUDGET.max) {
      return parsed;
    }
  } catch {
    // localStorage unavailable (private mode, in-app browser restrictions) - use default
  }
  return PERSONAL_BUDGET.defaultAmount;
}

export interface UseBudgetSliderResult {
  amount: number;
  setLiveAmount: (value: number) => void;
  commitAmount: (value: number) => void;
}

export function useBudgetSlider(): UseBudgetSliderResult {
  const [amount, setAmount] = useState<number>(readStoredBudget);

  const setLiveAmount = (value: number) => setAmount(value);

  const commitAmount = (value: number) => {
    setAmount(value);
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // localStorage unavailable - value still works for this session in-memory
    }
  };

  return { amount, setLiveAmount, commitAmount };
}
