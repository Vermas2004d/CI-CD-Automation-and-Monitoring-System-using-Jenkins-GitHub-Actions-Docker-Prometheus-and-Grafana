import React, { useState } from 'react';
import { Search, Train, MapPin, Clock, ArrowRight } from 'lucide-react';

const TrainRoute = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trainNumber) return;

    setLoading(true);
    setError('');
    setRouteData(null);

    const url = 'https://irctc-insight.p.rapidapi.com/api/v1/train-details';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
            'x-rapidapi-host': 'irctc-insight.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trainNo: trainNumber })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status === true && result.data && result.data.trainRoute) {
            // Helper to parse station info "NEW DELHI - NDLS" -> { name, code }
            const parseStation = (str) => {
                if (!str) return { name: '', code: '' };
                const parts = str.split('-');
                if (parts.length > 1) {
                    const code = parts[parts.length - 1].trim();
                    const name = parts.slice(0, parts.length - 1).join('-').trim();
                    return { name, code };
                }
                return { name: str, code: '' };
            };

            setRouteData({
                trainNumber: result.data.trainNumber || trainNumber,
                trainName: result.data.trainName || 'Train Name Not Available',
                runningDays: result.data.runningDays,
                stations: result.data.trainRoute.map(station => {
                    const { name, code } = parseStation(station.stationName);
                    return {
                        code: code,
                        name: name,
                        arrival: station.arrives,
                        departure: station.departs,
                        distance: station.distance,
                        day: station.day
                    };
                })
            });
        } else {
            setError(result.message || 'Train not found or API error.');
        }
    } catch (err) {
        console.error(err);
        setError('Failed to fetch train route. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  // Helper to format running days from object {Mon: true, Tue: false...}
  const formatRunningDays = (daysObj) => {
      if (!daysObj) return '';
      return Object.entries(daysObj)
          .filter(([day, runs]) => runs)
          .map(([day]) => day)
          .join(', ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[250px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Train className="w-6 h-6 text-[#008BD0]" />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-[#1C335C]">Train Route</h2>
            <p className="text-sm text-gray-600">Check schedule and route information</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Train Number</label>
            <div className="relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                type="text" 
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                placeholder="Enter Train Number (e.g. 12345)" 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none"
                />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-[#008BD0] text-white font-bold rounded-lg hover:bg-[#0077b3] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? 'Searching...' : 'Get Route'}
          </button>
        </div>
        {error && (
            <p className="mt-3 text-sm text-red-600 flex items-center gap-2">
                <span>⚠️</span> {error}
            </p>
        )}
      </form>

      {routeData && (
        <div className="animate-fade-in">
            <div className="bg-[#1C335C] text-white p-6 rounded-t-xl flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">{routeData.trainName}</h3>
                    <p className="text-blue-200">#{routeData.trainNumber}</p>
                    {routeData.runningDays && (
                        <p className="text-sm text-blue-100 mt-1 opacity-90">
                            Runs on: <span className="font-mono">{formatRunningDays(routeData.runningDays)}</span>
                        </p>
                    )}
                </div>
                <Train className="w-8 h-8 text-blue-300" />
            </div>
            
            <div className="border border-gray-200 border-t-0 rounded-b-xl p-6">
                <div className="relative">
                     {/* Vertical Line */}
                     <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>

                     <div className="space-y-8">
                        {routeData.stations.map((station, index) => (
                            <div key={index} className="relative flex gap-6 group">
                                {/* Dot */}
                                <div className={`absolute left-4 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 
                                    ${index === 0 ? 'bg-green-500' : index === routeData.stations.length - 1 ? 'bg-red-500' : 'bg-[#008BD0]'}`}>
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 ml-6 bg-white border border-gray-100 p-4 rounded-lg hover:shadow-md transition-all hover:border-blue-100">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-[#1C335C] text-lg">{station.name}</h4>
                                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">{station.code}</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Day {station.day} • {station.distance}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="text-center">
                                                <p className="text-gray-400 text-xs uppercase mb-0.5">Arr</p>
                                                <p className="font-bold text-gray-700">{station.arrival}</p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-300" />
                                            <div className="text-center">
                                                <p className="text-gray-400 text-xs uppercase mb-0.5">Dep</p>
                                                <p className="font-bold text-[#1C335C]">{station.departure}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default TrainRoute;
