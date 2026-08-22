import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

export const Hero = () => {
  const { navigate } = useTrust();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-slate-50 pt-10 sm:pt-16 pb-20 sm:pb-28">
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-red-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-red-50/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left" data-aos="fade-right">
            
            {/* Trust Name Badge */}
            <div className="inline-flex items-center space-x-2 bg-white border border-red-200 shadow-sm px-4 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                Medidhisubbaiah Trust
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-semibold text-red-600">
                Selfless Social Service
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Empowering Lives Through <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-800">
                Free Welfare & Skill Programs
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Medidhisubbaiah Trust is dedicated to serving humanity through free tailoring and Maggam skill courses, emergency blood donor drives, free food (Annadhanam) & grocery kits, drinking water kiosks (Chalivendram), and youth sports & educational programs.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('services')}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Our Services</span>
                <Icon name="arrowright" size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('events')}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-red-500 px-8 py-4 rounded-xl font-bold text-base shadow-sm hover:text-red-600 transition-all flex items-center justify-center space-x-2"
              >
                <Icon name="calendar" size={18} className="text-red-600" />
                <span>View Events</span>
              </button>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 text-left">
              <div className="flex items-center space-x-2">
                <Icon name="check" size={16} className="text-red-600 font-bold" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">100% Free Services</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="check" size={16} className="text-red-600 font-bold" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Certified Training</span>
              </div>
              <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                <Icon name="check" size={16} className="text-red-600 font-bold" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">24/7 Blood Network</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Grid */}
          <div className="lg:col-span-5 relative" data-aos="fade-left">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
                  alt="Community Welfare Medidhisubbaiah Trust"
                  className="w-full h-[380px] sm:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="inline-block bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
                    Community First
                  </span>
                  <h3 className="text-lg font-bold">Unconditional Service to Society</h3>
                  <p className="text-xs text-slate-200">Reaching thousands of vulnerable families across urban and rural communities.</p>
                </div>
              </div>

              {/* Floating Badge 1: Vocational Skills */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-xl border border-red-100 flex items-center space-x-3 animate-float hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Icon name="scissors" size={20} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium">Free Vocational</span>
                  <span className="block text-sm font-bold text-slate-900">Tailoring & Maggam</span>
                </div>
              </div>

              {/* Floating Badge 2: Blood Donation Impact */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-red-100 flex items-center space-x-3 animate-float-delayed hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
                  <Icon name="heartpulse" size={20} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 font-medium">Lives Saved</span>
                  <span className="block text-sm font-bold text-red-600">4,200+ Blood Units</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
