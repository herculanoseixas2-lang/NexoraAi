import React, { useState, useEffect } from 'react';
import { IntroExperience } from './components/IntroExperience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { WebsiteShowcase } from './components/WebsiteShowcase';
import { WhyNexora } from './components/WhyNexora';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ParticleBackground } from './components/ParticleBackground';
import { AdminPanel } from './components/AdminPanel';
import { RevenueDashboard } from './components/RevenueDashboard';
import { ApplicationsSection } from './components/ApplicationsSection';
import { messageStore } from './utils/messageStore';

export default function App() {
  // Always open directly into the cinematic Intro experience when visiting the website
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && (
      window.location.hash === '#admin' ||
      window.location.hash === '#dashboard' ||
      window.location.search.includes('admin=true') ||
      window.location.search.includes('dashboard=true')
    )) {
      return false;
    }
    return true;
  });
  const [isDev, setIsDev] = useState<boolean>(() => messageStore.isDevAuthenticated());
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);

  // Sync developer authentication state
  useEffect(() => {
    const handleAuthChange = () => {
      setIsDev(messageStore.isDevAuthenticated());
    };
    window.addEventListener('nexora_auth_changed', handleAuthChange);
    return () => window.removeEventListener('nexora_auth_changed', handleAuthChange);
  }, []);

  // Keyboard shortcuts:
  // - Ctrl+Shift+A: Developer Admin Panel
  // - Ctrl+Shift+D: Developer Financial Revenue Dashboard
  // URL hashes: #admin or #dashboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        if (e.key === 'A' || e.key === 'a') {
          e.preventDefault();
          setShowAdminPanel((prev) => !prev);
        } else if (e.key === 'D' || e.key === 'd') {
          e.preventDefault();
          setShowDashboard((prev) => !prev);
        }
      }
    };

    const handleHash = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      if (hash === '#admin' || search.includes('admin=true')) {
        setShowAdminPanel(true);
      } else if (hash === '#dashboard' || search.includes('dashboard=true')) {
        setShowDashboard(true);
      }
    };

    // Initial check
    handleHash();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const handleOpenContact = (service?: string) => {
    if (service) {
      setPrefilledService(service);
    }
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreSolutions = () => {
    const section = document.getElementById('solucoes');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05040A] text-[#F3F4F6] selection:bg-[#7C3AED]/30 selection:text-[#38BDF8] relative overflow-x-hidden font-sans">
      {/* Background Interactive Stardust & Node Canvas */}
      <ParticleBackground glowIntensity={0.35} />

      {/* 1. Initial Entry Experience (Cinematic AI Intro on link open) */}
      {showIntro && (
        <IntroExperience
          onEnter={() => {
            setShowIntro(false);
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          onOpenDashboard={() => {
            setShowIntro(false);
            setShowDashboard(true);
          }}
          onOpenAdminPanel={() => {
            setShowIntro(false);
            setShowAdminPanel(true);
          }}
        />
      )}

      {/* 2. Main Website Header */}
      <Header
        isDev={isDev}
        onOpenDashboard={() => setShowDashboard(true)}
        onOpenContact={() => handleOpenContact()}
        onReplayIntro={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setShowIntro(true);
        }}
        onOpenAdminPanel={() => setShowAdminPanel(true)}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* 3. Hero Section (with Humanoid Robot & Hover Skeleton Effect + Scroll Down Indicator) */}
        <Hero
          onExploreSolutions={handleExploreSolutions}
          onContact={() => handleOpenContact()}
        />

        {/* 4. Statistics with Live Reactive Counters */}
        <Stats />

        {/* 5. Proprietary Applications Showcase (Amora AI & GraviFlow) */}
        <ApplicationsSection />

        {/* 6. Interactive Service Grid (O Que Podemos Construir Juntos) */}
        <Services onSelectService={(srv) => handleOpenContact(srv)} />

        {/* 7. Website Development Showcase (3D Browser Mockup) */}
        <WebsiteShowcase onStartWebProject={() => handleOpenContact('Desenvolvimento de Websites')} />

        {/* 8. Why Nexora (Diferenciais Estratégicos) */}
        <WhyNexora />

        {/* 9. Final Large Rounded CTA Panel */}
        <CTA
          onOpenContact={() => handleOpenContact()}
          onExploreSolutions={handleExploreSolutions}
        />

        {/* 11. Contact Form & Direct Channels */}
        <Contact prefilledService={prefilledService} />
      </main>

      {/* 12. Minimal Futuristic Footer with Dev Inbox trigger */}
      <Footer
        onOpenContact={() => handleOpenContact()}
        onReplayIntro={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setShowIntro(true);
        }}
        onOpenAdminPanel={() => setShowAdminPanel(true)}
      />

      {/* 13. Floating Actions (WhatsApp & Scroll to Top + Dev Quick Dock) */}
      <FloatingActions
        isDev={isDev}
        onOpenDashboard={() => setShowDashboard(true)}
        onOpenAdminPanel={() => setShowAdminPanel(true)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* 14. Developer Admin Panel & Message Inbox */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        onOpenDashboard={() => {
          setShowAdminPanel(false);
          setShowDashboard(true);
        }}
      />

      {/* 15. Developer Revenue & Financial Dashboard (Kwanza, Dólar, Euro, Real) */}
      <RevenueDashboard
        isOpen={showDashboard}
        onClose={() => setShowDashboard(false)}
        onOpenAdminPanel={() => {
          setShowDashboard(false);
          setShowAdminPanel(true);
        }}
      />
    </div>
  );
}
