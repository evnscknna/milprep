import { useEffect, useState } from 'react';
import type { GateId } from '../types';

const STORAGE_KEY = 'milprep:gate-selection';
const DEFAULT_GATE: GateId = 'unicorn';

function readStoredGate(): GateId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === 'phoenix' || raw === 'unicorn' ? raw : DEFAULT_GATE;
  } catch {
    return DEFAULT_GATE;
  }
}

export function useGateSelection(): [GateId, (id: GateId) => void] {
  const [gateId, setGateId] = useState<GateId>(readStoredGate);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, gateId);
    } catch {
      // localStorage unavailable (private mode, in-app browser restrictions) - safe to ignore
    }
  }, [gateId]);

  return [gateId, setGateId];
}
