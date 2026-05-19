import { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Check, 
  X, 
  Shield, 
  Bell,
  Calendar,
  Upload,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    avatar: null,
    avatarInitial: '',
    memberSince: '',
    language: 'English',
    notifications: true,
    twoFactor: false
  });

  const [tempData, setTempData] = useState({ ...profileData });
  const widgetRef = useRef(null); // Cloudinary widget reference

  // Cloudinary config - Loaded from .env
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Initialize Cloudinary Upload Widget
  useEffect(() => {
    if (isEditing && !widgetRef.current) {
      const script = document.createElement('script');
      script.src = `https://upload-widget.cloudinary.com/latest/global/all.js`;
      script.async = true;
      script.onload = () => {
        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: CLOUDINARY_CLOUD_NAME,
            uploadPreset: UPLOAD_PRESET,
            sources: ['local', 'camera'],
            multiple: false,
            maxFiles: 1,
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
            maxFileSize: 5000000, // 5MB
            cropping: true,
            croppingAspectRatio: 1, // Square crop for profile pic
            showAdvancedOptions: false,
            showGenerateThumbnails: false,
            thumbnailTransformation: {
              width: 300,
              height: 300,
              crop: 'fill'
            }
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              const imageUrl = result.info.secure_url;
              setTempData(prev => ({ 
                ...prev, 
                avatar: imageUrl,
                avatarInitial: null 
              }));
              setError('');
            }
          }
        );
      };
      document.body.appendChild(script);
      
      return () => {
        if (widgetRef.current) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isEditing]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      
      if (!storedUser) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/current-user`,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data.success) {
        const userData = response.data.data;
        const memberSince = new Date(userData.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        });

        const formattedProfile = {
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || '',
          location: userData.location || '',
          avatar: userData.avatar || null,
          avatarInitial: (userData.username || 'U').charAt(0).toUpperCase(),
          memberSince: memberSince,
          language: userData.language || 'English',
          notifications: userData.notifications !== undefined ? userData.notifications : true,
          twoFactor: userData.twoFactor || false
        };

        setProfileData(formattedProfile);
        setTempData(formattedProfile);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/login');
      } else {
        setError('Failed to load profile. Please refresh the page.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      const updateData = {
        username: tempData.username,
        phone: tempData.phone,
        location: tempData.location,
        language: tempData.language,
        notifications: tempData.notifications,
        twoFactor: tempData.twoFactor,
        avatar: tempData.avatar // Now this will be Cloudinary URL
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-profile`,
        updateData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data.success) {
        setProfileData({ ...tempData });
        
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const updatedUser = { ...user, username: tempData.username, phone: tempData.phone, avatar: tempData.avatar };
          
          if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(updatedUser));
          } else {
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
          }
        }

        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
    setError('');
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const openCloudinaryWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  const removeImage = () => {
    setTempData(prev => ({ 
      ...prev, 
      avatar: null,
      avatarInitial: (profileData.username || 'U').charAt(0).toUpperCase()
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 text-[#008BD0] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800 animate-fadeIn">
          <Check className="w-5 h-5" />
          <span className="font-medium">Profile updated successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
          <X className="w-5 h-5" />
          <span className="font-medium">{error}</span>
          <button onClick={() => setError('')} className="ml-auto">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C335C]">My Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-[#008BD0] hover:text-[#006ea8] font-medium transition"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Avatar & Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b">
          <div className="relative group">
            {isEditing ? (
              <div className="relative">
                <button
                  onClick={openCloudinaryWidget}
                  disabled={uploadingImage}
                  className="cursor-pointer block"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl relative group">
                    {tempData.avatar ? (
                      <img 
                        src={tempData.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#008BD0] flex items-center justify-center text-white text-4xl font-bold">
                        {tempData.avatarInitial || (tempData.username || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Upload className="w-6 h-6 text-white mb-1" />
                      <span className="text-xs text-white font-medium">Upload Photo</span>
                    </div>
                  </div>
                </button>

                {tempData.avatar && (
                  <button
                    onClick={removeImage}
                    className="absolute -top-1 -right-1 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition"
                    title="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                {profileData.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#008BD0] flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.avatarInitial || (profileData.username || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center sm:text-left flex-1">
            {isEditing ? (
              <input
                type="text"
                value={tempData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="text-2xl font-bold text-[#1C335C] mb-1 w-full max-w-xs px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
                placeholder="Your Username"
              />
            ) : (
              <h3 className="text-2xl font-bold text-[#1C335C] mb-1">{profileData.username}</h3>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {profileData.email}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Member since {profileData.memberSince}
              </span>
            </div>

            {isEditing && (
              <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg max-w-sm">
                <p className="font-medium text-[#1C335C] mb-1">Photo Guidelines:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Max size: 5MB</li>
                  <li>Formats: JPG, PNG, WebP</li>
                  <li>Click avatar to upload via Cloudinary</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Rest of your component remains exactly the same */}
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-[#1C335C] mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[#008BD0]" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
                  placeholder="Enter username"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profileData.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <p className="text-gray-900 font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#008BD0]" />
                {profileData.email}
              </p>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={tempData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
                  placeholder="+91 98765 43210"
                />
              ) : (
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#008BD0]" />
                  {profileData.phone || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
                  placeholder="City, State"
                />
              ) : (
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#008BD0]" />
                  {profileData.location || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Preferences & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Preferences */}
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-lg font-semibold text-[#1C335C] mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#008BD0]" />
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Push Notifications</p>
                  <p className="text-sm text-gray-600">Receive alerts on your device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEditing ? tempData.notifications : profileData.notifications}
                    onChange={(e) => isEditing && handleInputChange('notifications', e.target.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#008BD0]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008BD0]"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={isEditing ? tempData.language : profileData.language}
                  onChange={(e) => isEditing && handleInputChange('language', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent disabled:bg-gray-100"
                >
                  <option>English</option>
                  <option>हिन्दी (Hindi)</option>
                  <option>ਪੰਜਾਬੀ (Punjabi)</option>
                  <option>தமிழ் (Tamil)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-[#1C335C] mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#008BD0]" />
              Security
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEditing ? tempData.twoFactor : profileData.twoFactor}
                    onChange={(e) => isEditing && handleInputChange('twoFactor', e.target.checked)}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#008BD0]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008BD0]"></div>
                </label>
              </div>
              <button 
                onClick={() => navigate('/change-password')}
                className="text-sm text-[#008BD0] hover:text-[#006ea8] font-medium transition"
              >
                Change Password →
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons (Mobile) */}
        {isEditing && (
          <div className="md:hidden flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#008BD0] text-white py-3 rounded-lg hover:bg-[#006ea8] transition font-semibold disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
