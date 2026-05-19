import React, { useEffect, useMemo, useState } from 'react';
import { Bell, X, Check, Search, Mail, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// ============================================
// CONFIGURATION
// ============================================
const API_BASE_URL = import.meta.env.VITE_NOTIFICATION_API_URL || 'http://localhost:8000/api/v1/notifications';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Request Interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  localStorage.getItem('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Authentication failed - token may be invalid or expired');
    }
    return Promise.reject(error);
  }
);

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatTime = (date) => {
  const now = new Date();
  const notifDate = new Date(date);
  const diff = Math.floor((now - notifDate) / 1000);

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return notifDate.toLocaleDateString();
};

// ============================================
// NOTIFICATION TOAST COMPONENT
// ============================================
const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, type: 'spring' }}
      className="bg-white rounded-xl shadow-2xl border-l-4 border-[#008BD0] overflow-hidden w-96"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-[#008BD0] bg-opacity-10 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#008BD0]" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-[#1C335C] mb-1">{notification.title}</h4>
              <p className="text-sm text-gray-700">{notification.text}</p>
              {notification.bookingReference && (
                <p className="text-xs text-gray-500 mt-1">Ref: {notification.bookingReference}</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
        className="h-1 bg-gradient-to-r from-[#008BD0] to-[#1C335C]"
      />
    </motion.div>
  );
};

// ============================================
// MAIN NOTIFICATIONS PANEL COMPONENT
// ============================================
const NotificationsPanel = () => {
  // State Management
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [toasts, setToasts] = useState([]);
  const [previousNotificationIds, setPreviousNotificationIds] = useState(new Set());

  // Get user email from localStorage
  // Get user email from localStorage
  useEffect(() => {
    let email = '';
    
    // Try to get from user profile first (most reliable)
    try {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email) email = user.email;
      }
    } catch (e) {
      console.error('Error parsing user data', e);
    }

    // Fallback to legacy keys if not in profile
    if (!email) {
      email = localStorage.getItem('user_email_v1') || 
              localStorage.getItem('userEmail') || 
              localStorage.getItem('email') ||
              'guest@example.com';
    }
    
    setUserEmail(email);
  }, []);

  // Initial fetch and polling
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // ============================================
  // API FUNCTIONS
  // ============================================

  // Fetch all notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/');
      
      if (response.data.success && Array.isArray(response.data.notifications)) {
        const transformedNotifications = response.data.notifications.map(notif => ({
          id: notif._id,
          text: notif.message,
          title: notif.title,
          time: formatTime(notif.createdAt),
          unread: !notif.isRead,
          type: notif.type,
          bookingType: notif.bookingType,
          bookingReference: notif.bookingReference,
        }));

        // Show toast for new unread notifications
        if (previousNotificationIds.size > 0) {
          const newNotifications = transformedNotifications.filter(
            notif => !previousNotificationIds.has(notif.id) && notif.unread
          );
          newNotifications.forEach(showToast);
        }

        setPreviousNotificationIds(new Set(transformedNotifications.map(n => n.id)));
        setNotifications(transformedNotifications);
        
        // Update localStorage and notify Navbar
        localStorage.setItem('notifications_v1', JSON.stringify(transformedNotifications));
        window.dispatchEvent(new Event('notificationUpdate'));
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      handleError(err, 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  // Mark single notification as read
  const markAsRead = async (id) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification || !notification.unread) return;

    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));

    try {
      await api.patch(`/${id}/read`);
      
      // Update localStorage after marking as read
      const updatedNotifications = notifications.map(n => 
        n.id === id ? { ...n, unread: false } : n
      );
      localStorage.setItem('notifications_v1', JSON.stringify(updatedNotifications));
      window.dispatchEvent(new Event('notificationUpdate'));
      
    } catch (err) {
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, unread: true } : n
      ));
      handleError(err, 'Failed to mark as read');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => n.unread);
    if (unreadNotifications.length === 0) return;

    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));

    try {
      await api.patch('/read-all');
      
      // Update localStorage after marking all as read
      const updatedNotifications = notifications.map(n => ({ ...n, unread: false }));
      localStorage.setItem('notifications_v1', JSON.stringify(updatedNotifications));
      window.dispatchEvent(new Event('notificationUpdate'));

    } catch (err) {
      setNotifications(prev => prev.map(n => {
        const wasUnread = unreadNotifications.find(un => un.id === n.id);
        return wasUnread ? { ...n, unread: true } : n;
      }));
      handleError(err, 'Failed to mark all as read');
    }
  };

  // Delete single notification
  const deleteNotification = async (id) => {
    const previousNotifications = [...notifications];
    setNotifications(prev => prev.filter(n => n.id !== id));

    try {
      await api.delete(`/${id}`);
      
      // Update localStorage after deleting
      const updatedNotifications = notifications.filter(n => n.id !== id);
      localStorage.setItem('notifications_v1', JSON.stringify(updatedNotifications));
      window.dispatchEvent(new Event('notificationUpdate'));

    } catch (err) {
      setNotifications(previousNotifications);
      handleError(err, 'Failed to delete notification');
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    if (!window.confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
      return;
    }

    const previousNotifications = [...notifications];
    setNotifications([]);

    try {
      await api.delete('/');
      
      // Update localStorage after clearing all
      localStorage.setItem('notifications_v1', JSON.stringify([]));
      window.dispatchEvent(new Event('notificationUpdate'));

    } catch (err) {
      setNotifications(previousNotifications);
      handleError(err, 'Failed to clear all notifications');
    }
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const showToast = (notification) => {
    const toastId = Date.now() + Math.random();
    setToasts(prev => [...prev, { ...notification, toastId }]);
    
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVa3n7a1aFQxEnN/uvW0fBDWM0/PVf');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const closeToast = (toastId) => {
    setToasts(prev => prev.filter(t => t.toastId !== toastId));
  };

  const handleError = (err, defaultMessage) => {
    console.error(defaultMessage, err);
    
    let errorMessage = defaultMessage;
    
    if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
      errorMessage = `Cannot connect to server. Please check:\n• Backend is running at ${API_BASE_URL}\n• CORS is configured correctly\n• Network connection is active`;
    } else if (err.response?.status === 401) {
      errorMessage = 'Session expired. Please login again.';
    } else if (err.response?.status === 404) {
      errorMessage = 'API endpoint not found. Check your backend routes.';
    } else if (err.response?.data?.error) {
      errorMessage = err.response.data.error;
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    setError(errorMessage);
    setTimeout(() => setError(null), 10000);
  };

  // ============================================
  // COMPUTED VALUES
  // ============================================

  const unreadCount = useMemo(() => 
    notifications.filter(n => n.unread).length, 
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (filter === 'unread' && !n.unread) return false;
      
      if (query) {
        const searchLower = query.toLowerCase();
        const matchesTitle = n.title?.toLowerCase().includes(searchLower);
        const matchesText = n.text?.toLowerCase().includes(searchLower);
        const matchesRef = n.bookingReference?.toLowerCase().includes(searchLower);
        
        if (!matchesTitle && !matchesText && !matchesRef) return false;
      }
      
      return true;
    });
  }, [notifications, filter, query]);

  // ============================================
  // RENDER
  // ============================================

  if (loading && notifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#008BD0] border-t-transparent"></div>
          <p className="mt-4 text-[#1C335C] font-semibold text-lg">Loading notifications...</p>
          <p className="text-sm text-gray-500 mt-1">Connecting to server</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <div key={toast.toastId} className="pointer-events-auto">
              <NotificationToast
                notification={toast}
                onClose={() => closeToast(toast.toastId)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
            <Bell className="w-7 h-7 text-[#008BD0]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#1C335C]">Notifications</h2>
            <p className="text-sm text-gray-600 mt-1">
              {unreadCount > 0 ? (
                <>
                  <span className="font-semibold text-[#008BD0]">{unreadCount} unread</span>
                  <span className="text-gray-400"> • Stay updated</span>
                </>
              ) : (
                <span className="text-gray-500">✨ All caught up!</span>
              )}
            </p>
          </div>
        </div>

        {userEmail && (
          <div className="hidden md:flex items-center gap-2 bg-white shadow-md rounded-full px-5 py-2.5 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-8 h-8 bg-gradient-to-br from-[#008BD0] to-[#1C335C] rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-[#1C335C]">{userEmail}</span>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Connection Error</p>
              <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
              <button 
                onClick={fetchNotifications}
                className="mt-2 text-sm text-red-700 hover:text-red-800 font-semibold underline"
              >
                Try Again
              </button>
            </div>
            <button 
              onClick={() => setError(null)}
              className="p-1 rounded-lg hover:bg-red-100 transition-colors"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Controls Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008BD0] focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-[#008BD0] to-[#006ea8] text-white shadow-lg shadow-[#008BD0]/30' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All <span className="ml-1 text-xs opacity-80">({notifications.length})</span>
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                  filter === 'unread' 
                    ? 'bg-gradient-to-r from-[#008BD0] to-[#006ea8] text-white shadow-lg shadow-[#008BD0]/30' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread <span className="ml-1 text-xs opacity-80">({unreadCount})</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchNotifications}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors group"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5 text-[#1C335C] group-hover:rotate-180 transition-transform duration-500" />
            </button>
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="px-5 py-3 rounded-xl bg-[#1C335C] text-white hover:bg-[#152847] disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Mark all read
            </button>
            <button
              onClick={clearAllNotifications}
              disabled={notifications.length === 0}
              className="px-5 py-3 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold border border-red-200"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
              <Bell className="w-10 h-10 text-[#008BD0]" />
            </div>
            <p className="text-xl font-bold text-[#1C335C] mb-2">
              {notifications.length === 0 
                ? 'No notifications yet' 
                : 'No notifications found'}
            </p>
            <p className="text-sm text-gray-500">
              {notifications.length === 0 
                ? 'New notifications will appear here when you receive them' 
                : 'Try adjusting your filters or search terms'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {filteredNotifications.map((notif) => (
                <motion.div
                  layout
                  key={notif.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginTop: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                    notif.unread 
                      ? 'bg-gradient-to-r from-[#008BD0]/5 to-[#1C335C]/5 border-[#008BD0]/30 shadow-sm' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notif.unread 
                        ? 'bg-gradient-to-br from-blue-100 to-cyan-100 shadow-md' 
                        : 'bg-gray-100'
                    }`}>
                      <Bell className={`w-6 h-6 ${
                        notif.unread ? 'text-[#008BD0]' : 'text-gray-500'
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      {notif.title && (
                        <h3 className="text-base font-bold text-[#1C335C] mb-1.5">
                          {notif.title}
                        </h3>
                      )}
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">{notif.text}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="font-medium">{notif.time}</span>
                        {notif.bookingReference && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                            <span className="px-2 py-1 bg-gray-200 rounded-md font-mono">
                              {notif.bookingReference}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {notif.unread && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="p-2.5 rounded-lg bg-[#008BD0]/10 hover:bg-[#008BD0]/20 transition-colors group"
                          title="Mark as read"
                        >
                          <Check className="w-5 h-5 text-[#008BD0] group-hover:scale-110 transition-transform" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="p-2.5 rounded-lg hover:bg-red-50 transition-colors group"
                        title="Delete"
                      >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer Stats */}
        {notifications.length > 0 && (
          <div className="pt-2 flex items-center justify-between text-sm px-1">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 rounded-full bg-[#008BD0]"></div>
              <span className="font-medium">{notifications.length} total notifications</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <span className="font-medium">{unreadCount} unread</span>
              <div className="w-2 h-2 rounded-full bg-[#1C335C]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;