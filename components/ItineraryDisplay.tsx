
import React from 'react';
import { Itinerary, DailyPlan, ItineraryPreferences, Vehicle } from '../types';
import { ItineraryDayCard } from './ItineraryDayCard';
import { ItineraryMap } from './ItineraryMap';

interface ItineraryDisplayProps {
  isLoading: boolean;
  itinerary: Itinerary | null;
  preferences: ItineraryPreferences | null;
  selectedVehicle: Vehicle | null;
  error: string | null;
  isEditing: boolean;
  onEditToggle: () => void;
  onUpdateItinerary: (updatedPlan: DailyPlan) => void;
  onInitiateBooking: () => void;
  onViewRentals: (filter: 'scooter' | 'car') => void;
}

const LoadingState: React.FC = () => {
    const messages = [
        "Berkonsultasi dengan monyet pura...",
        "Menemukan tempat selancar terbaik...",
        "Menyempurnakan tur perkebunan kopi Anda...",
        "Memetakan sawah yang tenang...",
        "Mencicipi sate virtual untuk Anda...",
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 2500);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="text-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-500 mx-auto"></div>
            <h3 className="text-2xl font-semibold mt-6 text-stone-700">Petualangan Bali Anda sedang dibuat!</h3>
            <p className="text-stone-500 mt-2">{message}</p>
        </div>
    );
};

interface TransportInfoProps {
    onNavigate: (type: 'scooter' | 'car') => void;
}

const TransportInfo: React.FC<TransportInfoProps> = ({ onNavigate }) => (
    <div className="mt-12 bg-white rounded-xl shadow-lg p-6 md:p-8 border border-stone-200">
        <div className="flex items-center border-b border-stone-100 pb-4 mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.806-.984L15 7m0 13V7" />
            </svg>
            <h3 className="text-2xl font-bold font-serif text-stone-800">Saran Transportasi Lokal</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Scooter */}
            <div 
                onClick={() => onNavigate('scooter')}
                className="group bg-stone-50 p-5 rounded-xl border border-stone-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 flex flex-col cursor-pointer relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 bg-teal-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">POPULER</div>
                <div className="flex items-center mb-3">
                    <div className="bg-orange-100 p-3 rounded-full mr-3 text-orange-600 group-hover:bg-orange-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h4 className="font-bold text-lg text-stone-800 group-hover:text-teal-700 transition-colors">Sewa Motor</h4>
                </div>
                <p className="text-sm text-stone-600 mb-4 leading-relaxed flex-grow">
                    Cara paling fleksibel untuk menjelajahi Bali, terutama area macet seperti Canggu. Tersedia berbagai tipe motor.
                </p>
                <div className="pt-3 border-t border-stone-200 group-hover:border-stone-300">
                    <span className="block text-xs text-stone-500 uppercase font-semibold tracking-wider">Biaya Sewa</span>
                    <span className="text-teal-700 font-bold">IDR 75rb - 150rb <span className="text-sm font-normal">/ hari</span></span>
                </div>
            </div>

             {/* Private Driver */}
            <div 
                onClick={() => onNavigate('car')}
                className="group bg-stone-50 p-5 rounded-xl border border-stone-100 hover:shadow-lg hover:border-teal-200 transition-all duration-300 flex flex-col cursor-pointer"
            >
                <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-3 rounded-full mr-3 text-blue-600 group-hover:bg-blue-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h4 className="font-bold text-lg text-stone-800 group-hover:text-teal-700 transition-colors">Mobil + Supir</h4>
                </div>
                <p className="text-sm text-stone-600 mb-4 leading-relaxed flex-grow">
                    Tur seharian dengan nyaman. Supir lokal berpengalaman yang juga bisa menjadi pemandu wisata Anda.
                </p>
                <div className="pt-3 border-t border-stone-200 group-hover:border-stone-300">
                    <span className="block text-xs text-stone-500 uppercase font-semibold tracking-wider">Biaya Sewa</span>
                    <span className="text-teal-700 font-bold">IDR 600rb <span className="text-sm font-normal">/ 10 jam</span></span>
                </div>
            </div>

        </div>

        <div className="mt-6 text-center">
            <p className="text-xs text-stone-500 italic">
                * Catatan: Harga yang tertera adalah estimasi dan dapat bervariasi tergantung pada durasi sewa, model kendaraan, dan musim liburan.
            </p>
        </div>
    </div>
);


export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ 
    isLoading, 
    itinerary, 
    preferences,
    selectedVehicle,
    error,
    isEditing,
    onEditToggle,
    onUpdateItinerary,
    onInitiateBooking,
    onViewRentals
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 border-l-4 border-red-500 text-red-700">
          <h3 className="text-xl font-bold">Ups! Terjadi kesalahan.</h3>
          <p className="mt-2">{error}</p>
        </div>
      );
    }

    if (itinerary && preferences) {
      return (
        <div className="space-y-8">
            {/* Title Section */}
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-stone-200">
                <h2 className="text-4xl md:text-5xl font-bold font-serif text-teal-700">{itinerary.title}</h2>
                <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">{itinerary.overall_summary}</p>
            </div>

            {/* 2-Column Layout for Large Screens */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column: Map (Sticky on Desktop) */}
                <div className="lg:col-span-5 lg:sticky lg:top-24 z-30">
                    <ItineraryMap 
                        dailyPlans={itinerary.daily_plans} 
                        onUpdatePlan={onUpdateItinerary}
                    />
                </div>

                {/* Right Column: Daily Plans List */}
                <div className="lg:col-span-7 space-y-8">
                    {itinerary.daily_plans.map(dayPlan => (
                        <ItineraryDayCard 
                            key={dayPlan.day} 
                            dayPlan={dayPlan} 
                            tripStartDate={preferences.startDate}
                            isEditing={isEditing}
                            onItineraryChange={onUpdateItinerary}
                        />
                    ))}
                </div>
            </div>

            <TransportInfo onNavigate={onViewRentals} />

            {/* Final Action Buttons (Moved to Bottom) */}
            <div className="mt-12 bg-gradient-to-r from-stone-50 to-stone-100 rounded-xl shadow-lg p-8 border border-stone-200 text-center">
                <h3 className="text-2xl font-bold font-serif text-stone-800 mb-3">Siap untuk Berangkat?</h3>
                <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
                    Pastikan rencana perjalanan Anda sudah sesuai impian. Anda dapat mengubah detail aktivitas atau langsung melanjutkan ke proses pemesanan aman kami.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                    <button 
                        onClick={onEditToggle}
                        className={`flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 ${
                            isEditing 
                            ? 'bg-stone-800 text-white hover:bg-stone-900' 
                            : 'bg-white text-teal-700 border-2 border-teal-100 hover:border-teal-500 hover:bg-teal-50'
                        }`}
                    >
                        {isEditing ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Simpan Perubahan
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Rencana Perjalanan
                            </>
                        )}
                    </button>

                    {!isEditing && (
                        <button 
                            onClick={onInitiateBooking}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-200 hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            Pesan Perjalanan Ini
                        </button>
                    )}
                </div>
            </div>
        </div>
      );
    }
    
    return null; // Don't show anything if there's no action yet
  };

  return (
    <section className="py-16 md:py-24 bg-stone-100 min-h-[50vh]">
      {/* Increased max-width to 7xl to accommodate the 2-column layout better */}
      <div className="container mx-auto px-6 max-w-7xl">
        {renderContent()}
      </div>
    </section>
  );
};
