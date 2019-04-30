/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const esLocaleData = require('react-intl/locale-data/es');
const frLocaleData = require('react-intl/locale-data/fr');

const enTranslationMessages = require('./translations/en.json');
const esTranslationMessages = require('./translations/es.json');
const frTranslationMessages = require('./translations/fr.json');

addLocaleData(enLocaleData);
addLocaleData(esLocaleData);
addLocaleData(frLocaleData);

const getBrowserLang = () => {
  const { navigator } = window;
  return (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    'en'
  );
};

const getLang = () => {
  const currentLanguage = localStorage.getItem('defaultLanguage');
  if (!currentLanguage) {
    const browserLanguage = getBrowserLang();
    if (browserLanguage.indexOf('es') >= 0) {
      return 'es';
    }
    if (browserLanguage.indexOf('fr') >= 0) {
      return 'fr';
    }
    return 'en';
  }
  return currentLanguage;
};

const DEFAULT_LOCALE = getLang();

// prettier-ignore
const appLocales = [
  'en',
  'es',
  'fr',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  es: formatTranslationMessages('es', esTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
};

exports.appLocales = appLocales;
exports.formatTranslationMessages = formatTranslationMessages;
exports.translationMessages = translationMessages;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
