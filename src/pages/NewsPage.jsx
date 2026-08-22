import { useTrust } from '../context/TrustContext.jsx';
import { NewsCard } from '../components/NewsCard.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState, useMemo } = React;

export const NewsPage = () => {
  const { news, setSelectedNews } = useTrust();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Skill Development', 'Healthcare', 'Education', 'Public Welfare', 'Community Service'];

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [news, selectedCategory, searchQuery]);

  const featuredArticle = news[0];

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4" data-aos="fade-right">
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
              Press & Media Releases
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Trust News & <span className="text-red-500">Activity Stories</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Stay informed with verified reports, impact stories, expansion updates, and official announcements from Medidhisubbaiah Trust.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Spotlight Top Article (If available) */}
      {featuredArticle && !searchQuery && selectedCategory === 'All' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
          <div
            onClick={() => setSelectedNews(featuredArticle)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
          >
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.thumbnail}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Featured Story
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Icon name="calendar" size={14} className="text-red-500" />
                    <span>{featuredArticle.date}</span>
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.category}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                  {featuredArticle.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {featuredArticle.readTime || '4 min read'}
                </span>
                <span className="text-red-600 font-bold text-sm flex items-center space-x-1">
                  <span>Read Full Story</span>
                  <Icon name="arrowright" size={16} />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Category Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search news articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <Icon name="search" size={16} />
            </div>
          </div>

        </div>
      </section>

      {/* 4. News Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map((newsItem, idx) => (
              <NewsCard key={newsItem.id} newsItem={newsItem} aosDelay={idx * 80} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="search" size={20} />
            </div>
            <h3 className="font-bold text-lg text-slate-900">No News Found</h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any articles matching your search.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-xs hover:bg-red-700 transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

    </div>
  );
};
