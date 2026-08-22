import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState } = React;

export const ContactPage = () => {
  const { trustInfo, submitContactForm } = useTrust();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill out all required fields (Name, Phone, Message).');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitContactForm(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 500);
  };

  const faqs = [
    {
      q: 'Are all training programs and services of Medidhisubbaiah Trust really free?',
      a: 'Yes, 100%. Medidhisubbaiah Trust never charges any admission fees, training costs, or material charges for tailoring, Maggam work, blood coordination, water kiosks, or food distribution.'
    },
    {
      q: 'How can I enroll for the Free Tailoring or Maggam Work courses?',
      a: 'You can submit the form on this contact page or directly click "Learn More" on the specific service card in Our Services page to submit a free application. Our admissions coordinator will verify details and assign your batch timing.'
    },
    {
      q: 'How can I request emergency blood or join the voluntary donor registry?',
      a: 'Call our 24/7 Emergency Blood Helpline directly at +91 98480 99999. To register as a volunteer donor, submit your contact details and blood group via the contact form or join during our regular blood donation camps.'
    },
    {
      q: 'Can individuals or institutions collaborate with the Trust for sports or school events?',
      a: 'Yes! We actively collaborate with government schools, rural youth committees, and welfare groups to organize sporting meets, kit distributions, and educational workshops. Please reach out via email or phone.'
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4" data-aos="fade-right">
            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full inline-block">
              We Are Here To Serve You
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Contact <span className="text-red-500">Medidhisubbaiah Trust</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Have questions regarding our vocational training programs, blood donor coordination, community relief, or sponsorship initiatives? Reach out to our team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3" data-aos="fade-up">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Icon name="mappin" size={22} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Trust Headquarters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {trustInfo.address}
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3" data-aos="fade-up" data-aos-delay="80">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Icon name="phone" size={22} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Phone Helpdesk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {trustInfo.phone}
            </p>
            <span className="text-[11px] font-semibold text-slate-400 block">Mon - Sat: 8:30 AM - 6:30 PM</span>
          </div>

          {/* Card 3: Emergency Helpline */}
          <div className="bg-red-50/70 p-6 rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition space-y-3" data-aos="fade-up" data-aos-delay="160">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
              <Icon name="heartpulse" size={22} />
            </div>
            <h3 className="font-bold text-base text-red-900">24/7 Blood Emergency</h3>
            <a href={`tel:${trustInfo.emergencyBloodHelpline}`} className="text-base font-extrabold text-red-600 hover:underline block">
              {trustInfo.emergencyBloodHelpline}
            </a>
            <span className="text-[11px] font-semibold text-red-700 block">Available round the clock for urgent donor match</span>
          </div>

          {/* Card 4: Email */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3" data-aos="fade-up" data-aos-delay="240">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Icon name="mail" size={22} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Email Inquiries</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {trustInfo.email}
            </p>
            <span className="text-[11px] text-slate-400 block">Expect replies within 24 hours</span>
          </div>

        </div>
      </section>

      {/* 3. Form & Google Map Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md" data-aos="fade-right">
            <div className="mb-6 space-y-1">
              <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full inline-block">
                Send Us A Message
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                How Can We Help You?
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Fill the form below and our team will get in touch with you promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Tailoring Program Admission">Free Tailoring Program Admission</option>
                    <option value="Maggam Work Course">Maggam Work Course Admission</option>
                    <option value="Emergency Blood Donor">Emergency Blood Request / Donor Registration</option>
                    <option value="Food & Grocery Assistance">Food & Grocery Support</option>
                    <option value="Sports & Education Sponsorship">Sports / Education Program</option>
                    <option value="Volunteer / CSR Partnership">Volunteer / Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Message / Details <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe your inquiry, request, or proposal in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Submit Inquiries</span>
                      <Icon name="arrowright" size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Google Maps & Location Card */}
          <div className="lg:col-span-5 space-y-6" data-aos="fade-left">
            
            {/* Map Frame */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md p-2">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  title="Medidhisubbaiah Trust Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122554.40939515949!2d79.94829762145025!3d14.442598715873998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb3644f1c1f54cd%3A0xb5b7964b73b5f922!2sAndhra%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-4 bg-white text-xs text-slate-600 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="mappin" size={16} className="text-red-600" />
                  <span className="font-semibold text-slate-800">Visiting Hours: 8:30 AM - 6:30 PM</span>
                </div>
                <span className="text-red-600 font-bold text-[11px]">Walk-ins Welcome</span>
              </div>
            </div>

            {/* Social Media Connect Box */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-base">Connect on Social Channels</h3>
              <p className="text-xs text-slate-400">
                Follow our official social profiles to view real-time photo feeds of distribution camps and ceremonies.
              </p>
              <div className="flex space-x-3 pt-1">
                {['facebook', 'twitter', 'instagram', 'youtube', 'whatsapp'].map((platform) => (
                  <a
                    key={platform}
                    href={trustInfo.socials[platform] || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 text-white flex items-center justify-center transition shadow"
                  >
                    <Icon name="share" size={16} />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Frequently Asked Questions Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center mb-8 space-y-2" data-aos="fade-up">
          <span className="text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full">
            Helpful Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center space-x-4 hover:bg-slate-50 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">{faq.q}</span>
                  <span className={`transform transition-transform text-red-600 ${isOpen ? 'rotate-180' : ''}`}>
                    <Icon name="chevronright" size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-red-50/20 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
