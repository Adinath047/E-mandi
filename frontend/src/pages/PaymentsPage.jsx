import { useState, useEffect } from 'react';
import { getPayments } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      const res = await getPayments();
      if (res.success) {
        setPayments(res.data);
      }
      setLoading(false);
    }
    loadPayments();
  }, []);

  if (loading) {
    return <div className="p-10 text-center font-body-sm text-[#414844]">Loading payments...</div>;
  }

  return (
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8">
      <div className="mb-8">
        <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f]">Payment History</h1>
        <p className="font-body-md text-[#414844]">Track your settlements and transactions.</p>
      </div>

      <div className="bg-white border border-[#c1c8c2] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f4fafd] border-b border-[#c1c8c2]">
              <tr>
                <th className="p-4 font-label-md text-[#414844]">Transaction ID / Date</th>
                <th className="p-4 font-label-md text-[#414844]">Lot Details</th>
                <th className="p-4 font-label-md text-[#414844]">Amount</th>
                <th className="p-4 font-label-md text-[#414844]">Status</th>
                <th className="p-4 font-label-md text-[#414844]">Mode / UTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c1c8c2]">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#f4fafd] transition-colors font-body-sm text-[#161d1f]">
                  <td className="p-4">
                    <div className="font-data-mono font-bold text-[#012d1d] mb-1">{payment.id}</div>
                    <div className="text-xs text-[#414844]">{payment.date}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-[#161d1f] mb-1">{payment.crop}</div>
                    <div className="text-xs text-[#414844]">Lot: {payment.lotId}</div>
                  </td>
                  <td className="p-4 font-data-mono font-bold text-[#012d1d]">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={payment.status} />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-[#161d1f] mb-1">{payment.paymentMode}</div>
                    <div className="text-xs text-[#414844]">{payment.utr ? `UTR: ${payment.utr}` : '-'}</div>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-[#414844]">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
