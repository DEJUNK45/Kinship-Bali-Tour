
import { Ticket } from '../types';

const TICKETS_DATA: Ticket[] = [
    {
        id: 't1',
        title: 'GWK Cultural Park',
        category: 'Attraction',
        location: 'Ungasan, Uluwatu',
        price: 125000,
        image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=800&q=80',
        description: 'Jelajahi taman budaya megah dengan patung Garuda Wisnu Kencana yang ikonik, pertunjukan tari tradisional, dan pemandangan panorama Bali selatan.',
        rating: 4.8,
        reviewsCount: 1250,
        duration: '3-4 Jam'
    },
    {
        id: 't2',
        title: 'Ayung River Rafting',
        category: 'Adventure',
        location: 'Ubud',
        price: 350000,
        image: 'https://images.unsplash.com/photo-1544636683-af2e2808c909?auto=format&fit=crop&w=800&q=80',
        description: 'Pacu adrenalin Anda dengan arung jeram di Sungai Ayung. Nikmati pemandangan hutan hujan, air terjun tersembunyi, dan ukiran batu sungai yang artistik.',
        rating: 4.9,
        reviewsCount: 890,
        duration: '2 Jam (Rafting)'
    },
    {
        id: 't3',
        title: 'Uluwatu Kecak Fire Dance',
        category: 'Culture',
        location: 'Pura Uluwatu',
        price: 150000,
        image: 'https://images.unsplash.com/photo-1555400038-132980d1b6e4?auto=format&fit=crop&w=800&q=80',
        description: 'Saksikan pertunjukan tari Kecak yang magis dengan latar belakang matahari terbenam di tebing Uluwatu yang dramatis. Pengalaman budaya yang tak terlupakan.',
        rating: 4.7,
        reviewsCount: 3400,
        duration: '1 Jam (Sunset)'
    },
    {
        id: 't4',
        title: 'Nusa Penida West Tour',
        category: 'Nature',
        location: 'Nusa Penida',
        price: 750000,
        image: 'https://images.unsplash.com/photo-1592396314873-7d1e586f7242?auto=format&fit=crop&w=800&q=80',
        description: 'Tur seharian penuh ke Kelingking Beach, Angel Billabong, dan Broken Beach. Termasuk tiket fast boat PP dan makan siang.',
        rating: 4.9,
        reviewsCount: 560,
        duration: 'Full Day'
    },
    {
        id: 't5',
        title: 'Mount Batur Sunrise Trekking',
        category: 'Adventure',
        location: 'Kintamani',
        price: 450000,
        image: 'https://images.unsplash.com/photo-1552656966-558e60b21941?auto=format&fit=crop&w=800&q=80',
        description: 'Mendaki gunung berapi aktif di pagi buta untuk menyaksikan matahari terbit yang spektakuler di atas awan. Termasuk sarapan di puncak.',
        rating: 4.8,
        reviewsCount: 920,
        duration: '6 Jam'
    },
    {
        id: 't6',
        title: 'Tanjung Benoa Water Sports',
        category: 'Water Sport',
        location: 'Nusa Dua',
        price: 250000,
        image: 'https://images.unsplash.com/photo-1582992674997-019b0453d215?auto=format&fit=crop&w=800&q=80',
        description: 'Paket hemat water sport: Banana Boat, Parasailing, dan Jet Ski. Bersenang-senang di perairan tenang Nusa Dua.',
        rating: 4.6,
        reviewsCount: 430,
        duration: '2 Jam'
    }
];

export const getTickets = (): Ticket[] => {
    return TICKETS_DATA;
};

export const findMatchingTicket = (activityName: string): Ticket | undefined => {
    const lowerActivity = activityName.toLowerCase();
    
    return TICKETS_DATA.find(ticket => {
        const lowerTicket = ticket.title.toLowerCase();
        
        // Exact substring match
        if (lowerActivity.includes(lowerTicket) || lowerTicket.includes(lowerActivity)) {
             return true;
        }
        
        // Keyword matching
        if (lowerActivity.includes('kecak') && lowerTicket.includes('kecak')) return true;
        if (lowerActivity.includes('rafting') && lowerTicket.includes('rafting')) return true;
        if (lowerActivity.includes('batur') && lowerTicket.includes('batur')) return true;
        if (lowerActivity.includes('penida') && lowerTicket.includes('penida')) return true;
        if (lowerActivity.includes('water sport') && lowerTicket.includes('water sport')) return true;
        if ((lowerActivity.includes('gwk') || lowerActivity.includes('garuda')) && (lowerTicket.includes('gwk') || lowerTicket.includes('garuda'))) return true;

        return false;
    });
};
