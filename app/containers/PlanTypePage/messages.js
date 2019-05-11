import { defineMessages } from 'react-intl';

export const scopeAction = 'app.action';
export const scopeModel = 'app.model';

export default defineMessages({
  action: {
    update: {
      id: `${scopeAction}.update`,
    },
    success: {
      id: `${scopeAction}.success`,
    },
  },
  model: {
    planType: {
      id: `${scopeModel}.planType`,
    },
  },
});
