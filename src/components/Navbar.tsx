import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import {
  DEFAULT_WHATSAPP_MESSAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TIKTOK_HANDLE,
  TIKTOK_URL,
  buildWhatsAppUrl,
} from '../utils/fiscalLogic';
import { EXECUTIVE_EASE, PRIMARY_CTA_CLASS } from './MotionPrimitives';
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from './SocialIcons';
import logoOscuro from '../assets/images/logo-negro.png';

interface NavbarProps {
  onNavigateContact: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios', id: 'servicios' },
  { label: 'Diagnóstico', href: '#diagnostico', id: 'diagnostico' },
  { label: 'Proceso', href: '#proceso', id: 'proceso' },
  { label: 'Confianza', href: '#confianza', id: 'confianza' },
];

export default function Navbar({
  onNavigateContact,
  onNavigateSection,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSectionLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    setMenuOpen(false);
    if (onNavigateSection) {
      event.preventDefault();
      onNavigateSection(sectionId);
    }
  };

  const handleCtaClick = () => {
    setMenuOpen(false);
    onNavigateContact();
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] border-b ${
        scrolled || menuOpen
          ? 'backdrop-blur-md bg-[#111111]/90 border-[#C5A059]/30 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        <a
          href="#inicio"
          onClick={(e) => handleSectionLinkClick(e, 'inicio')}
          className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.12em] sm:tracking-[0.14em] text-[#FAF8F5] hover:text-[#C5A059] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
        >
          <span className="rounded-lg overflow-hidden shrink-0 bg-black border border-[#C5A059]/25">
            <img
              src={logoOscuro}
              alt="Logotipo CVS"
              className="h-9 w-auto object-contain block"
            />
          </span>
          <span>CVS · SERVICIOS CONTABLES Y FISCALES</span>
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSectionLinkClick(e, link.id)}
              className="hover:text-[#FAF8F5] transition-colors duration-200 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C5A059] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleCtaClick}
            className={`hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide rounded whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059] ${PRIMARY_CTA_CLASS}`}
          >
            Agendar asesoría
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded border border-zinc-700 text-[#FAF8F5] hover:border-[#C5A059] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: 0.25, ease: EXECUTIVE_EASE }}
            className="lg:hidden bg-[#141416]/95 backdrop-blur-md border-t border-[#C5A059]/25 px-4 py-5 space-y-3"
          >
            <nav aria-label="Menú móvil" className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSectionLinkClick(e, link.id)}
                  className="px-3 py-3 text-sm font-medium text-zinc-200 hover:text-[#C5A059] hover:bg-zinc-900/70 rounded transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-zinc-800 space-y-2.5">
              <button
                type="button"
                onClick={handleCtaClick}
                className={`w-full py-3 px-4 text-sm font-semibold rounded cursor-pointer ${PRIMARY_CTA_CLASS}`}
              >
                Agenda una asesoría fiscal
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full py-2.5 px-4 text-sm font-medium rounded border border-zinc-700 hover:border-[#25D366] text-[#FAF8F5] inline-flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Contacto directo por WhatsApp</span>
              </a>

              <div className="flex items-center justify-center gap-5 pt-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1A6] hover:text-[#C5A059] transition-colors py-1.5"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{INSTAGRAM_HANDLE}</span>
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1A6] hover:text-[#C5A059] transition-colors py-1.5"
                >
                  <TikTokIcon className="w-4 h-4" />
                  <span>{TIKTOK_HANDLE}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Reading Progress Bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5 pointer-events-none overflow-hidden"
      >
        <motion.div
          data-testid="reading-progress-bar"
          style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#C5A059] via-[#E0B96B] to-[#A61C24]"
        />
      </div>
    </header>
  );
}
