import { useState } from 'react';
import { Train, Search, Wifi, Plug, BedSingle, Lightbulb, MonitorPlay, Accessibility, Utensils, Wine} from 'lucide-react'

const TrainServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedTrain, setSearchedTrain] = useState(null);
  const [showError, setShowError] = useState(false);

  // as gov data is not available so i am using dummy data
  const dummyTrains = [
  { id: "1",  TrainNo: "12310", TrainName: "RJPB TEJAS RAJ",        Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "2",  TrainNo: "22436", TrainName: "VANDE BHARAT EXP",      Wifi: false,  ChargingPoint: true,  BeddingService: false, ReadingLight: true,  WheelChair: true,  Entertainment: true, FoodService: true, BarService: false },
  { id: "3",  TrainNo: "12034", TrainName: "NDLS KGM SHATABDI",     Wifi: false,  ChargingPoint: true,  BeddingService: false, ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "4",  TrainNo: "12951", TrainName: "MUMBAI RAJDHANI",       Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "5",  TrainNo: "12952", TrainName: "MUMBAI RAJDHANI",       Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "6",  TrainNo: "12002", TrainName: "BHOPAL SHATABDI",       Wifi: false,  ChargingPoint: true,  BeddingService: false, ReadingLight: true,  WheelChair: false, Entertainment: false, FoodService: true, BarService: false },
  { id: "7",  TrainNo: "12235", TrainName: "ANVT MDP GARIB RATH",   Wifi: false, ChargingPoint: true,  BeddingService: false, ReadingLight: false, WheelChair: false, Entertainment: false, FoodService: false, BarService: false },
  { id: "8",  TrainNo: "12236", TrainName: "MDP ANVT GARIB RATH",   Wifi: false, ChargingPoint: true,  BeddingService: false, ReadingLight: false, WheelChair: false, Entertainment: false, FoodService: false, BarService: false },
  { id: "9",  TrainNo: "22221", TrainName: "CSMT NZM RAJDHANI",     Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "10", TrainNo: "22222", TrainName: "NZM CSMT RAJDHANI",     Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "11", TrainNo: "12627", TrainName: "KARNATAKA EXP",         Wifi: false, ChargingPoint: true,  BeddingService: true,  ReadingLight: false, WheelChair: false, Entertainment: false, FoodService: true, BarService: false },
  { id: "12", TrainNo: "12628", TrainName: "KARNATAKA EXP",         Wifi: false, ChargingPoint: true,  BeddingService: true,  ReadingLight: false, WheelChair: false, Entertainment: false, FoodService: true, BarService: false },
  { id: "13", TrainNo: "12424", TrainName: "NDLS DBRT RAJDHANI",    Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "14", TrainNo: "12423", TrainName: "DBRT NDLS RAJDHANI",    Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "15", TrainNo: "12046", TrainName: "CDG NDLS SHATABDI",     Wifi: false,  ChargingPoint: true,  BeddingService: false, ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "16", TrainNo: "12045", TrainName: "NDLS CDG SHATABDI",     Wifi: false,  ChargingPoint: true,  BeddingService: false, ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "17", TrainNo: "12634", TrainName: "KANYAKUMARI EXP",       Wifi: false, ChargingPoint: true,  BeddingService: true,  ReadingLight: false, WheelChair: false, Entertainment: false, FoodService: true, BarService: false },
  { id: "18", TrainNo: "12623", TrainName: "TRIVANDRUM MAIL",       Wifi: false, ChargingPoint: true,  BeddingService: true,  ReadingLight: false, WheelChair: false, Entertainment: false, FoodService: true, BarService: false },
  { id: "19", TrainNo: "12953", TrainName: "MUMBAI AUG KRANTI",     Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "20", TrainNo: "12954", TrainName: "NZM AUG KRANTI RAJ",    Wifi: false,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: false, FoodService: true, BarService: false },
  { id: "21", TrainNo: "NA", TrainName: "Maharaja Express",    Wifi: true,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: true, FoodService: true, BarService: true },
  { id: "22", TrainNo: "NA", TrainName: "Deccan Odyssey",    Wifi: true,  ChargingPoint: true,  BeddingService: true,  ReadingLight: true,  WheelChair: true,  Entertainment: true, FoodService: true, BarService: true },
];

  const serviceConfig = [
    { name: 'Wi‑Fi Connectivity', key: 'Wifi', desc: 'High-speed internet on premium trains', icon: Wifi },
    { name: 'Charging Points', key: 'ChargingPoint', desc: 'Available at every seat', icon: Plug },
    { name: 'Bedding Service', key: 'BeddingService', desc: 'Complimentary in AC classes', icon: BedSingle },
    { name: 'Reading Lights', key: 'ReadingLight', desc: 'Individual seat lighting', icon: Lightbulb },
    { name: 'Entertainment System', key: 'Entertainment', desc: 'Available on premium trains', icon: MonitorPlay },
    { name: 'Wheelchair Access', key: 'WheelChair', desc: 'Priority boarding available', icon: Accessibility },
    { name: 'Food Service', key: 'FoodService', desc: 'served at your seat (paid service)', icon: Utensils },
    { name: 'Bar Lounge', key: 'BarService', desc: 'Exclusive bar available on premium trains', icon: Wine },
  ];

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return;
    
    const train = dummyTrains.find(t => 
      t.TrainNo === term || 
      t.TrainName.toLowerCase().includes(term)
    );
    
    if (train) {
      setSearchedTrain(train);
      setShowError(false);
    } else {
      setSearchedTrain(null);
      setShowError(true);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-auto transition-all duration-500 
                 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 relative group"
    >
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="p-7 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-linear-to-br from-blue-100 to-cyan-100 rounded-2xl transition-all duration-500 ">
            <Train className="w-7 h-7 text-[#008BD0]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#1C335C] group-hover:text-[#006ea8] transition-colors duration-300">
              Train Services
            </h2>
            <p className="text-sm text-gray-600">Check facilities available on your train</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 pb-2 relative z-10">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Train Number or Name</label>
          <div className="relative">
            <Train className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter train name or number (e.g., Rajdhani)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-linear-to-r from-[#008BD0] to-[#006ea8] text-white py-3.5 rounded-xl 
                       hover:from-[#006ea8] hover:to-[#005a8c] transition-all duration-300 font-semibold 
                       flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Check Services Status
          </button>
          {showError && (
             <p className="text-red-500 text-sm mt-1">Train not found. Please try a valid train number or name.</p>
          )}
        </div>
      </div>

      {/* Dynamic Results */}
      {searchedTrain && (
        <div className="px-6 py-4 relative z-10 animate-fade-in-up">
           <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-1 bg-[#008BD0] rounded-full"></div>
              <div>
                <h3 className="text-lg font-bold text-[#1C335C]">{searchedTrain.TrainName}</h3>
                <p className="text-xs text-gray-500">Train No: {searchedTrain.TrainNo}</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceConfig.map((service, index) => {
              const Icon = service.icon
              const available = searchedTrain[service.key]
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm 
                             ${available ? 'border-green-300 bg-green-50/70' : 'border-gray-200 bg-gray-50/50 opacity-70'} 
                             hover:shadow-md`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${available ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Icon className={`w-5 h-5 ${available ? 'text-green-700' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1C335C]">{service.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold 
                                  ${available ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="my-6 border-t border-gray-100"></div>
        </div>
      )}


      {/* Reference Guide (Static Manual) */}
      <div className="p-6 pt-0 relative z-10">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Service Manual & Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-80 hover:opacity-100 transition-opacity">
          {serviceConfig.map((service, index) => {
            const Icon = service.icon
            // Static reference state (mixed for example)
            const isReferenceActive = index % 2 === 0; 
            
            return (
              <div
                key={index}
                className="p-3 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center gap-3"
              >
                 <div className="p-2 rounded-lg bg-blue-50">
                    <Icon className="w-4 h-4 text-[#008BD0]" />
                 </div>
                 <div>
                    <h4 className="text-sm font-semibold text-gray-700">{service.name}</h4>
                    <p className="text-xs text-gray-500">{service.desc}</p>
                 </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TrainServices;
