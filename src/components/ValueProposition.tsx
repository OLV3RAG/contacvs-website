import { Sparkles } from 'lucide-react';
import {
  RevealBlock,
  SPOTLIGHT_CARD_CLASS,
  SPOTLIGHT_GLOW_OVERLAY_CLASS,
  STAGGER_STEP,
} from './MotionPrimitives';
import logoClaro from '../assets/images/logo.png';

const REACTIVE_ITEMS = [
  'Documentos dispersos y pendientes difíciles de identificar.',
  'Dudas sobre declaraciones, comprobantes y fechas clave.',
  'Poca visibilidad para tomar decisiones financieras.',
];

const CVS_ITEMS = [
  'Información contable organizada y seguimiento oportuno.',
  'Orientación sobre obligaciones fiscales y procesos ante el SAT.',
  'Análisis para entender mejor la operación de tu empresa.',
];

const PILLARS = [
  'Contabilidad en orden',
  'Cumplimiento ante el SAT',
  'Atención personalizada',
  'Información para decidir',
  'Acompañamiento continuo',
];

export default function ValueProposition() {
  return (
    <section className="bg-[#FAF8F5] text-[#111111] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7833] uppercase mb-3">
            ENFOQUE EMPRESARIAL
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] text-balance mb-4">
            Una mejor forma de llevar tus finanzas
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Del trabajo reactivo a una gestión contable y fiscal organizada, con
            seguimiento y claridad.
          </p>
        </RevealBlock>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Reactive */}
          <RevealBlock delay={0}>
            <div className={`h-full bg-white border border-zinc-200/90 rounded-md p-7 sm:p-9 ${SPOTLIGHT_CARD_CLASS}`}>
              <span aria-hidden="true" className={SPOTLIGHT_GLOW_OVERLAY_CLASS} />
              <h3 className="relative font-serif text-2xl font-semibold text-[#111111] mb-6">
                Cuando todo se resuelve al final
              </h3>
              <ul className="relative space-y-5">
                {REACTIVE_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-stretch gap-4 text-sm sm:text-base text-zinc-700 leading-relaxed"
                  >
                    <span
                      className="w-0.5 bg-[#A61C24] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* Card 2: With CVS */}
          <RevealBlock delay={STAGGER_STEP}>
            <div className={`h-full bg-white border border-[#C5A059] rounded-md p-7 sm:p-9 ${SPOTLIGHT_CARD_CLASS}`}>
              <span aria-hidden="true" className={SPOTLIGHT_GLOW_OVERLAY_CLASS} />
              <div className="relative flex items-center justify-between gap-4 mb-6">
                <h3 className="font-serif text-2xl font-semibold text-[#A61C24]">
                  Con el acompañamiento de CVS
                </h3>
                <div className="rounded-lg overflow-hidden border border-[#C5A059]/30 bg-[#FAF8F5] shrink-0">
                  <img
                    src={logoClaro}
                    alt="CVS"
                    className="w-12 h-12 object-contain block"
                  />
                </div>
              </div>
              <ul className="relative space-y-5">
                {CVS_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-stretch gap-4 text-sm sm:text-base text-zinc-800 leading-relaxed"
                  >
                    <span
                      className="w-0.5 bg-[#C5A059] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>

        {/* 5 Pillars Block */}
        <div className="pt-8 border-t border-zinc-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PILLARS.map((pillar, idx) => (
              <RevealBlock key={pillar} delay={idx * STAGGER_STEP}>
                <div className={`h-full bg-white border border-zinc-200/80 rounded-md p-5 flex items-center gap-3.5 ${SPOTLIGHT_CARD_CLASS}`}>
                  <span aria-hidden="true" className={SPOTLIGHT_GLOW_OVERLAY_CLASS} />
                  <Sparkles
                    className="relative w-5 h-5 text-[#A61C24] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="relative text-sm font-semibold text-[#111111] leading-snug">
                    {pillar}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
