import { defineMessages } from 'react-intl';

export const scopeAction = 'app.action';
export const scopeAuth = 'app.auth';
export const scopeModel = 'app.model';
export const scopeError = 'app.error';

export default defineMessages({
  auth: {
    emailVerifificationSuccess: {
      id: `${scopeAuth}.emailVerifificationSuccess`,
    },
    resetSuccess: {
      id: `${scopeAuth}.resetSuccess`,
    },
    invalidToken: {
      id: `${scopeAuth}.invalidToken`,
    },
  },
  action: {
    accept: {
      id: `${scopeAction}.accept`,
    },
    success: {
      id: `${scopeAction}.success`,
    },
    error: {
      id: `${scopeAction}.error`,
    },
    submit: {
      id: `${scopeAction}.submit`,
    },
  },
  model: {
    new: {
      id: `${scopeModel}.new`,
    },
    password: {
      id: `${scopeModel}.password`,
    },
  },
  error: {
    minRequired: {
      id: `${scopeError}.minRequired`,
    },
  },
});
