/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LocaleToggle';

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'en',
  },
  es: {
    id: `${scope}.es`,
    defaultMessage: 'es',
  },
  fr: {
    id: `${scope}.fr`,
    defaultMessage: 'fr',
  },
});
