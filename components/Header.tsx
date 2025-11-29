
import React, { useState } from 'react';

interface HeaderProps {
    onNavigate: (view: string) => void;
}

const FrangipaniIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.95.99 3.66 2.47 4.64-.32.12-.65.2-.97.26-2.21.28-4.5 1.5-4.5 1.5s.45 2.5 2.5 2.5c1.1 0 2-.9 2-2 0-1.11-.9-2-2-2-.32 0-.63.08-.9.21.8-.52 1.5-.95 2.05-1.28C9.53 10.11 9 8.64 9 7c0-1.65 1.35-3 3-3s3 1.35 3 3c0 1.64-.53 3.11-1.35 4.14.55.33 1.25.76 2.05 1.28-.27-.13-.58-.21-.9-.21-1.1 0-2 .89-2 2s.9 2 2 2c2.05 0 2.5-2.5 2.5-2.5s-2.29-1.22-4.5-1.5c-.32-.06-.65-.14-.97-.26C14.01 10.66 15 8.95 15 7c0-2.76-2.24-5-5-5z" />
    </svg>
);

interface NavItem {
    label: string;
    id: string;
    icon: React.ReactNode;
    comingSoon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { 
      label: 'Jelajah', 
      id: 'home', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    { 
      label: 'Sewa Kendaraan', 
      id: 'rentals', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    },
    { 
        label: 'Tiket Wisata', 
        id: 'tickets', 
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        )
    },
    { 
      label: 'Hotel', 
      id: 'hotels', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      label: 'Restoran', 
      id: 'restaurants',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
        label: 'Admin',
        id: 'admin-login',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        )
    }
  ];

  const handleNavClick = (id: string, comingSoon?: boolean) => {
    if (comingSoon) {
        alert("Fitur ini akan segera hadir! Saat ini kami fokus pada Perencanaan Perjalanan dan Penyewaan Kendaraan.");
        return;
    }
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <FrangipaniIcon className="h-8 w-8 text-orange-500 mr-2" />
            <h1 className="text-xl md:text-2xl font-bold text-stone-800 tracking-tight font-serif">
              Kinship Bali Tour
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.comingSoon)}
                className="flex items-center px-3 py-2 rounded-full hover:bg-stone-100 transition-colors text-stone-700 hover:text-stone-900 text-sm font-medium gap-1.5"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button 
                onClick={() => onNavigate('home')}
                className="ml-4 bg-black text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-stone-800 transition-colors"
            >
                Buat Rencana
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-stone-600 hover:text-stone-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 shadow-lg absolute w-full left-0 animate-fade-in-down">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
               <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.comingSoon)}
                className="flex items-center p-3 rounded-lg hover:bg-stone-50 text-stone-700 font-medium"
              >
                <span className="mr-3 text-stone-500">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
