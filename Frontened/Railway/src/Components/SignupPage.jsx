import {
  X,
  Mail,
  Lock,
  Phone,
  Calendar,
  Shield,
  ChevronDown,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import LoginBg from "../assets/login_bg.png";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = ({ isOpen = true, onClose = () => {} }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); //new loading false
  const [error, setError] = useState(""); //new error message state

  const [formData, setFormData] = useState({
    username: "", //added:  backend needs ausername
    email: "",
    phone: "",
    govIdType: "Aadhaar Card",
    govIdNumber: "",
    dob: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "What is your mother's maiden name?",
    securityAnswer: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    // recheck the logic something in issue with this
    if (onClose) {
      navigate("/");
    } else {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); //clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Validate passwords match
    // 1. Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    // Remove confirmPassword before sending to backend
    // const { confirmPassword, ...dataToSend } = formData; // destructuring to exclude confirmPassword
    // console.log(dataToSend);

    //2. Prepare data for your backend structure
    //backend expects: email, username, password
    const dataToSend = {
      email: formData.email,
      username: formData.username || formData.email.split("@")[0], //fallback is username is empty
      password: formData.password,
      phone: formData.phone,
      dob: formData.dob, //format: yyyy-mm-dd
      govIdType: formData.govIdType,
      govIdNumber: formData.govIdNumber,
      securityQuestion: formData.securityQuestion,
      securityAnswer: formData.securityAnswer,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        dataToSend
      );
      if (response.status == 201 || response.data.success) {
        toast.success(
          "Register Successfull! Please check your email to verify your account."
        );
        // In your Register logic:
        // localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/check-email", {
          state: {
            email: `${formData.email}`,
            message: "Registration successful!",
          },
        });
      }
    } catch (err) {
      //access the specific ApiError message from your backend
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please Fill The correct details.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }

    // // Send to backend
    // try {
    //   const response = await fetch('your-api-endpoint', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(dataToSend)
    //   });
    //   // handle response...
    // } catch (error) {
    //   // handle error...
    // }
  };

  const govIdOptions = ["Aadhaar Card", "Driving License", "Voter ID"];
  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is your favorite movie?",
    "In which city were you born?",
    "What is the name of your favorite teacher?",
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign up form"
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
      <div className="relative z-10 w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20 animate-fade-in-up max-h-[95vh]">
        {/* Left Side - Branding (Hidden on mobile) */}
        <div className="hidden md:flex md:w-2/5 bg-linear-to-br from-[#0f172a]/90 via-[#1d4ed8]/85 to-[#06b6d4]/80 p-12 flex-col justify-between relative overflow-hidden">
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
              Start Your Journey <br />{" "}
              <span className="text-blue-200">With RailSync</span>
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Create your account and unlock seamless train bookings, exclusive
              deals, and personalized travel experiences.
            </p>
          </div>

          <div className="relative z-10 flex gap-4 text-white/80 text-sm font-medium">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400"></div> Quick
              Setup
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div> Secure &
              Safe
            </span>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full md:w-3/5 bg-white/80 backdrop-blur-2xl relative flex flex-col max-h-[95vh]">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="px-8 md:px-12 pt-8 pb-4 shrink-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Please fill in your details to sign up.
            </p>
          </div>

          {/* SCROLLABLE FORM BODY */}
          <div className="flex-1 overflow-y-auto px-8 md:px-12 pb-8">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    placeholder="Enter full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    placeholder="+91 1234567890"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    placeholder="Create password"
                    required
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
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* ID Type & Number */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 ml-1">
                    ID Type
                  </label>
                  <div className="relative">
                    <select
                      name="govIdType"
                      value={formData.govIdType}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200 appearance-none cursor-pointer"
                    >
                      {govIdOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 ml-1">
                    ID Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Shield className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="govIdNumber"
                      value={formData.govIdNumber}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                      placeholder="Enter ID number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* DOB */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Date of Birth
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    required
                  />
                </div>
              </div>

              {/* Security Question */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Security Question
                </label>
                <div className="relative">
                  <select
                    name="securityQuestion"
                    value={formData.securityQuestion}
                    onChange={handleChange}
                    className="w-full px-4 pr-10 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200 appearance-none cursor-pointer"
                  >
                    {securityQuestions.map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Security Answer */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Security Answer
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="securityAnswer"
                    value={formData.securityAnswer}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white hover:border-gray-200"
                    placeholder="Your answer"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-[#0f172a]/90 via-[#1d4ed8]/85 to-[#06b6d4]/80 text-white py-3.5 rounded-xl font-bold shadow-lg transform flex items-center justify-center gap-2 transition-all
                hover:from-[#0f172a] hover:via-[#1d4ed8] hover:to-[#06b6d4] hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0
                focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white
                disabled:opacity-70 disabled:cursor-not-allowed mt-6"
              >
                {/* Create Account */}
                {loading ? "Creating Account..." : "Create Account"}
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
                >
                  Sign in now
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
