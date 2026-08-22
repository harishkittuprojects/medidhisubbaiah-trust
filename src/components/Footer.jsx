import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from './Icons.jsx';

const { useState } = React;

export const Footer = () => {
  const { navigate, trustInfo, showToast, services } = useTrust();
  const [emailSub, setEmailSub] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSub || !emailSub.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed! You will receive community updates and newsletters.', 'success');
    setEmailSub('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Purpose (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <span className="font-extrabold text-lg">MT</span>
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight">
                  Medidhisubbaiah <span className="text-red-500">Trust</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">Regd. Social Welfare & Charitable Organization</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Medidhisubbaiah Trust is dedicated to uplifting underprivileged families, empowering women through free vocational training, providing life-saving healthcare and blood donor support, and fostering education for every child.
            </p>

            {/* Helpline Box */}
            <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-4 flex items-center space-x-3">
              <div className="p-2 bg-red-600 text-white rounded-lg">
                <Icon name="heartpulse" size={20} />
              </div>
              <div>
                <div className="text-xs text-red-300 font-medium">24/7 Voluntary Blood Donor Support</div>
                <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="text-white font-bold text-base hover:text-red-300 transition">
                  {trustInfo.emergencyBloodHelpline}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-red-500 pl-2.5">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', route: 'home' },
                { name: 'About Us', route: 'about' },
                { name: 'Our Services', route: 'services' },
                { name: 'Upcoming Events', route: 'events' },
                { name: 'Latest News & Stories', route: 'news' },
                { name: 'Photo Gallery', route: 'gallery' },
                { name: 'Contact & Support', route: 'contact' },
                { name: 'Admin Portal', route: 'login' }
              ].map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => navigate(link.route)}
                    className="hover:text-red-400 transition-colors flex items-center space-x-1 text-slate-400 hover:translate-x-1 transform duration-150"
                  >
                    <Icon name="chevronright" size={14} className="text-red-500" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trust Programs */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-red-500 pl-2.5">
              Welfare Programs
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => navigate('services')}
                    className="hover:text-red-400 transition text-left flex items-start space-x-1.5"
                  >
                    <span className="text-red-500 mt-1">•</span>
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider border-l-2 border-red-500 pl-2.5">
              Stay Connected
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to our community newsletter for updates on donation drives, training admissions, and events.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg text-sm transition shadow-md"
              >
                Subscribe
              </button>
            </form>

            <div className="pt-2">
              <p className="text-xs text-slate-400 font-medium mb-2">Follow our activities:</p>
              <div className="flex space-x-3">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                  <a
                    key={platform}
                    href={trustInfo.socials[platform] || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition"
                  >
                    <Icon name="share" size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Medidhisubbaiah Trust. All Rights Reserved. Committed to selfless social service.</p>
          <div className="flex space-x-6">
            <button onClick={() => navigate('about')} className="hover:text-slate-300 transition">About Trust</button>
            <button onClick={() => navigate('contact')} className="hover:text-slate-300 transition">Contact Us</button>
            <button onClick={() => navigate('login')} className="hover:text-slate-300 transition">Admin Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
