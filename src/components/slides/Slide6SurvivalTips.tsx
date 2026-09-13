import { PartyPopper, Sparkles } from 'lucide-react';
import { ENCOURAGEMENT_SLOGAN, GOOD_LUCK_MESSAGE, SURVIVAL_TIPS } from '../../data/militaryData';

export function Slide6SurvivalTips() {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-military/10 text-military">
          <Sparkles size={24} />
        </span>
        <h1 className="text-xl font-bold text-military sm:text-2xl">Bí Kíp Sinh Tồn & Dặn Dò</h1>
      </div>

      <ul className="flex flex-col gap-3 rounded-xl border border-military/15 bg-white p-4">
        {SURVIVAL_TIPS.map((tip) => (
          <li key={tip} className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-military">•</span>
            <span className="break-words text-charcoal">{tip}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-3 rounded-xl bg-military px-6 py-8 text-center text-white shadow-md">
        <PartyPopper size={32} />
        <p className="font-medium text-white/80">{GOOD_LUCK_MESSAGE}</p>
        <p className="text-lg font-bold sm:text-xl">{ENCOURAGEMENT_SLOGAN}</p>
      </div>
    </div>
  );
}
