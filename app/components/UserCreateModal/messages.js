import { defineMessages } from 'react-intl';

export const scopeAction = 'app.action';
export const scopeAuth = 'app.auth';
export const scopeModel = 'app.model';
export const scopeError = 'app.error';

export default defineMessages({
  action: {
    add: {
      id: `${scopeAction}.add`,
    },
  },
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
  model: {
    fullName: {
      id: `${scopeModel}.fullName`,
    },
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
    minRequired: {
      id: `${scopeError}.minRequired`,
    },
  },
});
