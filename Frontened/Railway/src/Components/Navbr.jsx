import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from '../assets/Logo.png';
import { Menu, X, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reusable NavLink styling logic
  const navLinkClasses = ({ isActive }) =>
    `transition-colors duration-200 hover:text-[#008BD0] ${
      isActive ? "text-[#008BD0] font-semibold" : ""
    }`;

  return (
    <nav className="bg-white text-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={Logo} alt="RailSync Logo" className="h-10 w-auto object-contain" />
            <span className="font-bold text-xl">
              <span className="text-[#1C335C]">Rail</span>
              <span className="text-[#008BD0]">Sync</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses} end>
              Home
            </NavLink>
            <NavLink to="/book-tickets" className={navLinkClasses}>
              Book Tickets
            </NavLink>
            <NavLink to="/train-status" className={navLinkClasses}>
              Train Status
            </NavLink>
            <NavLink to="/help" className={navLinkClasses}>
              Help
            </NavLink>

            <NavLink
              to="/login"
              className="flex items-center space-x-1 bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t pt-4 mt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
              }
              end
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/book-tickets"
              className={({ isActive }) =>
                `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Book Tickets
            </NavLink>
            <NavLink
              to="/train-status"
              className={({ isActive }) =>
                `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Train Status
            </NavLink>
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `block py-2 text-lg ${isActive ? "text-[#008BD0] font-semibold" : "hover:text-[#008BD0]"}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </NavLink>

            <NavLink
              to="/login"
              className="w-full flex items-center justify-center space-x-1 bg-[#008BD0] text-white px-4 py-2 rounded-lg hover:bg-[#006ea8] transition mt-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;