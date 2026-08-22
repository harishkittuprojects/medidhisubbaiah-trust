import { useTrust } from '../context/TrustContext.jsx';
import { ServiceCard } from '../components/ServiceCard.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState, useMemo } = React;

export const ServicesPage = () => {
  const { services, navigate } = useTrust();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Skill Development',
    'Community Welfare',
    'Healthcare',
    'Public Welfare',
    'Sports',
    'Education'
  ];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4" data-aos="fade-right">
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
              100% Free Welfare Services
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Our Community <span className="text-red-500">Services & Programs</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore our core initiatives designed to foster livelihood self-reliance, ensure food and water security, save critical lives, and empower future generations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
            <div className="absolute left-3.5 top-3 text-slate-400">
              <Icon name="search" size={16} />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} aosDelay={idx * 80} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="search" size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">No Services Found</h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any services matching your filters. Try selecting a different category or clearing your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-xs hover:bg-red-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. Service Enrollment CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Have Questions About Admissions or Assistance?</h3>
            <p className="text-slate-300 text-sm max-w-xl">
              All courses and support programs by Medidhisubbaiah Trust are 100% free of charges. Get in touch with our helpdesk today.
            </p>
          </div>
          <button
            onClick={() => navigate('contact')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition shrink-0 shadow-lg"
          >
            Contact Help Desk
          </button>
        </div>
      </section>

    </div>
  );
};
