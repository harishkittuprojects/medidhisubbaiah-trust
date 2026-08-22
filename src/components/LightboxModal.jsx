import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

const { useEffect } = React;

export const LightboxModal = () => {
  const { lightboxIndex, setLightboxIndex, gallery } = useTrust();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, gallery]);

  if (lightboxIndex === null || !gallery[lightboxIndex]) return null;

  const currentItem = gallery[lightboxIndex];

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      onClick={() => setLightboxIndex(null)}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-white z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-3">
          <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {currentItem.category}
          </span>
          <span className="text-xs text-slate-400">
            {lightboxIndex + 1} of {gallery.length}
          </span>
        </div>

        <button
          onClick={() => setLightboxIndex(null)}
          className="bg-white/10 hover:bg-red-600 text-white p-2 rounded-full transition"
          aria-label="Close lightbox"
        >
          <Icon name="x" size={24} />
        </button>
      </div>

      {/* Main Image Area with Prev/Next Controls */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 z-10 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md transition transform -translate-y-1/2 top-1/2"
          aria-label="Previous image"
        >
          <Icon name="chevronleft" size={24} />
        </button>

        <img
          src={currentItem.imageUrl}
          alt={currentItem.title}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
        />

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 z-10 bg-black/50 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md transition transform -translate-y-1/2 top-1/2"
          aria-label="Next image"
        >
          <Icon name="chevronright" size={24} />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="text-center text-white max-w-2xl mx-auto space-y-1 z-10 bg-black/40 p-4 rounded-xl backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-base sm:text-lg font-bold">{currentItem.title}</h3>
        <p className="text-xs sm:text-sm text-slate-300">{currentItem.caption}</p>
        {currentItem.date && <p className="text-[11px] text-slate-400">Activity Date: {currentItem.date}</p>}
      </div>
    </div>
  );
};
