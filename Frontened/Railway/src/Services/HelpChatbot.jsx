import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User } from 'lucide-react';
import botGif from '../assets/BotFace.gif';

const HelpChatbot = ({ setChatOpen }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "👋 Hi! How can we help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState('bot'); // 'bot' or 'executive'
  const messagesEndRef = useRef(null);
  const channelName = 'executive_chat_channel';

  const isExecutiveAvailable = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 9 && hours < 17;
  };

  useEffect(() => {
    const bc = new BroadcastChannel(channelName);
    bc.onmessage = (event) => {
      if (event.data.type === 'EXECUTIVE_REPLY') {
        const reply = {
          id: Date.now(),
          text: event.data.text,
          sender: 'executive',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, reply]);
      }
    };
    return () => bc.close();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    // Core Services
    if (lowerText.includes('pnr')) {
      return "To check your PNR status, go to the 'PNR Status' section in the dashboard and enter your 10-digit PNR number.";
    } else if (lowerText.includes('train') || lowerText.includes('status') || lowerText.includes('schedule') || lowerText.includes('live')) {
      return "You can check live train status by entering the train number in the 'Train Status' page. It provides real-time updates.";
    } else if (lowerText.includes('food') || lowerText.includes('meal') || lowerText.includes('catering') || lowerText.includes('menu')) {
      return "Hungry? Check out our 'Food Menu' page! You can book delicious meals directly through our E-Catering service using your PNR.";
    } 
    
    // Booking & Policies
    else if (lowerText.includes('booking') || lowerText.includes('book') || lowerText.includes('ticket')) {
      return "To book a ticket, go to the 'Booking' section in the dashboard and select your preferred train, coach, and seat."
    }
    else if (lowerText.includes('cancel') || lowerText.includes('refund')) {
      return "Cancellations can be made up to 4 hours before departure. Refunds are processed within 5-7 working days to your original payment method.";
    } else if (lowerText.includes('tatkal') || lowerText.includes('emergency')) {
      return "Need a last-minute ticket? Use our 'Tatkal Booking' feature. Bookings open at 10 AM for AC classes and 11 AM for non-AC classes one day in advance.";
    } else if (lowerText.includes('coach') || lowerText.includes('seat') || lowerText.includes('berth') || lowerText.includes('layout')) {
      return "You can view the coach layout and seat position using our 'Coach Seating' feature to know exactly where you'll be sitting.";
    }

    // Special Features
    else if (lowerText.includes('tour') || lowerText.includes('package') || lowerText.includes('holiday') || lowerText.includes('vacation')) {
      return "Planning a trip? Explore our 'Tour Packages' page for exciting holiday destinations and all-inclusive travel packages.";
    } else if (lowerText.includes('royal') || lowerText.includes('luxury') || lowerText.includes('maharaja')) {
      return "Experience royalty on wheels! Visit our 'Royal Journeys' page to explore our exclusive luxury train experiences.";
    }
    
    // Account & Support
    else if (lowerText.includes('login') || lowerText.includes('signup') || lowerText.includes('register') || lowerText.includes('account')) {
      return "You can log in or sign up using the buttons in the navigation bar to access your dashboard and manage bookings.";
    } else if (lowerText.includes('contact') || lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('customer')) {
      return "We're here to help! You can reach our 24/7 customer support at 1800-111-222 or email us at support@railway.com.";
    } else if (lowerText.includes('about') || lowerText.includes('company') || lowerText.includes('who are you')) {
      return "We are a comprehensive railway management platform dedicated to making your train travel smooth and enjoyable. Visit 'About Us' to learn more.";
    } 
    
    // Greetings & Default
    else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
      if (isExecutiveAvailable()) {
         return "Hello! I'm RailBot. I can help with PNR, trains, and more. Or, if you prefer, you can ask to 'chat with executive' for human assistance (9 AM - 5 PM).";
      }
      return "Hello! I'm RailBot. How can I assist you with your journey today? Ask me about PNR, trains, food, or tours!";
    } else if (lowerText.includes('executive') || lowerText.includes('human') || lowerText.includes('agent')) {
        if (isExecutiveAvailable()) {
            setChatMode('executive');
            return "Connecting you to an executive... You are now chatting with a live agent. Please state your query.";
        } else {
            return "Our executives are only available between 9 AM and 5 PM. Please try again during those hours.";
        }
    } else {
      return "I'm not sure I understand. Try asking about 'PNR', 'Train Status', 'Food', 'Tours', 'Tatkal', or 'Royal Journeys'.";
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    
    if (chatMode === 'executive') {
        // Log link for demo
        const demoLink = `http://localhost:5173/executive-chat-demo?msg=${encodeURIComponent(userMessage.text)}`;
        console.log("Executive Chat Link:", demoLink);
        // Do not auto-reply, wait for executive
        return;
    }

    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 font-sans">
      {/* Header */}
      <div className="bg-[#008BD0] text-white p-4 rounded-t-lg flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 bg-green-400 rounded-full absolute bottom-0 right-0 border-2 border-[#008BD0] z-10"></div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30">
              {chatMode === 'executive' ? (
                 <User className='w-8 h-8 text-white' />
              ) : (
                 <img src={botGif} alt="Bot Face" className='w-full h-full object-cover' />
              )}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">{chatMode === 'executive' ? 'Executive Support' : 'RailBot Support'}</h3>
            <p className="text-xs text-blue-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
              Online
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            {chatMode === 'bot' && isExecutiveAvailable() && (
                <button 
                    onClick={() => {
                        setChatMode('executive');
                        setMessages(prev => [...prev, {
                            id: Date.now(), 
                            text: "Connecting you to an executive... You are now chatting with a live agent. Please state your query.", 
                            sender: 'bot', 
                            timestamp: new Date()
                        }]);
                    }}
                    title="Chat with Executive"
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
                >
                    <User className="w-5 h-5" />
                </button>
            )}
            <button 
              onClick={() => setChatOpen(false)} 
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#008BD0] text-white rounded-br-none' 
                    : msg.sender === 'executive'
                    ? 'bg-orange-100 text-gray-800 border border-orange-200 rounded-bl-none'
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                }`}
              >
                {msg.text}
                <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {msg.sender === 'executive' && <span className="font-bold mr-1">Executive •</span>}
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 rounded-b-lg">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:border-[#008BD0] focus:ring-1 focus:ring-[#008BD0] focus:outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 bg-[#008BD0] text-white rounded-full hover:bg-[#0077b3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpChatbot;