import { useTrust } from '../context/TrustContext.jsx';
import { Hero } from '../components/Hero.jsx';
import { StatsCounter } from '../components/StatsCounter.jsx';
import { ServiceCard } from '../components/ServiceCard.jsx';
import { EventCard } from '../components/EventCard.jsx';
import { NewsCard } from '../components/NewsCard.jsx';
import { Icon } from '../components/Icons.jsx';

export const HomePage = () => {
  const { services, events, news, gallery, navigate, setLightboxIndex } = useTrust();

  // Filter 6 featured services, upcoming events, latest 3 news items, and 6 gallery items
  const featuredServices = services.slice(0, 6);
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').slice(0, 3);
  const latestNews = news.slice(0, 3);
  const gallerySpotlight = gallery.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Impact Statistics */}
      <StatsCounter />

      {/* 3. About Trust Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            
            <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
              <div className="inline-flex items-center space-x-2 bg-red-600/20 text-red-400 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Icon name="award" size={14} />
                <span>About Medidhisubbaiah Trust</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Rooted in Compassion, <br />
                <span className="text-red-500">Dedicated to Transformative Change</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Medidhisubbaiah Trust was founded with the conviction that every human deserves access to dignified livelihood skills, healthcare, sustenance, and learning. We operate free skill training centers for women, organize lifesaving blood drives, conduct weekly food distributions, and foster sports and education among our youth.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-red-400 font-extrabold text-xl sm:text-2xl block">100%</span>
                  <span className="text-xs text-slate-300 font-medium">Free Welfare & Training</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-red-400 font-extrabold text-xl sm:text-2xl block">80,000+</span>
                  <span className="text-xs text-slate-300 font-medium">Beneficiaries Reached</span>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-red-400 font-extrabold text-xl sm:text-2xl block">24/7</span>
                  <span className="text-xs text-slate-300 font-medium">Emergency Donor Support</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('about')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition flex items-center space-x-2 shadow-lg shadow-red-600/30"
                >
                  <span>Read Full Trust Mission & History</span>
                  <Icon name="arrowright" size={16} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                  alt="Medidhisubbaiah Trust Community Service"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="font-bold text-base">Serving with Pride and Transparency</p>
                    <p className="text-xs text-slate-300">Empowering one life at a time through direct community action.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Services Section Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div data-aos="fade-right">
            <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full inline-block mb-2">
              Our Core Programs
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Community Welfare Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              All programs of Medidhisubbaiah Trust are provided free of cost to eligible community members.
            </p>
          </div>

          <button
            onClick={() => navigate('services')}
            className="self-start md:self-end text-red-600 hover:text-red-700 font-bold text-sm flex items-center space-x-1.5 hover:underline"
            data-aos="fade-left"
          >
            <span>View All {services.length} Services</span>
            <Icon name="arrowright" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredServices.map((service, idx) => (
            <ServiceCard key={service.id} service={service} aosDelay={idx * 100} />
          ))}
        </div>
      </section>

      {/* 5. Upcoming Events Section */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div data-aos="fade-right">
              <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-white px-3 py-1 rounded-full inline-block mb-2 border border-red-200">
                Participate & Engage
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Upcoming Events & Drives
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Join our medical drives, sports tournaments, and distribution ceremonies.
              </p>
            </div>

            <button
              onClick={() => navigate('events')}
              className="self-start md:self-end text-red-600 hover:text-red-700 font-bold text-sm flex items-center space-x-1.5 hover:underline"
              data-aos="fade-left"
            >
              <span>Explore All Events</span>
              <Icon name="arrowright" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event, idx) => (
              <EventCard key={event.id} event={event} aosDelay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Latest News & Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div data-aos="fade-right">
            <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full inline-block mb-2">
              Updates & Media
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Latest Trust News & Stories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Read about recent milestones, welfare camp reports, and success stories.
            </p>
          </div>

          <button
            onClick={() => navigate('news')}
            className="self-start md:self-end text-red-600 hover:text-red-700 font-bold text-sm flex items-center space-x-1.5 hover:underline"
            data-aos="fade-left"
          >
            <span>Read All News Articles</span>
            <Icon name="arrowright" size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestNews.map((newsItem, idx) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} aosDelay={idx * 100} />
          ))}
        </div>
      </section>

      {/* 7. Gallery Preview with Lightbox Trigger */}
      <section className="bg-slate-900 py-16 sm:py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div data-aos="fade-right">
              <span className="text-red-400 font-bold text-xs uppercase tracking-wider bg-red-950/80 border border-red-800/60 px-3 py-1 rounded-full inline-block mb-2">
                Moments of Service
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Photo Gallery Preview
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                Real glimpses of tailoring workshops, blood camps, Annadhanam meals, and sports meets.
              </p>
            </div>

            <button
              onClick={() => navigate('gallery')}
              className="self-start md:self-end text-red-400 hover:text-red-300 font-bold text-sm flex items-center space-x-1.5 hover:underline"
              data-aos="fade-left"
            >
              <span>View Full Gallery ({gallery.length}+ Photos)</span>
              <Icon name="arrowright" size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {gallerySpotlight.map((item, idx) => (
              <div
                key={item.id}
                data-aos="zoom-in"
                data-aos-delay={idx * 80}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-44 sm:h-52 rounded-xl overflow-hidden cursor-pointer shadow-md bg-slate-800"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-2 bg-red-600 text-white rounded-full">
                    <Icon name="eye" size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Community Impact Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center sm:text-left">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Join Hands For A Better Tomorrow
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Want to Volunteer, Partner, or Seek Support?
              </h2>
              <p className="text-red-100 text-sm sm:text-base leading-relaxed">
                Whether you need free vocational training, want to register as a voluntary blood donor, or wish to support community meals — Medidhisubbaiah Trust is here for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
              <button
                onClick={() => navigate('contact')}
                className="bg-white text-red-700 hover:bg-red-50 font-bold px-7 py-3.5 rounded-xl text-sm shadow-xl transition-all hover:scale-105"
              >
                Contact Trust Office
              </button>
              <a
                href="tel:+919848099999"
                className="bg-slate-950/80 hover:bg-slate-950 text-white font-bold px-6 py-3.5 rounded-xl text-sm border border-white/20 transition-all flex items-center justify-center space-x-2"
              >
                <Icon name="phone" size={16} className="text-red-400" />
                <span>Emergency Blood Line</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
