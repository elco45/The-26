import { defineMessages } from 'react-intl';

export const scopeAuth = 'app.auth';

export default defineMessages({
  auth: {
    addUser: {
      id: `${scopeAuth}.addUser`,
    },
    emailTaken: {
      id: `${scopeAuth}.emailTaken`,
    },
    verificationSent: {
      id: `${scopeAuth}.verificationSent`,
    },
  },
});
