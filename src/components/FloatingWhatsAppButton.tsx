import {
  DEFAULT_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../utils/fiscalLogic';
import { WhatsAppIcon } from './SocialIcons';

export default function FloatingWhatsAppButton() {
  const whatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <span
        aria-hidden="true"
        className="wa-ambient-ring pointer-events-none absolute inset-0 rounded-full border border-[#25D366]/55"
      />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a CVS por WhatsApp"
        title="Habla con un especialista por WhatsApp"
        className="relative group inline-flex items-center gap-2.5 h-12 px-3.5 rounded-full bg-[#18181B]/95 backdrop-blur-md text-[#FAF8F5] border border-[#C5A059]/60 shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:border-[#25D366] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#25D366] text-white shrink-0">
          <WhatsAppIcon className="w-4 h-4" />
        </span>
        <span className="hidden sm:inline text-xs font-semibold tracking-wide pr-1 whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
