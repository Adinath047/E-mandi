import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const stats = [
  { value: '1,240+', label: 'Registered Farmers' },
  { value: '18', label: 'Connected Mandis' },
  { value: '₹4.8 Cr', label: 'Daily Trade Value' },
  { value: '98%', label: 'Digital Transactions' },
];

const steps = [
  { icon: 'how_to_reg', title: '1. Register', desc: 'Farmer registers their produce details upon mandi entry.' },
  { icon: 'assignment_turned_in', title: '2. Gate Pass', desc: 'Digital pass generated linking lot to farmer details securely.' },
  { icon: 'gavel', title: '3. Price Discovery', desc: 'Fair auction bidding process recorded digitally.' },
  { icon: 'payments', title: '4. Track Payment', desc: 'Transparent settlement and direct bank transfers.' },
];

const features = [
  { icon: 'monitoring', title: 'Live Prices', desc: 'Real-time commodity rates across different markets for informed decision-making.' },
  { icon: 'receipt_long', title: 'Gate Pass', desc: 'Digital entry and exit passes to streamline operations and reduce wait times.' },
  { icon: 'campaign', title: 'Auctions', desc: 'Transparent bidding process recorded securely to ensure fair price discovery.' },
  { icon: 'qr_code_scanner', title: 'Lot Tracking', desc: 'End-to-end traceability of produce lots from entry to final dispatch.' },
  { icon: 'sync_alt', title: 'Transactions', desc: 'Secure digital records of all trade agreements between farmers and traders.' },
  { icon: 'account_balance_wallet', title: 'Payment Tracking', desc: 'Monitor settlement status and ensure timely payments to stakeholders.' },
];

const stakeholders = [
  { icon: 'agriculture', label: 'Farmer' },
  { icon: 'storefront', label: 'Trader' },
  { icon: 'admin_panel_settings', label: 'Mandi Official' },
  { icon: 'account_balance', label: 'Agriculture Dept.' },
];

const marketTable = [
  { crop: 'Onion', icon: 'grass', price: '2,450', trend: 'up', change: '+4.2%', arrival: 450 },
  { crop: 'Tomato', icon: 'nutrition', price: '1,850', trend: 'up', change: '+2.1%', arrival: 320 },
  { crop: 'Wheat', icon: 'eco', price: '2,620', trend: 'down', change: '-1.3%', arrival: 1200 },
  { crop: 'Cotton', icon: 'spa', price: '7,150', trend: 'up', change: '+3.6%', arrival: 185 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f4fafd] text-[#161d1f]">
      {/* ===== TOP NAV ===== */}
      <header className="bg-[#f4fafd] border-b border-[#c1c8c2] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-4 md:px-10 h-16 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-3xl fill-icon">agriculture</span>
            <span className="font-display text-[22px] font-bold text-[#012d1d]">e-Mandi</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center h-full">
            <a href="#how-it-works" className="h-full flex items-center font-body-sm text-[#414844] font-medium hover:text-[#012d1d] transition-colors">How It Works</a>
            <a href="#market-data" className="h-full flex items-center font-body-sm text-[#414844] font-medium hover:text-[#012d1d] transition-colors">Market Prices</a>
            <a href="#features" className="h-full flex items-center font-body-sm text-[#414844] font-medium hover:text-[#012d1d] transition-colors">Features</a>
            <a href="#stakeholders" className="h-full flex items-center font-body-sm text-[#414844] font-medium hover:text-[#012d1d] transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="font-label-md text-[#161d1f] hover:text-[#012d1d] transition-colors hidden md:block">Login</Link>
            <Link to="/register" className="bg-[#012d1d] text-white font-label-md px-6 py-2 rounded hover:bg-[#1b4332] transition-colors">Register</Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto w-full flex-1">
        {/* ===== HERO ===== */}
        <section className="px-4 md:px-10 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center relative overflow-hidden">
          {/* Left: Content */}
          <div className="flex flex-col gap-6 relative z-10">
            <h1 className="font-display text-[36px] md:text-[52px] leading-[44px] md:leading-[60px] font-bold tracking-tight text-[#012d1d]">
              A Smarter Mandi. <br />
              <span className="text-[#0e6c4a]">A Fairer Market.</span>
            </h1>
            <p className="font-body-lg text-[#414844] max-w-xl">
              The digital backbone for India's agricultural markets. Ensure transparent price discovery, streamlined operations, and secure payments for farmers and traders alike.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-[#012d1d] text-white font-label-md px-8 py-3 rounded hover:bg-[#1b4332] transition-colors flex items-center gap-2"
              >
                Register Your Produce
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                to="/login"
                className="border border-[#717973] font-label-md text-[#161d1f] px-8 py-3 rounded hover:bg-[#e8eff1] transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                Explore Market Prices
              </Link>
            </div>
          </div>

          {/* Right: Market Overview card */}
          <div className="relative z-10 w-full">
            <div className="bg-white border border-[#c1c8c2] rounded-xl shadow-sm p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-[#c1c8c2] pb-3">
                <h3 className="font-title-md text-[#161d1f]">Today's Market Overview</h3>
                <span className="bg-[#e8eff1] text-[#414844] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#0e6c4a] block"></span> Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Primary stat */}
                <div className="col-span-2 bg-[#f4fafd] p-4 rounded-lg border border-[#c1c8c2]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#414844] text-xl">grass</span>
                      <span className="font-label-md text-[#414844] uppercase tracking-wider">Onion - Grade A</span>
                    </div>
                    <span className="bg-[#d8f3dc] text-[#1b4332] px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span> +4.2%
                    </span>
                  </div>
                  <div className="flex items-end gap-3">
                    <span className="font-display text-[28px] text-[#012d1d] font-bold">₹2,450</span>
                    <span className="font-body-sm text-[#414844] mb-1">/ quintal</span>
                  </div>
                  {/* Sparkline bars */}
                  <div className="h-8 mt-3 w-full flex items-end gap-1 opacity-70">
                    {[40, 35, 50, 45, 60, 55, 70].map((h, i) => (
                      <div
                        key={i}
                        className={`w-full rounded-t ${i === 6 ? 'bg-[#012d1d]' : 'bg-[#a0f4c8]'}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Secondary stats */}
                <div className="bg-[#f4fafd] p-4 rounded-lg border border-[#c1c8c2]">
                  <span className="font-body-sm text-[#414844] block mb-1">Arrival Volume</span>
                  <span className="font-title-md text-[#161d1f] block font-semibold">450 Tons</span>
                </div>
                <div className="bg-[#f4fafd] p-4 rounded-lg border border-[#c1c8c2]">
                  <span className="font-body-sm text-[#414844] block mb-1">Active Lots</span>
                  <span className="font-title-md text-[#161d1f] block font-semibold">128</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#a5d0b9]/10 rounded-bl-[80px] -z-10 hidden lg:block"></div>
        </section>

        {/* ===== STATS STRIP ===== */}
        <section className="px-4 md:px-10 py-8 border-y border-[#c1c8c2] bg-[#eef5f7]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-[#c1c8c2]">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center md:items-start md:px-6 text-center md:text-left">
                <span className="font-display text-[28px] md:text-[32px] font-bold text-[#012d1d]">{s.value}</span>
                <span className="font-body-md text-[#414844]">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className="px-4 md:px-10 py-12">
          <div className="text-center mb-10">
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-[#012d1d] mb-2">How e-Mandi Works</h2>
            <p className="font-body-lg text-[#414844] max-w-2xl mx-auto">A transparent, streamlined process from arrival to payment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#dde4e6] rounded-full flex items-center justify-center mb-4 border-4 border-[#f4fafd] shadow-sm">
                  <span className="material-symbols-outlined text-[#012d1d] text-3xl">{step.icon}</span>
                </div>
                <h3 className="font-title-md text-[#161d1f] mb-2">{step.title}</h3>
                <p className="font-body-sm text-[#414844]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MARKET DATA ===== */}
        <section id="market-data" className="px-4 md:px-10 py-12 bg-[#eef5f7]">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-[#012d1d] mb-1">Know the Market Before You Sell</h2>
                <p className="font-body-lg text-[#414844]">Live commodity rates across connected mandis.</p>
              </div>
              <Link to="/login" className="text-[#012d1d] font-label-md flex items-center gap-1 hover:underline hidden md:flex">
                View all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
            <div className="overflow-x-auto bg-white border border-[#c1c8c2] rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#e2e9ec] border-b border-[#c1c8c2]">
                    <th className="py-4 px-5 font-label-md text-[#414844]">Commodity</th>
                    <th className="py-4 px-5 font-label-md text-[#414844]">Avg Price (₹/qtl)</th>
                    <th className="py-4 px-5 font-label-md text-[#414844]">Trend</th>
                    <th className="py-4 px-5 font-label-md text-[#414844]">Arrival (Tons)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c1c8c2]">
                  {marketTable.map((row) => (
                    <tr key={row.crop} className="hover:bg-[#e8eff1] transition-colors">
                      <td className="py-4 px-5 font-body-md text-[#161d1f] font-medium">
                        <span className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#414844] text-xl">{row.icon}</span>
                          {row.crop}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-data-mono text-[#161d1f]">{row.price}</td>
                      <td className="py-4 px-5 font-data-mono">
                        <span className={`flex items-center gap-1 ${row.trend === 'up' ? 'text-[#1b4332]' : 'text-[#ba1a1a]'}`}>
                          <span className="material-symbols-outlined text-[14px]">{row.trend === 'up' ? 'trending_up' : 'trending_down'}</span>
                          {row.change}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-data-mono text-[#161d1f]">{row.arrival}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="px-4 md:px-10 py-12">
          <div className="text-center mb-10">
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-[#012d1d] mb-2">Platform Features</h2>
            <p className="font-body-lg text-[#414844] max-w-2xl mx-auto">Comprehensive tools for modernizing agricultural trade.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-[#c1c8c2] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-[#012d1d] text-3xl mb-3 block">{f.icon}</span>
                <h3 className="font-title-md text-[#161d1f] mb-2">{f.title}</h3>
                <p className="font-body-sm text-[#414844]">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== STAKEHOLDERS ===== */}
        <section id="stakeholders" className="px-4 md:px-10 py-12 bg-[#eef5f7] border-y border-[#c1c8c2]">
          <div className="text-center mb-10">
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-[#012d1d] mb-2">One Platform. Every Mandi Stakeholder</h2>
            <p className="font-body-lg text-[#414844] max-w-2xl mx-auto">Tailored portals for every participant in the ecosystem.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakeholders.map((s) => (
              <div key={s.label} className="bg-white border border-[#c1c8c2] p-6 rounded-xl text-center">
                <div className="w-14 h-14 bg-[#a5d0b9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[#012d1d] text-2xl">{s.icon}</span>
                </div>
                <h3 className="font-title-md text-[#161d1f]">{s.label}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="px-4 md:px-10 py-12 text-center flex flex-col items-center">
          <h2 className="font-display text-[28px] md:text-[32px] font-bold text-[#012d1d] mb-6">Every Transaction Leaves a Digital Trail</h2>
          <div className="flex items-center justify-center gap-3 text-[#414844] opacity-70 mb-10 flex-wrap">
            {['receipt:Entry', 'balance:Weighing', 'sell:Bidding', 'handshake:Sale', 'paid:Payment'].map((item, i) => {
              const [icon, label] = item.split(':');
              return (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="material-symbols-outlined text-[#c1c8c2]">arrow_right_alt</span>}
                  <span className="font-body-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                    {label}
                  </span>
                </span>
              );
            })}
          </div>
          <div className="bg-[#012d1d] text-white p-8 rounded-xl w-full max-w-4xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="font-display text-[24px] font-bold mb-1">Bring Transparency to Every Mandi Transaction.</h3>
              <p className="font-body-lg text-white/80">Join the digital revolution in agricultural trade today.</p>
            </div>
            <Link
              to="/register"
              className="bg-white text-[#012d1d] font-label-md px-8 py-4 rounded hover:bg-[#e8eff1] transition-colors whitespace-nowrap shadow-sm"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      <Footer variant="dark" />
    </div>
  );
}
