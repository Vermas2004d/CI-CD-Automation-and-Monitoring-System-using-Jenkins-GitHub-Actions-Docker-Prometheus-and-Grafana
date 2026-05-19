import { useState } from "react";
import Logo from '../../assets/Logo.png';
import { Menu, X, User, LogIn } from 'lucide-react';
import LoginPage from "../LoginPage";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Open login modal
  const openLogin = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsLoginOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  // Close login modal
  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <nav className="bg-white text-blue-900 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center h-10 w-auto">
                <img src={Logo} alt="RailMate Logo" className="h-full w-auto object-contain" />
              </div>
              <span className="font-bold text-xl ml-2">
                <span className="text-[#1C335C]">Rail</span>
                <span className="text-[#008BD0]">Sync</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" onClick={openLogin} className="hover:text-[#008BD0] transition cursor-pointer"></a>
              <a href="#" onClick={openLogin} className="hover:text-[#008BD0] transition cursor-pointer">Book Tickets</a>
              <a href="#" onClick={openLogin} className="hover:text-[#008BD0] transition cursor-pointer">Train Status</a>
              <a href="#" onClick={openLogin} className="hover:text-[#008BD0] transition cursor-pointer">Tours</a>
              <a href="#" onClick={openLogin} className="hover:text-[#008BD0] transition cursor-pointer">Help</a>

              <button
                onClick={openLogin}
                className="flex items-center space-x-1 bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition"
                aria-label="Open login form"
              >
                <User className="w-4 h-4" aria-hidden="true" />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#" onClick={openLogin} className="block py-2 hover:text-[#008BD0] transition cursor-pointer">Book Tickets</a>
              <a href="#" onClick={openLogin} className="block py-2 hover:text-[#008BD0] transition cursor-pointer">PNR Status</a>
              <a href="#" onClick={openLogin} className="block py-2 hover:text-[#008BD0] transition cursor-pointer">Tours</a>
              <a href="#" onClick={openLogin} className="block py-2 hover:text-[#008BD0] transition cursor-pointer">Help</a>

              <button
                onClick={openLogin}
                className="w-full flex items-center justify-center space-x-1 bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition mt-2"
                aria-label="Open login form"
              >
                <User className="w-4 h-4" aria-hidden="true" />
                <span>Login</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      {/* Login Modal */}
      <LoginPage isOpen={isLoginOpen} onClose={closeLogin} />
    </>
  );
};

export default Navbar;