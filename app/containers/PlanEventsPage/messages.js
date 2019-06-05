import { defineMessages } from 'react-intl';

export const scopeAction = 'app.action';
export const scopeAuth = 'app.auth';
export const scopeModel = 'app.model';
export const scopeError = 'app.error';

export default defineMessages({
  action: {
    areYouSure: {
      id: `${scopeAction}.areYouSure`,
    },
    delete: {
      id: `${scopeAction}.delete`,
    },
    accept: {
      id: `${scopeAction}.accept`,
    },
    close: {
      id: `${scopeAction}.close`,
    },
    cancel: {
      id: `${scopeAction}.cancel`,
    },
    cannotUndo: {
      id: `${scopeAction}.cannotUndo`,
    },
    scannedAt: {
      id: `${scopeAction}.scannedAt`,
    },
    success: {
      id: `${scopeAction}.success`,
    },
    error: {
      id: `${scopeAction}.error`,
    },
  },
  model: {
    mealPlan: {
      id: `${scopeModel}.mealPlan`,
    },
    startDate: {
      id: `${scopeModel}.startDate`,
    },
    endDate: {
      id: `${scopeModel}.endDate`,
    },
  },
});
