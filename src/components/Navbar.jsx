import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

const { useState, useEffect } = React;

export const Navbar = () => {
  const { currentRoute, navigate, isAdminLoggedIn, logoutAdmin, trustInfo } = useTrust();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', route: 'home' },
    { name: 'About Us', route: 'about' },
    { name: 'Our Services', route: 'services' },
    { name: 'Events', route: 'events' },
    { name: 'News', route: 'news' },
    { name: 'Gallery', route: 'gallery' },
    { name: 'Contact Us', route: 'contact' }
  ];

  const handleNavClick = (route) => {
    navigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Helpline / Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-red-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-2"></span>
              24/7 Blood Donation Helpline:
              <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="ml-1.5 text-white hover:text-red-300 underline font-bold tracking-wide">
                {trustInfo.emergencyBloodHelpline}
              </a>
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:flex items-center text-slate-300">
              <Icon name="mail" size={13} className="mr-1.5 text-red-400" />
              {trustInfo.email}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-300">
            <span className="hidden sm:inline-block bg-red-950/80 text-red-300 border border-red-800/40 px-2.5 py-0.5 rounded text-[11px] font-medium">
              Regd. Community Trust
            </span>
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="text-xs bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded transition font-medium"
                >
                  Admin Portal
                </button>
                <button
                  onClick={logoutAdmin}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="flex items-center space-x-1 text-slate-300 hover:text-white text-xs hover:underline"
              >
                <Icon name="lock" size={12} className="text-red-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-md py-2.5 border-b border-red-100 bg-white/95 backdrop-blur-md'
            : 'shadow-sm py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Brand Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-lg shadow-red-600/20 group-hover:scale-105 transition-transform duration-300">
                <span className="font-extrabold text-xl tracking-tight">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-red-600 transition-colors">
                  Medidhisubbaiah <span className="text-red-600">Trust</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Service • Equality • Empowerment
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                      isActive
                        ? 'text-red-600 bg-red-50'
                        : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-red-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-red-600/25 hover:shadow-lg hover:shadow-red-600/35 transition-all duration-200 flex items-center space-x-2 group"
              >
                <span>Support Our Mission</span>
                <Icon name="arrowright" size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-red-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Toggle menu"
              >
                <Icon name={isMobileMenuOpen ? 'x' : 'menu'} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-red-600 bg-red-50 border-l-4 border-red-600'
                      : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <Icon name="arrowright" size={16} className="text-red-600" />}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold text-center shadow-md hover:bg-red-700 transition"
              >
                Support Our Mission
              </button>
              {isAdminLoggedIn ? (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-semibold text-center"
                >
                  Go to Admin Hub
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full border border-slate-300 text-slate-700 py-2.5 rounded-lg font-semibold text-center hover:bg-slate-50"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
