import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import logoOscuro from './assets/images/logo-negro.png';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PresentationCarousel from './components/PresentationCarousel';
import ValueProposition from './components/ValueProposition';
import ServicesCatalog from './components/ServicesCatalog';
import TaxDiagnosticWizard from './components/TaxDiagnosticWizard';
import WorkProcess from './components/WorkProcess';
import TrustAndExperiences from './components/TrustAndExperiences';
import ContactAndFooter from './components/ContactAndFooter';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import InstagramLatestSection from './components/InstagramLatestSection';
import SplashScreen from './components/SplashScreen';
import SuccessView from './components/SuccessView';
import {
  CONTACT_EMAIL as GLOBAL_CONTACT_EMAIL,
  DEFAULT_WHATSAPP_MESSAGE,
  INSTAGRAM_URL as GLOBAL_INSTAGRAM_URL,
  SPLASH_DURATIONS,
  SUCCESS_HASH,
  TIKTOK_URL as GLOBAL_TIKTOK_URL,
  WHATSAPP_NUMBER as GLOBAL_WHATSAPP_NUMBER,
  buildWhatsAppUrl,
  isSuccessViewHash,
  type ServiceInterest,
} from './utils/fiscalLogic';

export const WHATSAPP_NUMBER = GLOBAL_WHATSAPP_NUMBER;
export const CONTACT_EMAIL = GLOBAL_CONTACT_EMAIL;
export const INSTAGRAM_URL = GLOBAL_INSTAGRAM_URL;
export const TIKTOK_URL = GLOBAL_TIKTOK_URL;

export default function App() {
  const [selectedService, setSelectedService] =
    useState<ServiceInterest>('Contabilidad empresarial');
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [diagnosticBadgeActive, setDiagnosticBadgeActive] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);

  const [activeView, setActiveView] = useState<'landing' | 'success'>(() =>
    typeof window !== 'undefined' && isSuccessViewHash(window.location.hash)
      ? 'success'
      : 'landing'
  );
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)
  );

  const skipInitialSplash =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  const [splashVisible, setSplashVisible] = useState(!skipInitialSplash);
  const [splashFadingOut, setSplashFadingOut] = useState(false);
  const [splashDurationMs, setSplashDurationMs] = useState<number>(
    SPLASH_DURATIONS.initial
  );
  const [splashCycleKey, setSplashCycleKey] = useState(1);

  const fadeTimerRef = useRef<number | null>(null);
  const unmountTimerRef = useRef<number | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const clearSplashTimers = useCallback(() => {
    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (unmountTimerRef.current !== null) {
      window.clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
  }, []);

  const runSplashSequence = useCallback(
    (durationMs: number, onReady?: () => void) => {
      clearSplashTimers();
      setSplashDurationMs(durationMs);
      setSplashFadingOut(false);
      setSplashVisible(true);
      setSplashCycleKey((prev) => prev + 1);

      if (onReady) {
        onReady();
      }

      fadeTimerRef.current = window.setTimeout(() => {
        setSplashFadingOut(true);
        unmountTimerRef.current = window.setTimeout(() => {
          setSplashVisible(false);
          setSplashFadingOut(false);
        }, 500);
      }, durationMs);
    },
    [clearSplashTimers]
  );

  useEffect(() => {
    let iconLink = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
    }
    iconLink.type = 'image/png';
    iconLink.href = logoOscuro;
  }, []);

  useEffect(() => {
    if (!skipInitialSplash) {
      fadeTimerRef.current = window.setTimeout(() => {
        setSplashFadingOut(true);
        unmountTimerRef.current = window.setTimeout(() => {
          setSplashVisible(false);
          setSplashFadingOut(false);
        }, 500);
      }, SPLASH_DURATIONS.initial);
    }
    return () => {
      clearSplashTimers();
    };
  }, [clearSplashTimers, skipInitialSplash]);

  useEffect(() => {
    const handleHashChange = () => {
      if (!isSuccessViewHash(window.location.hash)) {
        setActiveView('landing');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (sectionId: string, focusContactName = false) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (focusContactName) {
      window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 450);
    }
  };

  const resetFormStates = () => {
    setSelectedService('Contabilidad empresarial');
    setPrefilledMessage('');
    setDiagnosticBadgeActive(false);
    setFormResetKey((prev) => prev + 1);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (activeView === 'success') {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
      resetFormStates();
      setActiveView('landing');
      window.setTimeout(() => {
        if (sectionId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          scrollToSection(sectionId);
        }
      }, 60);
      return;
    }

    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleGoToContact = () => {
    if (activeView === 'success') {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
      resetFormStates();
      setActiveView('landing');
      window.setTimeout(() => {
        scrollToSection('contacto', true);
      }, 60);
      return;
    }
    scrollToSection('contacto', true);
  };

  const handleSelectServiceFromCatalog = (service: ServiceInterest) => {
    setSelectedService(service);
    scrollToSection('contacto', true);
  };

  const handleApplyDiagnosticToContact = (
    service: ServiceInterest,
    summaryText: string
  ) => {
    setSelectedService(service);
    setPrefilledMessage(summaryText);
    setDiagnosticBadgeActive(true);
  };

  const handleCompleteWhatsAppSubmit = (whatsappUrl: string) => {
    setSubmittedWhatsappUrl(whatsappUrl);
    runSplashSequence(SPLASH_DURATIONS.submission, () => {
      window.location.hash = SUCCESS_HASH;
      setActiveView('success');
      window.scrollTo(0, 0);
    });
  };

  const handleReturnHome = () => {
    runSplashSequence(SPLASH_DURATIONS.returnHome, () => {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search
      );
      resetFormStates();
      setActiveView('landing');
      window.scrollTo(0, 0);
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#111111]">
        <Navbar
          onNavigateContact={handleGoToContact}
          onNavigateSection={handleNavigateSection}
        />

        {activeView === 'success' ? (
          <main className="flex-1">
            <SuccessView
              whatsappUrl={submittedWhatsappUrl}
              onReturnHome={handleReturnHome}
            />
          </main>
        ) : (
          <>
            <main className="flex-1">
              <HeroSection onScheduleClick={handleGoToContact} />

              <PresentationCarousel onRequestAdvisory={handleGoToContact} />

              <ValueProposition />

              <ServicesCatalog
                onSelectService={handleSelectServiceFromCatalog}
              />

              <TaxDiagnosticWizard
                key={`diagnostic-${formResetKey}`}
                onApplyToContact={handleApplyDiagnosticToContact}
                onCompleteWhatsAppSubmit={handleCompleteWhatsAppSubmit}
              />

              <WorkProcess />

              <TrustAndExperiences />

              <InstagramLatestSection />
            </main>

            <ContactAndFooter
              key={`contact-${formResetKey}`}
              selectedService={selectedService}
              prefilledMessage={prefilledMessage}
              diagnosticBadgeActive={diagnosticBadgeActive}
              nameInputRef={nameInputRef}
              onCompleteWhatsAppSubmit={handleCompleteWhatsAppSubmit}
            />

            <FloatingWhatsAppButton />
          </>
        )}

        <SplashScreen
          visible={splashVisible}
          fadingOut={splashFadingOut}
          durationMs={splashDurationMs}
          cycleKey={splashCycleKey}
        />
      </div>
    </MotionConfig>
  );
}
