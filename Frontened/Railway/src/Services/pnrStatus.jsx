import React, { useState } from 'react';
import { Search, Train, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';

const PNRStatus = () => {
  const [pnr, setPnr] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (pnr.length !== 10) {
      setError('Please enter a valid 10-digit PNR number');
      return;
    }
    
    setError('');
    setLoading(true);
    setStatus(null);

    const url = `https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/${pnr}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
        'x-rapidapi-host': 'irctc-indian-railway-pnr-status.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);

      if (result && result.data) {
         setStatus(result.data);
      } else {
         setError('Unable to fetch PNR status. Please check the PNR number or try again later.');
      }

    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching PNR status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Search className="w-6 h-6 text-[#008BD0]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1C335C]">PNR Status</h2>
          <p className="text-sm text-gray-600">Check current status of your train ticket</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">PNR Number</label>
            <input 
              type="text" 
              value={pnr}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                if (val.length <= 10) setPnr(val);
              }}
              placeholder="Enter 10-digit PNR Number" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none transition-all font-mono text-lg tracking-wider"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-[#008BD0] text-white font-bold rounded-lg hover:bg-[#0077b3] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Checking...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Get Status
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-3 flex items-center gap-2 text-red-600 text-sm animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </form>

      {status && (
        <div className="animate-fade-in space-y-6">
          {/* Main Ticket Card */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Ticket Header */}
            <div className="bg-[#1C335C] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <Train className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">{status.trainName}</h3>
                  <div className="flex items-center gap-2 text-blue-200 text-xs">
                    <span>#{status.trainNumber}</span>
                    <span>•</span>
                    <span>{status.dateOfJourney}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-blue-200 text-xs uppercase">PNR</p>
                    <p className="font-mono font-bold">{status.pnrNumber}</p>
                 </div>
                 <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    status.chartStatus === 'Chart Prepared' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    {status.chartStatus}
                 </div>
              </div>
            </div>

            {/* Journey Details Grid */}
            <div className="p-6 grid md:grid-cols-3 gap-6 border-b border-gray-100">
              {/* Source */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                  <MapPin className="w-4 h-4 text-[#008BD0]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">From</p>
                  <p className="font-bold text-[#1C335C] text-lg">{status.sourceStation}</p>
                  <p className="text-sm text-gray-600">{status.dateOfJourney}</p>
                </div>
              </div>

              {/* Duration/Connector */}
              <div className="flex flex-col items-center justify-center space-y-1">
                 <p className="text-xs text-gray-400 font-medium">{status.distance} km</p>
                 <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#008BD0]/30 w-full"></div>
                 </div>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-3 justify-end text-right">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">To</p>
                  <p className="font-bold text-[#1C335C] text-lg">{status.destinationStation}</p>
                  <p className="text-sm text-gray-600">{status.arrivalDate}</p>
                </div>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                  <MapPin className="w-4 h-4 text-[#008BD0]" />
                </div>
              </div>
            </div>

            {/* Secondary Details */}
            <div className="bg-gray-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Boarding At</p>
                <p className="font-bold text-[#1C335C]">{status.boardingPoint}</p>
                <p className="text-xs text-gray-500">Upto: {status.reservationUpto}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Class & Quota</p>
                <p className="font-bold text-[#1C335C]">{status.journeyClass} / {status.quota}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Booking Date</p>
                <p className="font-bold text-[#1C335C]">{status.bookingDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Fare</p>
                <p className="font-bold text-[#008BD0] text-lg">₹{status.ticketFare}</p>
              </div>
            </div>
          </div>

          {/* Passenger List */}
          <div>
            <h3 className="text-lg font-bold text-[#1C335C] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#008BD0]" />
              Passenger Status
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Passenger</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Booking Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {status.passengerList.map((p, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#1C335C]">Passenger {idx + 1}</td>
                      <td className="px-6 py-4 text-gray-600">{p.bookingStatus}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          p.currentStatus.includes('CNF') || p.currentStatus.includes('RAC')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {p.currentStatus.includes('CNF') && <CheckCircle className="w-3 h-3" />}
                          {p.currentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Info */}
          {(status.informationMessage?.length > 0 || status.vikalpStatus) && (
            <div className="grid md:grid-cols-2 gap-4">
               {status.informationMessage?.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">Note</h4>
                    <p className="text-sm text-blue-800 mt-1">{status.informationMessage.join(', ')}</p>
                  </div>
                </div>
               )}
               {status.vikalpStatus && (
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-purple-900 text-sm">Vikalp Opted</h4>
                    <p className="text-sm text-purple-800 mt-1">Alternative train accommodation scheme</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                    {status.vikalpStatus}
                  </span>
                </div>
               )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PNRStatus;
