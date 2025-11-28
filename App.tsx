
import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Planner } from './components/Planner';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { Footer } from './components/Footer';
import { BookingForm } from './components/BookingForm';
import { BookingConfirmation } from './components/BookingConfirmation';
import { RentalMarketplace } from './components/RentalMarketplace';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { PlaceholderPage } from './components/PlaceholderPage';
import { ItineraryPreferences, Itinerary, DailyPlan, Vehicle, BookingDetails } from './types';
import { generateItinerary } from './services/geminiService';

type AppView = 'home' | 'rentals' | 'admin-login' | 'admin-dashboard' | 'hotels' | 'restaurants' | 'booking';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [rentalFilter, setRentalFilter] = useState<'all' | 'scooter' | 'car'>('all');
  
  const [preferences, setPreferences] = useState<ItineraryPreferences | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);


  const plannerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStartPlanning = () => {
    plannerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerateItinerary = async (prefs: ItineraryPreferences) => {
    setPreferences(prefs);
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setIsEditing(false);
    setSelectedVehicle(null);
    setIsBookingConfirmed(false);
    setBookingDetails(null);
    
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    try {
      const result = await generateItinerary(prefs);
      setItinerary(result);
    } catch (err) {
      console.error(err);
      setError('Maaf, saya kesulitan membuat rencana perjalanan Anda. Mungkin ada masalah sementara dengan model AI. Silakan coba lagi dengan preferensi yang sedikit berbeda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItinerary = (updatedPlan: DailyPlan) => {
    if (!itinerary) return;
    
    const updatedDailyPlans = itinerary.daily_plans.map(plan => 
      plan.day === updatedPlan.day ? updatedPlan : plan
    );
    
    setItinerary({
      ...itinerary,
      daily_plans: updatedDailyPlans,
    });
  };

  const handleResetApp = () => {
    setPreferences(null);
    setItinerary(null);
    setSelectedVehicle(null);
    setBookingDetails(null);
    setIsLoading(false);
    setError(null);
    setIsEditing(false);
    setIsBookingConfirmed(false);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewRentals = (filter: 'scooter' | 'car' | 'all' = 'all') => {
    setRentalFilter(filter);
    setCurrentView('rentals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when user selects a vehicle from the rentals page during the booking flow
  const handleSelectVehicleForTrip = (vehicle: Vehicle) => {
      setSelectedVehicle(vehicle);
      // After selecting vehicle, go to booking form
      setCurrentView('booking'); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
      setCurrentView('admin-login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (viewId: string) => {
      // Allow navigation away, but warn if in booking flow? For now just switch.
      switch(viewId) {
          case 'home':
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              break;
          case 'rentals':
              handleViewRentals('all');
              break;
          case 'hotels':
              setCurrentView('hotels');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              break;
          case 'restaurants':
              setCurrentView('restaurants');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              break;
          case 'admin-login':
              handleAdminAccess();
              break;
          default:
              break;
      }
  };

  // Admin View Rendering
  if (currentView === 'admin-login') {
      return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Header onNavigate={handleNavigation} />
            <AdminLogin onLoginSuccess={() => setCurrentView('admin-dashboard')} onCancel={() => setCurrentView('home')} />
            <Footer onAdminClick={handleAdminAccess} />
        </div>
      );
  }

  if (currentView === 'admin-dashboard') {
      return (
         <div className="min-h-screen flex flex-col bg-stone-50">
            <Header onNavigate={handleNavigation} />
            <AdminDashboard onExit={() => setCurrentView('home')} />
         </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header onNavigate={handleNavigation} />
      <main className="flex-grow">
        {currentView === 'rentals' ? (
            <RentalMarketplace 
                onBack={() => setCurrentView('home')} 
                initialFilter={rentalFilter}
                onSelectVehicle={itinerary ? handleSelectVehicleForTrip : undefined} // Only pass selection handler if we have an itinerary
            />
        ) : currentView === 'hotels' ? (
            <PlaceholderPage type="hotels" onBack={() => setCurrentView('home')} />
        ) : currentView === 'restaurants' ? (
            <PlaceholderPage type="restaurants" onBack={() => setCurrentView('home')} />
        ) : currentView === 'booking' && preferences ? (
             <BookingForm 
                preferences={preferences}
                vehicle={selectedVehicle}
                onConfirm={(details) => {
                    setBookingDetails(details);
                    setCurrentView('home');
                    setIsBookingConfirmed(true);
                }}
                onCancel={() => setCurrentView('home')} // Go back to itinerary view
            />
        ) : (
            <>
                {!isBookingConfirmed && (
                <>
                    <Hero onStartPlanning={handleStartPlanning} />
                    <div ref={plannerRef}>
                    <Planner onGenerate={handleGenerateItinerary} isLoading={isLoading} />
                    </div>
                    <div ref={resultsRef}>
                    <ItineraryDisplay 
                        isLoading={isLoading} 
                        itinerary={itinerary} 
                        preferences={preferences}
                        selectedVehicle={selectedVehicle}
                        error={error} 
                        isEditing={isEditing}
                        onEditToggle={() => setIsEditing(!isEditing)}
                        onUpdateItinerary={handleUpdateItinerary}
                        onInitiateBooking={() => setCurrentView('booking')} // Direct booking (if vehicle already selected)
                        onViewRentals={(filter) => handleViewRentals(filter)} // Go to pick vehicle
                    />
                    </div>
                </>
                )}

                {isBookingConfirmed && bookingDetails && (
                <BookingConfirmation 
                    bookingDetails={bookingDetails}
                    itinerary={itinerary}
                    vehicle={selectedVehicle}
                    onReset={handleResetApp} 
                />
                )}
            </>
        )}
      </main>
      <Footer onAdminClick={handleAdminAccess} />
    </div>
  );
};

export default App;
