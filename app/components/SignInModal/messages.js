import { defineMessages } from 'react-intl';

export const scopeAuth = 'app.auth';

export default defineMessages({
  auth: {
    login: {
      id: `${scopeAuth}.login`,
    },
    enter: {
      id: `${scopeAuth}.enter`,
    },
    forgotPass: {
      id: `${scopeAuth}.forgotPass`,
    },
    invalidEmailOrPass: {
      id: `${scopeAuth}.invalidEmailOrPass`,
    },
    verifyEmail: {
      id: `${scopeAuth}.verifyEmail`,
    },
  },
});
