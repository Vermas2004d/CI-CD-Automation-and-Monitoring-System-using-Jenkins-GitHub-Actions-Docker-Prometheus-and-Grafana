import { useState } from 'react';
import { LogOut, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Call backend logout API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          withCredentials: true, // Important: sends cookies with request
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data.success) {
        // Clear local storage/session storage
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        
        // Optional: Clear any other stored data
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('accessToken');
        
        // Redirect to home/login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Even if API fails, clear local data and redirect
      // (handles cases where token is already expired)
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/login');
      } else {
        setError('Logout failed. Please try again.');
        
        // Auto-clear error after 3 seconds
        setTimeout(() => setError(''), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-xs">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      
      <button
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4 border-t pt-4 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <LogOut className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">
          {isLoading ? 'Logging out...' : 'Logout'}
        </span>
      </button>
    </div>
  );
};

export default LogoutButton;