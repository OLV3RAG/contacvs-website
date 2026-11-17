import { useState } from 'react';
import { ArrowRight, BookOpen, Calculator, FileCheck2, Receipt } from 'lucide-react';
import type { ServiceInterest } from '../utils/fiscalLogic';
import {
  RevealBlock,
  SPOTLIGHT_CARD_CLASS,
  SPOTLIGHT_GLOW_OVERLAY_CLASS,
  STAGGER_STEP,
} from './MotionPrimitives';

interface ServicesCatalogProps {
  onSelectService: (service: ServiceInterest) => void;
}

interface ServiceCardItem {
  tag: string;
  title: ServiceInterest;
  description: string;
  linkLabel: string;
  imageSrc: string;
  imageAlt: string;
  FallbackIcon: typeof BookOpen;
}

const SERVICES: ServiceCardItem[] = [
  {
    tag: 'CONTABILIDAD',
    title: 'Contabilidad empresarial',
    description:
      'Registro, organización y seguimiento de la información contable de tu negocio.',
    linkLabel: 'Información clara para decidir',
    imageSrc: '/src/assets/images/service_contabilidad_1794782017400.jpg',
    imageAlt: 'Libros contables y documentación financiera organizada sobre escritorio',
    FallbackIcon: BookOpen,
  },
  {
    tag: 'ESTRATEGIA',
    title: 'Planeación financiera y fiscal',
    description:
      'Proyección y análisis preventivo para optimizar recursos y respaldar el crecimiento de tu empresa.',
    linkLabel: 'Visión estratégica',
    imageSrc: '/src/assets/images/service_estrategia_1794782017438.jpg',
    imageAlt: 'Sala de juntas ejecutiva para planeación financiera y fiscal',
    FallbackIcon: Calculator,
  },
  {
    tag: 'CUMPLIMIENTO',
    title: 'Declaraciones y SAT',
    description:
      'Apoyo con declaraciones, obligaciones ante el SAT y preparación del cierre fiscal.',
    linkLabel: 'Seguimiento de obligaciones',
    imageSrc: '/src/assets/images/service_cumplimiento_1794782017349.jpg',
    imageAlt: 'Carpetas de cumplimiento fiscal y documentación oficial',
    FallbackIcon: FileCheck2,
  },
  {
    tag: 'OPERACIÓN',
    title: 'Facturación y nómina',
    description:
      'Acompañamiento en facturación electrónica y administración de nómina.',
    linkLabel: 'Procesos más ordenados',
    imageSrc: '/src/assets/images/service_nomina_1794782017623.jpg',
    imageAlt: 'Estación de trabajo moderna para control de facturación y nómina',
    FallbackIcon: Receipt,
  },
];

function ServiceCardImage({
  src,
  alt,
  FallbackIcon,
}: {
  src: string;
  alt: string;
  FallbackIcon: typeof BookOpen;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#18181B] to-[#27272A] flex items-center justify-center">
        <FallbackIcon className="w-10 h-10 text-[#C5A059]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full bg-zinc-900 overflow-hidden">
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}

export default function ServicesCatalog({
  onSelectService,
}: ServicesCatalogProps) {
  return (
    <section
      id="servicios"
      className="bg-[#FAF8F5] text-[#111111] py-20 sm:py-24 border-t border-zinc-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7833] uppercase mb-3">
            PORTAFOLIO DE SERVICIOS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] text-balance mb-4">
            Servicios para cada etapa de tu empresa
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Soluciones contables, fiscales y administrativas conectadas con tu
            operación diaria.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => (
            <RevealBlock key={service.title} delay={idx * STAGGER_STEP}>
              <article
                className={`h-full bg-white border border-zinc-200/90 rounded-md flex flex-col ${SPOTLIGHT_CARD_CLASS}`}
              >
                <span aria-hidden="true" className={SPOTLIGHT_GLOW_OVERLAY_CLASS} />
                <ServiceCardImage
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  FallbackIcon={service.FallbackIcon}
                />

                <div className="relative p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase rounded-full bg-[#C5A059]/15 text-[#75581C] border border-[#C5A059]/55">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[#111111] mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#A61C24] hover:text-[#8E161D] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0 cursor-pointer text-left self-start py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A61C24]"
                  >
                    <span>{service.linkLabel}</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
