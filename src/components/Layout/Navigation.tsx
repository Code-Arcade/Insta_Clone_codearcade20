import React from 'react';
import { Home, Search, PlusSquare, Heart, User, Instagram, Info } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Search, label: 'Explore' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'notifications', icon: Heart, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Instagram className="w-8 h-8 text-gray-800" />
              <h1 className="text-xl font-bold text-gray-800">Instagram</h1>
            </div>
            
            <div className="flex items-center space-x-6">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => onPageChange(id)}
                  className={`p-2 rounded-full transition-colors ${
                    currentPage === id
                      ? 'text-gray-800'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  aria-label={label}
                  title={label}
                >
                  <Icon 
                    className="w-6 h-6" 
                    strokeWidth={currentPage === id ? 2.5 : 2}
                    fill={currentPage === id && (id === 'notifications') ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
              
              {/* About Button */}
              <button
                onClick={() => onPageChange('about')}
                className={`p-2 rounded-full transition-colors ${
                  currentPage === 'about'
                    ? 'text-gray-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                aria-label="About"
                title="About"
              >
                <Info 
                  className="w-6 h-6" 
                  strokeWidth={currentPage === 'about' ? 2.5 : 2}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              className={`p-3 transition-colors ${
                currentPage === id
                  ? 'text-gray-800'
                  : 'text-gray-600'
              }`}
              aria-label={label}
            >
              <Icon 
                className="w-6 h-6" 
                strokeWidth={currentPage === id ? 2.5 : 2}
                fill={currentPage === id && (id === 'notifications') ? 'currentColor' : 'none'}
              />
            </button>
          ))}
          
          {/* About Button for Mobile */}
          <button
            onClick={() => onPageChange('about')}
            className={`p-3 transition-colors ${
              currentPage === 'about'
                ? 'text-gray-800'
                : 'text-gray-600'
            }`}
            aria-label="About"
          >
            <Info 
              className="w-6 h-6" 
              strokeWidth={currentPage === 'about' ? 2.5 : 2}
            />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;