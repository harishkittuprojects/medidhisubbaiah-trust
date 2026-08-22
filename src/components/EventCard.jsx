import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

export const EventCard = ({ event, aosDelay = 0 }) => {
  const { setSelectedEvent } = useTrust();
  const isCompleted = event.status === 'Completed';

  // Format date display
  const dateObj = new Date(event.date);
  const day = !isNaN(dateObj.getDate()) ? dateObj.getDate() : '15';
  const month = !isNaN(dateObj.getMonth()) 
    ? dateObj.toLocaleString('default', { month: 'short' }).toUpperCase()
    : 'SEP';

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1 group"
    >
      {/* Event Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />

        {/* Date Box */}
        <div className="absolute top-3.5 left-3.5 bg-white rounded-xl shadow-lg p-2 text-center min-w-[52px] border border-red-100">
          <span className="block text-red-600 font-extrabold text-base leading-none">{day}</span>
          <span className="block text-[10px] font-bold text-slate-700 tracking-wider mt-0.5">{month}</span>
        </div>

        {/* Status Pill */}
        <div className="absolute top-3.5 right-3.5">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow ${
              isCompleted
                ? 'bg-slate-800 text-slate-200'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {event.status}
          </span>
        </div>

        {/* Category */}
        <div className="absolute bottom-3 left-3.5">
          <span className="bg-red-600/90 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <Icon name="clock" size={14} className="text-red-500 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="mappin" size={14} className="text-red-500 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {isCompleted ? 'Finished Event' : `${event.seatsRegistered || 50}+ Registered`}
          </span>

          <button
            onClick={() => setSelectedEvent(event)}
            className="bg-slate-900 hover:bg-red-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <span>{isCompleted ? 'View Report' : 'Details & RSVP'}</span>
            <Icon name="arrowright" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
