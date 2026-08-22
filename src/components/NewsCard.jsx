import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

export const NewsCard = ({ newsItem, aosDelay = 0 }) => {
  const { setSelectedNews } = useTrust();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={newsItem.thumbnail}
          alt={newsItem.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3.5 left-3.5">
          <span className="bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
            {newsItem.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <Icon name="calendar" size={13} className="text-red-500" />
              <span>{newsItem.date}</span>
            </span>
            <span>•</span>
            <span>{newsItem.readTime || '3 min read'}</span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
            {newsItem.title}
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
            {newsItem.shortDescription}
          </p>
        </div>

        {/* Read More Trigger */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {newsItem.author ? `By ${newsItem.author}` : 'Official Trust Press'}
          </span>

          <button
            onClick={() => setSelectedNews(newsItem)}
            className="text-red-600 hover:text-red-700 font-bold text-xs flex items-center space-x-1"
          >
            <span>Read Article</span>
            <Icon name="arrowright" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
