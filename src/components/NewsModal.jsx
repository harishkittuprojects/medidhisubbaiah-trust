import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

export const NewsModal = () => {
  const { selectedNews, setSelectedNews, showToast } = useTrust();

  if (!selectedNews) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!');
    } else {
      showToast('Share feature active!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        
        {/* News Hero Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={selectedNews.thumbnail}
            alt={selectedNews.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={() => setSelectedNews(null)}
            className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-md transition"
            aria-label="Close"
          >
            <Icon name="x" size={20} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 shadow">
              {selectedNews.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {selectedNews.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5 font-medium">
                <Icon name="calendar" size={15} className="text-red-500" />
                <span>{selectedNews.date}</span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium">
                <Icon name="clock" size={15} className="text-slate-400" />
                <span>{selectedNews.readTime || '3 min read'}</span>
              </span>
              {selectedNews.author && (
                <span className="hidden sm:inline font-medium text-slate-600">
                  By {selectedNews.author}
                </span>
              )}
            </div>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 bg-red-50 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-100 transition"
            >
              <Icon name="share" size={14} />
              <span>Share Story</span>
            </button>
          </div>

          {/* Short Highlight */}
          <div className="bg-red-50/60 p-4 rounded-xl border-l-4 border-red-600 text-slate-700 font-medium italic text-sm sm:text-base leading-relaxed">
            "{selectedNews.shortDescription}"
          </div>

          {/* Full Article Content */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line font-normal">
            {selectedNews.content || selectedNews.shortDescription}
          </div>

          {/* Call to action footer in news */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Support Medidhisubbaiah Trust initiatives</h4>
              <p className="text-xs text-slate-500">Your encouragement empowers thousands of community beneficiaries.</p>
            </div>
            <button
              onClick={() => setSelectedNews(null)}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              Back to News
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
