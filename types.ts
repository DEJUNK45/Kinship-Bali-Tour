
export interface ItineraryPreferences {
  duration: number;
  travelers: number;
  budget: 'Budget' | 'Mid-range' | 'Luxury';
  interests: string[];
  mustSees?: string;
  startDate: string;
}

export interface Activity {
  name: string;
  description: string;
  type: 'Dining' | 'Culture' | 'Adventure' | 'Relaxation' | 'Scenery' | 'Shopping' | 'Nightlife';
}

export interface Accommodation {
  name: string;
  description: string;
}

export interface DailyPlan {
  day: number;
  title: string;
  summary: string;
  activities: Activity[];
  accommodation?: Accommodation;
  location: string;
  coordinates?: { lat: number; lng: number };
}

export interface Itinerary {
  title: string;
  overall_summary: string;
  daily_plans: DailyPlan[];
}

export interface Review {
    id: string;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'scooter' | 'car';
  price: number;
  priceUnit: string; // e.g., "/ hari", "/ 10 jam"
  description: string;
  imageUrl: string;
  passengers: number;
  features: string[];
  gallery?: string[]; // New: Additional images
  specs?: Record<string, string>; // New: Technical specs like "Year", "Transmission"
  reviews?: Review[]; // New: Mock reviews
}

export interface Ticket {
    id: string;
    title: string;
    category: 'Adventure' | 'Culture' | 'Attraction' | 'Nature' | 'Water Sport';
    location: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    reviewsCount: number;
    duration: string;
}

export interface BookingDetails {
    fullName: string;
    email: string;
    phone: string;
    travelDate: string;
    travelers: number;
    totalPrice: number;
}