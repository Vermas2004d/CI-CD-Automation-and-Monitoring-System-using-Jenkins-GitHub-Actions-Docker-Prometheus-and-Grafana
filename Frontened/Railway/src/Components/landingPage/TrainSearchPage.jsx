import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Train } from 'lucide-react';
import Navbar from './Navbar';

const TrainSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchState = location.state || {}; // { from, to, date }

  const [from, setFrom] = useState(searchState.from || '');
  const [to, setTo] = useState(searchState.to || '');
  const [date, setDate] = useState(searchState.date || '');
  
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper to format duration string "17:55" -> "17h 55m"
  const formatDuration = (durationStr) => {
    if (!durationStr) return '--';
    const parts = durationStr.split(':');
    if (parts.length < 2) return durationStr;
    const h = parts[0];
    const m = parts[1];
    return `${h}h ${m}m`;
  };

  const formattedDate = useMemo(() => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric', // e.g., "12 Oct, 2025"
      });
    } catch {
      return date;
    }
  }, [date]);

  // Fetch trains effect
  useEffect(() => {
    const fetchTrains = async () => {
      // If missing params, don't fetch (handled by UI below)
      if (!from || !to || !date) return;

      setLoading(true);
      setError('');
      setTrains([]);

      const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${from}&toStationCode=${to}&dateOfJourney=${date}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        // The API returns JSON, but the snippet used .text(). 
        // Based on the structure provided by the user, it is a JSON object.
        // We will try .json() first.
        const result = await response.json();
        // console.log(result);

        if (result.status === true && result.data) {
          setTrains(result.data);
        } else {
             if (Array.isArray(result.data)) {
                 setTrains(result.data);
             } else {
                 setError(result.message || 'No trains found or API error.');
             }
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching trains.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [from, to, date]);


  // If user directly opens /search-trains without using form
  if (!from || !to || !date) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-3 text-[#1C335C]">
            Search Details Missing
          </h1>
          <p className="text-gray-500 mb-6">
            Please go back and enter From, To and Date to search trains.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C335C] text-white font-semibold hover:bg-[#008BD0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar/>
      
      {/* Search Details Box */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-full shadow-sm border border-gray-200 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <MapPin className="w-4 h-4 text-[#008BD0]" />
                <span className="uppercase tracking-wide">
                  {from} &rarr; {to}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              navigate('/', {
                state: { from, to, date },
              })
            }
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1C335C] text-white text-sm font-semibold hover:bg-[#008BD0] transition-colors shadow-sm"
          >
            Modify Search
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Summary */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#1C335C] mb-1">
              Trains from {from} to {to}
            </h1>
            <p className="text-gray-600 text-sm font-semibold">
              {loading ? 'Searching...' : `${trains.length} train${trains.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
             <div className="flex flex-col items-center justify-center py-20">
                 <div className="w-12 h-12 border-4 border-[#1C335C] border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-gray-500 animate-pulse">Fetching latest train schedules...</p>
             </div>
        )}

        {/* Error State */}
        {!loading && error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center">
                {error}
            </div>
        )}

        {/* Train list */}
        {!loading && !error && trains.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-dashed border-gray-200">
            <Train className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h2 className="text-lg font-semibold mb-2 text-[#1C335C]">
              No trains found
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Try changing the station names or date.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C335C] text-white text-sm font-semibold hover:bg-[#008BD0] transition-colors"
            >
              Modify Search
            </button>
          </div>
        ) : (
          !loading && !error && (
          <div className="space-y-4">
            {trains.map((train, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between hover:shadow-md transition-shadow"
              >
                {/* Left: Name + times */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Train className="w-6 h-6 text-[#008BD0]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#1C335C]">
                        {train.train_name}
                      </h2>
                      <p className="text-xs text-gray-500 font-mono">
                        #{train.train_number}
                        {train.train_type && <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded text-gray-600">{train.train_type}</span>}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 mt-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-[#1C335C]">
                         {train.from_std}
                      </p>
                      <p className="text-xs text-gray-500 uppercase">{train.train_src}</p>
                      <p className="text-[10px] text-gray-400">Day {train.from_day}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center">
                       <p className="text-xs text-gray-500 mb-1">{formatDuration(train.duration)}</p>
                       <div className="w-full h-1 bg-gray-200 rounded-full relative">
                           <div className="absolute top-0 left-0 h-full bg-[#008BD0] w-1/2"></div>
                       </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xl font-bold text-[#1C335C]">
                         {train.to_std || train.to_sta}
                      </p>
                      <p className="text-xs text-gray-500 uppercase">{train.train_dstn}</p>
                      <p className="text-[10px] text-gray-400">Day {train.to_day}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Classes & CTA */}
                <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 flex flex-col gap-4 items-center justify-center">
                  
                  {/* Classes - Enlarged as requested previously */}
                  <div className="flex flex-wrap justify-center gap-2">
                     {(train.class_type || ['SL', '3A', '2A', '1A']).map((cls) => (
                        <div key={cls} className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
                             <span className="text-sm font-bold text-[#1C335C]">{cls}</span>
                        </div>
                     ))}
                  </div>

                  <button 
                    onClick={() => {
                      const user = localStorage.getItem('user_email_v1');
                      if (!user) {
                          navigate('/login');
                      } else {
                          navigate(`/book-ticket/${train.train_number}`, { state: { train, date } });
                      }
                    }}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1C335C] text-white text-sm font-bold hover:bg-[#008BD0] transition-colors shadow-lg shadow-blue-900/10"
                  >
                    <Clock className="w-4 h-4" />
                    Book / Check Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
          )
        )}
      </main>
    </div>
  );
};

export default TrainSearchPage;
