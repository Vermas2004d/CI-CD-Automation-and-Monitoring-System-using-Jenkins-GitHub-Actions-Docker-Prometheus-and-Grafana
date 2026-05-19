import { Mail, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import LoginBg from "../assets/login_bg.png";

const CheckEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const message = location.state?.message || "Please verify your email address";
  
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  const handleResendEmail = async () => {
    if (!email) {
      setResendError("Email address not found. Please register again.");
      return;
    }

    setResending(true);
    setResendError("");
    setResendMessage("");

    try {
      // UPDATED: Sending { email } in the body and removed the headers object
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/resend-email-verification`,
        { email }
      );
      
      if (response.status === 200 || response.data.success) {
        setResendMessage("Verification email sent successfully! Please check your inbox.");
      }
      else if(response.status === 409){
        setResendMessage("User is already verified, Go for login!");
      }
    } catch (err) {
      // Improved error handling to capture backend ApiError messages
      const errorMessage = err.response?.data?.message || "Failed to resend email. Please try again.";
      setResendError(errorMessage);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={LoginBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        {/* Header with Logo */}
        <div className="bg-gradient-to-br from-[#1C335C] to-[#008BD0] p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg overflow-hidden mb-3">
              <img
                src={Logo}
                alt="Logo"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-3 shadow-lg">
              <Mail className="w-8 h-8 text-[#008BD0]" />
            </div>
            <h1 className="text-xl font-bold text-white">Check Your Email</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Success Message */}
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-green-700 text-sm leading-tight">{message}</p>
          </div>

          {/* Instructions */}
          <div className="space-y-3 mb-5">
            <p className="text-gray-700 text-center text-sm">
              We've sent a verification link to:
            </p>
            <p className="text-[#008BD0] font-semibold text-center break-all bg-[#008BD0]/10 p-2.5 rounded-lg text-sm">
              {email}
            </p>
            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
              <p className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-[#008BD0] font-bold">1.</span>
                Check your inbox for the verification email
              </p>
              <p className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-[#008BD0] font-bold">2.</span>
                Click the verification link in the email
              </p>
              <p className="text-xs text-gray-600 flex items-start gap-2">
                <span className="text-[#008BD0] font-bold">3.</span>
                You'll be redirected and can sign in
              </p>
            </div>
          </div>

          {/* Resend Success/Error Messages */}
          {resendMessage && (
            <div className="mb-3 p-2.5 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              {resendMessage}
            </div>
          )}

          {resendError && (
            <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
              {resendError}
            </div>
          )}

          {/* Resend Email Button */}
          <div className="text-center mb-5">
            <p className="text-xs text-gray-600 mb-2">Didn't receive the email?</p>
            <button
              onClick={handleResendEmail}
              disabled={resending}
              className="inline-flex items-center gap-2 text-[#008BD0] hover:text-[#006ca1] font-semibold text-xs hover:underline transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              {resending ? "Sending..." : "Resend verification email"}
            </button>
            <p className="text-[10px] text-gray-500 mt-1">
              Check your spam folder if you don't see it
            </p>
          </div>

          {/* Go to Login Button */}
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-[#1C335C] to-[#008BD0] text-white py-3 rounded-xl font-bold shadow-lg transform flex items-center justify-center gap-2 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 text-sm"
          >
            Go to Login <ArrowRight className="w-4 h-4" />
          </button>

          {/* Help Text */}
          <p className="text-center text-[10px] text-gray-500 mt-4">
            Having trouble? Contact support at{" "}
            <a href="mailto:support@railsync.com" className="text-[#008BD0] hover:underline">
              support@railsync.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckEmailPage;