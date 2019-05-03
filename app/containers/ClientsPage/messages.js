import { defineMessages } from 'react-intl';

export const scopeAction = 'app.action';
export const scopeAuth = 'app.auth';
export const scopeModel = 'app.model';
export const scopeError = 'app.error';

export default defineMessages({
  action: {
    edit: {
      id: `${scopeAction}.edit`,
    },
  },
  auth: {
    emailTaken: {
      id: `${scopeAuth}.emailTaken`,
    },
    relogin: {
      id: `${scopeAuth}.relogin`,
    },
    repeatPassError: {
      id: `${scopeAuth}.repeatPassError`,
    },
    resetSuccess: {
      id: `${scopeAuth}.resetSuccess`,
    },
  },
  model: {
    clients: {
      id: `${scopeModel}.clients`,
    },
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
});
