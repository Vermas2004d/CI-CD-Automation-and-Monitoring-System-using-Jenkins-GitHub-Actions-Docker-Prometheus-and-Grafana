import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Train, Clock, MapPin, ArrowRight, Layout } from 'lucide-react';

const TrainStatus = () => {
  const navigate = useNavigate();
  const [trainNumber, setTrainNumber] = useState('');
  const [trainData, setTrainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trainNumber) return;

    setLoading(true);
    setError('');
    setTrainData(null);

    const url = `https://irctc-train-api.p.rapidapi.com/api/v1/train-coach-data?trainNo=${trainNumber}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
            'x-rapidapi-host': 'irctc-train-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // console.log("API Result:", result);

        if (result.status === true && result.data) {
            setTrainData(result.data);
        } else {
            setError(result.message || 'Train not found or API error.');
        }
    } catch (err) {
        console.error(err);
        setError('An error occurred while fetching details.');
    } finally {
        setLoading(false);
    }
  };

  const getCoachColor = (coachCode, coachType) => {
    // Logic based on coachType or coach code
    // Common mappings based on typical Indian Railway codes
    const type = (coachType || '').toUpperCase();
    const code = (coachCode || '').toUpperCase();

    if (code === 'L' || type === 'L') return 'bg-gray-800 text-white'; // Loco
    if (code === 'EOG' || type === 'EOG') return 'bg-gray-600 text-white'; // Guard
    
    // AC Classes
    if (['H', 'A', 'B', 'M'].some(p => type.startsWith(p)) || ['1A', '2A', '3A'].some(c => code.includes(c))) 
        return 'bg-red-100 text-red-800 border-red-200';
    
    // Sleeper
    if (type === 'S' || code.startsWith('S')) return 'bg-blue-100 text-blue-800 border-blue-200';
    
    // General / Unreserved
    if (['GEN', 'GS', 'UR', 'D'].includes(type) || ['GEN', 'GS', 'UR'].includes(code)) 
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    
    // Chair Car
    if (type === 'C' || type === 'J' || code.startsWith('C') || code.startsWith('D')) 
        return 'bg-green-100 text-green-800 border-green-200';

    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Helper to format running days from current object {Mon: false, Tue: true...}
  const formatRunningDays = (daysObj) => {
      if (!daysObj) return '';
      return Object.entries(daysObj)
          .filter(([day, runs]) => runs)
          .map(([day]) => day)
          .join(', ');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 min-h-[200px]">
      
      {/* Search Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1C335C] mb-2">Live Train Status</h2>
        <p className="text-gray-500 mb-6">Enter train number to view details and live status</p>
        
        <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value)}
                    placeholder="Enter Train Number (e.g. 12310)" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none"
                />
            </div>
            <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-3 bg-[#008BD0] text-white font-bold rounded-lg hover:bg-[#0077b3] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
                {loading ? 'Searching...' : 'Check Status'}
            </button>
        </form>
        {error && <p className="mt-3 text-red-600 text-sm flex items-center gap-2">⚠️ {error}</p>}
      </div>

      {/* Results Section */}
      {trainData && trainData.trainDetails && (
        <div className="animate-fade-in space-y-6">
            
            {/* Header Info */}
            <div className="bg-[#1C335C] p-6 rounded-xl text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold">{trainData.trainDetails.trainName}</h3>
                    <p className="text-blue-200 text-lg">#{trainData.trainDetails.trainNo} • {trainData.trainDetails.trainType}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm opacity-80">Runs On</p>
                    <p className="font-mono text-sm">{formatRunningDays(trainData.trainDetails.runningDays)}</p>
                </div>
            </div>

            {/* Stats Grid - Some fields not available in this specific new API response shown in prompt, 
                so using available ones or placeholders if needed. 
                The prompt response structure doesn't show src/dest/duration/distance directly in `trainDetails` 
                but typically these might be present or we render what we have. 
                Based on structure provided: we have trainDetails and coachDetails. 
                I will remove the stats grid that relied on fields like sourceStationCode/distanceKm if they aren't in the provided JSON schema.
                Instead I will show Travel Class.
            */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-500 text-xs uppercase mb-1">Available Classes</p>
                <div className="flex gap-2 flex-wrap">
                    {trainData.trainDetails.travelClass?.split(' ').map((cls) => (
                         <span key={cls} className="px-2 py-1 bg-white border border-gray-200 rounded text-sm font-semibold text-[#1C335C]">{cls}</span>
                    ))}
                </div>
            </div>

            {/* Rake Composition */}
            <div className="border border-gray-200 rounded-xl p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                    <Layout className="w-5 h-5 text-[#008BD0]" />
                    <h4 className="font-bold text-[#1C335C]">Coach Position (Rake)</h4>
                </div>
                <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <div className="flex gap-2 min-w-max px-1">
                        {trainData.coachDetails?.map((coach, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1 group">
                                <div className={`w-12 h-10 rounded-md flex items-center justify-center font-bold text-xs border shadow-sm ${getCoachColor(coach.coach, coach.coachType)} relative transition-transform hover:-translate-y-1`} title={coach.details}>
                                    {coach.coach}
                                    <div className="absolute -bottom-1 w-8 h-0.5 bg-black/20 rounded-full"></div>
                                </div>
                                <span className="text-[10px] text-gray-400">{coach.sequenceNumber}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 text-xs text-gray-500 mt-2 flex-wrap">
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div> AC</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div> Sleeper</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div> General</span>
                    <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-800 rounded"></div> Loco</span>
                </div>
                 {trainData.coachLegend && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-2 font-semibold">Legend:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-gray-500">
                            {Object.entries(trainData.coachLegend || {}).slice(0, 8).map(([key, val]) => (
                                <div key={key}><span className="font-bold">{key}:</span> {val}</div>
                            ))}
                        </div>
                    </div>
                 )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4">
                 <button 
                 // Navigating to nowhere specific for now as API just gave static data, but keeping same structure
                 onClick={() => navigate('/train-status')}
                 className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-lg font-semibold opacity-80"
                 >
                    <MapPin className="w-5 h-5" />
                    Live Status
                    <ArrowRight className="w-4 h-4" />
                 </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default TrainStatus;