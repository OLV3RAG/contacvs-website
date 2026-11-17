import { ChevronRight } from 'lucide-react';
import logoOscuro from '../assets/images/logo-negro.png';
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TIKTOK_HANDLE,
  TIKTOK_URL,
} from '../utils/fiscalLogic';
import { RevealBlock } from './MotionPrimitives';
import { InstagramIcon, TikTokIcon } from './SocialIcons';

export default function InstagramLatestSection() {
  return (
    <section
      id="comunidad"
      aria-labelledby="comunidad-heading"
      className="bg-[#FAF8F5] text-[#111111] py-20 sm:py-24 border-t border-zinc-200/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7833] uppercase mb-3">
            ACTUALIDAD Y COMUNIDAD
          </p>
          <h2
            id="comunidad-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] text-balance mb-3"
          >
            Criterio contable en cada publicación
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Compartimos orientaciones prácticas sobre orden contable, cumplimiento
            ante el SAT y prevención fiscal para tu empresa.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.08}>
          <article className="max-w-xl mx-auto bg-white border border-black/10 rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(17,17,17,0.06)]">
            {/* Card Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-black border border-[#C5A059]/40 shrink-0">
                  <img
                    src={logoOscuro}
                    alt="Perfil oficial CVS en Instagram"
                    className="w-full h-full object-contain block"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#111111] truncate">
                    {INSTAGRAM_HANDLE}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    CVS · Servicios Contables y Fiscales
                  </p>
                </div>
              </div>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#111111] hover:bg-[#A61C24] text-[#FAF8F5] px-4 py-1.5 text-xs font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
              >
                Seguir
              </a>
            </div>

            {/* Editorial Visual Preview */}
            <div className="bg-[#111111] text-[#FAF8F5] px-6 py-9 sm:px-8 sm:py-11 border-b border-zinc-100">
              <div className="max-w-md mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C5A059]">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>CANAL OFICIAL · {INSTAGRAM_HANDLE}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF8F5] leading-snug text-balance">
                  Orden financiero mensual y seguimiento oportuno de tus obligaciones
                  fiscales
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Guías visuales, recordatorios de cierre y criterios claros para
                  directivos y equipos administrativos.
                </p>
              </div>
            </div>

            {/* Card Caption & Direct Instagram Link */}
            <div className="px-5 py-4 sm:px-6 space-y-3">
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                <span className="font-semibold text-[#111111] mr-1.5">
                  {INSTAGRAM_HANDLE}
                </span>
                Información clara para tomar decisiones con respaldo contable y fiscal
                durante todo el año.
              </p>

              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#A61C24] hover:text-[#111111] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
                >
                  <span>Ver publicación completa en Instagram</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>

          {/* Discreet Community Bar */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 text-center">
            <span className="text-xs sm:text-sm text-slate-600">
              También compartimos tips fiscales rápidos en
            </span>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium text-[#111111] hover:border-[#C5A059] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#111111]" />
              <span>Instagram ({INSTAGRAM_HANDLE})</span>
            </a>

            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium text-[#111111] hover:border-[#C5A059] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
            >
              <TikTokIcon className="w-3.5 h-3.5 text-[#111111]" />
              <span>TikTok ({TIKTOK_HANDLE})</span>
            </a>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
