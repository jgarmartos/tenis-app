/**
 * Composable for managing language switching and locale state.
 * Provides reactive language management with persistence.
 * 
 * @fileoverview Language management composable
 * @author Your Name
 * @version 1.0.0
 */

import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from '../i18n'

/**
 * Local storage key for persisting selected language
 */
const LOCALE_STORAGE_KEY = 'tennis-app-locale'

/**
 * Composable for managing application language settings.
 * Provides methods to switch languages and persists user preference.
 * 
 * @returns {Object} Language management functions and state
 */
export function useLanguage() {
  const { locale, t } = useI18n()

  /**
   * Gets the saved locale from localStorage or returns the default
   * 
   * @returns {string} The saved locale code
   */
  const getSavedLocale = (): string => {
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
      return saved && AVAILABLE_LOCALES.some(l => l.code === saved)
        ? saved
        : DEFAULT_LOCALE
    } catch (error) {
      console.warn('Failed to read locale from localStorage:', error)
      return DEFAULT_LOCALE
    }
  }

  /**
   * Current locale reactive reference
   */
  const currentLocale = ref(getSavedLocale())

  /**
   * Computed property for the current language display name
   */
  const currentLanguageName = computed(() => {
    const current = AVAILABLE_LOCALES.find(l => l.code === currentLocale.value)
    return current?.name || 'English'
  })

  /**
   * Available locales for the language switcher
   */
  const availableLocales = computed(() => AVAILABLE_LOCALES)

  /**
   * Sets the application locale and persists the choice
   * 
   * @param {string} newLocale - The locale code to set
   */
  const setLocale = (newLocale: string): void => {
    try {
      if (AVAILABLE_LOCALES.some(l => l.code === newLocale)) {
        currentLocale.value = newLocale
        locale.value = newLocale
        localStorage.setItem(LOCALE_STORAGE_KEY, newLocale)
      } else {
        console.warn(`Locale '${newLocale}' is not available`)
      }
    } catch (error) {
      console.error('Failed to set locale:', error)
    }
  }

  /**
   * Toggles between available languages (useful for quick switching)
   */
  const toggleLanguage = (): void => {
    const currentIndex = AVAILABLE_LOCALES.findIndex(l => l.code === currentLocale.value)
    const nextIndex = (currentIndex + 1) % AVAILABLE_LOCALES.length
    setLocale(AVAILABLE_LOCALES[nextIndex].code)
  }

  /**
   * Initializes the locale on app startup
   */
  const initializeLocale = (): void => {
    const savedLocale = getSavedLocale()
    setLocale(savedLocale)
  }

  return {
    // State
    currentLocale,
    currentLanguageName,
    availableLocales,

    // Methods
    setLocale,
    toggleLanguage,
    initializeLocale,

    // i18n function
    t
  }
}
