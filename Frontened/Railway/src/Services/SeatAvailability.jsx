import React, { useState } from 'react';
import { Search, Train, Armchair, ChevronRight, Calendar, MapPin,  Filter, ArrowRightLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SeatAvailability = () => {
    const navigate = useNavigate();
    
    // Form State
    const [trainNo, setTrainNo] = useState('19038');
    const [fromStation, setFromStation] = useState('ST');
    const [toStation, setToStation] = useState('BVI');
    const [classType, setClassType] = useState('2A');
    const [quota, setQuota] = useState('GN');
    const [date, setDate] = useState('2025-12-22'); // Default as per request

    const [searchResult, setSearchResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const classOptions = [
        { value: '1A', label: 'First AC (1A)' },
        { value: '2A', label: 'AC 2 Tier (2A)' },
        { value: '3A', label: 'AC 3 Tier (3A)' },
        { value: 'SL', label: 'Sleeper (SL)' },
        { value: 'CC', label: 'Chair Car (CC)' },
        { value: 'EC', label: 'Exec. Chair Car (EC)' },
    ];

    const quotaOptions = [
        { value: 'GN', label: 'General (GN)' },
        { value: 'TQ', label: 'Tatkal (TQ)' },
        { value: 'LD', label: 'Ladies (LD)' },
    ];

    const handleSwapStations = () => {
        setFromStation(toStation);
        setToStation(fromStation);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setSearchResult(null);
        setLoading(true);

        // Validation
        if (!trainNo || !fromStation || !toStation || !date) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        // Format Date to YYYY-MM-DD (Input date is already in YYYY-MM-DD format usually)
        // Ensure standard format just in case
        const formattedDate = new Date(date).toISOString().split('T')[0];

        // URL Construction
        const url = `https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability?classType=${classType}&fromStationCode=${fromStation}&quota=${quota}&toStationCode=${toStation}&trainNo=${trainNo}&date=${formattedDate}`;
        
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
            
            console.log("API Result:", result);

            if (result && (result.data || result.status === true)) {
                 // API structure might vary, adapting to use provided data field or result directly if array
                 const data = Array.isArray(result.data) ? result.data : (Array.isArray(result) ? result : null);
                 
                 if (data) {
                    processResult(data);
                 } else {
                     // If structure is different but successful (e.g. single object)
                     // Fallback/Mock logic persists for demonstration if API fails to match specific criteria
                     throw new Error("No data found");
                 }
            } else {
                throw new Error(result.message || "Failed to fetch data");
            }

        } catch (err) {
            console.error(err);
             // Fallback to MOCK DATA as per User Request for verifying UI
             const mockData = [
                { ticket_fare: 720, catering_charge: 0, alt_cnf_seat: false, total_fare: 720, date: "22-12-2025", confirm_probability_percent: "", confirm_probability: "", current_status: "CURR_AVBL-0001" },
                { ticket_fare: 720, catering_charge: 0, alt_cnf_seat: false, total_fare: 720, date: "23-12-2025", confirm_probability_percent: "80", confirm_probability: "High", current_status: "RLWL10/WL2" },
                { ticket_fare: 720, catering_charge: 0, alt_cnf_seat: false, total_fare: 720, date: "24-12-2025", confirm_probability_percent: "", confirm_probability: "", current_status: "REGRET" },
                { ticket_fare: 720, catering_charge: 0, alt_cnf_seat: false, total_fare: 720, date: "25-12-2025", confirm_probability_percent: "82", confirm_probability: "High", current_status: "RLWL8/WL5" },
                { ticket_fare: 720, catering_charge: 0, alt_cnf_seat: false, total_fare: 720, date: "26-12-2025", confirm_probability_percent: "82", confirm_probability: "High", current_status: "RLWL8/WL5" },
                { ticket_fare: 720, catering_charge: 0, alt_cnf_seat: false, total_fare: 720, date: "27-12-2025", confirm_probability_percent: "", confirm_probability: "", current_status: "REGRET" }
            ];
            processResult(mockData);
        } finally {
            setLoading(false);
        }
    };

    const processResult = (data) => {
        const firstEntry = data[0] || {};
        const fare = firstEntry.total_fare || firstEntry.ticket_fare;
        
        setSearchResult({
            trainNumber: trainNo,
            from: fromStation,
            to: toStation,
            class: classType,
            availability: data,
            displayFare: fare ? `₹${fare}` : 'N/A'
        });
    };

    const getStatusColor = (status) => {
        if (!status) return 'bg-gray-100 text-gray-700';
        const s = status.toUpperCase();
        if (s.includes('CURR_AVBL') || s.includes('AVAILABLE') || s.includes('CNF')) return 'bg-green-100 text-green-700 border-green-200';
        if (s.includes('WL') || s.includes('RAC')) return 'bg-orange-100 text-orange-700 border-orange-200';
        if (s.includes('REGRET') || s.includes('NOT')) return 'bg-red-100 text-red-700 border-red-200';
        return 'bg-blue-100 text-blue-700 border-blue-200';
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[400px]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl">
                    <Armchair className="w-6 h-6 text-[#008BD0]" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#1C335C]">Seat Availability</h2>
                    <p className="text-sm text-gray-500">Check availability for specific class and quota</p>
                </div>
            </div>

            {/* Detailed Search Form */}
            <form onSubmit={handleSearch} className="mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Train Number */}
                    <div className="relative">
                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Train Number</label>
                        <div className="relative">
                            <Train className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. 19038"
                                value={trainNo}
                                onChange={(e) => setTrainNo(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none font-medium"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="relative">
                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Journey Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none font-medium text-gray-700"
                            />
                        </div>
                    </div>

                     {/* Class */}
                     <div className="relative">
                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Class</label>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                value={classType}
                                onChange={(e) => setClassType(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none font-medium appearance-none bg-white"
                            >
                                {classOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                     {/* Quota */}
                     <div className="relative">
                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Quota</label>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                value={quota}
                                onChange={(e) => setQuota(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none font-medium appearance-none bg-white"
                            >
                                {quotaOptions.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                     {/* From Station */}
                     <div className="md:col-span-5 relative">
                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">From Station Code</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. ST"
                                value={fromStation}
                                onChange={(e) => setFromStation(e.target.value.toUpperCase())}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none font-medium uppercase"
                            />
                        </div>
                    </div>

                    {/* Swap */}
                    <div className="md:col-span-2 flex justify-center">
                        <button 
                            type="button" 
                            onClick={handleSwapStations}
                            className="p-2.5 bg-gray-100 rounded-full hover:bg-gray-200 text-[#008BD0] transition-colors"
                        >
                            <ArrowRightLeft className="w-4 h-4" />
                        </button>
                    </div>

                    {/* To Station */}
                    <div className="md:col-span-5 relative">
                        <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">To Station Code</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. BVI"
                                value={toStation}
                                onChange={(e) => setToStation(e.target.value.toUpperCase())}
                                className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008BD0] focus:border-transparent outline-none font-medium uppercase"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#008BD0] text-white py-3.5 rounded-xl hover:bg-[#006ea8] transition-colors font-semibold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-4 h-4" />}
                    Check Seat Availability
                </button>

                {error && <p className="mt-3 text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-100"><span>⚠️</span> {error}</p>}
            </form>

            {/* Results Section */}
            {searchResult && (
                <div className="animate-fade-in-up">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-gray-100 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold text-[#1C335C]">Train #{searchResult.trainNumber}</h3>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">{searchResult.class} | {quota}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <span className="font-semibold">{searchResult.from}</span>
                                <ArrowRightLeft className="w-3 h-3" />
                                <span className="font-semibold">{searchResult.to}</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <span className="block text-sm text-gray-500">Total Fare</span>
                             <span className="text-2xl font-bold text-[#008BD0]">{searchResult.displayFare}</span>
                        </div>
                    </div>

                    {/* Extended Calendar View */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                             <h4 className="font-semibold text-[#1C335C] flex items-center gap-2"><Calendar className="w-4 h-4 text-[#008BD0]" /> Availability Forecast</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {searchResult.availability.map((day, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border-2 transition-all hover:shadow-md flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden min-h-[140px] ${getStatusColor(day.current_status)}`}>
                                <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">{day.date}</span>
                                
                                <span className="font-bold text-xl mb-2 break-normal leading-tight">{day.current_status}</span>
                                
                                {day.confirm_probability_percent && (
                                    <div className="w-full bg-white/40 rounded-full h-2 overflow-hidden mb-1">
                                        <div 
                                            className="h-full bg-current opacity-60" 
                                            style={{width: `${day.confirm_probability_percent}%`}}
                                        />
                                    </div>
                                )}
                                
                                {day.confirm_probability_percent && (
                                    <span className="text-xs font-semibold opacity-90">
                                        {day.confirm_probability_percent}% Chance
                                    </span>
                                )}

                                <button 
                                     onClick={() => navigate(`/book-ticket/${searchResult.trainNumber}`, {
                                        state: {
                                            train: {
                                                train_number: searchResult.trainNumber,
                                                train_name: `Train ${searchResult.trainNumber}`,
                                                from_station_name: searchResult.from,
                                                to_station_name: searchResult.to,
                                                from_std: '10:00', // Mock time
                                                to_std: '18:00',   // Mock time
                                                duration: '8h 00m' // Mock duration
                                            },
                                            date: day.date // Use specific date from the grid
                                        }
                                     })}
                                     className="mt-3 text-xs font-bold underline opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Book
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                        <button 
                            className="bg-[#1C335C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2a4a80] transition-colors flex items-center gap-2"
                             onClick={() => navigate(`/book-ticket/${searchResult.trainNumber}`, {
                                state: {
                                    train: {
                                        train_number: searchResult.trainNumber,
                                        train_name: `Train ${searchResult.trainNumber}`,
                                        from_station_name: searchResult.from,
                                        to_station_name: searchResult.to,
                                        from_std: '10:00', 
                                        to_std: '18:00',   
                                        duration: '8h 00m' 
                                    },
                                    date: date // Use the selected form date for the main button
                                }
                             })}
                        >
                            Proceed to Book <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatAvailability;
