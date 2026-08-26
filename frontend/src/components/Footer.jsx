import { Link } from 'react-router-dom';

export default function Footer({ variant = 'dark' }) {
  const isDark = variant === 'dark';

  return (
    <footer className={`w-full py-8 ${isDark ? 'bg-[#012d1d] text-white' : 'bg-[#eef5f7] border-t border-[#c1c8c2] text-[#414844]'}`}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className={`font-display text-[18px] font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#012d1d]'}`}>
            <span className="material-symbols-outlined text-[20px] fill-icon">agriculture</span>
            e-Mandi
          </span>
          <span className={`font-body-sm ${isDark ? 'text-white/70' : 'text-[#414844]'}`}>
            © 2026 e-Mandi. Digital Agricultural Marketplace.
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5">
          {['Privacy Policy', 'Terms of Service', 'Whistleblower Policy', 'Contact Support', 'Sitemap'].map((label) => (
            <a
              key={label}
              href="#"
              className={`font-body-sm underline transition-colors ${
                isDark ? 'text-white/70 hover:text-white' : 'text-[#414844] hover:text-[#012d1d]'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
