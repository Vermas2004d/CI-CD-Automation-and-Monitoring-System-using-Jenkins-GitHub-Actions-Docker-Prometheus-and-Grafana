import React from 'react';
import { Crown, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Royality = () => {
  const navigate = useNavigate();

  const topTrains = [
    {
      id: 1,
      name: "Maharajas’ Express",
      image: "https://images.unsplash.com/photo-1595879171813-a83beb517451?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹3,50,000"
    },
    {
      id: 2,
      name: "Palace on Wheels",
      image: "https://plus.unsplash.com/premium_photo-1661901647310-4deafc6f29a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹2,80,000"
    },
    {
      id: 3,
      name: "Deccan Odyssey",
      image: "https://plus.unsplash.com/premium_photo-1729937840264-288f999ebd70?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "₹3,10,000"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-xl p-6 text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <Crown size={200} />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[#fbbf24] mb-2">
            <Crown size={24} />
            <span className="font-serif tracking-widest text-sm">ROYAL COLLECTION</span>
          </div>
          <h2 className="text-3xl font-serif text-white">Luxury on Wheels</h2>
          <p className="text-gray-400 mt-2 max-w-md">
            Experience India's heritage through our exclusive selection of world-class luxury trains.
          </p>
        </div>
        <button 
          onClick={() => navigate('/royal-journeys')}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-[#fbbf24] text-[#0f172a] px-6 py-3 rounded-lg font-semibold hover:bg-[#d97706] transition-all group"
        >
          Explore All Journeys
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Teaser Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {topTrains.map((train) => (
          <div 
            key={train.id}
            onClick={() => navigate('/royal-journeys')}
            className="group cursor-pointer relative rounded-lg overflow-hidden aspect-[4/3] border border-white/10 hover:border-[#fbbf24]/50 transition-all"
          >
            <img 
              src={train.image} 
              alt={train.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-serif text-white mb-1 group-hover:text-[#fbbf24] transition-colors">
                {train.name}
              </h3>
              <p className="text-[#fbbf24] text-sm font-medium">
                Starts from {train.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Royality;