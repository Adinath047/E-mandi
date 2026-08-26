import { useState, useEffect } from 'react';
import { getNotifications, markNotificationRead } from '../services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      const res = await getNotifications();
      if (res.success) {
        setNotifications(res.data);
      }
      setLoading(false);
    }
    loadNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  if (loading) {
    return <div className="p-10 text-center font-body-sm text-[#414844]">Loading notifications...</div>;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-[1024px] mx-auto w-full px-4 md:px-10 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-[28px] md:text-[32px] font-bold text-[#161d1f] flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-[#ba1a1a] text-white text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                {unreadCount} New
              </span>
            )}
          </h1>
        </div>
        <button 
          onClick={() => notifications.forEach(n => !n.read && handleMarkRead(n.id))}
          className="text-[#012d1d] font-label-md hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white border border-[#c1c8c2] rounded-xl overflow-hidden shadow-sm divide-y divide-[#c1c8c2]">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`p-4 sm:p-6 flex gap-4 transition-colors ${n.read ? 'opacity-70 bg-white hover:bg-[#f4fafd]' : 'bg-[#f4fafd] hover:bg-[#eef5f7]'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-[#e2e9ec] text-[#717973]' : 'bg-[#1b4332] text-white'}`}>
              <span className="material-symbols-outlined text-[20px]">{n.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start gap-4 mb-1">
                <h3 className={`font-title-md ${n.read ? 'text-[#414844]' : 'text-[#012d1d] font-bold'}`}>
                  {n.title}
                </h3>
                <span className="text-xs text-[#717973] whitespace-nowrap">{n.time}</span>
              </div>
              <p className="font-body-sm text-[#414844] mb-2">{n.message}</p>
              {!n.read && (
                <button 
                  onClick={() => handleMarkRead(n.id)}
                  className="text-xs font-label-md text-[#0e6c4a] hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <div className="p-10 text-center font-body-sm text-[#414844]">
            You have no notifications.
          </div>
        )}
      </div>
    </div>
  );
}
