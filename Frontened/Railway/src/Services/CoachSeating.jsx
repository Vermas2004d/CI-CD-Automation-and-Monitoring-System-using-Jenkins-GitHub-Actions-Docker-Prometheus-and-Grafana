import React, { useState } from 'react';
import { X, Train } from 'lucide-react';

const CoachSeating = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [imageModal, setImageModal] = useState(false);
  const [zoom, setZoom] = useState(1); // zoom factor (1 = 100%)

  // Realistic Indian Railways coach images
  const COACH_IMAGES = {
    '1A': 'https://etrain.info/images/coach-layout/1A.gif',
    '1A-LHB': 'https://etrain.info/images/coach-layout/1A-LHB.gif',
    'EC': 'https://etrain.info/images/coach-layout/EC.gif',
    'EC-LHB': 'https://etrain.info/images/coach-layout/EC-LHB.gif',
    'EA': 'https://etrain.info/images/coach-layout/EA.gif',
    'FC': 'https://etrain.info/images/coach-layout/FC.gif',
    '2A': 'https://etrain.info/images/coach-layout/2A.gif',
    '2A-LHB': 'https://etrain.info/images/coach-layout/2A-LHB.gif',
    '3A': 'https://etrain.info/images/coach-layout/3A.gif',
    '3A-GR': 'https://etrain.info/images/coach-layout/3A_GRB.gif',
    '3A-LHB': 'https://etrain.info/images/coach-layout/3A-LHB.gif',
    '3E': 'https://etrain.info/images/coach-layout/3E.gif',
    'AC-1A2A': 'https://etrain.info/images/coach-layout/1A-2A.gif',
    'AC-LHB': 'https://etrain.info/images/coach-layout/1A-2A-LHB.gif',
    'AC-1A3A': 'https://etrain.info/images/coach-layout/1A-3A.gif',
    'AC-2A3A': 'https://etrain.info/images/coach-layout/2A-3A.gif',
    'CC-T1': 'https://etrain.info/images/coach-layout/CC_1.gif',
    'CC-T2': 'https://etrain.info/images/coach-layout/CC_2.gif',
    'CC-GR': 'https://etrain.info/images/coach-layout/CC_GRB.gif',
    'CC-LHB': 'https://etrain.info/images/coach-layout/CC-LHB.gif',
    'CC-DD': 'https://etrain.info/images/coach-layout/CC_DD.gif',
    'SL': 'https://etrain.info/images/coach-layout/SL.gif',
    'SL-LHB': 'https://etrain.info/images/coach-layout/SL-LHB.gif',
    '2S': 'https://etrain.info/images/coach-layout/2S.gif',
    '2S-LHB': 'https://etrain.info/images/coach-layout/2S-LHB.gif',
  };

  const seatTypes = [
    { id: 1, name: 'AC First Class (1A)', code: '1A', color: 'bg-[#008BD0]' },
    { id: 2, name: 'AC First Class (LHB) (1A)', code: '1A-LHB', color: 'bg-[#006ea8]' },
    { id: 3, name: 'Executive Chair Car (EC)', code: 'EC', color: 'bg-purple-600' },
    { id: 4, name: 'Executive Chair Car (LHB) (EC)', code: 'EC-LHB', color: 'bg-purple-700' },
    { id: 5, name: 'Executive Anubhuti (EA)', code: 'EA', color: 'bg-pink-600' },
    { id: 6, name: 'First Class (Non-AC) (FC)', code: 'FC', color: 'bg-amber-600' },
    { id: 7, name: 'AC 2 Tier (2A)', code: '2A', color: 'bg-green-600' },
    { id: 8, name: 'AC 2 Tier (LHB) (2A)', code: '2A-LHB', color: 'bg-green-700' },
    { id: 9, name: 'AC 3 Tier (3A)', code: '3A', color: 'bg-cyan-600' },
    { id: 10, name: 'AC 3 Tier (Garib Rath) (3A)', code: '3A-GR', color: 'bg-cyan-700' },
    { id: 11, name: 'AC 3 Tier (LHB) (3A)', code: '3A-LHB', color: 'bg-cyan-800' },
    { id: 12, name: 'AC 3 Tier Economy (3E)', code: '3E', color: 'bg-teal-600' },
    { id: 13, name: 'AC First Class cum AC 2 Tier (1A + 2A)', code: 'AC-1A2A', color: 'bg-teal-600' },
    { id: 14, name: 'AC First Class cum AC 2 Tier (LHB) (1A + 2A)', code: 'AC-LHB', color: 'bg-teal-600' },
    { id: 15, name: 'AC First Class cum AC 3 Tier (1A + 3A)', code: 'AC-1A3A', color: 'bg-teal-600' },
    { id: 16, name: 'AC First Class cum AC 3 Tier (2A + 3A)', code: 'AC-2A3A', color: 'bg-teal-600' },
    { id: 17, name: 'AC Chair Car (Type-1) (CC)', code: 'CC-T1', color: 'bg-orange-600' },
    { id: 18, name: 'AC Chair Car (Type-2) (CC)', code: 'CC-T2', color: 'bg-orange-700' },
    { id: 20, name: 'AC Chair Car (LHB) (CC)', code: 'CC-LHB', color: 'bg-yellow-700' },
    { id: 21, name: 'AC Chair Car (Double Decker) (CC)', code: 'CC-DD', color: 'bg-red-600' },
    { id: 22, name: 'Sleeper Class (SL)', code: 'SL', color: 'bg-gray-600' },
    { id: 23, name: 'Sleeper Class (LHB) (SL)', code: 'SL-LHB', color: 'bg-gray-700' },
    { id: 24, name: 'Second Seating (2S)', code: '2S', color: 'bg-slate-600' },
    { id: 25, name: 'Second Seating (LHB) (2S)', code: '2S-LHB', color: 'bg-slate-800' },
  ];

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
    setZoom(1);
    setImageModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedSeat(null), 300);
  };

  const openImageModal = () => {
    setZoom(1);
    setImageModal(true);
  };

  const closeImageModal = () => {
    setImageModal(false);
  };

  const seatLayout = (seatType) => {
    const layouts = {
      '1A': { rows: 8, cols: 2 }, '1A-LHB': { rows: 8, cols: 2 },
      'EC': { rows: 10, cols: 2 }, 'EC-LHB': { rows: 10, cols: 2 },
      'EA': { rows: 8, cols: 2 }, 'FC': { rows: 12, cols: 3 },
      '2A': { rows: 16, cols: 4 }, '2A-LHB': { rows: 16, cols: 4 },
      '3A': { rows: 24, cols: 6 }, '3A-GR': { rows: 24, cols: 6 }, '3A-LHB': { rows: 24, cols: 6 },
      '3E': { rows: 24, cols: 6 },
      'CC-T1': { rows: 20, cols: 5 }, 'CC-T2': { rows: 20, cols: 5 },
      'CC-LHB': { rows: 20, cols: 5 }, 'CC-DD': { rows: 24, cols: 5 },
      'SL': { rows: 24, cols: 6 }, 'SL-LHB': { rows: 24, cols: 6 },
      '2S': { rows: 40, cols: 8 }, '2S-JS': { rows: 40, cols: 8 }, '2S-LHB': { rows: 40, cols: 8 },
    };
    return layouts[seatType] || { rows: 10, cols: 4 };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1C335C] mb-2">Coach Seating Layout</h2>
        <p className="text-gray-600 text-sm">Click on any coach type to view the detailed seating arrangement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {seatTypes.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            className={`${seat.color} hover:shadow-lg hover:scale-105 transition-all duration-300 text-white font-semibold py-4 px-4 rounded-lg flex items-center gap-3 group`}
          >
            <Train className="w-6 h-6" />
            <div className="text-left flex-1">
              <div className="text-sm font-semibold">{seat.name}</div>
              <div className="text-xs opacity-90">{seat.code}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Real Image Modal with Zoom Controls */}
      {imageModal && selectedSeat && (
        <>
          <div className="fixed inset-0 bg-black/80 z-50" onClick={closeImageModal} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-8" onWheel={(e) => {
            // ctrl+wheel (native browser zoom) ignored; use plain wheel for zoom
            e.stopPropagation();
            const delta = e.deltaY < 0 ? 0.05 : -0.05;
            setZoom(z => Math.min(2, Math.max(0.5, +(z + delta).toFixed(2))));
          }}>
            <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b bg-white/90 backdrop-blur z-10">
                <div className="flex items-center gap-3">
                  <Train className="w-5 h-5 text-[#008BD0]" />
                  <div className="text-sm font-semibold text-[#1C335C]">{selectedSeat.name} <span className="text-[#008BD0] font-normal">({selectedSeat.code})</span></div>
                </div>
                <button
                  onClick={closeImageModal}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition shadow"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Image viewport */}
              <div className="flex-1 relative bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="transition-transform duration-150 ease-out"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  >
                    <img
                      src={COACH_IMAGES[selectedSeat.code] || 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Indian_Railways_AC_3_Tier_coach.jpg'}
                      alt={`${selectedSeat.name} Real Interior`}
                      className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg border-4 border-white"
                      onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Indian_Railways_AC_3_Tier_coach.jpg'; }}
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Gradient overlay bottom label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-5 py-2 rounded-full text-sm font-medium pointer-events-none">
                  {selectedSeat.code} • Interior View
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 px-4 py-3 bg-white border-t">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2)))}
                    className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
                    aria-label="Zoom Out"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(z => Math.min(2, +(z + 0.1).toFixed(2)))}
                    className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
                    aria-label="Zoom In"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="px-3 py-2 rounded-lg bg-[#008BD0] hover:bg-[#006ea8] text-white text-sm font-semibold"
                    aria-label="Reset Zoom"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <input
                    type="range"
                    min={50}
                    max={200}
                    value={Math.round(zoom * 100)}
                    onChange={(e) => setZoom(+e.target.value / 100)}
                    className="w-full accent-[#008BD0]"
                    aria-label="Zoom Slider"
                  />
                  <div className="w-16 text-center text-sm font-medium text-[#1C335C]">{Math.round(zoom * 100)}%</div>
                </div>
                <div className="text-xs text-gray-500 md:text-right">
                  Scroll wheel or pinch (trackpad) to zoom.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(0); opacity: 1; } to { transform: translateY(40px); opacity: 0; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-fadeOut { animation: fadeOut 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-slideDown { animation: slideDown 0.3s ease-in; }
      `}</style>
    </div>
  );
};

export default CoachSeating;