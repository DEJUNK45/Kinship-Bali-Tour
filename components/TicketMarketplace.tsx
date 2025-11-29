
import React, { useState } from 'react';
import { Ticket } from '../types';
import { getTickets } from '../services/ticketService';

interface TicketMarketplaceProps {
    onBack: () => void;
}

const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
    const handleBook = () => {
        const message = `Halo Kinship Bali Tour, saya tertarik memesan tiket: ${ticket.title} seharga IDR ${ticket.price.toLocaleString('id-ID')}. Mohon info ketersediaannya.`;
        const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={ticket.image} 
                    alt={ticket.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-stone-800 shadow-sm uppercase tracking-wide">
                    {ticket.category}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-stone-800 font-serif leading-tight">{ticket.title}</h3>
                </div>
                
                <div className="flex items-center text-xs text-stone-500 mb-3">
                    <svg className="w-3 h-3 mr-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {ticket.location}
                    <span className="mx-2">•</span>
                    <svg className="w-3 h-3 mr-1 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {ticket.duration}
                </div>

                <p className="text-sm text-stone-600 mb-4 line-clamp-2 flex-grow">{ticket.description}</p>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-stone-400">Mulai dari</p>
                        <p className="text-lg font-bold text-orange-600">IDR {ticket.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button 
                        onClick={handleBook}
                        className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-1 shadow-md"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
                        Pesan
                    </button>
                </div>
            </div>
        </div>
    );
};

export const TicketMarketplace: React.FC<TicketMarketplaceProps> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
    const tickets = getTickets();

    const categories = ['Semua', 'Attraction', 'Adventure', 'Culture', 'Nature', 'Water Sport'];

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              ticket.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Semua' || ticket.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button onClick={onBack} className="text-stone-500 hover:text-teal-600 flex items-center font-medium transition-colors self-start group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Kembali
                    </button>
                    <h2 className="text-3xl font-bold font-serif text-stone-800">Tiket Wisata & Aktivitas</h2>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                    <div className="relative w-full lg:w-96">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-3 bg-stone-50 border-transparent rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-inner"
                            placeholder="Cari aktivitas atau lokasi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    selectedCategory === category
                                    ? 'bg-teal-600 text-white shadow-md'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-800'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTickets.length > 0 ? (
                        filteredTickets.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-stone-500 bg-white rounded-2xl border-2 border-dashed border-stone-200">
                            <svg className="w-16 h-16 mx-auto text-stone-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <p className="text-lg font-medium text-stone-600">Tidak ada tiket yang ditemukan.</p>
                            <button onClick={() => {setSearchTerm(''); setSelectedCategory('Semua');}} className="mt-4 text-teal-600 font-bold hover:text-teal-700 transition-colors">
                                Reset Pencarian
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
