import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFarmerProfile } from '../services/api';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const res = await getFarmerProfile();
      if (res.success) {
        setProfile(res.data);
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  if (loading) {
    return <div className="p-10 text-center font-body-sm text-[#414844]">Loading profile...</div>;
  }

  return (
    <div className="max-w-[1024px] mx-auto w-full px-4 md:px-10 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f]">Profile & Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-[#c1c8c2] rounded-xl p-6 text-center shadow-sm">
            <div className="w-24 h-24 rounded-full bg-[#1b4332] text-white flex items-center justify-center font-display text-[32px] font-bold mx-auto mb-4">
              {profile?.initials}
            </div>
            <h2 className="font-title-md text-[#012d1d]">{profile?.name}</h2>
            <p className="font-body-sm text-[#414844] mb-2">{profile?.id}</p>
            <span className="bg-[#eef5f7] text-[#0e6c4a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Verified {profile?.role}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#c1c8c2] pb-3 mb-4">
              <h3 className="font-title-md text-[#161d1f]">Personal Information</h3>
              <button className="text-[#012d1d] font-label-md flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">edit</span> Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Mobile</span>
                <span className="text-[#161d1f] font-medium">{profile?.mobile}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Email</span>
                <span className="text-[#161d1f] font-medium">{profile?.email || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Aadhaar</span>
                <span className="text-[#161d1f] font-medium">{profile?.aadhaar}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Joined</span>
                <span className="text-[#161d1f] font-medium">{profile?.joinDate}</span>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#c1c8c2] pb-3 mb-4">
              <h3 className="font-title-md text-[#161d1f]">Farm Details</h3>
              <button className="text-[#012d1d] font-label-md flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">edit</span> Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Primary Crop</span>
                <span className="text-[#161d1f] font-medium">{profile?.primaryCrop}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Land Size</span>
                <span className="text-[#161d1f] font-medium">{profile?.landSize}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Location</span>
                <span className="text-[#161d1f] font-medium">{profile?.village}, {profile?.district}, {profile?.state}</span>
              </div>
            </div>
          </section>

          <section className="bg-white border border-[#c1c8c2] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#c1c8c2] pb-3 mb-4">
              <h3 className="font-title-md text-[#161d1f]">Bank Account</h3>
              <button className="text-[#012d1d] font-label-md flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">edit</span> Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">Account Number</span>
                <span className="text-[#161d1f] font-data-mono">{profile?.bankAccount}</span>
              </div>
              <div>
                <span className="text-[#414844] block text-xs uppercase font-semibold mb-1">IFSC Code</span>
                <span className="text-[#161d1f] font-data-mono">{profile?.ifsc}</span>
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-4 border-t border-[#c1c8c2]">
            <button 
              onClick={() => logout()}
              className="px-6 py-2 bg-white border border-[#ba1a1a] text-[#ba1a1a] font-label-md rounded hover:bg-[#ffdad6] transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span> Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
