
import React, { useState } from 'react';
import { ItineraryPreferences } from '../types';

interface PlannerProps {
  onGenerate: (preferences: ItineraryPreferences) => void;
  isLoading: boolean;
}

const interestOptions = [
  'Budaya & Sejarah', 'Petualangan & Alam', 'Yoga & Kesehatan', 
  'Pantai & Relaksasi', 'Kuliner', 'Kehidupan Malam & Pesta',
  'Belanja', 'Ramah Keluarga',
  'Surfing', 'Diving', 'Photography', 'Wellness Retreats'
];

const BudgetItem: React.FC<{label: string, selected: boolean, onClick: () => void}> = ({ label, selected, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 text-center py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? 'bg-teal-600 border-teal-600 text-white shadow-md'
          : 'bg-white border-stone-300 hover:border-teal-500'
      }`}
    >
      {label}
    </button>
);

const InterestPill: React.FC<{label: string, selected: boolean, onClick: () => void}> = ({ label, selected, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
            selected 
            ? 'bg-teal-600 border-teal-600 text-white'
            : 'bg-stone-100 border-stone-300 hover:border-teal-500 hover:text-teal-600'
        }`}
    >
        {label}
    </button>
);

export const Planner: React.FC<PlannerProps> = ({ onGenerate, isLoading }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [duration, setDuration] = useState<number>(7);
  const [travelers, setTravelers] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>(today);
  const [budget, setBudget] = useState<'Budget' | 'Mid-range' | 'Luxury'>('Mid-range');
  const [interests, setInterests] = useState<string[]>([]);
  const [mustSees, setMustSees] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.length === 0) {
      setError('Silakan pilih setidaknya satu minat.');
      return;
    }
    setError(null);
    onGenerate({ duration, travelers, budget, interests, mustSees, startDate });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-stone-800">Rencanakan Liburan Sempurna Anda</h2>
          <p className="text-lg text-stone-600 mt-2">Beri tahu kami gaya perjalanan Anda, dan AI kami akan melakukan sisanya.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Duration, Travelers, Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-stone-700 mb-2">Tanggal Mulai</label>
              <input type="date" id="startDate" value={startDate} min={today} onChange={e => setStartDate(e.target.value)} className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" required />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-stone-700 mb-2">Berapa hari?</label>
              <input type="number" id="duration" value={duration} onChange={e => setDuration(Math.max(1, parseInt(e.target.value)))} min="1" max="30" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-stone-700 mb-2">Berapa orang?</label>
              <input type="number" id="travelers" value={travelers} onChange={e => setTravelers(Math.max(1, parseInt(e.target.value)))} min="1" max="20" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Apa gaya anggaran Anda?</label>
            <div className="flex gap-4">
              <BudgetItem label="Hemat" selected={budget === 'Budget'} onClick={() => setBudget('Budget')} />
              <BudgetItem label="Menengah" selected={budget === 'Mid-range'} onClick={() => setBudget('Mid-range')} />
              <BudgetItem label="Mewah" selected={budget === 'Luxury'} onClick={() => setBudget('Luxury')} />
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Apa minat Anda?</label>
             {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex flex-wrap gap-3">
              {interestOptions.map(interest => (
                <InterestPill key={interest} label={interest} selected={interests.includes(interest)} onClick={() => toggleInterest(interest)} />
              ))}
            </div>
          </div>

          {/* Must-Sees */}
          <div>
            <label htmlFor="mustSees" className="block text-sm font-medium text-stone-700 mb-2">Ada tempat atau aktivitas yang wajib dikunjungi? (Opsional)</label>
            <textarea id="mustSees" value={mustSees} onChange={e => setMustSees(e.target.value)} rows={3} placeholder="contoh: Pura Uluwatu, pendakian matahari terbit Gunung Batur" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500" />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center w-full md:w-auto mx-auto">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyusun Petualangan Anda...
                </>
              ) : (
                'Buat Rencana Perjalanan Kustom Saya'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};