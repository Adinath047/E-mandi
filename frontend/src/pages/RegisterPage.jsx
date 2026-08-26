import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roles = [
  { value: 'farmer', label: 'Farmer', icon: 'agriculture', desc: 'Register and manage your produce lots' },
  { value: 'trader', label: 'Trader', icon: 'storefront', desc: 'Participate in auctions and manage purchases' },
  { value: 'official', label: 'Mandi Official', icon: 'admin_panel_settings', desc: 'Manage mandi operations and verification' },
  { value: 'dept', label: 'Agriculture Dept.', icon: 'account_balance', desc: 'Monitor and regulate agricultural trade' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(1); // 1 = role selection, 2 = basic info
  const [selectedRole, setSelectedRole] = useState('');
  const [form, setForm] = useState({ name: '', mobile: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRoleNext = () => {
    if (!selectedRole) {
      setErrors({ role: 'Please select a role to continue.' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.mobile.trim()) errs.mobile = 'Mobile number is required.';
    if (!form.password) errs.password = 'Password is required.';
    if (form.password && form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Auto-login after registration
    const result = await login({ identifier: form.mobile || form.email, password: form.password, role: selectedRole });
    setLoading(false);
    if (result.success) {
      navigate('/profile-setup');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fafd] flex flex-col">
      {/* Header */}
      <header className="bg-[#f4fafd] border-b border-[#c1c8c2] h-16 flex items-center px-4 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#012d1d] text-2xl fill-icon">agriculture</span>
          <span className="font-display text-[20px] font-bold text-[#012d1d]">e-Mandi</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`flex items-center gap-2`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-label-md text-xs ${step >= 1 ? 'bg-[#012d1d] text-white' : 'border border-[#717973] text-[#414844]'}`}>
                {step > 1 ? <span className="material-symbols-outlined text-[14px]">check</span> : '1'}
              </div>
              <span className={`font-label-md ${step >= 1 ? 'text-[#012d1d]' : 'text-[#414844]'}`}>Choose Role</span>
            </div>
            <div className="flex-1 h-px bg-[#c1c8c2]" />
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-label-md text-xs ${step >= 2 ? 'bg-[#012d1d] text-white' : 'border border-[#717973] text-[#414844]'}`}>
                2
              </div>
              <span className={`font-label-md ${step >= 2 ? 'text-[#012d1d]' : 'text-[#414844]'}`}>Create Account</span>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white border border-[#c1c8c2] rounded p-6 md:p-8">
              <h1 className="font-display text-[24px] md:text-[28px] font-bold text-[#161d1f] mb-1">Create Your Account</h1>
              <p className="font-body-sm text-[#414844] mb-6">Select your role to get started on e-Mandi.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {roles.map((r) => (
                  <label key={r.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={selectedRole === r.value}
                      onChange={() => { setSelectedRole(r.value); setErrors({}); }}
                      className="sr-only"
                    />
                    <div className={`p-4 border rounded-xl transition-colors ${
                      selectedRole === r.value
                        ? 'border-[#012d1d] bg-[#012d1d]/5'
                        : 'border-[#c1c8c2] hover:bg-[#eef5f7]'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                        selectedRole === r.value ? 'bg-[#1b4332] text-white' : 'bg-[#e8eff1] text-[#414844]'
                      }`}>
                        <span className="material-symbols-outlined text-xl">{r.icon}</span>
                      </div>
                      <h3 className="font-label-md text-[#161d1f] mb-1">{r.label}</h3>
                      <p className="font-body-sm text-[#414844] text-xs">{r.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {errors.role && <p className="font-body-sm text-[#ba1a1a] mb-4">{errors.role}</p>}

              <button
                onClick={handleRoleNext}
                className="w-full py-3 bg-[#1b4332] text-white font-label-md rounded hover:bg-[#012d1d] transition-colors flex items-center justify-center gap-2"
              >
                Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <p className="font-body-sm text-[#414844] text-center mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-[#012d1d] font-medium hover:underline">Sign in</Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-[#c1c8c2] rounded p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <button onClick={() => setStep(1)} className="text-[#414844] hover:text-[#012d1d]">
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <div>
                  <h1 className="font-display text-[24px] font-bold text-[#161d1f]">Account Details</h1>
                  <p className="font-body-sm text-[#414844]">Registering as: <strong>{roles.find(r => r.value === selectedRole)?.label}</strong></p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="font-label-md text-[#161d1f] block mb-1">Full Name <span className="text-[#ba1a1a]">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., Ramesh Kumar"
                    value={form.name}
                    onChange={handleChange('name')}
                    className="w-full px-4 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                  />
                  {errors.name && <p className="text-xs text-[#ba1a1a] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="font-label-md text-[#161d1f] block mb-1">Mobile Number <span className="text-[#ba1a1a]">*</span></label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.mobile}
                    onChange={handleChange('mobile')}
                    className="w-full px-4 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                  />
                  {errors.mobile && <p className="text-xs text-[#ba1a1a] mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="font-label-md text-[#161d1f] block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    className="w-full px-4 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                  />
                </div>

                <div>
                  <label className="font-label-md text-[#161d1f] block mb-1">Password <span className="text-[#ba1a1a]">*</span></label>
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={handleChange('password')}
                    className="w-full px-4 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                  />
                  {errors.password && <p className="text-xs text-[#ba1a1a] mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="font-label-md text-[#161d1f] block mb-1">Confirm Password <span className="text-[#ba1a1a]">*</span></label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={form.confirm}
                    onChange={handleChange('confirm')}
                    className="w-full px-4 py-2 border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                  />
                  {errors.confirm && <p className="text-xs text-[#ba1a1a] mt-1">{errors.confirm}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#1b4332] text-white font-label-md rounded hover:bg-[#012d1d] transition-colors disabled:opacity-60"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="font-body-sm text-[#414844] text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#012d1d] font-medium hover:underline">Sign in</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
