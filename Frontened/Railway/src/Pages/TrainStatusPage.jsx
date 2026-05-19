import React, { useState } from 'react';
import { Search, Train, Clock, MapPin, AlertCircle, Calendar, ArrowDown, CheckCircle2, Circle } from 'lucide-react';

const TrainStatusPage = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTrainStatus = async (trainNo) => {
    const url = `https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status?departure_date=${new Date().toISOString().split('T')[0].replace(/-/g, '')}&isH5=true&client=web&deviceIdentifier=Mozilla%2520Firefox-138.0.0.0&train_number=${trainNo}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
            'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
            'x-rapid-api': 'rapid-api-database'
        }
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trainNumber) return;

    setLoading(true);
    setError(null);
    setStatusData(null);

    try {
      const data = await getTrainStatus(trainNumber);
      if (data && data.status && data.status.result === 'success' && data.body) {
        setStatusData(data.body);
      } else {
        throw new Error('Invalid response format or train not found');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch train status. Please check the train number or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-[#1C335C]">Live Train Status</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track your train in real-time. Enter the train number to get live updates on location, delays, and expected arrival times.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Train className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="Enter Train Number (e.g., 12051)"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none transition-all text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#008BD0] hover:bg-[#006ea8] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Check Status
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {statusData && (
          <div className="space-y-6 animate-fade-in">
            {/* Train Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-[#1C335C] p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Train className="w-6 h-6" />
                      {/* Train name isn't directly in body, using number */}
                      Train {trainNumber}
                    </h2>
                    <p className="text-blue-200 mt-1" dangerouslySetInnerHTML={{ __html: statusData.train_status_message }} />
                  </div>
                  <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <p className="text-sm text-blue-100">Updated: {new Date(statusData.server_timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-[#008BD0] mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Current Station</p>
                    <p className="text-lg font-bold text-[#1C335C]">{statusData.current_station || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl">
                  <Clock className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Availability</p>
                    <p className="text-lg font-bold text-[#1C335C]">{statusData.time_of_availability || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date</p>
                    <p className="text-lg font-bold text-[#1C335C]">{new Date(statusData.server_timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline View */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-[#1C335C] mb-6">Live Journey Tracker</h3>
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-4 bottom-4 w-1 bg-gray-200 rounded-full" />
                    
                    <div className="space-y-0">
                        {statusData.stations.map((station, index) => {
                            const isCurrent = station.stationCode === statusData.current_station;
                            const isPassed = !isCurrent && index < statusData.stations.findIndex(s => s.stationCode === statusData.current_station);
                            
                            return (
                                <div key={index} className="relative flex gap-6 pb-8 last:pb-0 group">
                                    {/* Timeline Node */}
                                    <div className={`relative z-10 w-16 flex-shrink-0 flex flex-col items-center justify-start pt-1`}>
                                        <div className={`w-4 h-4 rounded-full border-4 transition-all duration-300 
                                            ${isCurrent ? 'bg-[#008BD0] border-blue-200 w-6 h-6 shadow-[0_0_0_4px_rgba(0,139,208,0.2)]' : 
                                              isPassed ? 'bg-green-500 border-green-200' : 'bg-white border-gray-300'}`}>
                                        </div>
                                        {isCurrent && (
                                            <div className="absolute top-8 bg-[#008BD0] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-bounce">
                                                TRAIN
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={`flex-1 p-4 rounded-xl border transition-all duration-300 
                                        ${isCurrent ? 'bg-blue-50 border-blue-200 shadow-md transform scale-[1.02]' : 
                                          'bg-white border-gray-100 hover:border-gray-200'}`}>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className={`font-bold text-lg ${isCurrent ? 'text-[#008BD0]' : 'text-[#1C335C]'}`}>
                                                        {station.stationName}
                                                    </h4>
                                                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                                                        {station.stationCode}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-gray-400">Arr:</span>
                                                        <span className="font-medium">{station.arrivalTime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-gray-400">Dep:</span>
                                                        <span className="font-medium">{station.departureTime}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-gray-400">Dist:</span>
                                                        <span>{station.distance} km</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-400">Platform</p>
                                                    <p className="font-bold text-[#1C335C]">{station.expected_platform || '-'}</p>
                                                </div>
                                                {station.haltTime > 0 && (
                                                    <div className="text-right px-3 py-1 bg-gray-100 rounded-lg">
                                                        <p className="text-xs text-gray-400">Halt</p>
                                                        <p className="font-bold text-gray-700">{station.haltTime}m</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Actual Times if available */}
                                        {(station.actual_arrival_time || station.actual_departure_time) && (
                                            <div className="mt-3 pt-3 border-t border-gray-100 flex gap-4 text-xs">
                                                {station.actual_arrival_time && (
                                                    <span className={`${station.actual_arrival_time > station.arrivalTime ? 'text-red-500' : 'text-green-600'}`}>
                                                        Actual Arr: {station.actual_arrival_time}
                                                    </span>
                                                )}
                                                {station.actual_departure_time && (
                                                    <span className={`${station.actual_departure_time > station.departureTime ? 'text-red-500' : 'text-green-600'}`}>
                                                        Actual Dep: {station.actual_departure_time}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainStatusPage;