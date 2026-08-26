import { useState } from 'react';
import { useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import { registerProduce } from '../services/api';
import { cropOptions } from '../data/mockData';

export default function ReviewSubmitPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // If accessed directly without form data, redirect back
  if (!formData) {
    return <Navigate to="/register-produce" replace />;
  }

  const cropText = cropOptions.find(c => c.value === formData.crop)?.label || formData.crop;
  const val = (Number(formData.quantity) * Number(formData.expectedPrice)).toLocaleString('en-IN');
  const estimatedValue = `₹${val}`;

  const handleSubmit = async () => {
    if (!confirmed) return;
    setLoading(true);
    const result = await registerProduce(formData);
    setLoading(false);
    
    if (result.success) {
      navigate('/register-produce/success', { state: { lot: result.data } });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[#414844] font-body-sm mb-6">
        <Link to="/dashboard" className="hover:text-[#012d1d] transition-colors">Dashboard</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <Link to="/register-produce" className="hover:text-[#012d1d] transition-colors">Register Produce</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-[#161d1f] font-medium">Review</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f] mb-2">Review Your Produce</h1>
        <p className="font-body-md text-[#414844]">Please verify your produce details before creating the lot.</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center mb-12 max-w-3xl">
        <div className="flex items-center text-[#1b4332] relative">
          <div className="rounded-full h-8 w-8 border-2 border-[#1b4332] bg-[#1b4332] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">check</span>
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 text-center font-label-md text-[#161d1f]">Produce Details</div>
        </div>
        <div className="flex-auto border-t-2 border-[#1b4332]"></div>
        <div className="flex items-center text-[#1b4332] relative">
          <div className="rounded-full h-8 w-8 border-2 border-[#1b4332] bg-[#1b4332] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">check</span>
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 text-center font-label-md text-[#161d1f]">Mandi & Pricing</div>
        </div>
        <div className="flex-auto border-t-2 border-[#1b4332]"></div>
        <div className="flex items-center text-[#1b4332] relative">
          <div className="rounded-full h-8 w-8 border-2 border-[#1b4332] bg-white flex items-center justify-center font-bold text-sm">3</div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 text-center font-label-md text-[#1b4332]">Review & Submit</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-16 lg:mt-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="bg-white border border-[#c1c8c2] rounded-xl p-6">
            <div className="flex justify-between items-center border-b border-[#c1c8c2] pb-3 mb-4">
              <h2 className="font-title-md text-[#161d1f]">Produce Details</h2>
              <Link to="/register-produce" className="text-[#012d1d] font-label-md flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">edit</span> Edit
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <span className="text-[#414844] block text-sm">Crop</span>
                <span className="text-[#161d1f] font-medium">{cropText}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm">Quantity</span>
                <span className="text-[#161d1f] font-medium">{formData.quantity} {formData.unit}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm">Grade</span>
                <span className="text-[#161d1f] font-medium">{formData.grade || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm">Harvest Date</span>
                <span className="text-[#161d1f] font-medium">{formData.harvestDate || 'Not specified'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#c1c8c2] rounded-xl p-6">
            <div className="flex justify-between items-center border-b border-[#c1c8c2] pb-3 mb-4">
              <h2 className="font-title-md text-[#161d1f]">Mandi & Pricing</h2>
              <Link to="/register-produce" className="text-[#012d1d] font-label-md flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">edit</span> Edit
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <span className="text-[#414844] block text-sm">Preferred Mandi</span>
                <span className="text-[#161d1f] font-medium">{formData.mandi}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm">Expected Price</span>
                <span className="text-[#161d1f] font-medium">₹{formData.expectedPrice} / Quintal</span>
              </div>
              <div>
                <span className="text-[#414844] block text-sm">Sale Preference</span>
                <span className="inline-block px-2 py-1 bg-[#e8eff1] rounded text-sm font-medium mt-1 capitalize">
                  {formData.salePreference}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#c1c8c2] rounded-xl overflow-hidden sticky top-24">
            <div className="bg-[#eef5f7] p-4 border-b border-[#c1c8c2]">
              <h3 className="font-title-md text-[#161d1f] flex items-center gap-2">
                <span className="material-symbols-outlined">receipt_long</span> Registration Summary
              </h3>
            </div>
            <div className="p-4">
              <ul className="space-y-2 mb-4">
                <li className="flex justify-between">
                  <span className="text-[#414844]">Crop</span>
                  <span className="font-medium text-[#161d1f]">{cropText}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#414844]">Quantity</span>
                  <span className="font-medium text-[#161d1f]">{formData.quantity} {formData.unit}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#414844]">Price</span>
                  <span className="font-medium text-[#161d1f]">₹{formData.expectedPrice}/q</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#414844]">Mandi</span>
                  <span className="font-medium text-[#161d1f]">{formData.mandi}</span>
                </li>
              </ul>
              <div className="border-t border-[#c1c8c2] pt-4 mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-[#161d1f]">Estimated Value</span>
                  <span className="font-title-md text-[#1b4332] font-bold">{estimatedValue}</span>
                </div>
                <p className="text-xs text-[#414844] italic leading-tight">
                  Estimated value is based on the expected price entered. Final sale value may vary based on auction results.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="mt-8 border-t border-[#c1c8c2] pt-8 max-w-4xl">
        <div className="bg-[#eef5f7] border border-[#c1c8c2] rounded-lg p-4 mb-6 flex items-start gap-3">
          <span className="material-symbols-outlined text-[#012d1d] mt-0.5">info</span>
          <p className="font-body-md text-[#161d1f]">
            Your produce will be registered as a digital lot and made available according to your selected sale preference.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <input 
            type="checkbox" id="confirm-details" 
            checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)}
            className="w-5 h-5 accent-[#1b4332] rounded cursor-pointer"
          />
          <label htmlFor="confirm-details" className="font-body-md text-[#161d1f] cursor-pointer">
            I confirm that the produce details provided above are correct.
          </label>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center gap-4 sm:justify-end">
          <Link to="/register-produce" className="w-full sm:w-auto px-6 py-2.5 font-label-md text-[#1b4332] border border-[#1b4332] rounded hover:bg-[#eef5f7] transition-colors text-center">
            ← Back to Edit
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={!confirmed || loading}
            className="w-full sm:w-auto px-6 py-2.5 font-label-md text-white bg-[#1b4332] rounded hover:bg-[#012d1d] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? 'Registering...' : 'Confirm & Register Produce'} 
            {!loading && <span className="material-symbols-outlined text-[16px]">arrow_forward</span>}
          </button>
        </div>
      </div>

    </div>
  );
}
