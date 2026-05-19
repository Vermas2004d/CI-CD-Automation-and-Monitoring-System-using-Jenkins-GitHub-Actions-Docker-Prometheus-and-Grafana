import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Utensils, Pizza, Coffee } from 'lucide-react';

const FoodServices = () => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate('/food-menu')}
      className="group relative h-full min-h-[300px] bg-gradient-to-br from-[#8B4513] to-[#D2691E] rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:20px_20px]" />
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D2691E]/30 rounded-full blur-3xl" />

      {/* Content Container */}
      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        
        {/* Top Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Fresh & Hot
          </div>
          
          <h2 className="text-4xl font-bold text-white leading-tight">
            Delicious <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-white">
              Meals On Board
            </span>
          </h2>
          
          <p className="text-orange-100/80 text-lg max-w-[250px]">
            Order fresh food directly to your seat.
          </p>
        </div>

        {/* Middle Visual */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-80 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
           <Utensils className="w-48 h-48 text-white/10 rotate-12" />
        </div>

        {/* Bottom Section */}
        <div className="space-y-6">
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg text-orange-100 text-sm">
              <Pizza className="w-4 h-4" />
              <span>Tasty Snacks</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg text-orange-100 text-sm">
              <Coffee className="w-4 h-4" />
              <span>Beverages</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex items-center gap-4 group-hover:gap-6 transition-all duration-300">
            <span className="text-xl font-semibold text-white">View Menu</span>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8B4513] group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <ArrowRight className="w-6 h-6 group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodServices;