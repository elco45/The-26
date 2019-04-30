import firebase from 'firebase/app';
import '@firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import ReduxSagaFirebase from 'redux-saga-firebase';

const myFirebaseApp = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
});

export const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);
