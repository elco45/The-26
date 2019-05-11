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
  },
  model: {
    name: {
      id: `${scopeModel}.name`,
    },
    description: {
      id: `${scopeModel}.description`,
    },
    price: {
      id: `${scopeModel}.price`,
    },
    durationDays: {
      id: `${scopeModel}.durationDays`,
    },
    dailyFoodCount: {
      id: `${scopeModel}.dailyFoodCount`,
    },
  },
});
