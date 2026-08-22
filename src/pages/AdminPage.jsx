import { useTrust } from '../context/TrustContext.jsx';
import { Icon } from '../components/Icons.jsx';

const { useState } = React;

export const AdminPage = () => {
  const {
    isAdminLoggedIn,
    logoutAdmin,
    navigate,
    services,
    addService,
    updateService,
    deleteService,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    news,
    addNews,
    updateNews,
    deleteNews,
    gallery,
    addGalleryImage,
    deleteGalleryImage,
    inquiries,
    resetToFactoryDefaults
  } = useTrust();

  const [activeTab, setActiveTab] = useState('services'); // 'services', 'events', 'news', 'gallery', 'inquiries'

  // Service form modal
  const [serviceModal, setServiceModal] = useState({ isOpen: false, isEdit: false, data: null });
  // Event form modal
  const [eventModal, setEventModal] = useState({ isOpen: false, isEdit: false, data: null });
  // News form modal
  const [newsModal, setNewsModal] = useState({ isOpen: false, isEdit: false, data: null });
  // Gallery form modal
  const [galleryModal, setGalleryModal] = useState({ isOpen: false });

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
          <Icon name="lock" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Administrator Access Required</h2>
        <p className="text-slate-500 text-sm max-w-md">
          Please log in with authorized credentials to access the dynamic Trust management dashboard.
        </p>
        <button
          onClick={() => navigate('login')}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
        >
          Go to Login Page
        </button>
      </div>
    );
  }

  // --- SERVICE FORM HANDLER ---
  const handleServiceSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const item = {
      title: form.title.value,
      category: form.category.value,
      shortDescription: form.shortDescription.value,
      fullDescription: form.fullDescription.value,
      image: form.image.value || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      duration: form.duration.value,
      beneficiaries: form.beneficiaries.value,
      location: form.location.value,
      icon: form.icon.value || 'award',
      features: form.features.value ? form.features.value.split('\n').filter(Boolean) : []
    };

    if (serviceModal.isEdit && serviceModal.data) {
      updateService(serviceModal.data.id, item);
    } else {
      addService(item);
    }
    setServiceModal({ isOpen: false, isEdit: false, data: null });
  };

  // --- EVENT FORM HANDLER ---
  const handleEventSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const item = {
      title: form.title.value,
      category: form.category.value,
      status: form.status.value,
      date: form.date.value,
      time: form.time.value,
      location: form.location.value,
      description: form.description.value,
      organizer: form.organizer.value,
      image: form.image.value || 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
    };

    if (eventModal.isEdit && eventModal.data) {
      updateEvent(eventModal.data.id, item);
    } else {
      addEvent(item);
    }
    setEventModal({ isOpen: false, isEdit: false, data: null });
  };

  // --- NEWS FORM HANDLER ---
  const handleNewsSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const item = {
      title: form.title.value,
      category: form.category.value,
      date: form.date.value || new Date().toISOString().split('T')[0],
      author: form.author.value || 'Trust Desk',
      shortDescription: form.shortDescription.value,
      content: form.content.value,
      thumbnail: form.thumbnail.value || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80'
    };

    if (newsModal.isEdit && newsModal.data) {
      updateNews(newsModal.data.id, item);
    } else {
      addNews(item);
    }
    setNewsModal({ isOpen: false, isEdit: false, data: null });
  };

  // --- GALLERY FORM HANDLER ---
  const handleGallerySubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const item = {
      title: form.title.value,
      category: form.category.value,
      imageUrl: form.imageUrl.value,
      caption: form.caption.value,
      date: form.date.value || new Date().toISOString().split('T')[0]
    };
    addGalleryImage(item);
    setGalleryModal({ isOpen: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Bar */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Live Management
            </span>
            <span className="text-slate-400 text-xs font-medium">Logged in as Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Medidhisubbaiah Trust Content Hub</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Add, update, or remove services, events, news articles, and gallery records in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => {
              if (confirm('Reset all dynamic data back to original default Trust datasets?')) {
                resetToFactoryDefaults();
              }
            }}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-xl transition border border-slate-700"
          >
            Reset Default Data
          </button>
          <button
            onClick={logoutAdmin}
            className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl shadow transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto bg-white p-2 rounded-2xl border border-slate-200 shadow-sm scrollbar-none">
        {[
          { id: 'services', label: `Services (${services.length})`, icon: 'scissors' },
          { id: 'events', label: `Events (${events.length})`, icon: 'calendar' },
          { id: 'news', label: `News & Articles (${news.length})`, icon: 'award' },
          { id: 'gallery', label: `Gallery (${gallery.length})`, icon: 'eye' },
          { id: 'inquiries', label: `Inquiries Received (${inquiries.length})`, icon: 'mail' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= SERVICES TAB ================= */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Manage Welfare Services</h2>
              <p className="text-xs text-slate-500">Add or edit community welfare and skill programs.</p>
            </div>
            <button
              onClick={() => setServiceModal({ isOpen: true, isEdit: false, data: null })}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow flex items-center space-x-1.5 transition"
            >
              <Icon name="plus" size={16} />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {s.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: {s.id}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{s.shortDescription}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => setServiceModal({ isOpen: true, isEdit: true, data: s })}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Icon name="edit" size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete service "${s.title}"?`)) deleteService(s.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Icon name="trash" size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= EVENTS TAB ================= */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Manage Trust Events</h2>
              <p className="text-xs text-slate-500">Schedule camps, tournaments, and distribution dates.</p>
            </div>
            <button
              onClick={() => setEventModal({ isOpen: true, isEdit: false, data: null })}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow flex items-center space-x-1.5 transition"
            >
              <Icon name="plus" size={16} />
              <span>Schedule Event</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <div key={e.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${e.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {e.status}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{e.date}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{e.title}</h3>
                  <p className="text-xs text-slate-500">{e.location}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => setEventModal({ isOpen: true, isEdit: true, data: e })}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Icon name="edit" size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete event "${e.title}"?`)) deleteEvent(e.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Icon name="trash" size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= NEWS TAB ================= */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Manage News & Media</h2>
              <p className="text-xs text-slate-500">Publish articles, updates, and community impact reports.</p>
            </div>
            <button
              onClick={() => setNewsModal({ isOpen: true, isEdit: false, data: null })}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow flex items-center space-x-1.5 transition"
            >
              <Icon name="plus" size={16} />
              <span>Publish Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n) => (
              <div key={n.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {n.category}
                    </span>
                    <span className="text-xs text-slate-400">{n.date}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{n.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{n.shortDescription}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => setNewsModal({ isOpen: true, isEdit: true, data: n })}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Icon name="edit" size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete article "${n.title}"?`)) deleteNews(n.id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Icon name="trash" size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= GALLERY TAB ================= */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="font-extrabold text-lg text-slate-900">Manage Photo Gallery</h2>
              <p className="text-xs text-slate-500">Upload or remove community activity photos.</p>
            </div>
            <button
              onClick={() => setGalleryModal({ isOpen: true })}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow flex items-center space-x-1.5 transition"
            >
              <Icon name="plus" size={16} />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((g) => (
              <div key={g.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative group">
                <img src={g.imageUrl} alt={g.title} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <span className="text-[10px] font-bold text-red-600 block">{g.category}</span>
                  <h4 className="font-bold text-xs text-slate-900 truncate">{g.title}</h4>
                </div>
                <button
                  onClick={() => {
                    if (confirm('Delete this photo from gallery?')) deleteGalleryImage(g.id);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow hover:bg-red-700 transition"
                  aria-label="Delete photo"
                >
                  <Icon name="trash" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= INQUIRIES TAB ================= */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h2 className="font-extrabold text-lg text-slate-900">Public Inquiries & Applications</h2>
            <p className="text-xs text-slate-500">Messages and free course applications submitted through the website.</p>
          </div>

          {inquiries.length > 0 ? (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-red-600">{inq.subject || 'General Inquiry'}</span>
                      <h4 className="font-bold text-base text-slate-900">{inq.name}</h4>
                    </div>
                    <span className="text-xs text-slate-400">{inq.submittedAt}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-slate-600">
                    <span>Phone: <strong>{inq.phone}</strong></span>
                    {inq.email && <span>Email: <strong>{inq.email}</strong></span>}
                  </div>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                    "{inq.message}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No new inquiries received yet. Inquiries submitted via the Contact page or Service forms will appear here.
            </div>
          )}
        </div>
      )}

      {/* ================= SERVICE MODAL ================= */}
      {serviceModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{serviceModal.isEdit ? 'Edit Service' : 'Add New Service Program'}</h3>
            <form onSubmit={handleServiceSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold block mb-1">Service Title *</label>
                <input
                  name="title"
                  required
                  defaultValue={serviceModal.data?.title || ''}
                  placeholder="e.g. Free Computer Literacy"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Category *</label>
                <select name="category" defaultValue={serviceModal.data?.category || 'Skill Development'} className="w-full p-2 border rounded-lg bg-white">
                  <option value="Skill Development">Skill Development</option>
                  <option value="Community Welfare">Community Welfare</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Public Welfare">Public Welfare</option>
                  <option value="Sports">Sports</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Short Description *</label>
                <textarea
                  name="shortDescription"
                  required
                  rows="2"
                  defaultValue={serviceModal.data?.shortDescription || ''}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Full Description</label>
                <textarea
                  name="fullDescription"
                  rows="3"
                  defaultValue={serviceModal.data?.fullDescription || ''}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Duration</label>
                  <input name="duration" defaultValue={serviceModal.data?.duration || '3 Months'} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Beneficiaries Metric</label>
                  <input name="beneficiaries" defaultValue={serviceModal.data?.beneficiaries || '500+ Trained'} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Location / Center</label>
                <input name="location" defaultValue={serviceModal.data?.location || 'Trust Center'} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Image URL</label>
                <input name="image" defaultValue={serviceModal.data?.image || ''} placeholder="https://..." className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Icon Identifier</label>
                <input name="icon" defaultValue={serviceModal.data?.icon || 'award'} placeholder="scissors, heartpulse, award, utensils..." className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Key Features (One per line)</label>
                <textarea name="features" rows="3" defaultValue={serviceModal.data?.features?.join('\n') || ''} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setServiceModal({ isOpen: false, isEdit: false, data: null })}
                  className="px-4 py-2 border rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-red-600 text-white rounded-lg font-bold shadow">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EVENT MODAL ================= */}
      {eventModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{eventModal.isEdit ? 'Edit Event' : 'Schedule New Event'}</h3>
            <form onSubmit={handleEventSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold block mb-1">Event Title *</label>
                <input name="title" required defaultValue={eventModal.data?.title || ''} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Category *</label>
                  <select name="category" defaultValue={eventModal.data?.category || 'Blood Donation'} className="w-full p-2 border rounded-lg bg-white">
                    <option value="Blood Donation">Blood Donation</option>
                    <option value="Education">Education</option>
                    <option value="Sports">Sports</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Public Welfare">Public Welfare</option>
                    <option value="Community Service">Community Service</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Status</label>
                  <select name="status" defaultValue={eventModal.data?.status || 'Upcoming'} className="w-full p-2 border rounded-lg bg-white">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Date *</label>
                  <input name="date" type="date" required defaultValue={eventModal.data?.date || new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Time</label>
                  <input name="time" defaultValue={eventModal.data?.time || '09:00 AM - 01:00 PM'} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Location / Venue *</label>
                <input name="location" required defaultValue={eventModal.data?.location || ''} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Organizer Wing</label>
                <input name="organizer" defaultValue={eventModal.data?.organizer || 'Medidhisubbaiah Trust'} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Description</label>
                <textarea name="description" rows="3" defaultValue={eventModal.data?.description || ''} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Image URL</label>
                <input name="image" defaultValue={eventModal.data?.image || ''} placeholder="https://..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEventModal({ isOpen: false, isEdit: false, data: null })}
                  className="px-4 py-2 border rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-red-600 text-white rounded-lg font-bold shadow">
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= NEWS MODAL ================= */}
      {newsModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">{newsModal.isEdit ? 'Edit News Article' : 'Publish New Article'}</h3>
            <form onSubmit={handleNewsSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold block mb-1">Article Headline *</label>
                <input name="title" required defaultValue={newsModal.data?.title || ''} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select name="category" defaultValue={newsModal.data?.category || 'Skill Development'} className="w-full p-2 border rounded-lg bg-white">
                    <option value="Skill Development">Skill Development</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Public Welfare">Public Welfare</option>
                    <option value="Community Service">Community Service</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Publish Date</label>
                  <input name="date" type="date" defaultValue={newsModal.data?.date || new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Author / Desk</label>
                <input name="author" defaultValue={newsModal.data?.author || 'Trust Editorial Desk'} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Short Summary / Snippet *</label>
                <textarea name="shortDescription" required rows="2" defaultValue={newsModal.data?.shortDescription || ''} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Full Article Content</label>
                <textarea name="content" rows="5" defaultValue={newsModal.data?.content || ''} className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Thumbnail Image URL</label>
                <input name="thumbnail" defaultValue={newsModal.data?.thumbnail || ''} placeholder="https://..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewsModal({ isOpen: false, isEdit: false, data: null })}
                  className="px-4 py-2 border rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-red-600 text-white rounded-lg font-bold shadow">
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= GALLERY MODAL ================= */}
      {galleryModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border">
            <h3 className="text-lg font-bold mb-4">Add Photo to Gallery</h3>
            <form onSubmit={handleGallerySubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="font-bold block mb-1">Photo Title *</label>
                <input name="title" required placeholder="e.g. Blood Donation Camp" className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Category *</label>
                <select name="category" className="w-full p-2 border rounded-lg bg-white">
                  <option value="Events">Events</option>
                  <option value="Blood Donation">Blood Donation</option>
                  <option value="Food Distribution">Food Distribution</option>
                  <option value="Grocery Distribution">Grocery Distribution</option>
                  <option value="Tailoring">Tailoring</option>
                  <option value="Educational Programs">Educational Programs</option>
                  <option value="Sports">Sports</option>
                  <option value="Chalivendram">Chalivendram</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">Image URL *</label>
                <input name="imageUrl" required placeholder="https://images.unsplash.com/..." className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Caption / Details</label>
                <textarea name="caption" rows="2" placeholder="Brief description of the photo..." className="w-full p-2 border rounded-lg" />
              </div>
              <div>
                <label className="font-bold block mb-1">Activity Date</label>
                <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg" />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setGalleryModal({ isOpen: false })}
                  className="px-4 py-2 border rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-red-600 text-white rounded-lg font-bold shadow">
                  Upload Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
