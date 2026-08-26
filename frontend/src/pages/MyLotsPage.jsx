import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyLots } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';

export default function MyLotsPage() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLots() {
      const res = await getMyLots();
      if (res.success) {
        setLots(res.data);
      }
      setLoading(false);
    }
    fetchLots();
  }, []);

  const filteredLots = filter === 'All' ? lots : lots.filter(lot => lot.status === filter);

  if (loading) {
    return <div className="p-10 text-center font-body-sm text-[#414844]">Loading lots...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f]">My Lots</h1>
          <p className="font-body-md text-[#414844]">Manage and track your registered produce lots.</p>
        </div>
        <Link to="/register-produce" className="bg-[#1b4332] text-white px-6 py-2 rounded font-label-md hover:bg-[#012d1d] transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
          <span className="material-symbols-outlined text-[18px]">add</span> Register Produce
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Pending Verification', 'Verified', 'Auction Scheduled', 'Sold'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full font-body-sm whitespace-nowrap transition-colors ${
              filter === f ? 'bg-[#012d1d] text-white' : 'bg-white border border-[#c1c8c2] text-[#414844] hover:bg-[#e8eff1]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table / Cards */}
      <div className="bg-white border border-[#c1c8c2] rounded-xl overflow-hidden shadow-sm">
        {filteredLots.length === 0 ? (
          <EmptyState 
            icon="inventory_2"
            title="No lots found"
            message={filter === 'All' ? "You haven't registered any produce lots yet." : `No lots with status '${filter}'.`}
            actionLabel={filter === 'All' ? "Register Produce" : null}
            onAction={() => navigate('/register-produce')}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f4fafd] border-b border-[#c1c8c2]">
                <tr>
                  <th className="p-4 font-label-md text-[#414844]">Lot ID / Date</th>
                  <th className="p-4 font-label-md text-[#414844]">Crop Details</th>
                  <th className="p-4 font-label-md text-[#414844]">Mandi</th>
                  <th className="p-4 font-label-md text-[#414844]">Expected / Sale Price</th>
                  <th className="p-4 font-label-md text-[#414844]">Status</th>
                  <th className="p-4 font-label-md text-[#414844] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c1c8c2] font-body-sm text-[#161d1f]">
                {filteredLots.map(lot => (
                  <tr key={lot.id} className="hover:bg-[#f4fafd] transition-colors group">
                    <td className="p-4">
                      <div className="font-data-mono font-bold text-[#012d1d] mb-1">{lot.id}</div>
                      <div className="text-xs text-[#414844]">{lot.registeredDate}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-[#161d1f] mb-1">{lot.crop}</div>
                      <div className="text-xs text-[#414844]">{lot.quantity} {lot.unit} · {lot.grade}</div>
                    </td>
                    <td className="p-4 text-[#161d1f]">{lot.mandi}</td>
                    <td className="p-4">
                      <div className="font-data-mono font-medium text-[#161d1f] mb-1">
                        ₹{lot.status === 'Sold' ? lot.finalSalePrice : lot.expectedPrice}/q
                      </div>
                      <div className="text-xs text-[#414844]">Total: ₹{lot.status === 'Sold' ? lot.actualSaleValue?.toLocaleString('en-IN') : lot.estimatedValue?.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={lot.status} />
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        to={`/lots/${lot.id}`}
                        className="inline-flex items-center gap-1 text-[#012d1d] font-label-md hover:underline"
                      >
                        View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
