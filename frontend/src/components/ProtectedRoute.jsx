import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4fafd]">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[#012d1d] text-4xl animate-spin" style={{ animationDuration: '1s' }}>
            autorenew
          </span>
          <p className="font-body-sm text-[#414844]">Loading e-Mandi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
