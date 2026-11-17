export const WHATSAPP_NUMBER = '5215535666658';

export const CONTACT_EMAIL = 'contacvs@gmail.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/contacvs/';
export const TIKTOK_URL = 'https://www.tiktok.com/@contacvs7';
export const INSTAGRAM_HANDLE = '@contacvs';
export const TIKTOK_HANDLE = '@contacvs7';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola CVS, me gustaría recibir orientación contable y fiscal para mi empresa.';

export const SPLASH_DURATIONS = {
  initial: 1400,
  submission: 1200,
  returnHome: 800,
} as const;

export const SUCCESS_HASH = '#solicitud-enviada';

export function isSuccessViewHash(hash: string): boolean {
  return hash.trim().toLowerCase() === SUCCESS_HASH;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type ServiceInterest =
  | 'Contabilidad empresarial'
  | 'Planeación financiera y fiscal'
  | 'Declaraciones y SAT'
  | 'Facturación y nómina'
  | 'Asesoría fiscal integral';

export const SERVICE_OPTIONS: ServiceInterest[] = [
  'Contabilidad empresarial',
  'Planeación financiera y fiscal',
  'Declaraciones y SAT',
  'Facturación y nómina',
  'Asesoría fiscal integral',
];

export const DIAGNOSTIC_ASPECTS = [
  'Declaraciones u obligaciones ante el SAT',
  'Facturación electrónica',
  'Nómina y comprobantes',
  'Cierre fiscal y documentación',
] as const;

export const DIAGNOSTIC_REGIMES = [
  'Persona Física con Actividad Empresarial',
  'Persona Moral (Régimen General)',
  'Resico (Régimen Simplificado de Confianza)',
  'Otro / No estoy seguro',
] as const;

export const DIAGNOSTIC_PREFERENCES = [
  'Agendar una videollamada de 15 minutos',
  'Recibir una llamada telefónica lo antes posible',
  'Contactarme por WhatsApp',
] as const;

export interface DiagnosticState {
  aspects: string[];
  regime: string;
  contactPreference: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  service: ServiceInterest;
  message: string;
  privacyAccepted: boolean;
  honeypot: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export function deriveServiceFromDiagnostic(aspects: string[]): ServiceInterest {
  if (aspects.length === 0) {
    return 'Asesoría fiscal integral';
  }
  const joined = aspects.join(' ').toLowerCase();
  const hasSatOrCierre = joined.includes('sat') || joined.includes('cierre');
  const hasFacturacionOrNomina =
    joined.includes('facturación') || joined.includes('nómina');

  if (hasSatOrCierre && hasFacturacionOrNomina) {
    return 'Asesoría fiscal integral';
  }
  if (joined.includes('sat')) {
    return 'Declaraciones y SAT';
  }
  if (hasFacturacionOrNomina) {
    return 'Facturación y nómina';
  }
  if (joined.includes('cierre')) {
    return 'Planeación financiera y fiscal';
  }
  return 'Contabilidad empresarial';
}

export function formatModalityLabel(preference: string): string {
  const lower = preference.toLowerCase();
  if (lower.includes('videollamada')) return 'Videollamada';
  if (lower.includes('llamada')) return 'Llamada';
  if (lower.includes('whatsapp')) return 'WhatsApp';
  return preference || 'WhatsApp';
}

export function buildDiagnosticWhatsAppMessage(state: DiagnosticState): string {
  const regimeText = state.regime || 'Por definir';
  const aspectsText =
    state.aspects.length > 0 ? state.aspects.join(', ') : 'Revisión general';
  const modalityText = formatModalityLabel(state.contactPreference);

  return [
    'Hola, me gustaría solicitar una asesoría con CVS:',
    `• Régimen fiscal: ${regimeText}`,
    `• Temas a revisar: ${aspectsText}`,
    `• Modalidad preferida: ${modalityText}`,
  ].join('\n');
}

export function buildDiagnosticSummaryText(state: DiagnosticState): string {
  return buildDiagnosticWhatsAppMessage(state);
}

export function buildContactWhatsAppMessage(data: ContactFormData): string {
  const name = data.name.trim();
  const company = data.company.trim() || 'No especificada';
  const email = data.email.trim() || 'No especificado';
  const whatsapp = data.whatsapp.trim() || 'Este mismo número';
  const service = data.service;
  const message = data.message.trim() || 'Sin comentarios adicionales';

  return [
    'Hola CVS, solicito información para una asesoría fiscal:',
    `• Nombre: ${name}`,
    `• Empresa: ${company}`,
    `• Correo: ${email}`,
    `• WhatsApp de contacto: ${whatsapp}`,
    `• Servicio de interés: ${service}`,
    `• Mensaje: ${message}`,
  ].join('\n');
}

export function validateDiagnosticStep(
  step: number,
  state: DiagnosticState
): string | null {
  if (step === 1 && state.aspects.length === 0) {
    return 'Selecciona al menos un aspecto que te gustaría revisar para continuar.';
  }
  if (step === 2 && !state.regime.trim()) {
    return 'Selecciona el régimen fiscal que mejor describa a tu empresa.';
  }
  if (step === 3 && !state.contactPreference.trim()) {
    return 'Indica cómo prefieres que un especialista te contacte.';
  }
  return null;
}

export function isHoneypotTriggered(honeypot: string): boolean {
  return honeypot.trim().length > 0;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d\s()-]{7,20}$/;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const trimmedName = data.name.trim();
  if (trimmedName.length < 2) {
    errors.name = 'Ingresa tu nombre completo para poder dirigirnos a ti.';
  }

  if (!data.service) {
    errors.service = 'Selecciona un servicio de interés.';
  }

  const trimmedEmail = data.email.trim();
  if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Ingresa un correo electrónico válido (ej. correo@ejemplo.com).';
  }

  const trimmedWhatsapp = data.whatsapp.trim();
  if (trimmedWhatsapp && !PHONE_REGEX.test(trimmedWhatsapp)) {
    errors.whatsapp = 'Ingresa un número de WhatsApp válido (mínimo 7 dígitos).';
  }

  if (!data.privacyAccepted) {
    errors.privacyAccepted =
      'Debes aceptar el Aviso de Privacidad para continuar con tu solicitud.';
  }

  return errors;
}
