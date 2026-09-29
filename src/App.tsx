import React, { useState, useEffect } from 'react';
import { IntroExperience } from './components/IntroExperience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { FeaturedSolutions } from './components/FeaturedSolutions';
import { Services } from './components/Services';
import { WebsiteShowcase } from './components/WebsiteShowcase';
import { WhyNexora } from './components/WhyNexora';
import { CTA } from './components/CTA';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ParticleBackground } from './components/ParticleBackground';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);

  // Keyboard shortcut Ctrl+Shift+A & URL hash #admin for developer inbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setShowAdminPanel((prev) => !prev);
      }
    };

    const handleHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setShowAdminPanel(true);
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

      {/* 1. Initial Entry Experience (Cinematic AI Intro on demand) */}
      {showIntro && (
        <IntroExperience onEnter={() => setShowIntro(false)} />
      )}

      {/* 2. Main Website Header */}
      <Header
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

        {/* 5. Featured Solutions Carousel */}
        <FeaturedSolutions onSelectSolution={(sol) => handleOpenContact(sol)} />

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

      {/* 13. Floating Actions (WhatsApp & Scroll to Top) */}
      <FloatingActions onOpenContact={() => handleOpenContact()} />

      {/* 14. Developer Admin Panel & Message Inbox */}
      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
      />
    </div>
  );
}
