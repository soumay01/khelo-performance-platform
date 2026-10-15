export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="card text-center py-12 px-6">
      {Icon && (
        <div className="mx-auto grid place-items-center h-14 w-14 rounded-2xl bg-navy-50 text-navy-500 mb-4">
          <Icon size={26} aria-hidden="true" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-navy-900">{title}</h3>
      <p className="mt-1 text-navy-600 max-w-md mx-auto">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
