import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from '../components/Icons.jsx';

export const AboutPage = () => {
  const { navigate, stats } = useTrust();

  const objectives = [
    {
      title: "Women's Economic Empowerment",
      desc: "Provide free professional tailoring and Maggam embroidery training to help women generate sustainable household income.",
      icon: "scissors"
    },
    {
      title: "24/7 Life Saving Healthcare",
      desc: "Maintain voluntary blood donation registries and coordinate rapid emergency blood mobilization for patients in critical need.",
      icon: "heartpulse"
    },
    {
      title: "Eradicating Hunger (Annadhanam)",
      desc: "Distribute hot nutritious meals and monthly dry ration grocery kits to homeless individuals, hospital attendees, and vulnerable seniors.",
      icon: "utensils"
    },
    {
      title: "Public Welfare & Thirst Relief",
      desc: "Install Chalivendram clay-pot drinking water stations and spiced buttermilk kiosks during intense summer heatwaves.",
      icon: "droplets"
    },
    {
      title: "Youth Development Through Sports",
      desc: "Organize grassroots tournaments in Kabaddi, Cricket, and Volleyball, distributing free sports kits to nurture talent.",
      icon: "trophy"
    },
    {
      title: "Universal Educational Support",
      desc: "Distribute free school bags, books, and merit awards to ensure no underprivileged child drops out due to lack of supplies.",
      icon: "graduationcap"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Inception & First Chalivendram Kiosk",
      desc: "Founded with the vision of selfless public service; inaugurated first summer drinking water station serving 500+ daily commuters."
    },
    {
      year: "2020",
      title: "Pandemic Food & Grocery Relief Mission",
      desc: "Mobilized massive dry ration kits and cooked meals to over 15,000 migrant and daily wage families during lockdowns."
    },
    {
      year: "2022",
      title: "Launch of Free Skill Training Center",
      desc: "Established permanent tailoring and Maggam embroidery workshop equipped with industrial sewing machines."
    },
    {
      year: "2024",
      title: "Blood Helpline & Sports Foundation",
      desc: "Crossed 1,000 registered voluntary blood donors and launched the annual Memorial Sports Cup for rural youth."
    },
    {
      year: "2026 & Beyond",
      title: "Expansion to Multi-Disciplinary Welfare",
      desc: "Empowering 2,000+ certified trainees, running 8+ Chalivendram kiosks, and aiming to reach 100,000 total beneficiaries."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4" data-aos="fade-right">
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
              About Medidhisubbaiah Trust
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              A Legacy of Selfless Service, <br />
              <span className="text-red-500">Integrity and Community Upliftment</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Medidhisubbaiah Trust is a registered non-profit charitable social-service organization committed to creating equal opportunities, supporting vulnerable families, and empowering rural and urban youth through education and vocational training.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <div className="bg-red-50/60 border border-red-200 rounded-2xl p-8 space-y-4 shadow-sm" data-aos="fade-up">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <Icon name="heart" size={24} />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Our Mission</h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              To alleviate poverty and vulnerability through holistic community interventions: providing 100% free livelihood training for women, facilitating prompt emergency blood donations, distributing nourishing food, supplying clean drinking water, and fostering youth potential through education and sports.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-8 space-y-4 shadow-xl" data-aos="fade-up" data-aos-delay="100">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <Icon name="eye" size={24} />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Our Vision</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              A compassionate, self-reliant society where no family suffers from hunger, no emergency patient loses life due to lack of blood, every woman has vocational independence, and every child possesses the resources to learn, compete, and flourish.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Why We Serve & Core Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5" data-aos="fade-right">
            <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">
              Our Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Why Medidhisubbaiah Trust Exists
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Real progress happens when assistance is delivered with dignity, transparency, and consistency. Medidhisubbaiah Trust was built on the core belief that charitable aid should not be sporadic—it must be an everyday, dependable support system for those who have nowhere else to turn.
            </p>
            <div className="space-y-3 pt-2">
              {[
                { title: 'Zero Commercial Intent', desc: 'Every rupee, volunteer hour, and service is channeled purely for public welfare without any fees.' },
                { title: 'Transparency & Accountability', desc: 'All distribution records, training registries, and donor drives are documented and open to community review.' },
                { title: 'Grassroots Community Presence', desc: 'Our volunteers live and work directly within the communities we support, identifying genuine needs firsthand.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="p-1 rounded-full bg-red-100 text-red-600 mt-0.5">
                    <Icon name="check" size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6" data-aos="fade-left">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
                alt="Women skill training"
                className="rounded-2xl shadow-lg h-56 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80"
                alt="Blood donation drive"
                className="rounded-2xl shadow-lg h-56 w-full object-cover mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80"
                alt="Chalivendram water"
                className="rounded-2xl shadow-lg h-56 w-full object-cover -mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                alt="Child education"
                className="rounded-2xl shadow-lg h-56 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Strategic Objectives Grid */}
      <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3" data-aos="fade-up">
            <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-red-200">
              Core Pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Our 6 Strategic Objectives
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The foundational pillars that guide each welfare initiative undertaken by Medidhisubbaiah Trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Icon name={obj.icon} size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">{obj.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust Journey & Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3" data-aos="fade-up">
          <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">
            Our Journey
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Milestones of Community Impact
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From humble beginnings to a widespread grassroots welfare network.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all gap-4 sm:gap-6 group"
            >
              <div className="shrink-0 bg-gradient-to-br from-red-600 to-red-800 text-white font-extrabold text-lg sm:text-xl px-5 py-3 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                {m.year}
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  {m.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Impact Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Be a Part of Our Mission?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you want to join our skill training courses, register your name for blood donation, or volunteer for food service — Medidhisubbaiah Trust welcomes you warmly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('services')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition"
            >
              Explore Our Services
            </button>
            <button
              onClick={() => navigate('contact')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition"
            >
              Contact Trust Office
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
