import { useState } from 'react';
import { Lightbulb, Map, MapPin, Navigation } from 'lucide-react';
import { GATE_LOCATIONS } from '../../data/militaryData';
import { useGateSelection } from '../../hooks/useGateSelection';

export function Slide1Location() {
  const [gateId, setGateId] = useGateSelection();
  const [showMap, setShowMap] = useState(false);

  const phoenix = GATE_LOCATIONS.find((gate) => gate.id === 'phoenix')!;
  const unicorn = GATE_LOCATIONS.find((gate) => gate.id === 'unicorn')!;
  const activeGate = gateId === 'phoenix' ? phoenix : unicorn;

  const handleSwitch = (id: typeof gateId) => {
    if (id === gateId) return;
    setGateId(id);
    setShowMap(false);
  };

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-military/10 text-military">
          <MapPin size={24} />
        </span>
        <h1 className="text-xl font-bold text-military sm:text-2xl">
          Vị Trí Tập Trung & Di Chuyển
        </h1>
      </div>

      <div className="flex overflow-hidden rounded-xl border border-military/20">
        {[phoenix, unicorn].map((gate) => {
          const isActive = gate.id === gateId;
          return (
            <button
              key={gate.id}
              type="button"
              onClick={() => handleSwitch(gate.id)}
              aria-pressed={isActive}
              className={
                isActive
                  ? 'flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 bg-military py-2 text-white'
                  : 'flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 bg-white py-2 text-charcoal/60 transition-colors hover:bg-military/5'
              }
            >
              <span className="font-bold">{gate.switchLabel}</span>
              <span className={isActive ? 'text-xs text-white/80' : 'text-xs text-charcoal/50'}>
                {gate.gateName}
              </span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-military/15 bg-white p-4">
        <p className="font-semibold text-charcoal">{activeGate.address}</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-military/15 bg-white">
        <p className="border-b border-military/10 px-4 py-2 text-sm font-medium text-charcoal/70">
          Bản đồ vệ tinh vị trí
        </p>
        {showMap ? (
          <div className="relative w-full pt-[56.25%]">
            <iframe
              key={activeGate.id}
              src={activeGate.satelliteEmbedUrl}
              title={`Bản đồ vệ tinh ${activeGate.gateName}`}
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowMap(true)}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-8 font-medium text-military transition-colors hover:bg-military/5"
          >
            <Map size={20} />
            Xem bản đồ vệ tinh
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-fpt/30 bg-fpt/5 p-4">
        {activeGate.rideHailingTip && (
          <div className="flex gap-3">
            <Lightbulb size={22} className="mt-0.5 shrink-0 text-fpt" />
            <p className="text-charcoal/90">{activeGate.rideHailingTip}</p>
          </div>
        )}
        <a
          href={activeGate.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-fpt px-6 py-3 text-lg font-bold text-white shadow-md transition-transform active:scale-[0.98]"
        >
          <Navigation size={22} />
          Mở Chỉ Đường Google Maps
        </a>
      </div>
    </div>
  );
}
