import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cropOptions, mandiOptions } from '../data/mockData';

export default function RegisterProducePage() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    crop: '',
    quantity: '',
    unit: 'quintal',
    grade: '',
    harvestDate: '',
    mandi: '',
    expectedPrice: '',
    salePreference: 'auction'
  });

  const [summary, setSummary] = useState({
    crop: 'Not selected',
    quantity: 'Not entered',
    mandi: 'Not selected',
    price: 'Not entered',
    value: '—'
  });

  useEffect(() => {
    // Update summary derived from form
    const cropText = cropOptions.find(c => c.value === form.crop)?.label || 'Not selected';
    const qtyText = form.quantity ? `${form.quantity} ${form.unit === 'quintal' ? 'Quintals' : form.unit}` : 'Not entered';
    const mandiText = form.mandi || 'Not selected';
    const priceText = form.expectedPrice ? `₹${form.expectedPrice}/q` : 'Not entered';
    
    let valueText = '—';
    if (form.quantity && form.expectedPrice && form.unit === 'quintal') {
      const val = (Number(form.quantity) * Number(form.expectedPrice)).toLocaleString('en-IN');
      valueText = `₹${val}`;
    }

    setSummary({
      crop: cropText,
      quantity: qtyText,
      mandi: mandiText,
      price: priceText,
      value: valueText
    });
  }, [form]);

  const handleChange = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to review page via state
    navigate('/register-produce/review', { state: { formData: form } });
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[#414844] font-body-sm mb-4">
        <Link to="/dashboard" className="hover:text-[#012d1d] transition-colors">Dashboard</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#161d1f] font-medium">Register Produce</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f] mb-2">Register Your Produce</h1>
        <p className="font-body-md text-[#414844] max-w-2xl">Add your crop details to create a digital produce lot and participate in mandi auctions.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-label-md text-xs">1</div>
          <span className="font-label-md text-[#1b4332] font-bold">Produce Details</span>
        </div>
        <div className="w-12 h-px bg-[#c1c8c2] flex-shrink-0 mx-2"></div>
        <div className="flex items-center gap-2 flex-shrink-0 opacity-50">
          <div className="w-6 h-6 rounded-full border border-[#717973] text-[#414844] flex items-center justify-center font-label-md text-xs">2</div>
          <span className="font-label-md text-[#414844]">Review & Submit</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Section 1 */}
          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6">
            <h2 className="font-title-md text-[#161d1f] mb-4 pb-3 border-b border-[#c1c8c2]">1. Produce Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-label-md text-[#161d1f] mb-1">Crop / Commodity <span className="text-[#ba1a1a]">*</span></label>
                <select 
                  required
                  value={form.crop} onChange={handleChange('crop')}
                  className="w-full bg-white border border-[#c1c8c2] rounded py-2 px-3 text-[#161d1f] font-body-sm focus:border-[#012d1d]"
                >
                  <option value="" disabled>Select Commodity</option>
                  {cropOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-label-md text-[#161d1f] mb-1">Quantity <span className="text-[#ba1a1a]">*</span></label>
                <input 
                  type="number" required placeholder="0.00"
                  value={form.quantity} onChange={handleChange('quantity')}
                  className="w-full bg-white border border-[#c1c8c2] rounded py-2 px-3 text-[#161d1f] font-body-sm focus:border-[#012d1d] text-right"
                />
              </div>

              <div>
                <label className="block font-label-md text-[#161d1f] mb-1">Unit <span className="text-[#ba1a1a]">*</span></label>
                <select 
                  value={form.unit} onChange={handleChange('unit')}
                  className="w-full bg-white border border-[#c1c8c2] rounded py-2 px-3 text-[#161d1f] font-body-sm focus:border-[#012d1d]"
                >
                  <option value="quintal">Quintal</option>
                  <option value="kg">Kg</option>
                  <option value="ton">Ton</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-[#161d1f] mb-1">Quality / Grade</label>
                <select 
                  value={form.grade} onChange={handleChange('grade')}
                  className="w-full bg-white border border-[#c1c8c2] rounded py-2 px-3 text-[#161d1f] font-body-sm focus:border-[#012d1d]"
                >
                  <option value="" disabled>Select Grade</option>
                  <option value="Grade A">Grade A (Premium)</option>
                  <option value="Grade B">Grade B (Standard)</option>
                  <option value="Grade C">Grade C (FAQ)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-[#161d1f] mb-1">Harvest Date</label>
                <input 
                  type="date"
                  value={form.harvestDate} onChange={handleChange('harvestDate')}
                  className="w-full bg-white border border-[#c1c8c2] rounded py-2 px-3 text-[#161d1f] font-body-sm focus:border-[#012d1d]"
                />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6">
            <h2 className="font-title-md text-[#161d1f] mb-4 pb-3 border-b border-[#c1c8c2]">2. Mandi & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-label-md text-[#161d1f] mb-1">Preferred Mandi <span className="text-[#ba1a1a]">*</span></label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#414844] text-[20px]">search</span>
                  <input 
                    type="text" required list="mandi-list" placeholder="Search Mandi"
                    value={form.mandi} onChange={handleChange('mandi')}
                    className="w-full bg-white border border-[#c1c8c2] rounded py-2 pl-10 pr-3 text-[#161d1f] font-body-sm focus:border-[#012d1d]"
                  />
                  <datalist id="mandi-list">
                    {mandiOptions.map(m => <option key={m} value={m} />)}
                  </datalist>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-label-md text-[#161d1f] mb-1">Expected Price (₹ / Quintal) <span className="text-[#ba1a1a]">*</span></label>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <input 
                    type="number" required placeholder="0.00"
                    value={form.expectedPrice} onChange={handleChange('expectedPrice')}
                    className="w-full md:w-1/2 bg-white border border-[#c1c8c2] rounded py-2 px-3 text-[#161d1f] font-body-sm focus:border-[#012d1d] text-right"
                  />
                  <div className="w-full md:w-1/2 bg-[#eef5f7] px-3 py-2 rounded border border-[#c1c8c2] border-l-4 border-l-[#1b4332]/50">
                    <span className="font-body-sm text-[12px] text-[#414844] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">info</span> Current market reference: <strong>₹2,450/q</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6">
            <h2 className="font-title-md text-[#161d1f] mb-4 pb-3 border-b border-[#c1c8c2]">3. Sale Preference</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors flex-1 ${
                form.salePreference === 'auction' ? 'border-[#1b4332] bg-[#1b4332]/5' : 'border-[#c1c8c2] hover:bg-[#eef5f7]'
              }`}>
                <input 
                  type="radio" name="salePreference" value="auction" 
                  checked={form.salePreference === 'auction'} onChange={handleChange('salePreference')}
                  className="mt-1"
                />
                <div>
                  <span className="block font-label-md text-[#161d1f] mb-1">Auction (Recommended)</span>
                  <span className="block font-body-sm text-[#414844] text-xs">Participate in daily transparent bidding process.</span>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors flex-1 ${
                form.salePreference === 'direct' ? 'border-[#1b4332] bg-[#1b4332]/5' : 'border-[#c1c8c2] hover:bg-[#eef5f7]'
              }`}>
                <input 
                  type="radio" name="salePreference" value="direct" 
                  checked={form.salePreference === 'direct'} onChange={handleChange('salePreference')}
                  className="mt-1"
                />
                <div>
                  <span className="block font-label-md text-[#161d1f] mb-1">Direct Sale</span>
                  <span className="block font-body-sm text-[#414844] text-xs">List produce at a fixed price for direct buyers.</span>
                </div>
              </label>
            </div>
          </section>

        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white border border-[#c1c8c2] rounded-xl p-6 shadow-sm flex flex-col min-h-[350px]">
            <h3 className="font-title-md text-[#161d1f] mb-4 pb-3 border-b border-[#c1c8c2]">Registration Summary</h3>
            <ul className="flex flex-col gap-3 mb-6 flex-1">
              <li className="flex justify-between items-start py-2 border-b border-[#c1c8c2]/50 border-dashed">
                <span className="font-body-sm text-[#414844]">Crop</span>
                <span className="font-label-md text-[#161d1f] text-right">{summary.crop}</span>
              </li>
              <li className="flex justify-between items-start py-2 border-b border-[#c1c8c2]/50 border-dashed">
                <span className="font-body-sm text-[#414844]">Quantity</span>
                <span className="font-label-md text-[#161d1f] text-right">{summary.quantity}</span>
              </li>
              <li className="flex justify-between items-start py-2 border-b border-[#c1c8c2]/50 border-dashed">
                <span className="font-body-sm text-[#414844]">Mandi</span>
                <span className="font-label-md text-[#161d1f] text-right truncate max-w-[150px]">{summary.mandi}</span>
              </li>
              <li className="flex justify-between items-start py-2 border-b border-[#c1c8c2]/50 border-dashed">
                <span className="font-body-sm text-[#414844]">Expected Price</span>
                <span className="font-label-md text-[#161d1f] text-right">{summary.price}</span>
              </li>
            </ul>
            <div className="bg-[#f4fafd] p-3 rounded border border-[#c1c8c2] flex justify-between items-center mb-6">
              <span className="font-label-md text-[#161d1f]">Estimated Value</span>
              <span className="font-title-md text-[#1b4332] font-bold">{summary.value}</span>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[#c1c8c2]">
              <button type="submit" className="w-full py-2 px-4 bg-[#1b4332] text-white font-label-md rounded hover:bg-[#012d1d] transition-colors flex items-center justify-center gap-2">
                Continue to Review <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
