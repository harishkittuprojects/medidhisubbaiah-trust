import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState, useMemo } = React;

export const GalleryPage = () => {
  const { gallery, setLightboxIndex } = useTrust();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Events',
    'Blood Donation',
    'Food Distribution',
    'Grocery Distribution',
    'Tailoring',
    'Educational Programs',
    'Sports',
    'Chalivendram'
  ];

  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'All') return gallery;
    return gallery.filter((item) => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4" data-aos="fade-right">
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
              Visual Chronicles of Impact
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Community <span className="text-red-500">Photo Gallery</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore authentic photographs capturing moments of empowerment, blood drives, food service, summer Chalivendram water kiosks, and sports matches.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Image Grid with Lightbox Triggers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredGallery.map((item, idx) => {
              // Find index in master gallery array for lightbox
              const masterIndex = gallery.findIndex((g) => g.id === item.id);

              return (
                <div
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 60}
                  onClick={() => setLightboxIndex(masterIndex !== -1 ? masterIndex : idx)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-300 flex flex-col hover:-translate-y-1 h-72 sm:h-80"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Dark overlay with details on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                        {item.category}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon name="eye" size={16} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {item.caption}
                      </p>
                      {item.date && (
                        <span className="text-[10px] text-red-300 block pt-1">
                          {item.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="eye" size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">No Photos in this Category</h3>
            <p className="text-slate-500 text-sm">
              Try selecting 'All' or another activity category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-xs hover:bg-red-700 transition"
            >
              Show All Photos
            </button>
          </div>
        )}
      </section>

      {/* 4. Photo Contribution CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-slate-100 rounded-2xl p-6 text-center text-slate-600 text-xs sm:text-sm border border-slate-200">
          <p className="font-semibold text-slate-800">
            Have high-resolution photos of recent Medidhisubbaiah Trust community activities or events?
          </p>
          <p className="mt-1">
            Authorized volunteers and photographers can submit photos via our contact email: <span className="text-red-600 font-bold">contact@medidhisubbaiahtrust.org</span>
          </p>
        </div>
      </section>

    </div>
  );
};
