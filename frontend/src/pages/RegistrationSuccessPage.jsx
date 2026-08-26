import { useLocation, Link, Navigate } from 'react-router-dom';

export default function RegistrationSuccessPage() {
  const location = useLocation();
  const lot = location.state?.lot;

  if (!lot) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white border border-[#c1c8c2] p-8 md:p-12 rounded-xl text-center max-w-2xl w-full">
        <div className="w-20 h-20 bg-[#d8f3dc] rounded-full mx-auto flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[#1b4332] text-4xl">check_circle</span>
        </div>
        
        <h1 className="font-display text-[28px] md:text-[36px] font-bold text-[#012d1d] mb-4">
          Produce Registered Successfully!
        </h1>
        
        <p className="font-body-lg text-[#414844] mb-8">
          Your produce lot has been successfully registered. The Mandi official will verify the details before the auction begins.
        </p>

        <div className="bg-[#f4fafd] border border-[#c1c8c2] rounded-lg p-6 mb-8 text-left grid grid-cols-2 gap-4">
          <div>
            <span className="text-[#414844] block text-sm font-body-sm">Lot ID</span>
            <span className="font-data-mono font-bold text-[#161d1f] text-lg">{lot.id}</span>
          </div>
          <div>
            <span className="text-[#414844] block text-sm font-body-sm">Mandi</span>
            <span className="font-medium text-[#161d1f]">{lot.mandi}</span>
          </div>
          <div>
            <span className="text-[#414844] block text-sm font-body-sm">Crop</span>
            <span className="font-medium text-[#161d1f]">{lot.crop}</span>
          </div>
          <div>
            <span className="text-[#414844] block text-sm font-body-sm">Quantity</span>
            <span className="font-medium text-[#161d1f]">{lot.quantity} {lot.unit}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/lots"
            className="w-full sm:w-auto px-8 py-3 bg-[#1b4332] text-white font-label-md rounded hover:bg-[#012d1d] transition-colors shadow-sm"
          >
            View My Lots
          </Link>
          <Link 
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-3 bg-white border border-[#c1c8c2] text-[#414844] font-label-md rounded hover:bg-[#e8eff1] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
