import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

export default function StatCard({ label, value, unit, hint, trend }) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-navy-400';
  return (
    <div className="card transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-medium text-navy-500">{label}</p>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-3xl font-bold text-navy-900">{value}</span>
        {unit && <span className="text-sm text-navy-500">{unit}</span>}
      </div>
      {hint && (
        <p className={`mt-2 flex items-center gap-1 text-sm ${trendColor}`}>
          {trend && <TrendIcon size={15} aria-hidden="true" />}
          {hint}
        </p>
      )}
    </div>
  );
}
