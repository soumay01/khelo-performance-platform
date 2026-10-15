import { useApp } from '../lib/AppContext';
import { RotateCcw } from 'lucide-react';

export default function DemoBanner() {
  const { athlete, resetDemo } = useApp();
  if (!athlete.isDemo) return null;
  return (
    <div className="bg-saffron-50 border-b border-saffron-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="text-saffron-800">
          <strong>Demonstration data.</strong> The athlete profile and records shown are invented for this prototype.
        </p>
        <button type="button" onClick={resetDemo} className="inline-flex items-center gap-1.5 font-semibold text-saffron-800 hover:underline">
          <RotateCcw size={14} aria-hidden="true" /> Reset demo data
        </button>
      </div>
    </div>
  );
}
