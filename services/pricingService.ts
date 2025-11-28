
import { ItineraryPreferences, Vehicle } from '../types';

// Base costs per person per day in IDR
const BASE_COSTS_IDR = {
    'Budget': 750000,    // Approx $50
    'Mid-range': 2250000, // Approx $150
    'Luxury': 6000000     // Approx $400
};

const SERVICE_FEE_PERCENTAGE = 0.05; // 5% service fee

export interface PriceDetails {
    subtotal: number;
    vehicleCost: number;
    serviceFee: number;
    total: number;
}

export const calculatePrice = (prefs: ItineraryPreferences, vehicle?: Vehicle): PriceDetails => {
    const baseCost = BASE_COSTS_IDR[prefs.budget] || BASE_COSTS_IDR['Mid-range'];
    
    const subtotal = baseCost * prefs.duration * prefs.travelers;
    
    const vehicleCost = vehicle ? vehicle.price * prefs.duration : 0;

    const serviceFee = (subtotal + vehicleCost) * SERVICE_FEE_PERCENTAGE;
    const total = subtotal + vehicleCost + serviceFee;

    return {
        subtotal,
        vehicleCost,
        serviceFee,
        total,
    };
};
