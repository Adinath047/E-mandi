import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mandiOptions, cropOptions } from '../data/mockData';

export default function ProfileSetupPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    primaryCrop: '',
    farmLocation: '',
    village: '',
    district: '',
    state: 'Maharashtra',
    preferredMandi: '',
    landSize: '',
    aadhaar: '',
    bankAccount: '',
    ifsc: '',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f4fafd] flex flex-col">
      {/* Header */}
      <header className="bg-[#f4fafd] border-b border-[#c1c8c2] h-16 flex items-center px-4 md:px-10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#012d1d] text-2xl fill-icon">agriculture</span>
          <span className="font-display text-[20px] font-bold text-[#012d1d]">e-Mandi</span>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-bold">
              {user?.initials || 'RK'}
            </div>
            <div>
              <h1 className="font-display text-[24px] md:text-[28px] font-bold text-[#012d1d]">Set Up Your Profile</h1>
              <p className="font-body-sm text-[#414844]">Tell us about your farm to personalize your e-Mandi experience.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Farm Details */}
          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6">
            <h2 className="font-title-md text-[#161d1f] mb-4 pb-3 border-b border-[#c1c8c2]">Farm Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="font-label-md text-[#161d1f] block mb-1">Primary Crop <span className="text-[#ba1a1a]">*</span></label>
                <select
                  value={form.primaryCrop}
                  onChange={handleChange('primaryCrop')}
                  required
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f] bg-white"
                >
                  <option value="">Select your primary crop</option>
                  {cropOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-label-md text-[#161d1f] block mb-1">Land Size</label>
                <input
                  type="text"
                  placeholder="e.g., 5 Acres"
                  value={form.landSize}
                  onChange={handleChange('landSize')}
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                />
              </div>

              <div>
                <label className="font-label-md text-[#161d1f] block mb-1">Preferred Mandi <span className="text-[#ba1a1a]">*</span></label>
                <select
                  value={form.preferredMandi}
                  onChange={handleChange('preferredMandi')}
                  required
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f] bg-white"
                >
                  <option value="">Select mandi</option>
                  {mandiOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-label-md text-[#161d1f] block mb-1">Village</label>
                <input
                  type="text"
                  placeholder="e.g., Shirur"
                  value={form.village}
                  onChange={handleChange('village')}
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                />
              </div>

              <div>
                <label className="font-label-md text-[#161d1f] block mb-1">District</label>
                <input
                  type="text"
                  placeholder="e.g., Pune"
                  value={form.district}
                  onChange={handleChange('district')}
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-label-md text-[#161d1f] block mb-1">State</label>
                <select
                  value={form.state}
                  onChange={handleChange('state')}
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f] bg-white"
                >
                  {['Maharashtra', 'Madhya Pradesh', 'Karnataka', 'Uttar Pradesh', 'Punjab', 'Rajasthan', 'Gujarat'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Identity */}
          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6">
            <h2 className="font-title-md text-[#161d1f] mb-4 pb-3 border-b border-[#c1c8c2]">Identity & Banking</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-label-md text-[#161d1f] block mb-1">Aadhaar Number</label>
                <input
                  type="text"
                  placeholder="12-digit Aadhaar"
                  value={form.aadhaar}
                  onChange={handleChange('aadhaar')}
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                />
              </div>
              <div>
                <label className="font-label-md text-[#161d1f] block mb-1">Bank Account Number</label>
                <input
                  type="text"
                  placeholder="Account number"
                  value={form.bankAccount}
                  onChange={handleChange('bankAccount')}
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                />
              </div>
              <div>
                <label className="font-label-md text-[#161d1f] block mb-1">IFSC Code</label>
                <input
                  type="text"
                  placeholder="e.g., SBIN0001234"
                  value={form.ifsc}
                  onChange={handleChange('ifsc')}
                  className="w-full px-3 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                />
              </div>
            </div>
            <p className="font-body-sm text-[#414844] mt-3 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Your details are encrypted and stored securely.
            </p>
          </section>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 border border-[#c1c8c2] text-[#414844] font-label-md rounded hover:bg-[#e8eff1] transition-colors"
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2 bg-[#1b4332] text-white font-label-md rounded hover:bg-[#012d1d] transition-colors disabled:opacity-60 flex items-center gap-2"
            >
              {saving ? 'Saving...' : 'Save & Continue'}
              {!saving && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
