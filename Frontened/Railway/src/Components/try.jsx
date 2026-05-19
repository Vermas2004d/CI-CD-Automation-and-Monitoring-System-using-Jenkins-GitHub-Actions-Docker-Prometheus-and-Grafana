// import { useState } from 'react';
// import { Train, Search, MapPin, Calendar, Clock, Menu, X, User, Zap } from 'lucide-react';

// const QuickTools = () => {
//   const [pnr, setPnr] = useState('');
//   const [trainNumber, setTrainNumber] = useState('');
//   const [station, setStation] = useState('');

//   const tools = [
//     {
//       title: 'Check PNR Status',
//       icon: Search,
//       placeholder: 'Enter 10-digit PNR number',
//       value: pnr,
//       onChange: setPnr,
//       buttonText: 'Check Status',
//       gradient: 'from-blue-500 to-cyan-500',
//       hoverGradient: 'hover:from-blue-600 hover:to-cyan-600',
//       iconColor: 'text-blue-600',
//       shadow: 'shadow-blue-500/20'
//     },
//     {
//       title: 'Live Train Status',
//       icon: Clock,
//       placeholder: 'Enter 5-digit Train Number',
//       value: trainNumber,
//       onChange: setTrainNumber,
//       buttonText: 'Track Live',
//       gradient: 'from-emerald-500 to-teal-500',
//       hoverGradient: 'hover:from-emerald-600 hover:to-teal-600',
//       iconColor: 'text-emerald-600',
//       shadow: 'shadow-emerald-500/20'
//     },
//     {
//       title: 'Station Live Board',
//       icon: MapPin,
//       placeholder: 'Enter Station Code or Name',
//       value: station,
//       onChange: setStation,
//       buttonText: 'View Board',
//       gradient: 'from-purple-500 to-indigo-500',
//       hoverGradient: 'hover:from-purple-600 hover:to-indigo-600',
//       iconColor: 'text-purple-600',
//       shadow: 'shadow-purple-500/20'
//     }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//       {/* Section Header with animation */}
//       <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-700">
//         <div className="flex justify-center mb-4">
//           <div className="p-3 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg">
//             <Zap className="w-8 h-8 text-white" />
//           </div>
//         </div>
//         <h3 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//           Quick Railway Tools
//         </h3>
//         <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//           Get instant PNR status, live train running, and station boards — all in one place.
//         </p>
//       </div>

//       {/* Tools Grid */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {tools.map((tool, index) => (
//           <div
//             key={index}
//             className={`group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 animate-in fade-in slide-in-from-bottom`}
//             style={{ animationDelay: `${index * 150}ms` }}
//           >
//             {/* Gradient Orb Background */}
//             <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${tool.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-700`} />
            
//             <div className="relative p-8">
//               {/* Icon & Title */}
//               <div className="flex items-center mb-6">
//                 <div className={`p-4 rounded-2xl bg-gradient-to-br ${tool.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
//                   <tool.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <h4 className="ml-4 text-2xl font-bold text-gray-800">{tool.title}</h4>
//               </div>

//               {/* Input Field */}
//               <div className="relative mb-6">
//                 <input
//                   type="text"
//                   value={tool.value}
//                   onChange={(e) => tool.onChange(e.target.value)}
//                   placeholder={tool.placeholder}
//                   className="w-full px-5 py-4 text-lg bg-gray-50/70 backdrop-blur border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/50 focus:border-transparent placeholder-gray-500 transition-all duration-300 group-hover:bg-white/70"
//                 />
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-transparent to-white/10 pointer-events-none" />
//               </div>

//               {/* Button */}
//               <button className={`w-full relative overflow-hidden bg-gradient-to-r ${tool.gradient} ${tool.hoverGradient} text-white font-bold py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95`}>
//                 <span className="relative z-10 flex items-center justify-center gap-2">
//                   {tool.buttonText}
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </span>
//                 <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//               </button>
//             </div>

//             {/* Bottom glow effect */}
//             <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${tool.gradient} blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
//           </div>
//         ))}
//       </div>

//       {/* Optional: Add a subtle background pattern */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
//       </div>
//     </div>
//   );
// };

// export default QuickTools;


///////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Logo from '../assets/Logo.png';
// import { Menu, X, User, AlertCircle } from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your actual auth state
//   const navigate = useNavigate();

//   // Handle navigation with login check
//   const handleNavClick = (e, path) => {
//     if (!isLoggedIn && path !== '/login') {
//       e.preventDefault();
//       setShowLoginPopup(true);
//       setIsMenuOpen(false);
//       setTimeout(() => setShowLoginPopup(false), 3000);
//     } else {
//       setIsMenuOpen(false);
//     }
//   };

//   // Handle login (replace with your actual login logic)
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setShowLoginPopup(false);
//     navigate('/');
//   };

//   // Reusable NavLink styling logic
//   const navLinkClasses = ({ isActive }) =>
//     `transition-colors duration-200 hover:text-[#008BD0] ${
//       isActive ? "text-[#008BD0] font-semibold" : ""
//     }`;

//   return (
//     <>
//       <nav className="bg-white text-blue-900 shadow-lg sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               <img src={Logo} alt="RailSync Logo" className="h-10 w-auto object-contain" />
//               <span className="font-bold text-xl">
//                 <span className="text-[#1C335C]">Rail</span>
//                 <span className="text-[#008BD0]">Sync</span>
//               </span>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-8">
//               <NavLink 
//                 to="/" 
//                 className={navLinkClasses} 
//                 onClick={(e) => handleNavClick(e, '/')}
//                 end
//               >
//                 Home
//               </NavLink>
//               <NavLink 
//                 to="/book-tickets" 
//                 className={navLinkClasses}
//                 onClick={(e) => handleNavClick(e, '/book-tickets')}
//               >
//                 Book Tickets
//               </NavLink>
//               <NavLink 
//                 to="/train-status" 
//                 className={navLinkClasses}
//                 onClick={(e) => handleNavClick(e, '/train-status')}
//               >
//                 Train Status
//               </NavLink>
//               <NavLink 
//                 to="/help" 
//                 className={navLinkClasses}
//                 onClick={(e) => handleNavClick(e, '/help')}
//               >
//                 Help
//               </NavLink>

//               {!isLoggedIn ? (
//                 <NavLink
//                   to="/login"
//                   className="flex items-center space-x-1 bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleLogin(); // Replace with navigate('/login') for real app
//                   }}
//                 >
//                   <User className="w-4 h-4" />
//                   <span>Login</span>
//                 </NavLink>
//               ) : (
//                 <button
//                   onClick={() => setIsLoggedIn(false)}
//                   className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//                 >
//                   <User className="w-4 h-4" />
//                   <span>Logout</span>
//                 </button>
//               )}
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="md:hidden pb-4 space-y-2 border-t pt-4 mt-2">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
//                 }
//                 onClick={(e) => handleNavClick(e, '/')}
//                 end
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/book-tickets"
//                 className={({ isActive }) =>
//                   `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
//                 }
//                 onClick={(e) => handleNavClick(e, '/book-tickets')}
//               >
//                 Book Tickets
//               </NavLink>
//               <NavLink
//                 to="/train-status"
//                 className={({ isActive }) =>
//                   `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
//                 }
//                 onClick={(e) => handleNavClick(e, '/train-status')}
//               >
//                 Train Status
//               </NavLink>
//               <NavLink
//                 to="/help"
//                 className={({ isActive }) =>
//                   `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
//                 }
//                 onClick={(e) => handleNavClick(e, '/help')}
//               >
//                 Help
//               </NavLink>

//               {!isLoggedIn ? (
//                 <button
//                   onClick={handleLogin}
//                   className="w-full flex items-center justify-center space-x-1 bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition mt-3"
//                 >
//                   <User className="w-4 h-4" />
//                   <span>Login</span>
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsLoggedIn(false)}
//                   className="w-full flex items-center justify-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mt-3"
//                 >
//                   <User className="w-4 h-4" />
//                   <span>Logout</span>
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Login Popup */}
//       {showLoginPopup && (
//         <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
//           <div className="bg-white border-2 border-[#008BD0] rounded-lg shadow-2xl p-6 max-w-sm mx-4">
//             <div className="flex items-start space-x-3">
//               <AlertCircle className="w-6 h-6 text-[#008BD0] flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-bold text-lg text-[#1C335C] mb-2">
//                   Login Required
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Please login to access this feature
//                 </p>
//                 <button
//                   onClick={handleLogin}
//                   className="w-full bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition font-medium"
//                 >
//                   Login Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;