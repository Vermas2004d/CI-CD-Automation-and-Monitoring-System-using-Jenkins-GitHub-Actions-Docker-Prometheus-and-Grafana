import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Shield, Phone, Calendar, Save, AlertCircle } from "lucide-react";
import Logo from "../assets/Logo.png";

const DocPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    dob: "",
    govIdType: "Aadhaar Card",
    govIdNumber: "",
    securityQuestion: "",
    securityAnswer: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get(
             `${import.meta.env.VITE_API_URL}/current-user`,
             { withCredentials: true }
          );
          if(response.data.success){
             localStorage.setItem("user", JSON.stringify(response.data.data));
          }
        } catch (err) {
           navigate("/login");
        }
      }
      checkAuth();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-profile`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const securityQuestions = [
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is your favorite movie?",
    "In which city were you born?",
    "What is the name of your favorite teacher?",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <img src={Logo} alt="Logo" className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-white/20 shadow-lg" />
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-blue-200">Just a few more details to secure your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-500" /> Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              {/* DOB */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" /> Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Gov ID Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" /> ID Type
                </label>
                <select
                  name="govIdType"
                  value={formData.govIdType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Voter ID">Voter ID</option>
                </select>
              </div>

               {/* Gov ID Number */}
               <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" /> ID Number
                </label>
                <input
                  type="text"
                  name="govIdNumber"
                  value={formData.govIdNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter ID Number"
                  required
                />
              </div>

              {/* Security Question */}
               <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" /> Security Question
                </label>
                <select
                  name="securityQuestion"
                  value={formData.securityQuestion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="" disabled>Select a security question</option>
                  {securityQuestions.map((q, index) => (
                    <option key={index} value={q}>{q}</option>
                  ))}
                </select>
              </div>

              {/* Security Answer */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" /> Security Answer
                </label>
                <input
                  type="text"
                  name="securityAnswer"
                  value={formData.securityAnswer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Your answer"
                  required
                />
              </div>

            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-[#0f172a] to-[#1e293b] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:translate-y-[-2px] hover:shadow-blue-900/20 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save & Continue
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocPage;
