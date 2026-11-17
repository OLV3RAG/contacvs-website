import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EXECUTIVE_EASE, PRIMARY_CTA_CLASS, RevealBlock } from './MotionPrimitives';
import logoOscuro from '../assets/images/logo-negro.png';

interface PresentationCarouselProps {
  onRequestAdvisory: () => void;
}

interface SlideData {
  id: string;
  counter: string;
  kicker?: string;
  title: string;
  body: string;
  bullets?: string[];
  hasMonogram?: boolean;
  hasCta?: boolean;
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    counter: '01/04',
    title: 'Bienvenido a CVS',
    body: 'Servicios contables y fiscales con atención cercana y claridad para cada decisión de tu empresa.',
    hasMonogram: true,
  },
  {
    id: 'slide-2',
    counter: '02/04',
    kicker: '01 / ORDEN Y VISIBILIDAD',
    title: 'Contabilidad que acompaña tus decisiones',
    body: 'Organizamos y damos seguimiento a la información contable para que tengas una perspectiva más clara de la operación de tu negocio.',
    bullets: [
      'Registro y organización contable',
      'Información útil para planear',
    ],
  },
  {
    id: 'slide-3',
    counter: '03/04',
    kicker: '02 / CRITERIO Y CUMPLIMIENTO',
    title: 'Asesoría fiscal con visión integral',
    body: 'Te orientamos en tus obligaciones fiscales y acompañamos la preparación de declaraciones y cierres conforme a las necesidades de tu empresa.',
    bullets: [
      'Declaraciones y obligaciones ante el SAT',
      'Facturación electrónica y nómina',
    ],
  },
  {
    id: 'slide-4',
    counter: '04/04',
    kicker: '03 / SIGUIENTE PASO',
    title: 'Hablemos de lo que tu empresa necesita',
    body: 'Cuéntanos tus objetivos y los temas que deseas revisar. Un especialista podrá evaluar tu solicitud y ayudarte a definir los próximos pasos.',
    hasCta: true,
  },
];

export default function PresentationCarousel({
  onRequestAdvisory,
}: PresentationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const currentSlide = SLIDES[activeIndex];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleSelectDot = (idx: number) => {
    if (idx === activeIndex) return;
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * 24,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: EXECUTIVE_EASE,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * -24,
      transition: {
        duration: 0.3,
        ease: EXECUTIVE_EASE,
      },
    }),
  };

  return (
    <section
      id="presentacion"
      aria-label="Presentación de CVS"
      className="bg-[#18181B] text-[#FAF8F5] py-16 sm:py-24 border-y border-zinc-800/80"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock>
          <div className="bg-[#111111] border border-zinc-800 rounded-md p-6 sm:p-12 shadow-sm overflow-hidden">
            {/* Top bar: counter and prev/next buttons */}
            <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800/90">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] tabular-nums">
                {currentSlide.counter}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Diapositiva anterior"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-medium text-zinc-200 border border-zinc-700 hover:border-[#C5A059] hover:text-[#FAF8F5] rounded transition-all duration-200 active:scale-[0.98] motion-reduce:active:scale-100 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Anterior</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Siguiente diapositiva"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-medium text-zinc-200 border border-zinc-700 hover:border-[#C5A059] hover:text-[#FAF8F5] rounded transition-all duration-200 active:scale-[0.98] motion-reduce:active:scale-100 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Slide Body */}
            <div className="min-h-[250px] sm:min-h-[270px] flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {currentSlide.hasMonogram ? (
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center md:text-left py-2">
                      <div className="rounded-xl overflow-hidden bg-black border border-[#C5A059]/30 shrink-0">
                        <img
                          src={logoOscuro}
                          alt="CVS · Servicios contables y fiscales"
                          className="w-44 h-44 object-contain block"
                        />
                      </div>
                      <div className="max-w-xl">
                        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FAF8F5] mb-4 text-balance">
                          {currentSlide.title}
                        </h2>
                        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                          {currentSlide.body}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-2xl">
                      {currentSlide.kicker && (
                        <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A059] uppercase mb-3">
                          {currentSlide.kicker}
                        </p>
                      )}

                      <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#FAF8F5] mb-4 text-balance">
                        {currentSlide.title}
                      </h2>

                      <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-7">
                        {currentSlide.body}
                      </p>

                      {currentSlide.bullets && (
                        <ul className="space-y-3.5">
                          {currentSlide.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-stretch gap-3.5 text-sm sm:text-base text-[#FAF8F5]"
                            >
                              <span
                                className="w-0.5 bg-[#C5A059] shrink-0"
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {currentSlide.hasCta && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={onRequestAdvisory}
                            className={`inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold rounded cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059] ${PRIMARY_CTA_CLASS}`}
                          >
                            <span>Solicitar asesoría</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Dot Indicators */}
            <div className="flex items-center justify-center gap-3 pt-8 mt-8 border-t border-zinc-800/90">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleSelectDot(idx)}
                    aria-label={`Ir a la diapositiva ${idx + 1} de ${SLIDES.length}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="p-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059] rounded"
                  >
                    <motion.span
                      animate={{
                        width: isActive ? 32 : 8,
                        backgroundColor: isActive ? '#C5A059' : '#52525B',
                      }}
                      transition={{ duration: 0.3, ease: EXECUTIVE_EASE }}
                      className="block h-2 rounded-full"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
