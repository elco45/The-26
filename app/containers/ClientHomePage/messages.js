import { defineMessages } from 'react-intl';

export const scopeModel = 'app.model';
export const scopeError = 'app.error';

export default defineMessages({
  model: {
    startDate: {
      id: `${scopeModel}.startDate`,
    },
    endDate: {
      id: `${scopeModel}.endDate`,
    },
    mealPlan: {
      id: `${scopeModel}.mealPlan`,
    },
  },
  error: {
    noActivePlan: {
      id: `${scopeError}.noActivePlan`,
    },
  },
});
