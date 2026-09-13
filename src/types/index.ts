export interface ChecklistItem {
  id: string;
  label: string;
  note?: string;
  skippableInGate?: boolean;
}

export interface ChecklistSection {
  sectionId: string;
  title: string;
  items: ChecklistItem[];
  countsTowardPackingProgress: boolean;
}

export interface CostRow {
  id: string;
  label: string;
  amount: number;
  note?: string;
}

export interface GearCategory {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
}

export interface BannedItem {
  id: string;
  label: string;
  note?: string;
}

export interface SlideMeta {
  id: number;
  key: string;
  title: string;
}

export type GateId = 'phoenix' | 'unicorn';

export interface GateLocation {
  id: GateId;
  switchLabel: string;
  gateName: string;
  address: string;
  coordinates: string;
  googleMapsUrl: string;
  satelliteEmbedUrl: string;
  rideHailingTip?: string;
}
