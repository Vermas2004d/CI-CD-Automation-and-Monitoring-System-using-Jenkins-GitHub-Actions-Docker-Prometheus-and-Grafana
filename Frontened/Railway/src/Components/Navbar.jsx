import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { Menu, X, User, Bell } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isRoyalPage = location.pathname === '/royal-journeys' || location.pathname.startsWith('/royal-booking');
  const [userName, setUserName] = useState('');
  const [hasUnread, setHasUnread] = useState(false);

  React.useEffect(() => {
    const fetchUser = () => {
      try {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserName(user.username || 'User');
        }
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    };
    fetchUser();
    // Listen for storage events to update name if profile changes
    window.addEventListener('storage', fetchUser);
    return () => window.removeEventListener('storage', fetchUser);
  }, []);

  React.useEffect(() => {
    const checkUnread = () => {
      try {
        const raw = localStorage.getItem('notifications_v1');
        if (raw) {
          const notifications = JSON.parse(raw);
          setHasUnread(notifications.some(n => n.unread));
        }
      } catch (e) {
        // ignore
      }
    };

    checkUnread();
    window.addEventListener('notificationUpdate', checkUnread);
    return () => window.removeEventListener('notificationUpdate', checkUnread);
  }, []);

  return (
    <nav className={`${isRoyalPage ? 'bg-[#0f172a] text-white border-b border-[#fbbf24]/20' : 'bg-white text-blue-900'} shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={Logo}
              alt="RailSync Logo"
              className={`${isRoyalPage ? "h-10 w-auto object-contain cursor-pointer rounded-4xl" : "h-10 w-auto object-contain cursor-pointer"}`}
              onClick={()=> navigate('/dashboard')}
            
            />
            <span className="font-bold text-xl">
              <span className={isRoyalPage ? "text-white" : "text-[#1C335C]"}>Rail</span>
              <span className={isRoyalPage ? "text-[#fbbf24]" : "text-[#008BD0]"}>Sync</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <button onClick={(e) => { e.preventDefault(); navigate('/dashboard', { state: { section: 'notifications' } }); }} 
              className={`relative p-2 ${isRoyalPage ? 'hover:bg-[#1e293b]' : 'hover:bg-gray-100'} rounded-lg transition`}>
                <Bell className={`w-5 h-5 ${hasUnread ? 'text-red-500' : (isRoyalPage ? 'text-gray-300' : 'text-gray-600')}`} />
                {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
              <button className={`flex items-center space-x-2 ${isRoyalPage ? 'hover:bg-[#1e293b]' : 'hover:bg-gray-100'} rounded-lg px-3 py-2 transition`}>
                <User className={`w-5 h-5 ${isRoyalPage ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium hidden sm:block ${isRoyalPage ? 'text-gray-200' : 'text-gray-700'}`}>
                  {userName || 'Guest'}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isRoyalPage ? 'text-white' : ''}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isRoyalPage ? 'text-white' : ''}`} />
            )}
          </button>
        </div> 

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden pb-4 space-y-2 border-t ${isRoyalPage ? 'border-[#fbbf24]/20' : 'border-gray-200'} pt-4 mt-2`}>
            <button className={`relative px-3 py-2 ${isRoyalPage ? 'hover:bg-[#1e293b]' : 'hover:bg-gray-100'} rounded-lg transition`}>
                <Bell className={`w-5 h-5 ${isRoyalPage ? 'text-gray-300' : 'text-gray-600'}`} />
                {hasUnread && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
              <button className={`flex items-center space-x-2 ${isRoyalPage ? 'hover:bg-[#1e293b]' : 'hover:bg-gray-100'} rounded-lg px-3 py-2 transition`}>
                <User className={`w-5 h-5 ${isRoyalPage ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium sm:block ${isRoyalPage ? 'text-gray-200' : 'text-gray-700'}`}>
                  {userName || 'Guest'}
                </span>
              </button>
          </div> 
        )}
      </div>
    </nav>
  );
};

export default Navbar;
