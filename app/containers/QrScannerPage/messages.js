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
    success: {
      id: `${scopeAction}.success`,
    },
    error: {
      id: `${scopeAction}.error`,
    },
    accept: {
      id: `${scopeAction}.accept`,
    },
    cancel: {
      id: `${scopeAction}.cancel`,
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
    verificationSent: {
      id: `${scopeAuth}.verificationSent`,
    },
  },
  model: {
    client: {
      id: `${scopeModel}.client`,
    },
    mealPlan: {
      id: `${scopeModel}.mealPlan`,
    },
    planType: {
      id: `${scopeModel}.planType`,
    },
    startDate: {
      id: `${scopeModel}.startDate`,
    },
    endDate: {
      id: `${scopeModel}.endDate`,
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
  error: {
    invalid: {
      id: `${scopeError}.invalid`,
    },
    hasActivePlan: {
      id: `${scopeError}.hasActivePlan`,
    },
    exceedDailyLimit: {
      id: `${scopeError}.exceedDailyLimit`,
    },
    invalidQr: {
      id: `${scopeError}.invalidQr`,
    },
    happened: {
      id: `${scopeError}.happened`,
    },
  },
});
