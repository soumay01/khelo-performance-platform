export default function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600">{eyebrow}</p>}
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-navy-900">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-2xl text-navy-600">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
