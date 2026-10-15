import { useApp } from '../lib/AppContext';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  const isInfo = toast.type === 'info';
  return (
    <div
      role="status"
      aria-live="polite"
      key={toast.id}
      className="fixed bottom-4 right-4 z-50 animate-fadeUp flex items-center gap-2 rounded-xl bg-navy-900 px-4 py-3 text-sm text-white shadow-lg"
    >
      {isInfo ? <Info size={16} className="text-saffron-300" aria-hidden="true" /> : <CheckCircle2 size={16} className="text-saffron-300" aria-hidden="true" />}
      {toast.message}
    </div>
  );
}
