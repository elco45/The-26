import { defineMessages } from 'react-intl';

export const scopeAuth = 'app.auth';
export const scopeModel = 'app.model';
export const scopeError = 'app.error';

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
  model: {
    email: {
      id: `${scopeModel}.email`,
    },
    password: {
      id: `${scopeModel}.password`,
    },
  },
  error: {
    required: {
      id: `${scopeError}.required`,
    },
    invalid: {
      id: `${scopeError}.invalid`,
    },
  },
});
