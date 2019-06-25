import firebase from 'firebase/app';
import '@firebase/firestore';
import 'firebase/auth';
import ReduxSagaFirebase from 'redux-saga-firebase';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const myFirebaseApp = firebase.initializeApp(config);
const myFirebaseAppClone = firebase.initializeApp(config, 'clone');

export const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);
export const reduxSagaFirebaseClone = new ReduxSagaFirebase(myFirebaseAppClone);
