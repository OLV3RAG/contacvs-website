import { Eye, Scale, ShieldCheck, Users } from 'lucide-react';
import {
  RevealBlock,
  SPOTLIGHT_CARD_CLASS,
  SPOTLIGHT_GLOW_OVERLAY_CLASS,
  STAGGER_STEP,
} from './MotionPrimitives';

const ILLUSTRATIVE_CASES = [
  {
    title: 'Empresa en crecimiento',
    tag: 'Caso ilustrativo · Gestión contable',
    description:
      'Una empresa en expansión necesitaba pasar de registros aislados al cierre de mes a un seguimiento contable estructurado, con estados financieros claros y calendario preventivo de entregas para respaldar sus decisiones operativas.',
  },
  {
    title: 'Equipo administrativo',
    tag: 'Caso ilustrativo · Operación fiscal',
    description:
      'Un equipo administrativo buscaba alinear la emisión de comprobantes fiscales digitales, la administración de nómina y el cumplimiento periódico ante el SAT mediante criterios claros y comunicación directa con su asesor.',
  },
];

const TRUST_PILLARS = [
  {
    title: 'Confidencialidad',
    description:
      'Resguardo responsable de la información financiera, fiscal y operativa de tu empresa.',
    Icon: ShieldCheck,
  },
  {
    title: 'Criterio fiscal',
    description:
      'Análisis fundamentado en la normativa vigente para tomar decisiones con respaldo.',
    Icon: Scale,
  },
  {
    title: 'Atención cercana',
    description:
      'Comunicación directa y comprensible con especialistas que conocen tu operación.',
    Icon: Users,
  },
  {
    title: 'Procesos claros',
    description:
      'Entregables definidos, seguimiento puntual y visibilidad en cada etapa del ciclo contable.',
    Icon: Eye,
  },
];

export default function TrustAndExperiences() {
  return (
    <section
      id="confianza"
      className="bg-white text-[#111111] py-20 sm:py-24 border-t border-zinc-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Illustrative Cases */}
        <div className="mb-20">
          <RevealBlock className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7833] uppercase mb-3">
              ESCENARIOS FRECUENTES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] text-balance mb-3">
              Experiencias empresariales
            </h2>
            <p className="text-sm text-zinc-600">
              Ejemplos ilustrativos de necesidades frecuentes; no son testimonios
              atribuidos a clientes reales.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ILLUSTRATIVE_CASES.map((item, idx) => (
              <RevealBlock key={item.title} delay={idx * STAGGER_STEP}>
                <article
                  className={`h-full bg-[#FAF8F5] border border-zinc-200/90 rounded-md p-7 sm:p-9 ${SPOTLIGHT_CARD_CLASS}`}
                >
                  <span aria-hidden="true" className={SPOTLIGHT_GLOW_OVERLAY_CLASS} />
                  <p className="relative text-xs font-semibold tracking-[0.16em] uppercase text-[#8A6A28] mb-2 tabular-nums">
                    Escenario ilustrativo 0{idx + 1}
                  </p>
                  <h3 className="relative font-serif text-2xl font-semibold text-[#111111] mb-4">
                    {item.title} ({item.tag})
                  </h3>
                  <p className="relative text-sm sm:text-base text-zinc-700 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* Trust Block */}
        <div className="pt-14 border-t border-zinc-200/80">
          <RevealBlock className="max-w-2xl mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111]">
              Confianza en cada paso
            </h3>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map(({ title, description, Icon }, idx) => (
              <RevealBlock key={title} delay={idx * STAGGER_STEP}>
                <div
                  className={`h-full bg-[#FAF8F5] border border-zinc-200/90 rounded-md p-6 ${SPOTLIGHT_CARD_CLASS}`}
                >
                  <span aria-hidden="true" className={SPOTLIGHT_GLOW_OVERLAY_CLASS} />
                  <Icon className="relative w-7 h-7 text-[#C5A059] mb-4" aria-hidden="true" />
                  <h4 className="relative font-serif text-lg font-semibold text-[#111111] mb-2">
                    {title}
                  </h4>
                  <p className="relative text-sm text-zinc-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
