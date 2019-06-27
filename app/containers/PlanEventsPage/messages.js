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
    add: {
      id: `${scopeAction}.add`,
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
    addedBy: {
      id: `${scopeAction}.addedBy`,
    },
    addedManuallyBy: {
      id: `${scopeAction}.addedManuallyBy`,
    },
    createdAt: {
      id: `${scopeAction}.createdAt`,
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
    new: {
      id: `${scopeModel}.new`,
    },
    client: {
      id: `${scopeModel}.client`,
    },
    email: {
      id: `${scopeModel}.email`,
    },
  },
  error: {
    noActivePlan: {
      id: `${scopeError}.noActivePlan`,
    },
    minimum: {
      id: `${scopeError}.minimum`,
    },
    maximum: {
      id: `${scopeError}.maximum`,
    },
    exceedDailyLimit: {
      id: `${scopeError}.exceedDailyLimit`,
    },
    happened: {
      id: `${scopeError}.happened`,
    },
    greaterThanToday: {
      id: `${scopeError}.greaterThanToday`,
    },
  },
});
