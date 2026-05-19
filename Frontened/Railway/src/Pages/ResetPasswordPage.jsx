import { Lock, Eye, EyeOff, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import LoginBg from "../assets/login_bg.png";

const ResetPasswordPage = () => {
  const { resetToken } = useParams(); // Extracts the token from the URL path
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      // Matches your route: /reset-password/:resetToken
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password/${resetToken}`,
        { newPassword }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        // Automatically redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      // Handles your ApiError (489 "Token is invalid or expired")
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={LoginBg} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#008BD0] rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#1C335C]">Set New Password</h2>
          <p className="text-gray-500 text-sm mt-2">
            Please enter a strong password to secure your account.
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex flex-col items-center gap-3">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-green-800 font-semibold">Password Reset Successfully!</p>
              <p className="text-green-600 text-sm">Redirecting you to login page...</p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 text-[#008BD0] font-bold hover:underline"
            >
              Click here if not redirected
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008BD0] transition-all"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#008BD0] transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#008BD0] hover:bg-[#0077b5] text-white py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Update Password <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;