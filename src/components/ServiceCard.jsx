import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

export const ServiceCard = ({ service, aosDelay = 0 }) => {
  const { setSelectedService } = useTrust();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
    >
      {/* Service Image Header */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
        
        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5">
          <span className="bg-white/95 text-slate-800 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {service.category}
          </span>
        </div>

        {/* Service Icon Badge */}
        <div className="absolute bottom-3 right-3.5 w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:bg-red-700 transition">
          <Icon name={service.icon || 'award'} size={20} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
            {service.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
            100% Free Program
          </span>

          <button
            onClick={() => setSelectedService(service)}
            className="text-slate-900 hover:text-red-600 font-bold text-sm flex items-center space-x-1 group/btn"
          >
            <span>Learn More</span>
            <Icon name="arrowright" size={15} className="group-hover/btn:translate-x-1 transition-transform text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
