import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Load translations from JSON files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to React
  .init({
    supportedLngs: ['en', 'pl'],
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },    
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
  });

export default i18n;
