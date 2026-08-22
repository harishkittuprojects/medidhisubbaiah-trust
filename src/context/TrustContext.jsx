import {
  initialServices,
  initialEvents,
  initialNews,
  initialGallery,
  initialStats,
  trustInfo
} from '../data/mockData.js';

const { createContext, useContext, useState, useEffect } = React;

const TrustContext = createContext(null);

export const TrustProvider = ({ children }) => {
  // Navigation Route
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    return hash;
  });

  // Dynamic Data with LocalStorage Persistence
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('mst_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('mst_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('mst_news');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('mst_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('mst_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // Modals state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

  // Authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('mst_admin_session') === 'true';
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mst_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('mst_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('mst_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('mst_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('mst_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Route navigation helper
  const navigate = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-trigger AOS animations on route change
    setTimeout(() => {
      if (window.AOS) window.AOS.refresh();
    }, 100);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Authentication Handlers
  const loginAdmin = (username, password, remember = false) => {
    // Admin credentials for demo/backend ready
    if ((username === 'admin@medidhisubbaiah.org' || username === 'admin') && (password === 'trust2026' || password === 'admin123')) {
      setIsAdminLoggedIn(true);
      if (remember) {
        localStorage.setItem('mst_admin_session', 'true');
      }
      showToast('Welcome back, Trust Administrator!', 'success');
      navigate('admin');
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials. Use admin / trust2026 for demo.' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('mst_admin_session');
    showToast('You have been logged out securely.', 'info');
    navigate('home');
  };

  // CRUD Operations for Services
  const addService = (newService) => {
    const id = Date.now();
    const serviceWithId = { ...newService, id };
    setServices(prev => [serviceWithId, ...prev]);
    showToast('New service program added successfully!');
    return serviceWithId;
  };

  const updateService = (id, updatedService) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
    showToast('Service updated successfully!');
  };

  const deleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('Service removed.', 'info');
  };

  // CRUD Operations for Events
  const addEvent = (newEvent) => {
    const id = Date.now();
    const eventWithId = { ...newEvent, id, seatsRegistered: 0 };
    setEvents(prev => [eventWithId, ...prev]);
    showToast('New event scheduled successfully!');
    return eventWithId;
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
    showToast('Event details updated!');
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    showToast('Event removed.', 'info');
  };

  const registerForEvent = (eventId, participantData) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        return { ...e, seatsRegistered: (e.seatsRegistered || 0) + 1 };
      }
      return e;
    }));
    showToast(`Registration confirmed for ${participantData.name}! Check your SMS/Email.`);
  };

  // CRUD Operations for News
  const addNews = (newArticle) => {
    const id = Date.now();
    const articleWithId = {
      ...newArticle,
      id,
      date: newArticle.date || new Date().toISOString().split('T')[0],
      readTime: '3 min read'
    };
    setNews(prev => [articleWithId, ...prev]);
    showToast('News article published successfully!');
    return articleWithId;
  };

  const updateNews = (id, updatedArticle) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updatedArticle } : n));
    showToast('News article updated!');
  };

  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id));
    showToast('News article deleted.', 'info');
  };

  // CRUD Operations for Gallery
  const addGalleryImage = (newImage) => {
    const id = Date.now();
    const imgWithId = {
      ...newImage,
      id,
      date: newImage.date || new Date().toISOString().split('T')[0]
    };
    setGallery(prev => [imgWithId, ...prev]);
    showToast('Photo added to gallery!');
    return imgWithId;
  };

  const deleteGalleryImage = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    showToast('Gallery image removed.', 'info');
  };

  // Contact Inquiries
  const submitContactForm = (formData) => {
    const newInquiry = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toLocaleString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
    showToast('Thank you! Your message has been received by Medidhisubbaiah Trust.', 'success');
  };

  // Reset to default mock data
  const resetToFactoryDefaults = () => {
    setServices(initialServices);
    setEvents(initialEvents);
    setNews(initialNews);
    setGallery(initialGallery);
    localStorage.removeItem('mst_services');
    localStorage.removeItem('mst_events');
    localStorage.removeItem('mst_news');
    localStorage.removeItem('mst_gallery');
    showToast('Data reset to default trust datasets.', 'info');
  };

  const value = {
    currentRoute,
    navigate,
    services,
    events,
    news,
    gallery,
    inquiries,
    stats: initialStats,
    trustInfo,
    selectedService,
    setSelectedService,
    selectedEvent,
    setSelectedEvent,
    selectedNews,
    setSelectedNews,
    lightboxIndex,
    setLightboxIndex,
    isVolunteerModalOpen,
    setIsVolunteerModalOpen,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    toast,
    showToast,
    addService,
    updateService,
    deleteService,
    addEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    addNews,
    updateNews,
    deleteNews,
    addGalleryImage,
    deleteGalleryImage,
    submitContactForm,
    resetToFactoryDefaults
  };

  return (
    <TrustContext.Provider value={value}>
      {children}
    </TrustContext.Provider>
  );
};

export const useTrust = () => {
  const context = useContext(TrustContext);
  if (!context) {
    throw new Error('useTrust must be used within a TrustProvider');
  }
  return context;
};
