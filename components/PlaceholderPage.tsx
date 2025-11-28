
import React, { useState, useMemo, useEffect } from 'react';

interface Place {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  category: string;
  description: string;
  priceRange?: string;
  tags: string[];
}

const HOTELS_DATA: Place[] = [
  {
    id: 'h1',
    title: 'Padma Resort Ubud',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 5,
    reviewCount: 3240,
    location: 'Payangan, Ubud',
    category: 'Resor Mewah',
    description: 'Resor mewah yang tersembunyi di lembah sungai yang rimbun, menawarkan kolam renang infinity air hangat yang ikonik dan pemandangan hutan yang menakjubkan.',
    priceRange: 'IDR 3.500.000+',
    tags: ['Infinity Pool', 'Spa', 'Hutan', 'Sarapan Gratis']
  },
  {
    id: 'h2',
    title: 'Potato Head Suites',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 1890,
    location: 'Seminyak',
    category: 'Boutique Hotel',
    description: 'Sanctuary budaya modern di Seminyak. Menampilkan arsitektur bata merah yang ikonik, akses langsung ke klub pantai, dan komitmen nol-limbah.',
    priceRange: 'IDR 4.200.000+',
    tags: ['Tepi Pantai', 'Desain Unik', 'Nightlife', 'Seni']
  },
  {
    id: 'h3',
    title: 'Green Village Bali',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 560,
    location: 'Abiansemal',
    category: 'Eco Villa',
    description: 'Komunitas rumah bambu yang unik di sepanjang Sungai Ayung. Pengalaman menginap yang benar-benar menyatu dengan alam dengan desain arsitektur bambu yang spektakuler.',
    priceRange: 'IDR 5.000.000+',
    tags: ['Eco-friendly', 'Arsitektur Bambu', 'Tenang', 'Sungai']
  },
  {
    id: 'h4',
    title: 'Hard Rock Hotel Bali',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 5100,
    location: 'Kuta',
    category: 'Family Resort',
    description: 'Hotel hiburan terkemuka di Bali yang terletak tepat di Pantai Kuta. Surga bagi keluarga dengan kolam renang besar, seluncuran air, dan klub anak-anak.',
    priceRange: 'IDR 1.800.000+',
    tags: ['Ramah Keluarga', 'Kolam Besar', 'Pusat Kuta', 'Musik Live']
  }
];

const RESTAURANTS_DATA: Place[] = [
  {
    id: 'r1',
    title: 'Locavore NXT',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 2100,
    location: 'Ubud',
    category: 'Fine Dining',
    description: 'Restoran paling terkenal di Bali yang menyajikan masakan Eropa modern menggunakan bahan-bahan lokal Indonesia hiper-lokal. Wajib reservasi jauh-jauh hari.',
    priceRange: '$$$$',
    tags: ['Michelin Guide', 'Tasting Menu', 'Bahan Lokal', 'Romantis']
  },
  {
    id: 'r2',
    title: 'Bebek Tepi Sawah',
    image: 'https://images.unsplash.com/photo-1606213376238-233271942051?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 4500,
    location: 'Ubud',
    category: 'Masakan Indonesia',
    description: 'Menikmati Bebek Goreng Crispy khas Bali sambil memandang hamparan sawah yang hijau. Pengalaman kuliner Bali yang otentik dan menenangkan.',
    priceRange: '$$',
    tags: ['Bebek Goreng', 'Pemandangan Sawah', 'Tradisional', 'Outdoor']
  },
  {
    id: 'r3',
    title: 'La Favela',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 3200,
    location: 'Seminyak',
    category: 'Bar & Restoran',
    description: 'Restoran dengan desain interior vintage Brazil yang menakjubkan yang berubah menjadi klub malam paling hits di Seminyak setelah jam makan malam.',
    priceRange: '$$$',
    tags: ['Nightlife', 'Vintage Decor', 'Cocktails', 'Pesta']
  },
  {
    id: 'r4',
    title: 'Warung Babi Guling Ibu Oka',
    image: 'https://images.unsplash.com/photo-1541557435-d53f9acdb106?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 6700,
    location: 'Ubud',
    category: 'Warung Lokal',
    description: 'Legenda kuliner Bali. Warung sederhana yang menyajikan Babi Guling (babi panggang) paling terkenal di pulau ini. Cepat habis, datanglah lebih awal!',
    priceRange: '$',
    tags: ['Babi Guling', 'Legendaris', 'Murah', 'Cepat Saji']
  }
];

interface PlaceholderPageProps {
    type: 'hotels' | 'restaurants';
    onBack: () => void;
}

const RatingCircles: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                 <div 
                    key={star} 
                    className={`w-3 h-3 rounded-full border border-green-600 ${star <= Math.round(rating) ? 'bg-green-500' : 'bg-white'}`}
                 />
            ))}
        </div>
    );
};

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ type, onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    
    // Reset filters when type changes
    useEffect(() => {
        setSelectedCategory('Semua');
        setSelectedFeatures([]);
    }, [type]);

    const data = type === 'hotels' ? HOTELS_DATA : RESTAURANTS_DATA;
    
    const categories = type === 'hotels' 
        ? ['Semua', 'Resor Mewah', 'Boutique Hotel', 'Eco Villa', 'Family Resort']
        : ['Semua', 'Fine Dining', 'Masakan Indonesia', 'Bar & Restoran', 'Warung Lokal'];

    const features = type === 'hotels'
        ? ['Infinity Pool', 'Tepi Pantai', 'Eco-friendly', 'Ramah Keluarga', 'Spa']
        : ['Outdoor', 'Romantis', 'Pemandangan Sawah', 'Murah', 'Nightlife'];

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const categoryMatch = selectedCategory === 'Semua' || item.category === selectedCategory;
            // Check if ALL selected features are present in item.tags
            const featuresMatch = selectedFeatures.length === 0 || 
                selectedFeatures.every(f => item.tags.includes(f));
            return categoryMatch && featuresMatch;
        });
    }, [data, selectedCategory, selectedFeatures]);

    const toggleFeature = (feature: string) => {
        setSelectedFeatures(prev => 
            prev.includes(feature) 
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    const title = type === 'hotels' ? 'Hotel & Vila Terbaik di Bali' : 'Restoran & Kuliner Pilihan';
    const subtitle = type === 'hotels' 
        ? 'Temukan tempat menginap impian Anda, dari resor mewah hingga vila bambu yang unik.' 
        : 'Jelajahi rasa pulau Dewata, dari warung lokal legendaris hingga fine dining kelas dunia.';

    return (
        <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={onBack} className="text-stone-500 hover:text-teal-600 flex items-center font-medium transition-colors mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Kembali
                    </button>
                    <h2 className="text-4xl font-bold font-serif text-stone-800 mb-3">{title}</h2>
                    <p className="text-lg text-stone-600 max-w-3xl">{subtitle}</p>
                </div>

                {/* Filter Controls */}
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm mb-8 space-y-6">
                    {/* Categories */}
                    <div>
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Kategori</h3>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        selectedCategory === category
                                        ? 'bg-teal-600 text-white shadow-md transform scale-105'
                                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-800'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Fitur Utama</h3>
                        <div className="flex flex-wrap gap-3">
                            {features.map(feature => (
                                <button
                                    key={feature}
                                    onClick={() => toggleFeature(feature)}
                                    className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                        selectedFeatures.includes(feature)
                                            ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm'
                                            : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700'
                                    }`}
                                >
                                    <div className={`w-4 h-4 rounded border mr-2 flex items-center justify-center transition-colors ${
                                        selectedFeatures.includes(feature) ? 'bg-teal-500 border-teal-500' : 'bg-white border-stone-300'
                                    }`}>
                                        {selectedFeatures.includes(feature) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    {feature}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="pt-4 border-t border-stone-100 flex justify-between items-center text-sm text-stone-500">
                        <span>Menampilkan {filteredData.length} dari {data.length} rekomendasi</span>
                        {(selectedCategory !== 'Semua' || selectedFeatures.length > 0) && (
                            <button 
                                onClick={() => {setSelectedCategory('Semua'); setSelectedFeatures([]);}}
                                className="text-teal-600 hover:text-teal-800 font-medium"
                            >
                                Reset Filter
                            </button>
                        )}
                    </div>
                </div>

                {/* List */}
                <div className="space-y-6">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-stone-100 hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row group animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                                {/* Image */}
                                <div className="md:w-1/3 lg:w-1/4 relative overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-stone-800 shadow-sm">
                                        #{index + 1} Pilihan Editor
                                    </div>
                                    <button className="absolute top-3 right-3 p-2 bg-white/50 hover:bg-white rounded-full text-stone-600 hover:text-red-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold font-serif text-stone-800 group-hover:text-teal-700 transition-colors cursor-pointer">{item.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <RatingCircles rating={item.rating} />
                                                <span className="text-sm font-bold text-stone-700">{item.reviewCount} ulasan</span>
                                            </div>
                                            <div className="text-sm text-stone-500 mt-1 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                {item.location} • {item.category}
                                            </div>
                                        </div>
                                        <div className="text-right hidden md:block">
                                            <div className="text-xl font-bold text-orange-600">{item.priceRange}</div>
                                            <div className="text-xs text-stone-400">per malam / pax</div>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-stone-600 line-clamp-2">{item.description}</p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {item.tags.map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded border border-stone-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-6 flex items-center justify-between">
                                        <div className="md:hidden">
                                            <span className="text-lg font-bold text-orange-600">{item.priceRange}</span>
                                        </div>
                                        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors ml-auto">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-stone-300">
                            <svg className="w-16 h-16 mx-auto text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-lg text-stone-500">Tidak ada hasil yang sesuai dengan filter Anda.</p>
                            <button 
                                onClick={() => {setSelectedCategory('Semua'); setSelectedFeatures([]);}}
                                className="mt-2 text-teal-600 font-medium hover:text-teal-700"
                            >
                                Hapus semua filter
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
