import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import { Check, CheckCircle2, ChevronDown, Copy, ExternalLink, Mail, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SERVICE_OPTIONS,
  TIKTOK_HANDLE,
  TIKTOK_URL,
  buildContactWhatsAppMessage,
  buildWhatsAppUrl,
  isHoneypotTriggered,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
  type ServiceInterest,
} from '../utils/fiscalLogic';
import { EXECUTIVE_EASE, PRIMARY_CTA_CLASS, RevealBlock } from './MotionPrimitives';
import { InstagramIcon, TikTokIcon } from './SocialIcons';
import logoOscuro from '../assets/images/logo-negro.png';

interface ContactAndFooterProps {
  selectedService: ServiceInterest;
  prefilledMessage: string;
  diagnosticBadgeActive: boolean;
  nameInputRef: RefObject<HTMLInputElement | null>;
  onCompleteWhatsAppSubmit: (whatsappUrl: string) => void;
}

const INPUT_CLASS =
  'w-full px-4 py-3 text-sm bg-[#111111] text-[#FAF8F5] placeholder:text-zinc-500 border border-zinc-700 rounded focus:outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/20 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]';

export default function ContactAndFooter({
  selectedService,
  prefilledMessage,
  diagnosticBadgeActive,
  nameInputRef,
  onCompleteWhatsAppSubmit,
}: ContactAndFooterProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    service: selectedService,
    message: prefilledMessage,
    privacyAccepted: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [submittedResult, setSubmittedResult] = useState<{
    data: ContactFormData;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      service: selectedService,
    }));
  }, [selectedService]);

  useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({
        ...prev,
        message: prefilledMessage,
      }));
    }
  }, [prefilledMessage]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showPrivacyInfo) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowPrivacyInfo(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPrivacyInfo]);

  const handleCopyEmail = async () => {
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const tempInput = document.createElement('input');
        tempInput.value = CONTACT_EMAIL;
        tempInput.setAttribute('readonly', '');
        tempInput.className = 'sr-only';
        document.body.appendChild(tempInput);
        tempInput.select();
        copied = document.execCommand('copy');
        document.body.removeChild(tempInput);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setEmailCopied(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        setEmailCopied(false);
      }, 2200);
    }
  };

  const handleFieldChange = (
    field: keyof ContactFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isHoneypotTriggered(formData.honeypot)) {
      return;
    }

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const message = buildContactWhatsAppMessage(formData);
    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmittedResult({ data: formData, whatsappUrl });
    onCompleteWhatsAppSubmit(whatsappUrl);
  };

  const handleReset = () => {
    setSubmittedResult(null);
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      company: '',
      service: selectedService,
      message: '',
      privacyAccepted: false,
      honeypot: '',
    });
  };

  return (
    <footer
      id="contacto"
      className="bg-[#111111] text-[#FAF8F5] pt-20 pb-12 border-t border-zinc-800/80"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealBlock className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-3">
            CONTACTO DIRECTO
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#FAF8F5] text-balance mb-4">
            Agenda una asesoría fiscal
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Cuéntanos qué necesita tu empresa y un especialista podrá revisar tu
            solicitud.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <Mail
                className="w-4 h-4 text-[#C5A059] shrink-0"
                aria-hidden="true"
              />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-xs sm:text-sm font-medium text-[#FAF8F5] hover:text-[#C5A059] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="h-3.5 w-px bg-white/15" aria-hidden="true" />
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copiar correo oficial de CVS"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-[#FAF8F5] transition-colors duration-200 cursor-pointer py-0.5 px-1.5 rounded-full hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
              >
                {emailCopied ? (
                  <>
                    <Check
                      className="w-3.5 h-3.5 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span className="text-emerald-400">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                    <span>Copiar correo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </RevealBlock>

        <RevealBlock delay={0.08}>
          {submittedResult ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-[#18181B] border border-[#C5A059]/60 rounded-md p-8 sm:p-10 text-center"
            >
              <CheckCircle2
                className="w-11 h-11 text-[#C5A059] mx-auto mb-4"
                aria-hidden="true"
              />
              <h3 className="font-serif text-2xl font-semibold text-[#FAF8F5] mb-3">
                Solicitud preparada para WhatsApp
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg mx-auto mb-6">
                Gracias,{' '}
                <span className="font-semibold text-white">
                  {submittedResult.data.name}
                </span>
                . Hemos preparado tu consulta sobre{' '}
                <span className="text-[#C5A059] font-medium">
                  {submittedResult.data.service}
                </span>{' '}
                y abierto WhatsApp para atenderte directamente.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={submittedResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[44px] text-sm font-semibold rounded cursor-pointer ${PRIMARY_CTA_CLASS}`}
                >
                  <span>Abrir conversación en WhatsApp</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-sm font-medium text-[#FAF8F5] border border-zinc-600 hover:border-[#C5A059] rounded transition-colors duration-200 cursor-pointer"
                >
                  Enviar otra solicitud
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#18181B] border border-zinc-800 rounded-md p-6 sm:p-10 space-y-5"
            >
              {/* Honeypot field against bots */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website-url">Sitio web</label>
                <input
                  id="contact-website-url"
                  name="website_url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => handleFieldChange('honeypot', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    className={INPUT_CLASS}
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Correo electrónico (opcional)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    className={INPUT_CLASS}
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-whatsapp"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    WhatsApp (opcional)
                  </label>
                  <input
                    id="contact-whatsapp"
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    value={formData.whatsapp}
                    onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                    aria-invalid={Boolean(errors.whatsapp)}
                    className={INPUT_CLASS}
                  />
                  {errors.whatsapp && (
                    <p role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    Empresa (opcional)
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    placeholder="Nombre de tu empresa"
                    value={formData.company}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2"
                >
                  Servicio de interés *
                </label>
                <div className="relative">
                  <select
                    id="contact-service"
                    required
                    value={formData.service}
                    onChange={(e) =>
                      handleFieldChange('service', e.target.value as ServiceInterest)
                    }
                    className={`${INPUT_CLASS} appearance-none pr-10 cursor-pointer`}
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="w-4 h-4 text-zinc-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-300"
                  >
                    Mensaje (opcional)
                  </label>
                  {diagnosticBadgeActive && (
                    <span className="text-[11px] font-medium text-[#C5A059]">
                      Resumen de diagnóstico adjunto
                    </span>
                  )}
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Cuéntanos brevemente qué necesitas revisar..."
                  value={formData.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  className={`${INPUT_CLASS} resize-y`}
                />
              </div>

              {/* Privacy Notice Acceptance */}
              <div className="pt-1">
                <div className="flex items-start gap-3">
                  <span className="relative mt-0.5 w-5 h-5 shrink-0 inline-flex items-center justify-center">
                    <input
                      id="contact-privacy"
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={(e) =>
                        handleFieldChange('privacyAccepted', e.target.checked)
                      }
                      aria-invalid={Boolean(errors.privacyAccepted)}
                      aria-labelledby="contact-privacy-label"
                      className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <span
                      aria-hidden="true"
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#C5A059] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#18181B] ${
                        formData.privacyAccepted
                          ? 'bg-[#A61C24] border-[#A61C24] text-white'
                          : 'bg-[#111111] border-zinc-600 peer-hover:border-[#C5A059]'
                      }`}
                    >
                      {formData.privacyAccepted && <Check className="w-3.5 h-3.5" />}
                    </span>
                  </span>
                  <div
                    id="contact-privacy-label"
                    className="text-xs sm:text-sm text-zinc-300 leading-relaxed"
                  >
                    <label htmlFor="contact-privacy" className="cursor-pointer select-none">
                      Acepto el{' '}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPrivacyInfo((prev) => !prev)}
                      aria-expanded={showPrivacyInfo}
                      className="text-[#C5A059] underline underline-offset-2 hover:text-[#FAF8F5] cursor-pointer"
                    >
                      Aviso de Privacidad
                    </button>
                    <label htmlFor="contact-privacy" className="cursor-pointer select-none">
                      {' '}para que CVS utilice mis datos únicamente para atender mi solicitud de asesoría. *
                    </label>
                  </div>
                </div>

                {errors.privacyAccepted && (
                  <p role="alert" className="mt-1.5 text-xs text-red-400">
                    {errors.privacyAccepted}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 px-6 min-h-[48px] text-sm font-semibold rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059] ${PRIMARY_CTA_CLASS}`}
              >
                Solicitar asesoría fiscal
              </button>
            </form>
          )}
        </RevealBlock>

        {/* Minimalist Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800/90 text-center space-y-3">
          <div className="inline-flex rounded-lg overflow-hidden bg-black border border-[#C5A059]/25 mx-auto">
            <img
              src={logoOscuro}
              alt="CVS · Servicios contables y fiscales"
              className="h-14 w-auto object-contain block"
            />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400">
            Contabilidad empresarial · Asesoría fiscal · Facturación y nómina
          </p>
          <p className="text-xs text-[#C5A059] tracking-wide">
            Claridad contable. Acompañamiento fiscal.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-6 pt-2"
            aria-label="Redes sociales y correo oficial de CVS"
          >
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#A1A1A6] hover:text-[#C5A059] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{CONTACT_EMAIL}</span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#A1A1A6] hover:text-[#C5A059] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{INSTAGRAM_HANDLE}</span>
            </a>

            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#A1A1A6] hover:text-[#C5A059] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059]"
            >
              <TikTokIcon className="w-4 h-4" />
              <span>{TIKTOK_HANDLE}</span>
            </a>
          </div>

          <p className="text-[11px] text-zinc-500 pt-1">
            © 2026 CVS · Servicios Contables y Fiscales
          </p>
        </div>
      </div>

      {/* Privacy Notice Modal (ARCO Rights) */}
      <AnimatePresence>
        {showPrivacyInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowPrivacyInfo(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-modal-title"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 12 }}
              transition={{ duration: 0.25, ease: EXECUTIVE_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#18181B] border border-[#C5A059]/35 rounded-xl p-6 sm:p-8 text-left shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-1">
                    PROTECCIÓN DE DATOS
                  </p>
                  <h3
                    id="privacy-modal-title"
                    className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF8F5]"
                  >
                    Aviso de Privacidad
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPrivacyInfo(false)}
                  aria-label="Cerrar Aviso de Privacidad"
                  className="p-2 rounded-lg text-zinc-400 hover:text-[#FAF8F5] hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <p>
                  <strong className="text-[#FAF8F5]">
                    CVS · Servicios Contables y Fiscales
                  </strong>{' '}
                  resguarda tus datos personales de contacto de forma confidencial y
                  los utiliza exclusivamente para dar seguimiento a tu solicitud de
                  asesoría contable y fiscal, sin compartirlos con terceros no
                  autorizados.
                </p>
                <p>
                  Para ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación
                  u Oposición) o revocar el consentimiento sobre el tratamiento de tus
                  datos, puedes escribirnos directamente a{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-[#C5A059] font-medium underline underline-offset-2 hover:text-[#FAF8F5]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPrivacyInfo(false)}
                  className="px-5 py-2.5 text-xs font-semibold rounded bg-[#A61C24] hover:bg-[#8E161D] text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
