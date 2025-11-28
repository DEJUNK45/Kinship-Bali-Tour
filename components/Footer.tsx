
import React from 'react';

interface FooterProps {
    onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-stone-800 text-stone-300 py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Kinship Bali Tour. All rights reserved.</p>
        <p className="text-sm text-stone-400 mt-1">Powered by AI, crafted with love for Bali.</p>
        {onAdminClick && (
            <button 
                onClick={onAdminClick} 
                className="mt-4 text-xs text-stone-600 hover:text-stone-400 transition-colors"
            >
                Admin Access
            </button>
        )}
      </div>
    </footer>
  );
};
