import { defineMessages } from 'react-intl';

export const scopeAction = 'app.action';
export const scopeAuth = 'app.auth';
export const scopeModel = 'app.model';
export const scopeError = 'app.error';

export default defineMessages({
  auth: {
    emailNotRegistered: {
      id: `${scopeAuth}.emailNotRegistered`,
    },
    restorePass: {
      id: `${scopeAuth}.restorePass`,
    },
  },
});
