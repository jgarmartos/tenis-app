/**
 * Vue I18n configuration for the Tennis App.
 * Handles internationalization setup with multiple language support.
 *
 * @fileoverview Main i18n configuration file
 * @author Your Name
 * @version 1.0.0
 */

import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import es from '../locales/es'

/**
 * Available languages in the application
 */
export const AVAILABLE_LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
] as const

/**
 * Default locale for the application
 */
export const DEFAULT_LOCALE = 'en'

/**
 * Creates and configures the Vue I18n instance with type safety and fallback support.
 *
 * @returns {I18n} Configured i18n instance
 */
const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: {
    en,
    es
  },
  // Enable global properties for template access
  globalInjection: true,
  // Silence missing translation warnings in development
  silentTranslationWarn: import.meta.env.PROD,
  // Silence fallback warnings
  silentFallbackWarn: import.meta.env.PROD
})

export default i18n
