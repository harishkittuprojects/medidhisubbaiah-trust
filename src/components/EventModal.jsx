import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

const { useState } = React;

export const EventModal = () => {
  const { selectedEvent, setSelectedEvent, registerForEvent } = useTrust();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', count: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedEvent) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      registerForEvent(selectedEvent.id, formData);
      setFormData({ name: '', phone: '', email: '', count: 1 });
      setSelectedEvent(null);
    }, 400);
  };

  const isCompleted = selectedEvent.status === 'Completed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-4 right-4 bg-black/60 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-md transition"
          >
            <Icon name="x" size={20} />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                {selectedEvent.category}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${isCompleted ? 'bg-slate-700 text-slate-200' : 'bg-emerald-600 text-white'}`}>
                {selectedEvent.status}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
              {selectedEvent.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700">
          
          {/* Metadata Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <Icon name="calendar" size={18} />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Date & Time</span>
                <span className="font-semibold text-slate-800">{selectedEvent.date} ({selectedEvent.time})</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <Icon name="mappin" size={18} />
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Location / Venue</span>
                <span className="font-semibold text-slate-800">{selectedEvent.location}</span>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2 border-l-4 border-red-600 pl-2.5">
              Event Details
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {selectedEvent.description}
            </p>
            {selectedEvent.organizer && (
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Organized by: <span className="text-slate-800 font-semibold">{selectedEvent.organizer}</span>
              </p>
            )}
          </div>

          {/* RSVP / Registration section */}
          {!isCompleted ? (
            <div className="bg-red-50/70 p-5 rounded-xl border border-red-100">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Join / Register as Participant or Volunteer
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Registration is completely free. We will send you event reminders and venue directions.
              </p>

              <form onSubmit={handleRegister} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Optional email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition flex items-center space-x-1.5"
                  >
                    <span>{isSubmitting ? 'Registering...' : 'Confirm Free Registration'}</span>
                    <Icon name="check" size={16} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-slate-100 p-4 rounded-xl text-center text-slate-600 text-sm">
              <span className="font-semibold text-slate-800">This event was completed successfully.</span>
              <p className="text-xs text-slate-500 mt-1">Thank you to all the donors, participants, and volunteers who made it a massive success.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
