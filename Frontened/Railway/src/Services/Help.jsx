import { useState } from 'react';
import { 
  HelpCircle, 
  User, 
  CreditCard, 
  Phone, 
  MessageCircle, 
  Mail, 
  Clock, 
  ChevronRight,
  X
} from 'lucide-react';
import HelpChatbot from './HelpChatbot';

const Help = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const faqs = [
    { q: 'How do I reset my password?', a: 'Go to login page → Click "Forgot Password" → Enter registered email → Check inbox for reset link.' },
    { q: 'What are the operating hours?', a: 'Our services are available 24/7. Support team responds within 5 minutes during peak hours.' },
    { q: 'How can I track my refund?', a: 'Visit "My Account" → "Transactions" → Click on the order → View refund status.' },
    { q: 'Is my data secure?', a: 'Yes, we use bank-grade 256-bit SSL encryption and comply with GDPR & CCPA standards.' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setSelectedSection(null);
    }, 3000);
    console.log(formData);
  };

  const renderContent = () => {
    if (!selectedSection) return null;

    switch (selectedSection) {
      case 'FAQs':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1C335C] mb-4">Frequently Asked Questions</h3>
            {faqs.map((faq, idx) => (
              <details key={idx} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#008BD0] transition">
                <summary className="font-semibold text-[#1C335C] flex justify-between items-center">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-[#008BD0] transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-gray-700 pl-6">{faq.a}</p>
              </details>
            ))}
          </div>
        );

      case 'Contact Support':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#1C335C] mb-4">Contact Our Support Team</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg flex items-center space-x-3">
                <Phone className="w-6 h-6 text-[#008BD0]" />
                <div>
                  <p className="font-semibold text-[#1C335C]">Call Us</p>
                  <p className="text-sm text-gray-600">139 (Toll-Free)</p>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg flex items-center space-x-3">
                <Mail className="w-6 h-6 text-[#008BD0]" />
                <div>
                  <p className="font-semibold text-[#1C335C]">Email</p>
                  <p className="text-sm text-gray-600">support@company.in</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800">
                <span className="font-semibold">Average Response Time:</span> 2 minutes (Chat) | 1 hour (Email)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#008BD0] focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#008BD0] focus:outline-none"
                required
              />
              <textarea
                placeholder="Describe your issue..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#008BD0] focus:outline-none resize-none"
                required
              />
              <button type="submit" className="bg-[#008BD0] text-white px-6 py-2 rounded-lg hover:bg-[#006ea8] transition font-semibold">
                Send Message
              </button>
              {formSubmitted && (
                <p className="text-green-600 text-sm font-semibold">Message sent! We'll get back to you soon.</p>
              )}
            </form>
          </div>
        );

      case 'Refund Policy':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1C335C] mb-4">Refund & Cancellation Policy</h3>
            <div className="prose prose-sm max-w-none text-gray-700 space-y-3">
              <p><strong className="text-[#1C335C]">100% Refund Guarantee:</strong> Full refund within 7 days of purchase if service not used.</p>
              <p><strong className="text-[#1C335C]">Partial Refunds:</strong> Pro-rated refund for unused portion after 7 days.</p>
              <p><strong className="text-[#1C335C]">Processing Time:</strong> Refunds processed within 3-5 business days.</p>
              <p><strong className="text-[#1C335C]">How to Request:</strong> Go to My Orders → Select transaction → Click "Request Refund"</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold text-yellow-800">Note: Refunds not applicable for completed services or digital downloads.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1C335C]">Help & Support</h2>
        {selectedSection && (
          <button
            onClick={() => setSelectedSection(null)}
            className="text-gray-500 hover:text-[#1C335C] transition"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {!selectedSection ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'FAQs', desc: 'Frequently asked questions', icon: HelpCircle },
              { title: 'Contact Support', desc: '24/7 customer service', icon: User },
              { title: 'Refund Policy', desc: 'Learn about cancellations', icon: CreditCard },
            ].map((item, index) => (
              <div 
                key={index} 
                onClick={() => setSelectedSection(item.title)}
                className="p-6 border border-gray-200 rounded-lg hover:border-[#008BD0] hover:shadow-md transition cursor-pointer group"
              >
                <item.icon className="w-8 h-8 text-[#008BD0] mb-3 group-hover:scale-110 transition" />
                <h3 className="font-semibold text-[#1C335C] mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-[#1C335C] mb-2">Need immediate assistance?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Call our helpline: <span className="font-bold text-[#008BD0]">139</span> (24/7)
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setChatOpen(true)}
                className="bg-[#008BD0] text-white px-6 py-2 rounded-lg hover:bg-[#006ea8] transition font-semibold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with Support
              </button>
              <a 
                href="tel:139"
                className="border border-[#008BD0] text-[#008BD0] px-6 py-2 rounded-lg hover:bg-[#008BD0] hover:text-white transition font-semibold flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      )}

      {/* Live Chat Widget */}
      {chatOpen && (
        <HelpChatbot setChatOpen={setChatOpen} />
      )}
    </div>
  );
};

export default Help;