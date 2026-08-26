// StatusBadge — displays colored status pills matching Stitch designs
// Statuses: Pending Verification, Verified, Auction Scheduled, Sold, Received, Pending

const statusConfig = {
  'Pending Verification': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: 'schedule',
  },
  'Pending': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: 'schedule',
  },
  'Verified': {
    bg: 'bg-[#d8f3dc]',
    text: 'text-[#1b4332]',
    border: 'border-[#a5d0b9]',
    icon: 'verified',
  },
  'Auction Scheduled': {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    icon: 'gavel',
  },
  'Sold': {
    bg: 'bg-[#e8eff1]',
    text: 'text-[#414844]',
    border: 'border-[#c1c8c2]',
    icon: 'check_circle',
  },
  'Received': {
    bg: 'bg-[#d8f3dc]',
    text: 'text-[#1b4332]',
    border: 'border-[#a5d0b9]',
    icon: 'payments',
  },
  'Bidding Open': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: 'gavel',
  },
  'Ready for Auction': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: 'gavel',
  },
};

export default function StatusBadge({ status, size = 'sm' }) {
  const config = statusConfig[status] || {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: 'info',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border font-label-md ${config.bg} ${config.text} ${config.border} ${
        size === 'lg' ? 'text-sm px-3 py-1' : 'text-xs'
      }`}
    >
      <span className="material-symbols-outlined" style={{ fontSize: size === 'lg' ? '14px' : '12px' }}>
        {config.icon}
      </span>
      {status}
    </span>
  );
}
