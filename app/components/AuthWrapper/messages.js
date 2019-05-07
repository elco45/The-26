import { defineMessages } from 'react-intl';

export const scope = 'app.action';
export const scopeError = 'app.error';

export default defineMessages({
  loading: {
    id: `${scope}.loading`,
  },
  unauthorized: {
    id: `${scopeError}.unauthorized`,
  },
});
