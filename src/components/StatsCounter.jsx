import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

export const StatsCounter = () => {
  const { stats } = useTrust();

  return (
    <section className="relative z-10 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl hover:bg-red-50/50 transition-colors border border-transparent hover:border-red-100 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Icon name={stat.icon} size={24} />
            </div>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
              {stat.label}
            </span>
            <span className="text-[11px] font-semibold text-red-600 mt-1">
              {stat.change}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
