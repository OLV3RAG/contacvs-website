import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const EXECUTIVE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const STAGGER_STEP = 0.09;

export const PRIMARY_CTA_CLASS =
  'bg-[#A61C24] hover:bg-[#8E161D] text-white transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(166,28,36,0.45)] active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100';

export const SPOTLIGHT_CARD_CLASS =
  'group relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#C5A059]/40 hover:-translate-y-1.5 hover:shadow-[0_18px_38px_-14px_rgba(197,160,89,0.22)] motion-reduce:hover:translate-y-0';

export const SPOTLIGHT_GLOW_OVERLAY_CLASS =
  'pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_62%)]';

interface RevealBlockProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealBlock({
  children,
  delay = 0,
  className,
}: RevealBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 24,
        filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EXECUTIVE_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
