// SummaryCard — dashboard stat card matching Stitch design

export default function SummaryCard({ label, value, sub, badge, icon }) {
  return (
    <div className="bg-white border border-[#c1c8c2] p-4 rounded-xl">
      <p className="font-body-sm text-[#414844] mb-1">{label}</p>
      <p className="font-title-md text-[#012d1d] font-bold">{value}</p>
      {(sub || badge) && (
        <div className="flex items-center gap-2 mt-2">
          {sub && <span className="font-body-sm text-[#414844] text-sm">{sub}</span>}
          {badge && (
            <span className="text-xs bg-[#d8f3dc] text-[#1b4332] px-1.5 py-0.5 rounded font-medium">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
