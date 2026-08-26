import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLotById } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function LotDetailPage() {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [lot, setLot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLot() {
      const res = await getLotById(lotId);
      if (res.success) {
        setLot(res.data);
      } else {
        // If not found, go back to lots
        navigate('/lots', { replace: true });
      }
      setLoading(false);
    }
    loadLot();
  }, [lotId, navigate]);

  if (loading) {
    return <div className="p-10 text-center font-body-sm text-[#414844]">Loading lot details...</div>;
  }

  if (!lot) return null;

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[#414844] font-body-sm mb-6">
        <Link to="/dashboard" className="hover:text-[#012d1d] transition-colors">Dashboard</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/lots" className="hover:text-[#012d1d] transition-colors">My Lots</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#161d1f] font-medium">{lot.id}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f]">Lot {lot.id}</h1>
            <StatusBadge status={lot.status} size="lg" />
          </div>
          <p className="font-body-md text-[#414844]">Registered on {lot.registeredDate}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#c1c8c2] text-[#161d1f] font-label-md rounded hover:bg-[#e8eff1] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">print</span> Print Gate Pass
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <section className="bg-white border border-[#c1c8c2] rounded-xl overflow-hidden">
            <div className="bg-[#eef5f7] p-4 border-b border-[#c1c8c2] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1b4332]">inventory_2</span>
              <h2 className="font-title-md text-[#012d1d]">Produce Details</h2>
            </div>
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
              <div>
                <span className="text-[#414844] block text-sm mb-1">Crop</span>
                <span className="text-[#161d1f] font-semibold">{lot.crop}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm mb-1">Quantity</span>
                <span className="text-[#161d1f] font-semibold">{lot.quantity} {lot.unit}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm mb-1">Grade</span>
                <span className="text-[#161d1f] font-semibold">{lot.grade}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm mb-1">Harvest Date</span>
                <span className="text-[#161d1f] font-semibold">{lot.harvestDate}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm mb-1">Mandi</span>
                <span className="text-[#161d1f] font-semibold">{lot.mandi}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm mb-1">Sale Preference</span>
                <span className="text-[#161d1f] font-semibold capitalize">{lot.salePreference}</span>
              </div>
            </div>
          </section>

          {lot.status === 'Sold' && (
            <section className="bg-[#f4fafd] border border-[#a5d0b9] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#d8f3dc] p-4 border-b border-[#a5d0b9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1b4332]">handshake</span>
                  <h2 className="font-title-md text-[#012d1d]">Sale Details</h2>
                </div>
                <span className="font-body-sm text-[#1b4332] font-semibold">{lot.soldDate}</span>
              </div>
              <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <span className="text-[#414844] block text-sm mb-1">Buyer</span>
                  <span className="text-[#161d1f] font-semibold">{lot.buyer}</span>
                </div>
                <div>
                  <span className="text-[#414844] block text-sm mb-1">Final Price</span>
                  <span className="text-[#012d1d] font-data-mono font-bold text-lg">₹{lot.finalSalePrice}/q</span>
                </div>
                <div className="col-span-2 bg-white p-4 rounded border border-[#a5d0b9] flex justify-between items-center">
                  <span className="font-label-md text-[#161d1f]">Total Sale Value</span>
                  <span className="font-display font-bold text-[24px] text-[#1b4332]">₹{lot.actualSaleValue?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </section>
          )}

          {lot.status === 'Auction Scheduled' && (
            <section className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-blue-100 p-4 border-b border-blue-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-800">gavel</span>
                <h2 className="font-title-md text-blue-900">Auction Scheduled</h2>
              </div>
              <div className="p-6">
                <p className="font-body-md text-blue-900 mb-4">Your produce is scheduled for auction.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="bg-white p-3 rounded border border-blue-200 flex-1">
                    <span className="text-blue-800 block text-xs mb-1 uppercase font-semibold tracking-wider">Date</span>
                    <span className="font-body-md font-semibold text-blue-950">{lot.auctionDate}</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200 flex-1">
                    <span className="text-blue-800 block text-xs mb-1 uppercase font-semibold tracking-wider">Time</span>
                    <span className="font-body-md font-semibold text-blue-950">{lot.auctionTime}</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Status Timeline */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#c1c8c2] rounded-xl p-6 sticky top-24">
            <h3 className="font-title-md text-[#161d1f] mb-6">Lot Timeline</h3>
            
            <div className="relative border-l-2 border-[#c1c8c2] ml-3 space-y-8">
              
              {/* Step 1: Registration */}
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#1b4332]"></div>
                <h4 className="font-label-md text-[#161d1f] mb-0.5">Lot Registered</h4>
                <p className="text-xs text-[#414844]">{lot.registeredDate}</p>
              </div>

              {/* Step 2: Verification */}
              <div className="relative pl-6">
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${
                  lot.status === 'Pending Verification' ? 'bg-amber-400 border-2 border-white shadow-[0_0_0_2px_#fbbf24]' : 
                  (lot.status !== 'Pending Verification' ? 'bg-[#1b4332]' : 'bg-[#e2e9ec]')
                }`}></div>
                <h4 className={`font-label-md mb-0.5 ${lot.status === 'Pending Verification' ? 'text-[#161d1f]' : (lot.status !== 'Pending Verification' ? 'text-[#161d1f]' : 'text-[#717973]')}`}>
                  Mandi Verification
                </h4>
                {lot.status === 'Pending Verification' && (
                  <p className="text-xs text-amber-600 mt-1">Pending official verification at gate.</p>
                )}
              </div>

              {/* Step 3: Auction / Sale */}
              <div className="relative pl-6">
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${
                  lot.status === 'Auction Scheduled' ? 'bg-blue-500 border-2 border-white shadow-[0_0_0_2px_#3b82f6]' : 
                  (lot.status === 'Sold' ? 'bg-[#1b4332]' : 'bg-[#e2e9ec]')
                }`}></div>
                <h4 className={`font-label-md mb-0.5 ${lot.status === 'Auction Scheduled' || lot.status === 'Sold' ? 'text-[#161d1f]' : 'text-[#717973]'}`}>
                  Auction & Sale
                </h4>
                {lot.status === 'Auction Scheduled' && (
                  <p className="text-xs text-blue-600 mt-1">Scheduled for {lot.auctionDate}</p>
                )}
              </div>

              {/* Step 4: Payment */}
              <div className="relative pl-6">
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${
                  lot.status === 'Sold' ? 'bg-amber-400 border-2 border-white shadow-[0_0_0_2px_#fbbf24]' : 'bg-[#e2e9ec]'
                }`}></div>
                <h4 className={`font-label-md mb-0.5 ${lot.status === 'Sold' ? 'text-[#161d1f]' : 'text-[#717973]'}`}>
                  Payment Settlement
                </h4>
                {lot.status === 'Sold' && (
                  <p className="text-xs text-amber-600 mt-1">Awaiting buyer payment.</p>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
