import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roles = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'trader', label: 'Trader' },
  { value: 'official', label: 'Mandi Official' },
  { value: 'dept', label: 'Agriculture Dept.' },
];

const features = [
  {
    icon: 'analytics',
    title: 'Transparent market information',
    desc: 'Real-time pricing and demand data across all registered mandis.',
  },
  {
    icon: 'receipt_long',
    title: 'Digital produce & records',
    desc: 'Immutable transaction histories and digital inventory tracking.',
  },
  {
    icon: 'admin_panel_settings',
    title: 'Secure role-based access',
    desc: 'Tailored interfaces for farmers, traders, and government officials.',
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState('farmer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login({ identifier, password, role });
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-[#f4fafd] text-[#161d1f] h-screen w-full overflow-hidden flex flex-col md:flex-row">
      {/* LEFT: Branding (hidden on mobile) */}
      <div className="hidden md:flex flex-col justify-center px-10 w-1/2 bg-[#eef5f7] h-full border-r border-[#c1c8c2]">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <span className="material-symbols-outlined text-[#012d1d] text-4xl fill-icon">agriculture</span>
            <span className="font-display text-[28px] font-bold text-[#012d1d]">e-Mandi</span>
          </div>

          <h1 className="font-display text-[40px] leading-[48px] font-bold text-[#012d1d] mb-4">
            A Smarter Mandi.<br />A Fairer Market.
          </h1>
          <p className="font-body-lg text-[#414844] mb-10">
            Secure access to India's digital agricultural marketplace.
          </p>

          <ul className="space-y-6">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c1ecd4] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#002114] text-xl">{f.icon}</span>
                </div>
                <div>
                  <h3 className="font-title-md text-[#012d1d] mb-0.5">{f.title}</h3>
                  <p className="font-body-sm text-[#414844]">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT: Login form */}
      <div className="flex-1 flex flex-col justify-center px-4 md:px-10 h-full overflow-y-auto bg-[#f4fafd]">
        <div className="w-full mx-auto max-w-md">
          {/* Mobile logo */}
          <div className="md:hidden mb-8 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-[#012d1d] text-5xl fill-icon mb-2">agriculture</span>
            <h1 className="font-title-md text-[#012d1d] font-bold">e-Mandi</h1>
          </div>

          <div className="bg-white border border-[#c1c8c2] rounded p-6 md:p-8 w-full">
            <div className="mb-6">
              <h2 className="font-display text-[24px] md:text-[28px] font-bold text-[#161d1f] mb-1">Welcome back</h2>
              <p className="font-body-sm text-[#414844]">Sign in to continue to e-Mandi</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Role Selector */}
              <div>
                <label className="block font-label-md text-[#414844] mb-2 uppercase">I am signing in as</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => (
                    <label key={r.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={r.value}
                        checked={role === r.value}
                        onChange={() => setRole(r.value)}
                        className="sr-only peer"
                      />
                      <div className={`px-4 py-2 border rounded text-center font-body-sm transition-colors ${
                        role === r.value
                          ? 'bg-[#1b4332] text-white border-[#1b4332]'
                          : 'border-[#c1c8c2] text-[#161d1f] hover:bg-[#eef5f7]'
                      }`}>
                        {r.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block font-label-md text-[#161d1f] mb-1" htmlFor="identifier">
                    Mobile Number / Email
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    placeholder="Enter your registered identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-[#c1c8c2] rounded font-body-sm text-[#161d1f] placeholder:text-[#414844]/50"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-label-md text-[#161d1f]" htmlFor="password">Password</label>
                    <a href="#" className="font-body-sm text-[#012d1d] hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 bg-white border border-[#c1c8c2] rounded font-body-sm text-[#161d1f]"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#414844] hover:text-[#161d1f]"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="font-body-sm text-[#ba1a1a] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {error}
                </p>
              )}

              {/* Demo hint */}
              <p className="font-body-sm text-[#414844] bg-[#eef5f7] border border-[#c1c8c2] rounded p-3">
                <span className="font-semibold">Demo:</span> Enter any credentials and click Sign In.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1b4332] text-white rounded font-label-md hover:bg-[#012d1d] transition-colors disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="font-body-sm text-[#414844]">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#012d1d] font-medium hover:underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Security note */}
          <div className="mt-4 flex items-center justify-center gap-1 text-[#414844]">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <p className="font-body-sm">Your information is protected with secure authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
