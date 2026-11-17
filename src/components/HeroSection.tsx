import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EXECUTIVE_EASE, PRIMARY_CTA_CLASS } from './MotionPrimitives';
import {
  DEFAULT_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../utils/fiscalLogic';

interface HeroSectionProps {
  onScheduleClick: () => void;
}

export default function HeroSection({ onScheduleClick }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const specialistWhatsappUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: (step: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: shouldReduceMotion ? 0 : step * 0.1,
        ease: EXECUTIVE_EASE,
      },
    }),
  };

  return (
    <section
      id="inicio"
      className="relative bg-[#111111] text-[#FAF8F5] pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden"
    >
      {/* Subtle architectural background with dark gradient scrim */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {!imgError && (
          <img
            src="/src/assets/images/hero_accounting_studio_1794782016170.jpg"
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/92 to-[#111111]/75" />

        {/* Ambient Living Orbs */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 32, -16, 0],
                  y: [0, -24, 18, 0],
                  scale: [1, 1.08, 0.96, 1],
                  opacity: [0.8, 1, 0.75, 0.8],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-16 w-[26rem] h-[26rem] rounded-full bg-[#C5A059]/15 blur-3xl animate-pulse"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -28, 20, 0],
                  y: [0, 22, -16, 0],
                  scale: [1, 0.95, 1.09, 1],
                  opacity: [0.75, 0.95, 0.7, 0.75],
                }
          }
          transition={{
            duration: 10,
            delay: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-24 right-[8%] w-[24rem] h-[24rem] rounded-full bg-[#A61C24]/15 blur-3xl animate-pulse"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-8 bg-[#C5A059]" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-[#C5A059] uppercase">
              CLARIDAD PARA DECIDIR
            </p>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.12] tracking-tight text-[#FAF8F5] text-balance mb-6"
          >
            Tu empresa merece cuentas claras y decisiones seguras.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-10"
          >
            Contabilidad empresarial y asesoría fiscal con atención cercana, criterio
            profesional y una visión integral de tu negocio.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              type="button"
              onClick={onScheduleClick}
              className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] text-sm font-semibold rounded cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059] ${PRIMARY_CTA_CLASS}`}
            >
              <span>Agenda una asesoría fiscal</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href={specialistWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 min-h-[48px] text-sm font-semibold text-[#FAF8F5] border border-white/75 hover:bg-white hover:text-[#111111] rounded transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
            >
              Habla con un especialista
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
