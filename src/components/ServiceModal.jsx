import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

const { useState } = React;

export const ServiceModal = () => {
  const { selectedService, setSelectedService, showToast } = useTrust();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedService) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Please enter your name and phone number.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Inquiry submitted for ${selectedService.title}! Our team will contact you soon.`, 'success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSelectedService(null);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={selectedService.image}
            alt={selectedService.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-md transition"
            aria-label="Close modal"
          >
            <Icon name="x" size={20} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 shadow">
              {selectedService.category}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
              {selectedService.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-red-50/70 p-3.5 rounded-xl border border-red-100 text-xs sm:text-sm">
            {selectedService.beneficiaries && (
              <div>
                <span className="text-slate-500 block font-medium">Impact / Reached</span>
                <strong className="text-red-700 font-bold">{selectedService.beneficiaries}</strong>
              </div>
            )}
            {selectedService.duration && (
              <div>
                <span className="text-slate-500 block font-medium">Program Duration</span>
                <strong className="text-slate-900 font-bold">{selectedService.duration}</strong>
              </div>
            )}
            {selectedService.location && (
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-500 block font-medium">Venue / Center</span>
                <strong className="text-slate-900 font-bold">{selectedService.location}</strong>
              </div>
            )}
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 border-l-4 border-red-600 pl-2.5">
              Program Overview
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {selectedService.fullDescription || selectedService.shortDescription}
            </p>
          </div>

          {/* Key Features */}
          {selectedService.features && selectedService.features.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3 border-l-4 border-red-600 pl-2.5">
                Key Highlights & Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="p-1 rounded-full bg-red-100 text-red-600 mt-0.5">
                      <Icon name="check" size={14} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Registration / Inquiry Form */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Apply or Inquire About This Program
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              All services of Medidhisubbaiah Trust are 100% free of cost. Fill the details below to enroll or seek assistance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email / Alternate Contact</label>
                <input
                  type="email"
                  placeholder="Optional email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Requirements or Message</label>
                <textarea
                  rows="2"
                  placeholder="Any particular batch timing, requirements or queries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md transition flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Free Application</span>
                      <Icon name="arrowright" size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
