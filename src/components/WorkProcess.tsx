import { motion, useReducedMotion } from 'motion/react';
import {
  EXECUTIVE_EASE,
  RevealBlock,
  STAGGER_STEP,
} from './MotionPrimitives';

const PROCESS_STEPS = [
  { number: 1, label: 'Primer contacto' },
  { number: 2, label: 'Escuchamos tus necesidades' },
  { number: 3, label: 'Revisamos tu situación' },
  { number: 4, label: 'Definimos el alcance' },
  { number: 5, label: 'Organizamos la información' },
  { number: 6, label: 'Damos seguimiento' },
  { number: 7, label: 'Acompañamos tus decisiones' },
];

const BOUNCE_EASE: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export default function WorkProcess() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="proceso"
      className="bg-[#FAF8F5] text-[#111111] py-20 sm:py-24 border-t border-zinc-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7833] uppercase mb-3">
            METODOLOGÍA DE ATENCIÓN
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] text-balance">
            Así trabajamos contigo
          </h2>
        </RevealBlock>

        <div className="relative">
          {/* Animated horizontal connector line on desktop */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              ease: EXECUTIVE_EASE,
            }}
            className="hidden lg:block origin-left absolute top-8 left-[7%] right-[7%] h-px bg-gradient-to-r from-[#C5A059]/35 via-[#C5A059]/70 to-[#C5A059]/35"
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-3 relative">
            {PROCESS_STEPS.map((item, idx) => (
              <motion.li
                key={item.number}
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
                  delay: shouldReduceMotion ? 0 : idx * STAGGER_STEP,
                  ease: EXECUTIVE_EASE,
                }}
                className="relative flex lg:flex-col items-center lg:text-center gap-4 lg:gap-4 bg-white lg:bg-transparent p-4 lg:p-2 rounded border lg:border-0 border-zinc-200/80"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: shouldReduceMotion ? 1 : 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    delay: shouldReduceMotion ? 0 : idx * STAGGER_STEP + 0.05,
                    ease: BOUNCE_EASE,
                  }}
                  className="w-12 h-12 rounded-full bg-[#111111] text-[#C5A059] flex items-center justify-center font-semibold text-base tabular-nums shrink-0 border-2 border-[#C5A059]/70 shadow-xs"
                >
                  {item.number}
                </motion.div>
                <p className="text-sm font-semibold text-[#111111] leading-snug">
                  {item.label}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
