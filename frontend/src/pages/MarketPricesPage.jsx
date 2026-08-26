import { useState, useEffect } from 'react';
import { getMarketPrices } from '../services/api';

export default function MarketPricesPage() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [mandiFilter, setMandiFilter] = useState('All Mandis');

  useEffect(() => {
    async function loadPrices() {
      const res = await getMarketPrices();
      if (res.success) {
        setPrices(res.data);
      }
      setLoading(false);
    }
    loadPrices();
  }, []);

  const mandis = ['All Mandis', ...new Set(prices.map(p => p.mandi))];

  const filteredPrices = prices.filter(p => {
    const matchSearch = p.crop.toLowerCase().includes(search.toLowerCase());
    const matchMandi = mandiFilter === 'All Mandis' || p.mandi === mandiFilter;
    return matchSearch && matchMandi;
  });

  if (loading) {
    return <div className="p-10 text-center font-body-sm text-[#414844]">Loading market prices...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f]">Market Prices</h1>
        <p className="font-body-md text-[#414844]">Real-time commodity rates across connected mandis.</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-[#c1c8c2] p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 shadow-sm">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#414844] text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search crop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#c1c8c2] rounded font-body-sm focus:border-[#012d1d] text-[#161d1f]"
          />
        </div>
        <select 
          value={mandiFilter}
          onChange={(e) => setMandiFilter(e.target.value)}
          className="md:w-64 px-4 py-2 border border-[#c1c8c2] rounded font-body-sm focus:border-[#012d1d] text-[#161d1f] bg-white"
        >
          {mandis.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#c1c8c2] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4fafd] border-b border-[#c1c8c2]">
              <tr>
                <th className="p-4 font-label-md text-[#414844]">Commodity</th>
                <th className="p-4 font-label-md text-[#414844]">Mandi</th>
                <th className="p-4 font-label-md text-[#414844]">Grade</th>
                <th className="p-4 font-label-md text-[#414844] text-right">Avg Price (₹/q)</th>
                <th className="p-4 font-label-md text-[#414844] text-right">Trend</th>
                <th className="p-4 font-label-md text-[#414844] text-right">Arrivals (Tons)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c1c8c2]">
              {filteredPrices.length > 0 ? (
                filteredPrices.map((row) => (
                  <tr key={row.id} className="hover:bg-[#f4fafd] transition-colors font-body-sm text-[#161d1f]">
                    <td className="p-4 font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#414844]">{row.icon}</span>
                      {row.crop}
                    </td>
                    <td className="p-4">{row.mandi}</td>
                    <td className="p-4">{row.grade}</td>
                    <td className="p-4 text-right font-data-mono">{row.price.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex items-center justify-end gap-1 font-medium ${row.trend === 'up' ? 'text-[#1b4332]' : 'text-[#ba1a1a]'}`}>
                        <span className="material-symbols-outlined text-[16px]">
                          {row.trend === 'up' ? 'trending_up' : 'trending_down'}
                        </span>
                        {row.change}
                      </span>
                    </td>
                    <td className="p-4 text-right font-data-mono text-[#414844]">{row.arrival}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-[#414844] font-body-sm">
                    No market prices found for your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
