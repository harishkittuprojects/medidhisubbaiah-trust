import { useTrust } from './context/TrustContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { Toast } from './components/Toast.jsx';
import { ServiceModal } from './components/ServiceModal.jsx';
import { EventModal } from './components/EventModal.jsx';
import { NewsModal } from './components/NewsModal.jsx';
import { LightboxModal } from './components/LightboxModal.jsx';

import { HomePage } from './pages/HomePage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ServicesPage } from './pages/ServicesPage.jsx';
import { EventsPage } from './pages/EventsPage.jsx';
import { NewsPage } from './pages/NewsPage.jsx';
import { GalleryPage } from './pages/GalleryPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';

const { useEffect } = React;

export const App = () => {
  const { currentRoute } = useTrust();

  // Initialize AOS when app mounts
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 700,
        once: true,
        easing: 'ease-out-cubic',
        offset: 50
      });
    }
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'events':
        return <EventsPage />;
      case 'news':
        return <NewsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage />;
      case 'admin':
        return <AdminPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Header & Sticky Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Modals */}
      <ServiceModal />
      <EventModal />
      <NewsModal />
      <LightboxModal />

      {/* Interactive Toast Alerts */}
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
};
