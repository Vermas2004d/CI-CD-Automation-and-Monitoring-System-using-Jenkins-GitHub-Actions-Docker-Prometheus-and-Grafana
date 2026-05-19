import React, { useState } from 'react';
import { MapPin, Search, ArrowRightLeft, Calendar, Train, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookTickets = () => {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [dateOfJourney, setDateOfJourney] = useState(new Date().toISOString().split('T')[0]);
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  // Helper to format duration string "17:55" -> "17h 55m"
  const formatDuration = (durationStr) => {
    if (!durationStr) return '--';
    // Check if it's already in minutes (number) or string "HH:MM"
    if (typeof durationStr === 'number') {
        const h = Math.floor(durationStr / 60);
        const m = durationStr % 60;
        return `${h}h ${m}m`;
    }
    const parts = durationStr.split(':');
    if (parts.length < 2) return durationStr;
    const h = parts[0];
    const m = parts[1];
    return `${h}h ${m}m`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!fromStation || !toStation || !dateOfJourney) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setTrains([]);

    const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${fromStation}&toStationCode=${toStation}&dateOfJourney=${dateOfJourney}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
        'x-rapidapi-host': 'irctc1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      // console.log("API Result:", result);

      if (result.status === true && result.data) {
        setTrains(result.data);
      } else {
         if (Array.isArray(result.data)) {
             setTrains(result.data);
         } else {
             setError(result.message || 'No trains found or API error.');
         }
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching trains.');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (train) => {
    const user = localStorage.getItem('user_email_v1');
    navigate(`/book-ticket/${train.train_number}`, { state: { train, date: dateOfJourney } });
    // if (!user) {
    //     // Redirect to login if not logged in
    //     navigate('/login');
    // } else {
    // }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#1C335C] mb-6">Book Train Tickets</h2>
      
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From Station */}
          <div className="md:col-span-5 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">From Station</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                placeholder="Enter departure station code (e.g. NDLS)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent uppercase"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-2 flex justify-center mb-1">
            <button
              type="button"
              onClick={handleSwap}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-[#008BD0] transition-colors"
              title="Swap Stations"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* To Station */}
          <div className="md:col-span-5 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">To Station</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                placeholder="Enter arrival station code (e.g. BCT)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent uppercase"
              />
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Journey</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={dateOfJourney}
              onChange={(e) => setDateOfJourney(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#008BD0] text-white py-3 rounded-lg hover:bg-[#006ea8] transition font-semibold flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Search Trains</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
           <span>⚠️</span> {error}
        </div>
      )}

      {/* Results Section */}
      {trains.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-bold text-[#1C335C] mb-4">Available Trains</h3>
          {trains.map((train, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                {/* Train Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-[#008BD0]">
                    <Train className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C335C] text-lg">{train.train_name}</h4>
                    <p className="text-sm text-gray-500 font-mono">#{train.train_number}</p>
                    <div className="flex gap-2 mt-1">
                        {train.train_type && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{train.train_type}</span>}
                    </div>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Departure</p>
                    <p className="font-bold text-[#1C335C] text-lg">
                        {train.from_std}
                    </p>
                    <p className="text-xs text-gray-400">Day {train.from_day}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-400 mb-1">{formatDuration(train.duration)}</p>
                    <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden relative">
                       <div className="w-full h-full bg-gray-200"></div> 
                       {/* Animated dot or static line */}
                       <div className="absolute top-0 left-0 h-full bg-[#008BD0] w-1/2"></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-500 mb-1">Arrival</p>
                    <p className="font-bold text-[#1C335C] text-lg">
                        {train.to_std || train.to_sta}
                    </p>
                    <p className="text-xs text-gray-400">Day {train.to_day}</p>
                  </div>
                </div>

                {/* Book Action */}
                <div className="w-full md:w-auto flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleBook(train)}
                      className="w-full md:w-auto px-6 py-2 bg-[#1C335C] text-white text-sm font-semibold rounded-lg hover:bg-[#2a4a80] transition-colors shadow-md"
                    >
                      Book Ticket
                    </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookTickets;