
import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';
import { getVehicles } from '../services/vehicleService';

interface RentalMarketplaceProps {
    onBack: () => void;
    initialFilter?: 'scooter' | 'car' | 'all';
    onSelectVehicle?: (vehicle: Vehicle) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className={`w-4 h-4 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const VehicleDetailModal: React.FC<{ vehicle: Vehicle; onClose: () => void; onSelect?: (v: Vehicle) => void }> = ({ vehicle, onClose, onSelect }) => {
    const [activeImage, setActiveImage] = useState(vehicle.imageUrl);
    const gallery = vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.imageUrl];

    const handleBook = () => {
        if (onSelect) {
            onSelect(vehicle);
            onClose();
            return;
        }

        const message = `Halo Kinship Bali Tour, saya tertarik untuk booking ${vehicle.name} (${vehicle.type === 'scooter' ? 'Sewa Motor' : 'Sewa Mobil'}) dengan harga IDR ${vehicle.price.toLocaleString('id-ID')}. Mohon info ketersediaannya.`;
        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up" onClick={e => e.stopPropagation()}>
                
                {/* Left: Gallery Section */}
                <div className="md:w-1/2 bg-stone-100 flex flex-col relative">
                    <button onClick={onClose} className="absolute top-4 left-4 z-10 md:hidden bg-white/80 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <div className="flex-grow relative overflow-hidden">
                        <img src={activeImage} alt={vehicle.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    
                    {/* Thumbnail Strip */}
                    <div className="p-4 flex gap-3 overflow-x-auto bg-white/50 backdrop-blur-md">
                        {gallery.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setActiveImage(img)}
                                className={`w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-teal-600 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info Section */}
                <div className="md:w-1/2 flex flex-col h-full overflow-y-auto custom-scrollbar">
                    <div className="p-8 relative">
                        <button onClick={onClose} className="hidden md:block absolute top-6 right-6 text-stone-400 hover:text-stone-800 transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="mb-6 pr-8">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${vehicle.type === 'scooter' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                {vehicle.type === 'scooter' ? 'Sepeda Motor' : 'Mobil + Supir'}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold font-serif text-stone-800 mb-2">{vehicle.name}</h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <StarRating rating={5} />
                                    <span className="text-sm text-stone-500 font-medium underline ml-2">{vehicle.reviews?.length || 0} Ulasan</span>
                                </div>
                                <div className="text-sm text-stone-400">•</div>
                                <div className="text-sm text-stone-600">{vehicle.passengers} Penumpang</div>
                            </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between bg-stone-50 p-4 rounded-xl border border-stone-100 mb-8">
                            <div>
                                <p className="text-stone-500 text-xs font-bold uppercase">Harga Sewa</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-bold text-teal-700">{vehicle.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                    <span className="text-sm text-stone-500">{vehicle.priceUnit}</span>
                                </div>
                            </div>
                            <button 
                                onClick={handleBook}
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                            >
                                {onSelect ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Pilih Kendaraan Ini
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                        Booking via WA
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-stone-800 mb-3">Tentang Kendaraan Ini</h3>
                            <p className="text-stone-600 leading-relaxed">{vehicle.description}</p>
                        </div>

                        {/* Specs Grid */}
                        {vehicle.specs && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-stone-800 mb-3">Spesifikasi</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {Object.entries(vehicle.specs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b border-stone-100 pb-2">
                                            <span className="text-stone-500 text-sm">{key}</span>
                                            <span className="text-stone-800 font-medium text-sm">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-stone-800 mb-3">Fitur & Fasilitas</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {vehicle.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-100">
                                        <div className="bg-green-100 rounded-full p-1 mr-3 flex-shrink-0">
                                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="border-t border-stone-200 pt-8">
                            <h3 className="text-lg font-bold text-stone-800 mb-6">Ulasan Pengguna</h3>
                            {vehicle.reviews && vehicle.reviews.length > 0 ? (
                                <div className="space-y-6">
                                    {vehicle.reviews.map((review) => (
                                        <div key={review.id} className="flex gap-4">
                                            <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full object-cover border border-stone-200" />
                                            <div>
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-bold text-stone-800">{review.user}</h4>
                                                    <span className="text-xs text-stone-400">{review.date}</span>
                                                </div>
                                                <StarRating rating={review.rating} />
                                                <p className="text-stone-600 text-sm mt-2">{review.comment}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-stone-500 italic">Belum ada ulasan untuk kendaraan ini.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const RentalMarketplace: React.FC<RentalMarketplaceProps> = ({ onBack, initialFilter = 'all', onSelectVehicle }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filter, setFilter] = useState<'all' | 'scooter' | 'car'>(initialFilter);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        setVehicles(getVehicles());
    }, []);

    const filteredVehicles = vehicles.filter(v => {
        const matchesType = filter === 'all' || v.type === filter;
        const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleBook = (e: React.MouseEvent, vehicle: Vehicle) => {
        e.stopPropagation();
        if (onSelectVehicle) {
            onSelectVehicle(vehicle);
            return;
        }

        const message = `Halo Kinship Bali Tour, saya tertarik untuk booking ${vehicle.name} (${vehicle.type === 'scooter' ? 'Sewa Motor' : 'Sewa Mobil'}) dengan harga IDR ${vehicle.price.toLocaleString('id-ID')}. Mohon info ketersediaannya.`;
        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button onClick={onBack} className="text-stone-500 hover:text-teal-600 flex items-center font-medium transition-colors self-start group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Kembali ke Rencana
                    </button>
                    
                    <h2 className="text-3xl font-bold font-serif text-stone-800">Pilih Kendaraan Anda</h2>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                     {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-3 bg-stone-50 border-transparent rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-inner"
                            placeholder="Cari nama kendaraan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="bg-stone-100 p-1 rounded-xl inline-flex">
                        {(['all', 'scooter', 'car'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                                    filter === type 
                                    ? 'bg-white text-teal-700 shadow-md scale-105' 
                                    : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200'
                                }`}
                            >
                                {type === 'all' ? 'Semua' : type === 'scooter' ? 'Motor' : 'Mobil'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVehicles.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-stone-500 bg-white rounded-2xl border-2 border-dashed border-stone-200">
                            <svg className="w-16 h-16 mx-auto text-stone-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <p className="text-lg font-medium text-stone-600">Tidak ada kendaraan yang ditemukan.</p>
                            <button onClick={() => {setSearchQuery(''); setFilter('all');}} className="mt-4 text-teal-600 font-bold hover:text-teal-700 transition-colors">
                                Reset Pencarian
                            </button>
                        </div>
                    ) : (
                        filteredVehicles.map((vehicle) => (
                            <div 
                                key={vehicle.id} 
                                onClick={() => setSelectedVehicle(vehicle)}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-stone-100 flex flex-col overflow-hidden cursor-pointer"
                            >
                                {/* Image Section */}
                                <div className="h-64 overflow-hidden relative bg-stone-200">
                                    <img 
                                        src={vehicle.imageUrl} 
                                        alt={vehicle.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-stone-800 uppercase tracking-wide shadow-sm flex items-center gap-2">
                                        {vehicle.type === 'scooter' ? (
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                            </svg>
                                        )}
                                        {vehicle.type === 'scooter' ? 'Motor' : 'Mobil'}
                                    </div>

                                    {/* Price Tag Overlay */}
                                    <div className="absolute bottom-0 right-0 bg-teal-600 text-white px-5 py-2 rounded-tl-2xl font-bold text-lg shadow-lg">
                                        {vehicle.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        <span className="text-xs font-normal opacity-90 ml-1">{vehicle.priceUnit}</span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    {/* Title & Rating */}
                                    <div className="mb-5">
                                        <h3 className="text-2xl font-bold text-stone-800 font-serif mb-1 leading-tight">{vehicle.name}</h3>
                                        <div className="flex items-center text-sm text-stone-500">
                                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                            <span className="font-bold text-stone-700 mr-1">4.9</span> 
                                            <span className="text-stone-400">({vehicle.reviews?.length || 5} ulasan)</span>
                                        </div>
                                    </div>
                                    
                                    {/* Quick Specs Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-5">
                                        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center justify-center gap-2 text-sm font-medium text-stone-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                            </svg>
                                            <span>{vehicle.passengers} Penumpang</span>
                                        </div>
                                        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center justify-center gap-2 text-sm font-medium text-stone-600">
                                            {vehicle.type === 'scooter' ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Matic</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Dengan Supir</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <p className="text-stone-600 text-sm mb-6 leading-relaxed flex-grow border-b border-stone-100 pb-4 line-clamp-3">
                                        {vehicle.description}
                                    </p>
                                    
                                    {/* Features Checklist - Limited to 3 for card view */}
                                    <div className="space-y-2 mb-6">
                                        {vehicle.features.slice(0, 3).map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-stone-600">
                                                <div className="bg-green-100 rounded-full p-0.5 mr-2 flex-shrink-0">
                                                     <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                        {vehicle.features.length > 3 && (
                                            <div className="text-xs text-teal-600 font-medium pl-6">
                                                + {vehicle.features.length - 3} fitur lainnya
                                            </div>
                                        )}
                                    </div>
                                    
                                    <button 
                                        onClick={(e) => handleBook(e, vehicle)}
                                        className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-stone-200 hover:shadow-stone-400 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                                    >
                                        {onSelectVehicle ? (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Pilih Kendaraan
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                                Pesan via WhatsApp
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedVehicle && (
                <VehicleDetailModal 
                    vehicle={selectedVehicle} 
                    onClose={() => setSelectedVehicle(null)} 
                    onSelect={onSelectVehicle}
                />
            )}
        </div>
    );
};
