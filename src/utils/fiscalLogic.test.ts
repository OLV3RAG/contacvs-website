import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTACT_EMAIL,
  DEFAULT_WHATSAPP_MESSAGE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SPLASH_DURATIONS,
  SUCCESS_HASH,
  TIKTOK_HANDLE,
  TIKTOK_URL,
  WHATSAPP_NUMBER,
  buildContactWhatsAppMessage,
  buildDiagnosticWhatsAppMessage,
  buildWhatsAppUrl,
  deriveServiceFromDiagnostic,
  isHoneypotTriggered,
  isSuccessViewHash,
  validateContactForm,
  validateDiagnosticStep,
  type ContactFormData,
} from './fiscalLogic';

test('WHATSAPP_NUMBER and buildWhatsAppUrl format wa.me links properly', () => {
  assert.equal(WHATSAPP_NUMBER, '5215535666658');
  const url = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);
  assert.ok(url.startsWith('https://wa.me/5215535666658?text='));
  assert.ok(url.includes(encodeURIComponent('Hola CVS')));
});

test('Official CONTACT_EMAIL, Instagram and TikTok URLs and handles are clean', () => {
  assert.equal(CONTACT_EMAIL, 'contacvs@gmail.com');
  assert.equal(INSTAGRAM_URL, 'https://www.instagram.com/contacvs/');
  assert.equal(TIKTOK_URL, 'https://www.tiktok.com/@contacvs7');
  assert.equal(INSTAGRAM_HANDLE, '@contacvs');
  assert.equal(TIKTOK_HANDLE, '@contacvs7');
  assert.equal(INSTAGRAM_URL.includes('?'), false);
  assert.equal(TIKTOK_URL.includes('?'), false);
});

test('SPLASH_DURATIONS and success hash helpers match specification', () => {
  assert.equal(SPLASH_DURATIONS.initial, 1400);
  assert.equal(SPLASH_DURATIONS.submission, 1200);
  assert.equal(SPLASH_DURATIONS.returnHome, 800);
  assert.equal(SUCCESS_HASH, '#solicitud-enviada');
  assert.equal(isSuccessViewHash('#solicitud-enviada'), true);
  assert.equal(isSuccessViewHash('#contacto'), false);
});

test('deriveServiceFromDiagnostic maps SAT topics to Declaraciones y SAT', () => {
  assert.equal(
    deriveServiceFromDiagnostic(['Declaraciones u obligaciones ante el SAT']),
    'Declaraciones y SAT'
  );
});

test('deriveServiceFromDiagnostic maps combined SAT + payroll to Asesoría fiscal integral', () => {
  assert.equal(
    deriveServiceFromDiagnostic([
      'Declaraciones u obligaciones ante el SAT',
      'Nómina y comprobantes',
    ]),
    'Asesoría fiscal integral'
  );
});

test('validateDiagnosticStep enforces selections for steps 1-3', () => {
  const emptyState = { aspects: [], regime: '', contactPreference: '' };
  assert.ok(validateDiagnosticStep(1, emptyState));
  assert.ok(validateDiagnosticStep(2, emptyState));
  assert.ok(validateDiagnosticStep(3, emptyState));

  const validState = {
    aspects: ['Facturación electrónica'],
    regime: 'Persona Moral (Régimen General)',
    contactPreference: 'Contactarme por WhatsApp',
  };
  assert.equal(validateDiagnosticStep(1, validState), null);
  assert.equal(validateDiagnosticStep(2, validState), null);
  assert.equal(validateDiagnosticStep(3, validState), null);
});

test('buildDiagnosticWhatsAppMessage outputs required bullet format', () => {
  const msg = buildDiagnosticWhatsAppMessage({
    aspects: ['Facturación electrónica', 'Nómina y comprobantes'],
    regime: 'Resico (Régimen Simplificado de Confianza)',
    contactPreference: 'Agendar una videollamada de 15 minutos',
  });
  assert.match(msg, /Hola, me gustaría solicitar una asesoría con CVS:/);
  assert.match(msg, /• Régimen fiscal: Resico \(Régimen Simplificado de Confianza\)/);
  assert.match(msg, /• Temas a revisar: Facturación electrónica, Nómina y comprobantes/);
  assert.match(msg, /• Modalidad preferida: Videollamada/);
});

test('buildContactWhatsAppMessage uses fallback strings for empty optional fields', () => {
  const msg = buildContactWhatsAppMessage({
    name: 'Mariana Torres',
    email: '',
    whatsapp: '',
    company: '',
    service: 'Declaraciones y SAT',
    message: '',
    privacyAccepted: true,
    honeypot: '',
  });
  assert.match(msg, /Hola CVS, solicito información para una asesoría fiscal:/);
  assert.match(msg, /• Nombre: Mariana Torres/);
  assert.match(msg, /• Empresa: No especificada/);
  assert.match(msg, /• Correo: No especificado/);
  assert.match(msg, /• WhatsApp de contacto: Este mismo número/);
  assert.match(msg, /• Servicio de interés: Declaraciones y SAT/);
  assert.match(msg, /• Mensaje: Sin comentarios adicionales/);
});

test('validateContactForm enforces Name, Service, Privacy acceptance, and optional email/phone format', () => {
  const invalid: ContactFormData = {
    name: 'A',
    email: 'invalid-email',
    whatsapp: '123',
    company: '',
    service: 'Contabilidad empresarial',
    message: '',
    privacyAccepted: false,
    honeypot: '',
  };
  const errors = validateContactForm(invalid);
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.whatsapp);
  assert.ok(errors.privacyAccepted);

  const validMinimal: ContactFormData = {
    name: 'Carlos Mendoza',
    email: '',
    whatsapp: '',
    company: '',
    service: 'Contabilidad empresarial',
    message: '',
    privacyAccepted: true,
    honeypot: '',
  };
  assert.deepEqual(validateContactForm(validMinimal), {});
});

test('isHoneypotTriggered detects bot input in hidden field', () => {
  assert.equal(isHoneypotTriggered(''), false);
  assert.equal(isHoneypotTriggered('   '), false);
  assert.equal(isHoneypotTriggered('https://spam.example.com'), true);
});
