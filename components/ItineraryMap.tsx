
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { DailyPlan } from '../types';

// Declare Leaflet global types since we're using it from CDN
declare const L: any;

interface ItineraryMapProps {
  dailyPlans: DailyPlan[];
  onUpdatePlan: (updatedPlan: DailyPlan) => void;
}

const BALI_CENTER: [number, number] = [-8.409518, 115.188919];

const REAL_COORDS: Record<string, { lat: number; lng: number }> = {
  'Lovina': { lat: -8.1690, lng: 115.0289 },
  'Singaraja': { lat: -8.1120, lng: 115.0882 },
  'Munduk': { lat: -8.2750, lng: 115.0583 },
  'Bedugul': { lat: -8.2752, lng: 115.1668 },
  'Kintamani': { lat: -8.2476, lng: 115.3312 },
  'Amed': { lat: -8.3350, lng: 115.6450 },
  'Besakih': { lat: -8.3743, lng: 115.4509 },
  'Candidasa': { lat: -8.5000, lng: 115.5667 },
  'Sidemen': { lat: -8.4833, lng: 115.4333 },
  'Ubud': { lat: -8.5069, lng: 115.2625 },
  'Tegallalang': { lat: -8.4299, lng: 115.2823 },
  'Tanah Lot': { lat: -8.6212, lng: 115.0868 },
  'Canggu': { lat: -8.6478, lng: 115.1385 },
  'Seminyak': { lat: -8.6829, lng: 115.1613 },
  'Kuta': { lat: -8.7233, lng: 115.1723 },
  'Sanur': { lat: -8.6705, lng: 115.2609 },
  'Jimbaran': { lat: -8.7715, lng: 115.1677 },
  'Nusa Dua': { lat: -8.8036, lng: 115.2312 },
  'Uluwatu': { lat: -8.8149, lng: 115.0884 },
  'Ungasan': { lat: -8.8358, lng: 115.1605 },
  'Nusa Penida': { lat: -8.7278, lng: 115.5444 },
};

export const ItineraryMap: React.FC<ItineraryMapProps> = ({ dailyPlans, onUpdatePlan }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  const [filterDay, setFilterDay] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = useMemo(() => {
      return dailyPlans.filter(plan => {
          const matchesDay = filterDay === 'all' || plan.day === filterDay;
          const matchesSearch = plan.location.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesDay && matchesSearch;
      });
  }, [dailyPlans, filterDay, searchTerm]);

  const getCoordinates = (plan: DailyPlan) => {
    if (plan.coordinates) {
      return plan.coordinates;
    }
    
    const normalized = plan.location.replace(/^(Mount|Lake|Pura) /, '').trim();
    
    // Check exact match
    if (REAL_COORDS[normalized]) return REAL_COORDS[normalized];
    
    // Check partial match
    const key = Object.keys(REAL_COORDS).find(k => normalized.includes(k) || k.includes(normalized));
    if (key) return REAL_COORDS[key];
    
    // Default to center of Bali if completely unknown
    return { lat: -8.5069, lng: 115.2625 };
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: BALI_CENTER,
        zoom: 9,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
      setIsMapReady(true);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create icon class
    const MarkerIcon = L.Icon.extend({
        options: {
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40],
        }
    });

    // Add Markers
    const bounds = L.latLngBounds([]);

    filteredPlans.forEach((plan) => {
      const coords = getCoordinates(plan);
      
      // Custom HTML Icon for numbered markers
      const htmlIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: #f97316; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${plan.day}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });

      const marker = L.marker([coords.lat, coords.lng], {
        icon: htmlIcon,
        draggable: true,
        title: `Hari ${plan.day}: ${plan.location}`
      }).addTo(map);

      // Create Popup DOM element
      const popupContainer = document.createElement('div');
      popupContainer.className = 'font-sans text-center min-w-[200px]';

      const title = document.createElement('h3');
      title.className = 'font-bold text-lg text-stone-800 mb-2';
      title.innerText = `Hari ${plan.day}`;
      popupContainer.appendChild(title);

      const formGroup = document.createElement('div');
      formGroup.className = 'mb-3 text-left';

      const label = document.createElement('label');
      label.className = 'block text-xs font-medium text-stone-500 mb-1';
      label.innerText = 'Lokasi:';
      formGroup.appendChild(label);

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'w-full p-2 text-sm border border-stone-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all';
      input.value = plan.location;
      // Prevent event propagation to map when typing/clicking input
      input.onmousedown = (e) => e.stopPropagation();
      input.ondblclick = (e) => e.stopPropagation();
      formGroup.appendChild(input);
      popupContainer.appendChild(formGroup);

      const saveButton = document.createElement('button');
      saveButton.className = 'bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-teal-700 transition-colors w-full';
      saveButton.innerText = 'Simpan Perubahan';
      saveButton.onclick = () => {
        const newLocation = input.value.trim();
        if (newLocation && newLocation !== plan.location) {
          onUpdatePlan({ ...plan, location: newLocation });
          // Note: Updating plan will likely re-render parent and recreate markers, effectively closing popup
        }
      };
      popupContainer.appendChild(saveButton);

      const hint = document.createElement('p');
      hint.className = 'text-xs text-stone-400 mt-3 italic border-t border-stone-100 pt-2';
      hint.innerText = 'Geser marker untuk ubah koordinat';
      popupContainer.appendChild(hint);

      marker.bindPopup(popupContainer);

      marker.on('dragend', (event: any) => {
        const newPos = event.target.getLatLng();
        onUpdatePlan({
          ...plan,
          coordinates: { lat: newPos.lat, lng: newPos.lng }
        });
      });

      markersRef.current.push(marker);
      bounds.extend([coords.lat, coords.lng]);
    });

    // Fit bounds if there are markers
    if (markersRef.current.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
        // Cleanup if needed
    };
  }, [filteredPlans, onUpdatePlan]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden mb-8">
      <div className="bg-teal-50 p-4 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-teal-800 flex items-center font-serif">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Peta Rute Interaktif
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="p-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
            >
                <option value="all">Semua Hari</option>
                {dailyPlans.map(plan => (
                    <option key={plan.day} value={plan.day}>Hari {plan.day}</option>
                ))}
            </select>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari lokasi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 pl-8 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none w-full sm:w-48"
                />
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2.5 top-2.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>
      </div>
      
      <div className="relative w-full h-[450px] bg-stone-100">
        <div ref={mapContainerRef} className="w-full h-full z-10" />
        
        {!isMapReady && (
           <div className="absolute inset-0 flex items-center justify-center bg-stone-100 z-20">
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                 <p className="text-stone-500 text-sm font-medium">Memuat Peta...</p>
              </div>
           </div>
        )}
      </div>
      
      <div className="px-4 py-2 bg-stone-50 text-xs text-stone-500 text-center border-t border-stone-100">
        *Klik marker untuk edit nama lokasi, atau geser untuk ubah posisi.
      </div>
    </div>
  );
};
