
import { Vehicle } from '../types';

const STORAGE_KEY = 'kinship_vehicles_db';

const DEFAULT_VEHICLES: Vehicle[] = [
    {
        id: 'v1',
        name: 'Honda Scoopy',
        type: 'scooter',
        price: 75000,
        priceUnit: '/ hari',
        description: 'Skuter matic stylish, sempurna untuk solo traveler atau pasangan. Mudah dikendarai di jalanan Bali yang sempit.',
        imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=500&q=80',
        passengers: 2,
        features: ['Helm SNI', 'Jas Hujan', 'Phone Holder', 'Pengantaran Gratis (Ubud Area)'],
        gallery: [
            'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1625043484555-47841a752840?auto=format&fit=crop&w=800&q=80', // Generic scooter details
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80'  // Riding vibe
        ],
        specs: {
            'Tahun': '2023',
            'Mesin': '110cc',
            'Transmisi': 'Otomatis',
            'Bahan Bakar': 'Bensin'
        },
        reviews: [
            { id: 'r1', user: 'Sarah J.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', rating: 5, comment: 'Motornya bersih banget dan helmnya wangi. Phone holdernya sangat membantu untuk navigasi.', date: '2023-10-12' },
            { id: 'r2', user: 'Budi S.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', rating: 4, comment: 'Pelayanan cepat, motor diantar tepat waktu ke villa.', date: '2023-09-28' }
        ]
    },
    {
        id: 'v2',
        name: 'Yamaha Nmax 155',
        type: 'scooter',
        price: 120000,
        priceUnit: '/ hari',
        description: 'Skuter besar yang nyaman untuk perjalanan jauh. Bagasi luas dan tenaga lebih besar untuk tanjakan.',
        imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500&q=80',
        passengers: 2,
        features: ['Helm SNI', 'Jas Hujan', 'Phone Holder', 'Bagasi Luas', 'Keyless Entry'],
        gallery: [
            'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1591638286558-54c174377846?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1543860659-1f39b8f74132?auto=format&fit=crop&w=800&q=80'
        ],
        specs: {
            'Tahun': '2022',
            'Mesin': '155cc',
            'Transmisi': 'Otomatis',
            'Bahan Bakar': 'Bensin'
        },
        reviews: [
             { id: 'r3', user: 'Michael T.', avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d', rating: 5, comment: 'Sangat stabil untuk boncengan ke Kintamani. Tenaga mantap!', date: '2023-11-05' }
        ]
    },
    {
        id: 'v3',
        name: 'Toyota Avanza (dengan Supir)',
        type: 'car',
        price: 600000,
        priceUnit: '/ 10 jam',
        description: 'MPV terpopuler di Indonesia. Nyaman untuk keluarga kecil atau grup teman. Sudah termasuk BBM dan Supir.',
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80',
        passengers: 5,
        features: ['AC Dingin', 'Supir Berpengalaman', 'BBM Termasuk', 'Air Mineral', 'Music Bluetooth'],
        gallery: [
             'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80', // Interior feel
             'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80' // Driving vibe
        ],
        specs: {
            'Tahun': '2021+',
            'Kapasitas': '1300cc',
            'AC': 'Double Blower',
            'Bagasi': '3 Koper Besar'
        },
        reviews: [
            { id: 'r4', user: 'Emily R.', avatar: 'https://i.pravatar.cc/150?u=2042581f4e29026704d', rating: 5, comment: 'Pak Ketut supir kami sangat ramah dan tahu jalan tikus menghindari macet!', date: '2023-10-20' },
            { id: 'r5', user: 'David W.', avatar: 'https://i.pravatar.cc/150?u=1042581f4e29026704d', rating: 4, comment: 'Mobil bersih dan wangi. AC dingin banget.', date: '2023-08-15' }
        ]
    },
    {
        id: 'v4',
        name: 'Toyota Innova Reborn (dengan Supir)',
        type: 'car',
        price: 850000,
        priceUnit: '/ 10 jam',
        description: 'Kenyamanan premium untuk perjalanan jauh. Suspensi empuk dan kabin yang sangat senyap.',
        imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80',
        passengers: 6,
        features: ['AC Double Blower', 'Supir Berpengalaman', 'BBM Termasuk', 'Jok Captain Seat', 'USB Charging'],
        gallery: [
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80' // Road trip vibe
        ],
        specs: {
            'Tahun': '2022+',
            'Kapasitas': '2400cc',
            'AC': 'Digital Climate',
            'Suspensi': 'Premium Comfort'
        },
        reviews: [
             { id: 'r6', user: 'Jessica L.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', rating: 5, comment: 'Sangat worth it untuk perjalanan jauh ke Bali Utara. Anak-anak tidur nyenyak sepanjang jalan.', date: '2023-12-01' }
        ]
    }
];

export const getVehicles = (): Vehicle[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VEHICLES));
        return DEFAULT_VEHICLES;
    }
    // Simple merge logic in case we add new fields to default but local storage is old
    // In a real app, this would be a migration script.
    const vehicles = JSON.parse(stored);
    if (vehicles.length > 0 && !vehicles[0].gallery) {
         localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VEHICLES));
         return DEFAULT_VEHICLES;
    }
    return vehicles;
};

export const addVehicle = (vehicle: Vehicle): void => {
    const vehicles = getVehicles();
    vehicles.push(vehicle);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
};

export const deleteVehicle = (id: string): void => {
    const vehicles = getVehicles().filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
};
