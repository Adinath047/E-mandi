// EmptyState — placeholder when no data is available

export default function EmptyState({ icon = 'inbox', title, message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#e8eff1] flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-[#414844] text-3xl">{icon}</span>
      </div>
      <h3 className="font-title-md text-[#012d1d] mb-2">{title}</h3>
      {message && <p className="font-body-sm text-[#414844] max-w-sm mb-6">{message}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2 bg-[#1b4332] text-white font-label-md rounded hover:bg-[#012d1d] transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
