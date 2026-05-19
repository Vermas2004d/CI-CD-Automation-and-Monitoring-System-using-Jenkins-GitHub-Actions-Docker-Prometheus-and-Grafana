import { Mail, CheckCircle, ArrowRight, Loader2, XCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";
import LoginBg from "../assets/login_bg.png";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!verificationToken) {
        setStatus("error");
        setMessage("Verification token is missing. Please check your email link.");
        return;
      }

      try {
        const url = `${import.meta.env.VITE_API_URL}/verify-email/${verificationToken}`;
        console.log("🔍 Calling URL:", url); // Debug
        
        const response = await axios.get(url);
        
        console.log("✅ Response Status:", response.status); // Debug
        console.log("✅ Response Data:", response.data); // Debug
        
        if (response.status === 200) {
          setStatus("success");
          setMessage("Email verified successfully! Redirecting to login...");
          
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          // setStatus("error");
          // setMessage(response.data?.message || "Verification failed. Please try again.");
        }
      } catch (err) {
        console.error("❌ Error Object:", err); // Debug
        console.error("❌ Error Response:", err.response); // Debug
        console.error("❌ Error Status:", err.response?.status); // Debug
        console.error("❌ Error Data:", err.response?.data); // Debug
      
        // const errorMessage = err.response?.data?.message || "Verification failed. The link may be invalid or expired.";
        // setMessage(errorMessage);
      }
    };

    verifyUserEmail();
  }, [verificationToken, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 z-0">
        <img
          src={LoginBg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-fade-in-up">
        <div className="bg-gradient-to-br from-[#0f172a] via-[#1d4ed8] to-[#06b6d4] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg overflow-hidden mb-4">
              <img
                src={Logo}
                alt="Logo"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 shadow-lg">
              {status === "verifying" && <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />}
              {status === "success" && <CheckCircle className="w-10 h-10 text-green-600" />}
              {status === "error" && <XCircle className="w-10 h-10 text-red-600" />}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {status === "verifying" && "Verifying Email"}
              {status === "success" && "Email Verified!"}
              {status === "error" && "Verification Failed"}
            </h1>
          </div>
        </div>

        <div className="p-8">
          <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
            status === "verifying" ? "bg-blue-50 border border-blue-200" :
            status === "success" ? "bg-green-50 border border-green-200" :
            "bg-red-50 border border-red-200"
          }`}>
            {status === "verifying" && <Loader2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 animate-spin" />}
            {status === "success" && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />}
            {status === "error" && <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />}
            <p className={`text-sm ${
              status === "verifying" ? "text-blue-700" :
              status === "success" ? "text-green-700" :
              "text-red-700"
            }`}>
              {message}
            </p>
          </div>

          {status === "success" && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                You will be redirected to the login page in 3 seconds...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full animate-[progress_3s_ease-in-out]"></div>
              </div>
            </div>
          )}

          {status === "success" && (
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#06b6d4] text-white py-3.5 rounded-xl font-bold shadow-lg transform flex items-center justify-center gap-2 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"
            >
              Go to Login Now <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <button
                onClick={() => navigate('/signup')}
                className="w-full bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#06b6d4] text-white py-3.5 rounded-xl font-bold shadow-lg transform flex items-center justify-center gap-2 transition-all hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                Register Again <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold transition-all"
              >
                Back to Login
              </button>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 mt-6">
            Having trouble? Contact support at{" "}
            <a href="mailto:support@railsync.com" className="text-blue-600 hover:underline">
              support@railsync.com
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default VerifyEmailPage;