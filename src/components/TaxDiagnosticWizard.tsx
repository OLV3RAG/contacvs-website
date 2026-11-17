import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ExternalLink,
  Info,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  DIAGNOSTIC_ASPECTS,
  DIAGNOSTIC_PREFERENCES,
  DIAGNOSTIC_REGIMES,
  buildDiagnosticSummaryText,
  buildDiagnosticWhatsAppMessage,
  buildWhatsAppUrl,
  deriveServiceFromDiagnostic,
  validateDiagnosticStep,
  type DiagnosticState,
  type ServiceInterest,
} from '../utils/fiscalLogic';
import { EXECUTIVE_EASE, PRIMARY_CTA_CLASS, RevealBlock } from './MotionPrimitives';
import logoClaro from '../assets/images/logo.png';

interface TaxDiagnosticWizardProps {
  onApplyToContact: (service: ServiceInterest, summaryText: string) => void;
  onCompleteWhatsAppSubmit: (whatsappUrl: string) => void;
}

const TOTAL_STEPS = 4;

export default function TaxDiagnosticWizard({
  onApplyToContact,
  onCompleteWhatsAppSubmit,
}: TaxDiagnosticWizardProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<DiagnosticState>({
    aspects: [],
    regime: '',
    contactPreference: '',
  });
  const [stepError, setStepError] = useState<string | null>(null);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState<string | null>(
    null
  );
  const shouldReduceMotion = useReducedMotion();

  const toggleAspect = (aspect: string) => {
    setStepError(null);
    setWhatsappRedirectUrl(null);
    setState((prev) => {
      const exists = prev.aspects.includes(aspect);
      return {
        ...prev,
        aspects: exists
          ? prev.aspects.filter((item) => item !== aspect)
          : [...prev.aspects, aspect],
      };
    });
  };

  const handleSelectRegime = (regime: string) => {
    setStepError(null);
    setWhatsappRedirectUrl(null);
    setState((prev) => ({ ...prev, regime }));
  };

  const handleSelectPreference = (contactPreference: string) => {
    setStepError(null);
    setWhatsappRedirectUrl(null);
    setState((prev) => ({ ...prev, contactPreference }));
  };

  const handleNext = () => {
    const error = validateDiagnosticStep(step, state);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    setDirection(1);
    setStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
  };

  const handlePrev = () => {
    setStepError(null);
    setWhatsappRedirectUrl(null);
    setDirection(-1);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleJumpToStep = (targetStep: number) => {
    if (targetStep < step) {
      setStepError(null);
      setWhatsappRedirectUrl(null);
      setDirection(-1);
      setStep(targetStep);
    }
  };

  const handleSendDiagnostic = () => {
    const message = buildDiagnosticWhatsAppMessage(state);
    const url = buildWhatsAppUrl(message);
    setWhatsappRedirectUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');

    const derivedService = deriveServiceFromDiagnostic(state.aspects);
    const summaryText = buildDiagnosticSummaryText(state);
    onApplyToContact(derivedService, summaryText);
    onCompleteWhatsAppSubmit(url);
  };

  const stepVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * 24,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: EXECUTIVE_EASE,
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * -24,
      transition: {
        duration: 0.25,
        ease: EXECUTIVE_EASE,
      },
    }),
  };

  return (
    <section
      id="diagnostico"
      className="bg-white text-[#111111] py-20 sm:py-24 border-t border-zinc-200/80"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex rounded-lg overflow-hidden border border-[#C5A059]/30 bg-[#FAF8F5] mb-5">
            <img
              src={logoClaro}
              alt="CVS · Servicios contables y fiscales"
              className="w-20 h-20 object-contain block"
            />
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7833] uppercase mb-3">
            EVALUACIÓN PRELIMINAR
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] text-balance mb-4">
            Diagnóstico fiscal inicial
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
            Identifica los temas que conviene conversar con un especialista.
          </p>
        </RevealBlock>

        <RevealBlock delay={0.08}>
          <motion.div
            layout={!shouldReduceMotion}
            transition={{ duration: 0.35, ease: EXECUTIVE_EASE }}
            className="bg-[#FAF8F5] border border-zinc-200 rounded-md p-6 sm:p-10 overflow-hidden"
          >
            {/* Top progress bar & step indicator */}
            <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200">
              <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#9A7833] tabular-nums">
                Paso {step} de {TOTAL_STEPS}
              </span>

              <div className="flex items-center gap-2" aria-label="Progreso del diagnóstico">
                {[1, 2, 3, 4].map((dotStep) => {
                  const isCurrent = dotStep === step;
                  const isCompleted = dotStep < step;
                  return (
                    <button
                      key={dotStep}
                      type="button"
                      onClick={() => handleJumpToStep(dotStep)}
                      disabled={dotStep > step}
                      aria-label={`Ir al paso ${dotStep}`}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCurrent
                          ? 'w-8 bg-[#A61C24]'
                          : isCompleted
                            ? 'w-2.5 bg-[#C5A059] cursor-pointer'
                            : 'w-2.5 bg-zinc-300 cursor-default'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1: Multiple choice checkboxes */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-2">
                    ¿Qué aspectos te gustaría revisar?
                  </h3>
                  <p className="text-sm text-zinc-600 mb-6">
                    Puedes seleccionar una o varias opciones según las prioridades de tu empresa.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {DIAGNOSTIC_ASPECTS.map((aspect) => {
                      const checked = state.aspects.includes(aspect);
                      return (
                        <label
                          key={aspect}
                          className={`flex items-start gap-3.5 p-4 rounded border cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.99] motion-reduce:active:scale-100 min-h-[56px] ${
                            checked
                              ? 'bg-white border-[#A61C24] shadow-[0_0_0_2px_rgba(197,160,89,0.2)] text-[#111111]'
                              : 'bg-white border-zinc-200 hover:border-[#C5A059]/70 text-zinc-800'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAspect(aspect)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              checked
                                ? 'bg-[#A61C24] border-[#A61C24] text-white'
                                : 'bg-white border-zinc-300'
                            }`}
                          >
                            {checked && <Check className="w-3.5 h-3.5" />}
                          </span>
                          <span className="text-sm font-medium leading-snug">
                            {aspect}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Single choice regime */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-2">
                    ¿En qué régimen fiscal se encuentra tu empresa?
                  </h3>
                  <p className="text-sm text-zinc-600 mb-6">
                    Selecciona una opción para orientar mejor nuestra conversación inicial.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" role="radiogroup" aria-label="Régimen fiscal">
                    {DIAGNOSTIC_REGIMES.map((regime) => {
                      const selected = state.regime === regime;
                      return (
                        <label
                          key={regime}
                          className={`flex items-start gap-3.5 p-4 rounded border cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.99] motion-reduce:active:scale-100 min-h-[56px] ${
                            selected
                              ? 'bg-white border-[#A61C24] shadow-[0_0_0_2px_rgba(197,160,89,0.2)] text-[#111111]'
                              : 'bg-white border-zinc-200 hover:border-[#C5A059]/70 text-zinc-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="tax-regime"
                            value={regime}
                            checked={selected}
                            onChange={() => handleSelectRegime(regime)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              selected ? 'border-[#A61C24]' : 'border-zinc-300'
                            }`}
                          >
                            {selected && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#A61C24]" />
                            )}
                          </span>
                          <span className="text-sm font-medium leading-snug">
                            {regime}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact preference */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-2">
                    ¿Quieres agendar o prefieres una llamada?
                  </h3>
                  <p className="text-sm text-zinc-600 mb-6">
                    Indica el medio más cómodo para que un especialista dé seguimiento.
                  </p>

                  <div className="space-y-3" role="radiogroup" aria-label="Preferencia de contacto">
                    {DIAGNOSTIC_PREFERENCES.map((pref) => {
                      const selected = state.contactPreference === pref;
                      return (
                        <label
                          key={pref}
                          className={`flex items-center gap-3.5 p-4 rounded border cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.99] motion-reduce:active:scale-100 min-h-[56px] ${
                            selected
                              ? 'bg-white border-[#A61C24] shadow-[0_0_0_2px_rgba(197,160,89,0.2)] text-[#111111]'
                              : 'bg-white border-zinc-200 hover:border-[#C5A059]/70 text-zinc-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="contact-preference"
                            value={pref}
                            checked={selected}
                            onChange={() => handleSelectPreference(pref)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              selected ? 'border-[#A61C24]' : 'border-zinc-300'
                            }`}
                          >
                            {selected && (
                              <span className="w-2.5 h-2.5 rounded-full bg-[#A61C24]" />
                            )}
                          </span>
                          <span className="text-sm font-medium">{pref}</span>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Summary */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <h3 className="font-serif text-2xl font-semibold text-[#111111] mb-2">
                    Resumen de tu diagnóstico inicial
                  </h3>
                  <p className="text-sm text-zinc-600 mb-6">
                    Revisa tus respuestas antes de abrir WhatsApp con tu solicitud.
                  </p>

                  <div className="bg-white border border-zinc-200 rounded p-5 sm:p-6 space-y-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#9A7833] mb-1">
                        Aspectos a revisar
                      </p>
                      <p className="text-sm text-[#111111] font-medium">
                        {state.aspects.join(' · ')}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#9A7833] mb-1">
                        Régimen fiscal
                      </p>
                      <p className="text-sm text-[#111111] font-medium">
                        {state.regime}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#9A7833] mb-1">
                        Preferencia de contacto
                      </p>
                      <p className="text-sm text-[#111111] font-medium">
                        {state.contactPreference}
                      </p>
                    </div>
                  </div>

                  {whatsappRedirectUrl && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-950 mb-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2
                          className="w-5 h-5 text-emerald-700 shrink-0"
                          aria-hidden="true"
                        />
                        <p className="text-sm font-medium">
                          Redirigiendo a WhatsApp con tu diagnóstico...
                        </p>
                      </div>
                      <a
                        href={whatsappRedirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A61C24] hover:underline whitespace-nowrap shrink-0"
                      >
                        <span>Abrir chat en WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-4 rounded bg-zinc-100/80 border border-zinc-200 text-xs text-zinc-700 leading-relaxed mb-2">
                    <Info className="w-4 h-4 text-[#9A7833] shrink-0 mt-0.5" aria-hidden="true" />
                    <p>
                      Esta orientación es informativa; no determina impuestos ni reemplaza una
                      asesoría fiscal personalizada.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {stepError && (
              <p role="alert" className="mt-4 text-sm font-medium text-[#A61C24]">
                {stepError}
              </p>
            )}

            {/* Footer Navigation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-8 border-t border-zinc-200">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-medium rounded border border-zinc-300 text-zinc-800 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] motion-reduce:active:scale-100 cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Anterior</span>
              </button>

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 min-h-[44px] text-sm font-semibold rounded bg-[#111111] hover:bg-zinc-800 text-white transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 cursor-pointer whitespace-nowrap"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendDiagnostic}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 min-h-[44px] text-sm font-semibold rounded cursor-pointer whitespace-nowrap ${PRIMARY_CTA_CLASS}`}
                >
                  <span>Enviar solicitud</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>
        </RevealBlock>
      </div>
    </section>
  );
}
