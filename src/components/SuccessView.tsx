import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import logoOscuro from '../assets/images/logo-negro.png';
import { EXECUTIVE_EASE } from './MotionPrimitives';

interface SuccessViewProps {
  whatsappUrl: string;
  onReturnHome: () => void;
}

export default function SuccessView({
  whatsappUrl,
  onReturnHome,
}: SuccessViewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="success-view-title"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#000000] via-[#0B0B0D] to-[#161617] text-[#FAF8F5] px-4 sm:px-6 pt-24 pb-16"
    >
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EXECUTIVE_EASE }}
        className="w-full max-w-xl mx-auto text-center"
      >
        <div className="inline-flex rounded-xl overflow-hidden border border-[#C5A059]/30 bg-black mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
          <img
            src={logoOscuro}
            alt="CVS · Servicios Contables y Fiscales"
            className="w-16 h-16 object-contain block"
          />
        </div>

        <div
          className="w-20 h-20 mx-auto mb-7 rounded-full border border-[#C5A059]/45 bg-[#C5A059]/10 flex items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.12)]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 48 48"
            className="w-11 h-11 text-[#C5A059]"
            fill="none"
          >
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: EXECUTIVE_EASE }}
            />
            <motion.path
              d="M15 24.5L21 30.5L33.5 18"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.25, ease: EXECUTIVE_EASE }}
            />
          </svg>
        </div>

        <p className="text-xs font-semibold tracking-[0.22em] text-[#C5A059] uppercase mb-3">
          CVS · ATENCIÓN PERSONALIZADA
        </p>

        <h1
          id="success-view-title"
          className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight text-[#FAF8F5] text-balance leading-[1.15] mb-5"
        >
          ¡Solicitud preparada con éxito!
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-lg mx-auto mb-8">
          Hemos abierto WhatsApp con los detalles de tu consulta para que uno de
          nuestros especialistas contables y fiscales te atienda a la brevedad.
        </p>

        <div className="mb-9">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm text-zinc-300 hover:text-[#C5A059] underline underline-offset-4 decoration-[#C5A059]/50 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
          >
            <span>
              ¿No se abrió WhatsApp automáticamente? Haz clic aquí para abrir el chat
            </span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>

        <div>
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[48px] text-sm font-semibold rounded-full bg-[#A61C24] hover:bg-[#8E161D] text-white transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(166,28,36,0.38)] active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Regresar a la página principal</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
