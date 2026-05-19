import { X, Train, Lock, Mail, Eye, EyeOff, ArrowRight, KeyRound, CheckCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import LoginBg from "../assets/login_bg.png";
import { useNavigate, useLocation } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";
import axios from "axios";

const LoginPage = ({ isOpen = true, onClose = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Check if user previously selected "Remember Me"
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    if (remembered === "true") {
      setRememberMe(true);
      // Optionally pre-fill email if stored
      const savedEmail = localStorage.getItem("savedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const newErrors = {};
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { 
          email, 
          password,
          rememberMe // Send to backend
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if(response.data.success){
        const {user} = response.data.data;
        
        // Store user data based on rememberMe
        if (rememberMe) {
          // Store in localStorage (persists after closing browser)
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("savedEmail", email); // Save email for convenience
        } else {
          // Store in sessionStorage (cleared when browser closes)
          sessionStorage.setItem("user", JSON.stringify(user));
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("savedEmail");
        }

        if(!user.isEmailVerified){
          navigate("/check-email" , {state: {email: user.email}});
        }
        else{
          navigate("/dashboard");
        }

        onClose();
      }

    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError("");

    if (!forgotEmail || !forgotEmail.includes("@")) {
      setForgotError("Please enter a valid email address.");
      return;
    }

    setForgotLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        { email: forgotEmail }
      );

      if (response.status === 200) {
        setForgotSuccess(true);
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send reset email. Please try again.";
      setForgotError(message);
    } finally {
      setForgotLoading(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotEmail("");
    setForgotError("");
    setForgotSuccess(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Login form"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={LoginBg}
            alt="Luxury Train Station"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
        </div>

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20 animate-fade-in-up">
          {/* Left Side - Branding */}
          <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-[#0f172a]/90 via-[#1d4ed8]/85 to-[#06b6d4]/80 p-12 flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg overflow-hidden">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">
                  Rail<span className="text-[#008BD0]">Sync</span>
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                Experience the Future of <br />{" "}
                <span className="text-blue-200">Train Travel</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Seamless booking, real-time tracking, and premium service. Your
                journey begins with a single click.
              </p>
            </div>

            <div className="relative z-10 flex gap-4 text-white/80 text-sm font-medium">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400"></div> 24/7
                Support
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div> Secure
                Payment
              </span>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-2xl p-8 md:p-12 relative">
            <button
              onClick={() => {
                if(location.pathname === '/login') {
                  navigate('/');
                } else {
                  onClose();
                }
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500">
                Please enter your details to sign in.
              </p>
            </div>

            {serverError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail
                      className={`w-5 h-5 transition-colors ${
                        errors.email
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-500"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-100 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    }`}
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      className={`w-5 h-5 transition-colors ${
                        errors.password
                          ? "text-red-400"
                          : "text-gray-400 group-focus-within:text-blue-500"
                      }`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-100 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors cursor-pointer"
                  />
                  <span className="ml-2 text-gray-500 group-hover:text-gray-700 transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[#008BD0] hover:text-[#006ca1] font-semibold hover:underline transition-all"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-linear-to-r from-[#0f172a]/90 via-[#1d4ed8]/85 to-[#06b6d4]/80 text-white py-3.5 rounded-xl font-bold shadow-lg transform flex items-center justify-center gap-2 transition-all
                hover:from-[#0f172a] hover:via-[#1d4ed8] hover:to-[#06b6d4] hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white
                disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 py-1 rounded-full bg-linear-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-xl text-[#1C335C] font-semibold border border-blue-100 shadow-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  (window.location.href =
                    "http://localhost:8000/api/v1/auth/google")
                }
                className="group relative flex items-center justify-center px-4 py-3 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-[#4285F4]/10 via-[#34A853]/10 to-[#EA4335]/10 transition-opacity"></div>
                <svg
                  className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-semibold text-gray-700">
                  Google
                </span>
              </button>
              <button className="group flex items-center justify-center px-4 py-3 rounded-xl shadow-sm bg-[#1877F2] hover:bg-[#0f5ec2] text-white font-medium transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-linear-to-r from-white via-transparent to-white transition-opacity"></div>
                <svg
                  className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-semibold">Facebook</span>
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/SignUp")}
                className="text-[#008BD0] hover:text-[#006ca1] font-bold hover:underline transition-all cursor-pointer"
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeForgotModal}></div>
          
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
            <button
              onClick={closeForgotModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {!forgotSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#008BD0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-8 h-8 text-[#008BD0]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1C335C] mb-2">Forgot Password?</h3>
                  <p className="text-gray-500 text-sm">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                {forgotError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {forgotError}
                  </div>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:border-[#008BD0] transition-all"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full bg-[#008BD0] hover:bg-[#0077b5] text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {forgotLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>Send Reset Link <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#1C335C]">Check Your Email</h3>
                <p className="text-gray-600 text-sm">
                  We've sent a password reset link to <strong>{forgotEmail}</strong>
                </p>
                <p className="text-gray-500 text-xs">
                  Didn't receive it? Check your spam folder or try again.
                </p>
                <button
                  onClick={closeForgotModal}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;