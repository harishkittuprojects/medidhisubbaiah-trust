import { useTrust } from '../context/TrustContext.jsx';
import { EventCard } from '../components/EventCard.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState, useMemo } = React;

export const EventsPage = () => {
  const { events, navigate } = useTrust();
  const [statusTab, setStatusTab] = useState('All'); // 'All', 'Upcoming', 'Completed'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Blood Donation',
    'Education',
    'Sports',
    'Food Distribution',
    'Public Welfare',
    'Community Service'
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesStatus =
        statusTab === 'All' || event.status === statusTab;
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [events, statusTab, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4" data-aos="fade-right">
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
              Community Programs & Drives
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Trust Events & <span className="text-red-500">Welfare Camps</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore upcoming blood donation drives, sports meets, certificate convocations, and food distribution activities organized by Medidhisubbaiah Trust.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Status & Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Status Switch Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          
          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl w-full sm:w-auto">
            {['All', 'Upcoming', 'Completed'].map((tab) => {
              const isActive = statusTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusTab(tab)}
                  className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab} Events
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by name, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <Icon name="search" size={16} />
            </div>
          </div>

        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </section>

      {/* 3. Event Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredEvents.map((event, idx) => (
              <EventCard key={event.id} event={event} aosDelay={idx * 80} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="calendar" size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">No Events Found</h3>
            <p className="text-slate-500 text-sm">
              There are no events matching your current filter selection. Try changing the category or search keywords.
            </p>
            <button
              onClick={() => {
                setStatusTab('All');
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

      {/* 4. Volunteer Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-red-50/70 border border-red-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-slate-900">Want to Propose or Organize a Community Event?</h3>
            <p className="text-slate-600 text-sm max-w-xl">
              Are you a school, local association, or hospital looking to conduct joint blood donation camps or sports meets? Collaborate with Medidhisubbaiah Trust.
            </p>
          </div>
          <button
            onClick={() => navigate('contact')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition shrink-0 shadow-md"
          >
            Partner With Us
          </button>
        </div>
      </section>

    </div>
  );
};
