import React from 'react'
import { Train, Facebook, Twitter, Instagram, Linkedin, ChevronRight, Mail, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoyalPage = location.pathname === '/royal-journeys' || location.pathname.startsWith('/royal-booking');

  return (
    <footer className={`${isRoyalPage ? 'bg-[#1e293b] border-t border-[#fbbf24]/20' : 'bg-[#1C335C]'} text-white pt-20 pb-10 px-6`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 ${isRoyalPage ? 'bg-[#fbbf24]/20 border border-[#fbbf24]/50' : 'bg-white'} rounded-lg flex items-center justify-center`}>
                  <Train className={`w-6 h-6 ${isRoyalPage ? 'text-[#fbbf24]' : 'text-[#1C335C]'}`} />
                </div>
                <span className={`text-2xl font-bold ${isRoyalPage ? 'text-[#fbbf24] font-serif' : ''}`}>RailSync</span>
              </div>
              <p className={`${isRoyalPage ? 'text-gray-300' : 'text-blue-200'} mb-8 leading-relaxed`}>Your trusted companion for seamless railway journeys across India. Experience the future of travel.</p>
              <div className="flex gap-3">
                <a href="https://facebook.com/railsync" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${isRoyalPage ? 'bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-blue-800/50 hover:bg-[#008BD0] text-white'} rounded-lg flex items-center justify-center transition-colors`}>
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/railsync" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${isRoyalPage ? 'bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-blue-800/50 hover:bg-[#008BD0] text-white'} rounded-lg flex items-center justify-center transition-colors`}>
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/railsync" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${isRoyalPage ? 'bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-blue-800/50 hover:bg-[#008BD0] text-white'} rounded-lg flex items-center justify-center transition-colors`}>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/company/railsync" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 ${isRoyalPage ? 'bg-[#fbbf24]/10 hover:bg-[#fbbf24]/20 text-[#fbbf24]' : 'bg-blue-800/50 hover:bg-[#008BD0] text-white'} rounded-lg flex items-center justify-center transition-colors`}>
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className={`font-bold text-lg mb-6 ${isRoyalPage ? 'text-[#fbbf24] font-serif' : ''}`}>Quick Links</h4>
              <ul className={`space-y-4 ${isRoyalPage ? 'text-gray-400' : 'text-blue-200'}`}>
                <li><a href="#" onClick={() => navigate('/dashboard')} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} />Dashboard </a></li>
                <li><a href="#" onClick={() => navigate('/train-status')} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} />Live Train </a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard', { state: { section: 'pnr-status' } }); }} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} /> PNR Status</a></li>
                <li><a href="#" onClick={() => navigate('/tours')} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} /> Tour Packages</a></li>
                <li><a href="#" onClick={() => navigate('/aboutus')} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} /> About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-bold text-lg mb-6 ${isRoyalPage ? 'text-[#fbbf24] font-serif' : ''}`}>Support</h4>
              <ul className={`space-y-4 ${isRoyalPage ? 'text-gray-400' : 'text-blue-200'}`}>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard', { state: { section: 'help' } }); }} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} />RailBot</a></li>
                <li><a href="#" className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} /> Help Center</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard', { state: { section: 'help' } }); }} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} /> Terms of Service</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard', { state: { section: 'help' } }); }} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} /> Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard', { state: { section: 'help' } }); }} className={`hover:text-white transition-colors flex items-center gap-2 cursor-pointer ${isRoyalPage ? 'hover:text-[#fbbf24]' : ''}`}><ChevronRight className={`w-4 h-4 ${isRoyalPage ? 'text-[#fbbf24]' : ''}`} /> Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-bold text-lg mb-6 ${isRoyalPage ? 'text-[#fbbf24] font-serif' : ''}`}>Contact</h4>
              <ul className={`space-y-4 ${isRoyalPage ? 'text-gray-400' : 'text-blue-200'}`}>
                <li className="flex items-start gap-3">
                  <Mail className={`w-5 h-5 ${isRoyalPage ? 'text-[#fbbf24]' : 'text-[#008BD0]'} mt-1`} />
                  <span>support@railsync.com<br/><span className="text-sm opacity-70">Reply within 2 hours</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className={`w-5 h-5 ${isRoyalPage ? 'text-[#fbbf24]' : 'text-[#008BD0]'} mt-1`} />
                  <span>+91 1800-123-4567<br/><span className="text-sm opacity-70">Mon-Sat, 9AM-6PM</span></span>
                </li>
              </ul>
            </div>
          </div>

          <div className={`border-t ${isRoyalPage ? 'border-white/10 text-gray-500' : 'border-blue-800 text-blue-300'} pt-8 text-center`}>
            <p>© 2025 RailSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer;