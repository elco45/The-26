import { defineMessages } from 'react-intl';

export const scopeAction = 'app.action';
export const scopeAuth = 'app.auth';
export const scopeModel = 'app.model';
export const scopeError = 'app.error';

export default defineMessages({
  'action.submit': {
    id: `${scopeAction}.submit`,
  },
  'action.add': {
    id: `${scopeAction}.add`,
  },
  'action.edit': {
    id: `${scopeAction}.edit`,
  },
  'action.send': {
    id: `${scopeAction}.send`,
  },

  'auth.login': {
    id: `${scopeAuth}.login`,
  },
  'auth.enter': {
    id: `${scopeAuth}.enter`,
  },
  'auth.forgotPass': {
    id: `${scopeAuth}.forgotPass`,
  },
  'auth.invalidEmailOrPass': {
    id: `${scopeAuth}.invalidEmailOrPass`,
  },
  'auth.verifyEmail': {
    id: `${scopeAuth}.verifyEmail`,
  },
  'auth.addUser': {
    id: `${scopeAuth}.addUser`,
  },
  'auth.emailTaken': {
    id: `${scopeAuth}.emailTaken`,
  },
  'auth.verificationSent': {
    id: `${scopeAuth}.verificationSent`,
  },
  'auth.repeatPassError': {
    id: `${scopeAuth}.repeatPassError`,
  },

  'model.name': {
    id: `${scopeModel}.name`,
  },
  'model.email': {
    id: `${scopeModel}.email`,
  },
  'model.password': {
    id: `${scopeModel}.password`,
  },
  'model.repeatPassword': {
    id: `${scopeModel}.repeatPassword`,
  },
  'model.description': {
    id: `${scopeModel}.description`,
  },
  'model.price': {
    id: `${scopeModel}.price`,
  },
  'model.durationDays': {
    id: `${scopeModel}.durationDays`,
  },
  'model.dailyFoodCount': {
    id: `${scopeModel}.dailyFoodCount`,
  },
  'model.mealPlan': {
    id: `${scopeModel}.mealPlan`,
  },

  'error.happened': {
    id: `${scopeError}.happened`,
  },
  'error.required': {
    id: `${scopeError}.required`,
  },
  'error.invalid': {
    id: `${scopeError}.invalid`,
  },
  'error.minRequired': {
    id: `${scopeError}.minRequired`,
  },
  'error.minimum': {
    id: `${scopeError}.minimum`,
  },
});
