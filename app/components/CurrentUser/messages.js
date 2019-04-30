import { defineMessages } from 'react-intl';

export const scopeAuth = 'app.auth';

export default defineMessages({
  profile: {
    id: `${scopeAuth}.profile`,
  },
  logout: {
    id: `${scopeAuth}.logout`,
  },
});
