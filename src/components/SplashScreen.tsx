import { motion, useReducedMotion } from 'motion/react';
import logoOscuro from '../assets/images/logo-negro.png';
import { EXECUTIVE_EASE } from './MotionPrimitives';

interface SplashScreenProps {
  visible: boolean;
  fadingOut: boolean;
  durationMs: number;
  cycleKey: number;
}

export default function SplashScreen({
  visible,
  fadingOut,
  durationMs,
  cycleKey,
}: SplashScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!visible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cargando CVS · Servicios Contables y Fiscales"
      data-testid="splash-screen"
      className={`fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <motion.div
        key={`logo-${cycleKey}`}
        initial={{
          opacity: shouldReduceMotion ? 1 : 0,
          scale: shouldReduceMotion ? 1 : 0.95,
        }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: EXECUTIVE_EASE }}
        className="flex flex-col items-center"
      >
        <div className="rounded-xl overflow-hidden border border-[#C5A059]/25 bg-black shadow-[0_0_60px_rgba(197,160,89,0.08)]">
          <img
            src={logoOscuro}
            alt="CVS · Servicios Contables y Fiscales"
            className="w-44 h-44 object-contain block"
          />
        </div>

        <div
          className="mt-8 h-[2px] w-32 bg-white/15 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <motion.div
            key={`bar-${cycleKey}`}
            initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : durationMs / 1000,
              ease: EXECUTIVE_EASE,
            }}
            className="h-full w-full origin-left bg-[#C5A059]"
          />
        </div>
      </motion.div>
    </div>
  );
}
