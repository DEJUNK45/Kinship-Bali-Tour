
import React, { useState, useEffect } from 'react';
import { DailyPlan, Activity, Ticket } from '../types';
import { WeatherWidget } from './WeatherWidget';
import { findMatchingTicket } from '../services/ticketService';

const TicketDetailModal: React.FC<{ ticket: Ticket; onClose: () => void }> = ({ ticket, onClose }) => {
    const handleBook = () => {
        const message = `Halo Kinship Bali Tour, saya tertarik memesan tiket: ${ticket.title} seharga IDR ${ticket.price.toLocaleString('id-ID')}. Mohon info ketersediaannya.`;
        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-up" onClick={e => e.stopPropagation()}>
                <div className="relative h-64">
                    <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-stone-800 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold text-stone-800 shadow-sm uppercase tracking-wide">
                        {ticket.category}
                    </div>
                </div>
                
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold font-serif text-stone-800">{ticket.title}</h2>
                        <div className="flex items-center gap-1 text-yellow-500 font-bold">
                            <span>{ticket.rating}</span>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {ticket.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {ticket.duration}
                        </div>
                    </div>

                    <p className="text-stone-600 leading-relaxed mb-8">
                        {ticket.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-stone-100 pt-6">
                        <div>
                            <p className="text-xs text-stone-400 uppercase font-bold">Harga Tiket</p>
                            <p className="text-2xl font-bold text-teal-700">IDR {ticket.price.toLocaleString('id-ID')}</p>
                        </div>
                        <button 
                            onClick={handleBook}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-green-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Konfirmasi via WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const iconMap: Record<Activity['type'], React.ReactNode> = {
    Dining: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6c0 1.957.942 3.713 2.394 4.789V16.5a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-3.711A5.968 5.968 0 0016 8a6 6 0 00-6-6zM8.5 6a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V6zM5 8c0-1.05.37-2.02.97-2.828A.5.5 0 016.5 5h7a.5.5 0 01.53.672A3.98 3.98 0 0115 8H5zm1 5.5a.5.5 0 01.5-.5h6a.5.5 0 01.5.5v1h-7v-1z" /></svg>,
    Culture: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>,
    Adventure: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 3.636a1 1 0 011.414 0L10 7.172l3.536-3.536a1 1 0 111.414 1.414L11.414 8.586l3.536 3.535a1 1 0 11-1.414 1.414L10 9.999l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 8.586 5.05 5.05a1 1 0 010-1.414z" clipRule="evenodd" /></svg>,
    Relaxation: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zM10 8.5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0V9.25A.75.75 0 0110 8.5zM10 13.5a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z" /></svg>,
    Scenery: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.9-4.965.75.75 0 00-1.45-.398A8.529 8.529 0 0110 13a8.5 8.5 0 01-6.19-2.73.75.75 0 00-1.06-1.061A10.003 10.003 0 0010 14.5c1.84 0 3.56-.5 5.03-1.372l1.68-1.68A.75.75 0 0017.25 10a10.028 10.028 0 00-4.01-4.965L3.28 2.22zM10 5.5a4.5 4.5 0 00-4.5 4.5.75.75 0 001.5 0a3 3 0 013-3 .75.75 0 000-1.5z" clipRule="evenodd" /></svg>,
    Shopping: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.75 3.75a3 3 0 00-3 3v1.5h6v-1.5a3 3 0 00-3-3zM6.5 3.75a4.5 4.5 0 019 0v1.5h-10.5v-1.5c0-.442.069-.87.195-1.28a.75.75 0 011.45.39c-.085.29-.13.59-.13.89v1.5h.001zM4.75 10.5a.75.75 0 01.75-.75h9a.75.75 0 01.75.75v5.5a2 2 0 01-2 2h-6a2 2 0 01-2-2v-5.5z" /></svg>,
    Nightlife: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15.5zM3.75 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013.75 10zm10 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm-7.939 4.717a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm7.939-9.434a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM5.818 5.283a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L5.818 6.343a.75.75 0 010-1.06zm9.434 7.939a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM10 7a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" /></svg>,
};
const colorMap: Record<Activity['type'], string> = {
    Dining: 'text-red-500 bg-red-100',
    Culture: 'text-purple-500 bg-purple-100',
    Adventure: 'text-orange-500 bg-orange-100',
    Relaxation: 'text-sky-500 bg-sky-100',
    Scenery: 'text-green-500 bg-green-100',
    Shopping: 'text-pink-500 bg-pink-100',
    Nightlife: 'text-indigo-500 bg-indigo-100',
};

const timeEstimateMap: Record<string, { time: string; width: string; color: string }> = {
    Dining: { time: '± 1.5 Jam', width: '30%', color: 'bg-red-400' },
    Culture: { time: '± 2.5 Jam', width: '50%', color: 'bg-purple-400' },
    Adventure: { time: '± 4 Jam', width: '80%', color: 'bg-orange-400' },
    Relaxation: { time: '± 3 Jam', width: '60%', color: 'bg-sky-400' },
    Scenery: { time: '± 1 Jam', width: '20%', color: 'bg-green-400' },
    Shopping: { time: '± 2 Jam', width: '40%', color: 'bg-pink-400' },
    Nightlife: { time: '± 4 Jam', width: '80%', color: 'bg-indigo-400' },
};

const getTimeEstimate = (type: string) => {
    return timeEstimateMap[type] || { time: 'Flesibel', width: '30%', color: 'bg-stone-400' };
};

interface ItineraryDayCardProps {
    dayPlan: DailyPlan;
    tripStartDate: string;
    isEditing: boolean;
    onItineraryChange: (updatedPlan: DailyPlan) => void;
}

const getActivityImage = (activityName: string): string | null => {
  const name = activityName.toLowerCase();
  
  // Mapping common Bali keywords to Unsplash Image IDs
  const imageMap: Record<string, string> = {
    'pura': '1537996109728-2f8cb72165b8', // Temple
    'temple': '1555400038-132980d1b6e4', // Ulun Danu
    'uluwatu': '1552282706-c93d088c6683', // Cliff
    'tanah lot': '1604828221905-33c77f474989', // Tanah Lot
    'beach': '1537953773345-d172baef2da8', // Beach
    'pantai': '1537953773345-d172baef2da8',
    'seminyak': '1573790387438-4da905039392', // Sunset
    'canggu': '1565455511386-b196c2e62e01', // Surf
    'kuta': '1515994787989-8e427d221a3c', 
    'nusa dua': '1567594590876-a92f2c4854a5',
    'ubud': '1518548419284-d6e692550479', // Rice fields
    'tegalalang': '1518548419284-d6e692550479',
    'rice': '1518548419284-d6e692550479',
    'sawah': '1518548419284-d6e692550479',
    'monkey': '1536141873707-4d6d28257e06',
    'forest': '1536141873707-4d6d28257e06',
    'batur': '1552656966-558e60b21941', // Volcano
    'kintamani': '1552656966-558e60b21941',
    'waterfall': '1558266343-140015551559',
    'air terjun': '1558266343-140015551559',
    'coffee': '1570182075517-84c21654b96c',
    'kopi': '1570182075517-84c21654b96c',
    'market': '1575288418765-a38d5a158350',
    'pasar': '1575288418765-a38d5a158350',
    'shopping': '1575288418765-a38d5a158350',
    'gwk': '1634152962476-4b8a00e1915c',
    'penida': '1592396314873-7d1e586f7242',
    'diving': '1582992674997-019b0453d215',
    'snorkeling': '1582992674997-019b0453d215',
    'surf': '1505142468610-359e7d316be0',
    'yoga': '1586796676740-29b7f6458654',
    'spa': '1544161513-0179fe746f36',
    'massage': '1544161513-0179fe746f36'
  };

  for (const key in imageMap) {
    if (name.includes(key)) {
      // Optimized quality q=60 for thumbnails to improve performance
      return `https://images.unsplash.com/photo-${imageMap[key]}?auto=format&fit=crop&w=300&h=200&q=60`;
    }
  }
  
  return null;
};

const StarRating: React.FC<{ rating: number; onRate: (rating: number) => void }> = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="p-0.5 focus:outline-none transition-transform hover:scale-110"
          aria-label={`Beri bintang ${star}`}
          title={`Beri bintang ${star}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-colors duration-150 ${
              star <= (hoverRating || rating) ? 'text-yellow-400 fill-current' : 'text-stone-300'
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

const ActivityThumbnail: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0 relative w-full sm:w-40 h-48 sm:h-28 bg-stone-200 rounded-lg overflow-hidden shadow-md group">
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-200 animate-pulse">
                    <svg className="w-8 h-8 text-stone-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
            <img 
                src={src} 
                alt={alt} 
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

export const ItineraryDayCard: React.FC<ItineraryDayCardProps> = ({ dayPlan, tripStartDate, isEditing, onItineraryChange }) => {
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        const loadRatings = () => {
            const newRatings: Record<string, number> = {};
            dayPlan.activities.forEach((activity) => {
                const key = `rating_${dayPlan.day}_${activity.name.replace(/\s+/g, '_').toLowerCase()}`;
                const saved = localStorage.getItem(key);
                if (saved) {
                    newRatings[activity.name] = parseInt(saved, 10);
                }
            });
            setRatings(newRatings);
        };
        loadRatings();
    }, [dayPlan.day, dayPlan.activities]);
    
    const handleRate = (activityName: string, rating: number) => {
        const key = `rating_${dayPlan.day}_${activityName.replace(/\s+/g, '_').toLowerCase()}`;
        localStorage.setItem(key, rating.toString());
        setRatings(prev => ({ ...prev, [activityName]: rating }));
    };

    const handleActivityChange = (activityIndex: number, field: 'name' | 'description', value: string) => {
        const updatedActivities = dayPlan.activities.map((activity, index) => {
            if (index === activityIndex) {
                return { ...activity, [field]: value };
            }
            return activity;
        });
        onItineraryChange({ ...dayPlan, activities: updatedActivities });
    };

    const handleBookHotel = (hotelName: string) => {
        const checkIn = new Date(tripStartDate);
        checkIn.setDate(checkIn.getDate() + (dayPlan.day - 1));
        
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + 1);

        const formatDate = (d: Date) => d.toISOString().split('T')[0];

        const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotelName + ' Bali')}&checkin=${formatDate(checkIn)}&checkout=${formatDate(checkOut)}&group_adults=2&no_rooms=1&group_children=0`;
        window.open(url, '_blank');
    };

    const handleScrollToBooking = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Calculate the date for this specific day plan
    const currentDate = new Date(tripStartDate);
    currentDate.setDate(currentDate.getDate() + (dayPlan.day - 1));
    const dateString = currentDate.toISOString().split('T')[0];
    
    return (
        <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-stone-200 transition-shadow hover:shadow-xl mb-8">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div className="flex items-baseline gap-4">
                            <span className="bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded-full">Hari {dayPlan.day}</span>
                            <h3 className="text-2xl md:text-3xl font-bold font-serif text-stone-800">{dayPlan.title}</h3>
                        </div>
                        {/* Weather Widget Integration */}
                        {dayPlan.location && (
                            <div className="flex-shrink-0">
                                <WeatherWidget location={dayPlan.location} date={dateString} />
                            </div>
                        )}
                    </div>
                    
                    <p className="mt-2 text-stone-600">{dayPlan.summary}</p>
                </div>
                <div className="border-t border-stone-200">
                    <ul className="divide-y divide-stone-200">
                        {dayPlan.activities.map((activity, index) => {
                            const imageUrl = getActivityImage(activity.name);
                            const matchingTicket = findMatchingTicket(activity.name);

                            return (
                                <li key={index} className="p-6 hover:bg-stone-50 transition-colors">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${colorMap[activity.type]}`}>
                                            {iconMap[activity.type]}
                                        </div>
                                        
                                        {/* Text Content */}
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-baseline">
                                                {isEditing ? (
                                                    <input 
                                                        type="text"
                                                        value={activity.name}
                                                        onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                                                        className="font-bold text-lg text-stone-800 w-full p-1 border border-stone-300 rounded-md"
                                                    />
                                                ) : (
                                                    <h4 className="font-bold text-lg text-stone-800">{activity.name}</h4>
                                                )}
                                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorMap[activity.type]} ml-2 flex-shrink-0`}>{activity.type}</span>
                                            </div>
                                            {isEditing ? (
                                                <textarea 
                                                    value={activity.description}
                                                    onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                                                    rows={2}
                                                    className="mt-1 text-stone-600 w-full p-1 border border-stone-300 rounded-md"
                                                />
                                            ) : (
                                                <p className="mt-1 text-stone-600">{activity.description}</p>
                                            )}

                                            {/* Time Allocation Indicator */}
                                            <div className="mt-3 flex items-center gap-3 select-none">
                                                <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden" title="Estimasi Durasi">
                                                    <div 
                                                        className={`h-full rounded-full ${getTimeEstimate(activity.type).color}`} 
                                                        style={{ width: getTimeEstimate(activity.type).width }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-stone-400 font-medium flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {getTimeEstimate(activity.type).time}
                                                </span>
                                            </div>
                                            
                                            {!isEditing && (
                                                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-medium text-stone-400 uppercase tracking-wide">Beri Nilai:</span>
                                                        <StarRating 
                                                            rating={ratings[activity.name] || 0} 
                                                            onRate={(r) => handleRate(activity.name, r)} 
                                                        />
                                                    </div>
                                                    
                                                    {matchingTicket ? (
                                                        <button
                                                            onClick={() => setSelectedTicket(matchingTicket)}
                                                            className="text-xs font-bold text-white bg-orange-500 border border-orange-500 px-3 py-1.5 rounded-full hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-1"
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
                                                            Pesan Tiket
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={handleScrollToBooking}
                                                            className="text-xs font-bold text-teal-600 border border-teal-600 px-3 py-1.5 rounded-full hover:bg-teal-50 transition-colors"
                                                        >
                                                            Pesan Sekarang
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Thumbnail Image */}
                                        {imageUrl && !isEditing && (
                                            <ActivityThumbnail src={imageUrl} alt={activity.name} />
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                {/* Accommodation Section */}
                {dayPlan.accommodation && (
                    <div className="bg-blue-50 p-6 border-t border-blue-100">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-1">Rekomendasi Penginapan</h4>
                                    <h3 className="text-xl font-bold text-stone-800">{dayPlan.accommodation.name}</h3>
                                    <p className="text-stone-600 text-sm mt-1">{dayPlan.accommodation.description}</p>
                                </div>
                            </div>
                            
                            {!isEditing && (
                                <button 
                                    onClick={() => handleBookHotel(dayPlan.accommodation!.name)}
                                    className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm hover:shadow flex items-center gap-2 text-sm"
                                    title={`Booking ${dayPlan.accommodation.name}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    Pesan Hotel
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {selectedTicket && (
                <TicketDetailModal 
                    ticket={selectedTicket} 
                    onClose={() => setSelectedTicket(null)} 
                />
            )}
        </>
    );
};
