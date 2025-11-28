import React from 'react';

interface HeroProps {
  onStartPlanning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning }) => {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/id/1060/1600/1200"
          alt="Beautiful Bali landscape with a beach and cliffs"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-serif leading-tight tracking-wide">
          Mimpi Bali Personal Anda
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8 font-light text-stone-200">
          Berhenti menelusuri blog perjalanan tanpa akhir. Biarkan AI kami menyusun rencana perjalanan unik berdasarkan minat, kecepatan, dan harga Anda.
        </p>
        <button
          onClick={onStartPlanning}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Buat Rencana Perjalanan Saya
        </button>
      </div>
    </div>
  );
};